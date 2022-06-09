<template>
	<div>
		<p>TODO: Because the connect event is only fired once we actually connect, and we connect as soon as we load the home page, the event is not triggered, thus not setting the isConnected flag, startign on this page works fine though</p>
		<p v-if="isConnected">We're connected to the server!</p>
		<p v-else>Not connected to the server!</p>
		<p>Message from server: "{{socketMessage}}"</p>
		<button @click="pingServer()">Ping Server</button>
	</div>
</template>

<script lang = "ts">
import { io } from "socket.io-client";

export default {
	data() {
		return {
			socket: io(":4113"),
			isConnected: false,
			socketMessage: ''
		}
	},

	mounted() {
		this.socket.on("connect", () => {
			console.log("connect!")
			this.isConnected = true;
		});
		this.socket.on("disconnect", () => {
			console.log("disconnect!")
			this.isConnected = false;
		});
		this.socket.on("customEmit", (data) => {
			console.log("disconnect!")
			this.socketMessage = data;
		});
	},

	unmounted() {
		this.socket.disconnect();
	},

	methods: {
        pingServer: function () {
            this.socket.emit('message', "client data")
        }
    }
}
</script>