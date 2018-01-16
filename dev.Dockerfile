FROM node:9-alpine

RUN mkdir -p /opt app

WORKDIR /opt/app
ADD dist /opt/app
ADD server/server.js /opt/app
ADD server/package.json /opt/app
RUN npm i

EXPOSE 80
CMD ["node", "server.js"]