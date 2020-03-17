require('dotenv').config()
const Discord = require('discord.js')
const CronJob = require('cron').CronJob
const axios = require('axios').default
const webhook = new Discord.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN)

async function main () {
  console.log(`[${new Date().toLocaleTimeString()}] Running main...`)
  let initialData = await getData()

  const job = new CronJob('*/10 * * * *', async () => {
    console.log(`[${new Date().toLocaleTimeString()}] Running Cronjob`)
    const newData = await getData()
    if (
      initialData.confirmed !== newData.confirmed ||
      initialData.recovered !== newData.recovered ||
      initialData.activeCare !== newData.activeCare ||
      initialData.deaths !== newData.deaths
    ) {
      console.log('Data changed at ' + new Date().toLocaleString())
      sendEmbed(newData, initialData)
      initialData = newData
    }
  }, () => {}, true, 'Asia/Jakarta')
  job.start()

  sendEmbed(initialData)
}

async function getData () {
  const data = await axios.get('https://kawalcovid19.harippe.id/api/summary').then(res => res.data)
  const dataObject = {
    confirmed: data.confirmed.value,
    recovered: data.recovered.value,
    activeCare: data.activeCare.value,
    deaths: data.deaths.value,
    lastUpdate: new Date(data.metadata.lastUpdatedAt)
  }
  return dataObject
}

async function sendEmbed (newData, oldData) {
  let dataField = `**Terkonfirmasi**: ${newData.confirmed}`
  dataField += `\n**Dalam Perawatan**: ${newData.activeCare}`
  dataField += `\n**Sembuh**: ${newData.recovered}`
  dataField += `\n**Meninggal**: ${newData.deaths}`

  const embed = new Discord.MessageEmbed()
    .setAuthor('Kawal COVID19 Status Update', 'https://pbs.twimg.com/profile_images/1234313294728482816/MxqOJd7F_400x400.jpg', 'https://kawalcovid19.id')
    .addField('Status Sekarang', dataField, true)
    .setTimestamp(newData.lastUpdate)
    .setFooter('Daily Statistics: https://kcov.id/statistik-harian')

  webhook.send(embed)
}

main()
