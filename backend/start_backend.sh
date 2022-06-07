#this should be turned into an entrypoint for a dockerfile, listening on port 3000 later
cd app
npm install -g @nestjs/cli
npm install --force # without the force flag, this creates a bunch of dependency errors. figure out why
npm run start:dev