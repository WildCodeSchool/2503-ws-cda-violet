FROM node:lts-alpine
WORKDIR /app

COPY src src
COPY public public 
COPY *.json .
COPY codegen.ts .
COPY index.html .
COPY vite.config.ts .

RUN npm i

CMD npm run dev
