<template>
	<div>
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
			console.log("connected to pong server!")
			this.isConnected = true;
		});
		this.socket.on("disconnect", () => {
			console.log("disconnected from pong server!")
			this.isConnected = false;
		});
		this.socket.on("customEmit", (data) => {
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