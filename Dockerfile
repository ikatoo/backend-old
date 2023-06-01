FROM node:18-bullseye

ENV PORT=${PORT}
ENV HOST=${HOST}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_DBNAME=${POSTGRES_DBNAME}
ENV POSTGRES_PORT=${POSTGRES_PORT}
ENV POSTGRES_HOSTNAME=${POSTGRES_HOSTNAME}

WORKDIR /backend

RUN \
  apt-get update && \
  apt-get install -y git && \
  git clone https://github.com/ikatoo/backend . && \
  git checkout express && \
  npm install && \
  npm run build

EXPOSE ${PORT}

CMD [ "node", "dist/src/infra/http/express/main.js" ]