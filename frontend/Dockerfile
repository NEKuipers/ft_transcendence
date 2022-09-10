FROM node:16-slim
WORKDIR /app
RUN chown -R node:node /root
COPY ./entrypoint.sh /
EXPOSE 8080
ENTRYPOINT [ "/bin/sh", "/entrypoint.sh" ]