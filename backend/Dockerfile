
FROM node:lts-alpine
WORKDIR /app
RUN npm i -g @nestjs/cli 
RUN npm i -g @nestjs/axios
COPY ./entrypoint.sh /
EXPOSE 3030
ENTRYPOINT [ "/bin/sh", "/entrypoint.sh" ]