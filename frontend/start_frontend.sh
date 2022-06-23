# This needs to be converted into an entrypoint for a Dockerfile later on, to listen on port 8080 (or wherever)
cd app
npm install -g @vue/cli
npm install pinia
npm install
npm run serve 