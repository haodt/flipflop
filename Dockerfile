FROM node:6-alpine

RUN mkdir -p /app
WORKDIR /app

CMD ["yarn", "start"]
