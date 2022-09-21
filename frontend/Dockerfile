FROM debian:buster

RUN apt-get -qq update \
    && apt-get -qq upgrade -y

RUN apt-get -qq -y install nginx
RUN apt-get -qq -y install openssl

# is this required?
RUN apt-get -qq -y install php7.3 php-mysql php-fpm php-pdo php-gd php-cli php-mbstring

# create a new openssl key
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -subj '/C=NL/ST=NH/L=Amsterdam/O=42/CN=jsimonis' -keyout /etc/ssl/nginx-selfsigned.key -out /etc/ssl/nginx-selfsigned.crt

RUN apt-get install -y curl \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs


COPY app /app

RUN cd /app && npm install && npm run build

COPY nginx-default /etc/nginx/sites-enabled/default
# COPY entrypoint.sh /usr/local/bin/
# ENTRYPOINT [ "entrypoint.sh" ]

CMD [ "nginx", "-g", "daemon off;"]

EXPOSE 8080