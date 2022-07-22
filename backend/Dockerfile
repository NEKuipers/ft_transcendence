
FROM node:lts-alpine
WORKDIR /app
RUN npm i -g @nestjs/cli 
COPY ./entrypoint.sh /
EXPOSE 3030
ENTRYPOINT [ "/bin/sh", "/entrypoint.sh" ]