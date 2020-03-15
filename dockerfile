FROM node:alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

ENV NODE_ENV=production

RUN yarn install

COPY --chown=node:node . .

CMD [ "node", "." ]
