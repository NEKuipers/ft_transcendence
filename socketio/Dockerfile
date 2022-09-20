FROM node:16-slim

RUN apt-get update -y \
    && apt-get install -y supervisor

# overwrite default supervisord.conf
ADD supervisord.conf /etc/supervisord.conf

# Environment variables needed
# - JSON_WEB_TOKEN_SECRET
# - PGREST_PORT
# - PGREST_HOST

COPY pong_socketio /app/pong_socketio
COPY chat_socketio /app/chat_socketio

WORKDIR /app

# installation
RUN cd pong_socketio \
    && npm install \
    && npx tsc

RUN cd chat_socketio \
    && npm install \
    && npx tsc

# chat_socketio 4114 and pong_socketio 4113
EXPOSE 4114
EXPOSE 4113

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/bin/sh", "/entrypoint.sh" ]
