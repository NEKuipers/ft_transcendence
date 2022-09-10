FROM node:16-slim

COPY app /app
COPY entrypoint.sh /

WORKDIR /app

EXPOSE 3030
ENTRYPOINT [ "/bin/sh", "/entrypoint.sh" ]