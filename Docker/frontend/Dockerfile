FROM node:latest
WORKDIR /frontend

COPY /React/package.json .
RUN npm install

COPY /React/src /frontend/src/
COPY /React/public /frontend/public/

CMD ["npm", "start"]