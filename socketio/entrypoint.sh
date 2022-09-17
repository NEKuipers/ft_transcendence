#!/bin/sh

# entrypoint command
exec supervisord -c /etc/supervisord.conf
