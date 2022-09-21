#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd $SCRIPT_DIR/app && npm install && npm run serve	# dev, works, but has a websocket trying to connect to localhost:8080/ws for hot-reloading - this does NOT exist on other macs!
#cd $SCRIPT_DIR/app && npm install && npm run build && serve -s dist -l $VUE_PORT	# serve command not found, but does not have a websocket error in console but does not have a rule for /api going to nestjs
