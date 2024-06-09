FROM node:latest
WORKDIR /frontend

COPY /React/.eslintrc.cjs .
COPY /React/index.html .
COPY /React/package.json .
COPY /React/vite.config.ts .
COPY /React/tsconfig.json .
COPY /React/tsconfig.node.json .

RUN npm install

CMD ["npm", "run", "dev"]