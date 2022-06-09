import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import * as io from "socket.io-client";
import VueSocketIO from 'vue-3-socket.io';

const app = createApp(App);
app.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:4113',
}));
app.use(router).mount('#app')