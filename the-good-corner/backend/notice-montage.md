- partir d'une machine Linux
  FROM node:lts-alpine
- recuperer le code (depuis où ?)
  COPY src src
- initialiser les variables d'environnement
  **TODO**
- recupère la config
  COPY \*.json .
- installer npm (+node)
  **DONE**
- `npm i`
  RUN npm i
- `npm run start`
  RUN npm run start

- lui donner un nom
  **option "-t" dans la comande de build**
