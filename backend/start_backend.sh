#this should be turned into an entrypoint for a dockerfile, listening on port 3000 later
cd app
npm install -g @nestjs/cli
npm install --legacy-peer-deps
npm run prebuild
npm run start:dev