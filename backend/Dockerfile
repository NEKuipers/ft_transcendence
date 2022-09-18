FROM node:16.15.1-alpine

COPY app /app

WORKDIR /app

# installation
RUN npm install --legacy-peer-deps \
    && npx tsc

EXPOSE 3030

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/bin/bash", "/entrypoint.sh" ]