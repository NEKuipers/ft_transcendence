
FROM node:lts-alpine
WORKDIR /app

RUN npm i -g @nestjs/cli
COPY ./entrypoint.sh /
ENTRYPOINT [ "/bin/sh", "/entrypoint.sh" ]