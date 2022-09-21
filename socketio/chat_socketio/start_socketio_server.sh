npm install
export $(cat ../../.env | xargs)
npx tsc && node dist/app.js