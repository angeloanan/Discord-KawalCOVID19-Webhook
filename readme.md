# KawalCOVID19 Webhook for Discord

A Discord webhook for updating Indonesia's COVID19 status.

The data will be updated every 10 minutes. Webhook will be sent every time there's a change in data.

## Deploying

**TL;DR**

```sh
docker run -e "WEBHOOK_ID=<YOUR WEBHOOK ID>" -e "WEBHOOK_TOKEN=<YOUR WEBHOOK TOKEN>" angeloanan/discord-kawalcovid19-webhook
```

You will need to create a webhook link on a Discord Channel.
Your link should be in this format: `https://discordapp.com/api/webhooks/<WEBHOOK_ID>/<WEBHOOK_TOKEN>`

You will need to supply your Webhook ID and Webhook Token as an environment variable

```txt
WEBHOOK_ID = <your webhook id>
WEBHOOK_TOKEN = <your webhook token>
```

## Data Source

The data that is updated in the webhook is taken from [KawalCOVID19](https://kawalcovid19.id/)'s API.
