FROM node:lts-alpine
WORKDIR /app
RUN apk --no-cache add curl
COPY src src
COPY *.json .
RUN npm i

CMD npm run start
