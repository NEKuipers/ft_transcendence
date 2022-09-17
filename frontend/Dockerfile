FROM node:16-slim

COPY app /app

WORKDIR /app

# installation
RUN npm install

EXPOSE 8080

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/bin/bash", "/entrypoint.sh" ]