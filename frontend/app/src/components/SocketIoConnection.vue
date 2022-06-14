<template>
	<div>
		<p v-if="isConnected">Connected to {{server_name}}</p>
		<p v-else>Disconnected from {{server_name}}!</p>
	</div>
</template>

<script lang = "ts">
import { io } from "socket.io-client";
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		uri: {
			type: String,
			required: true
		},
		server_name: {
			type: String,
			default: "server"
		},
	},

	data() {
		return {
			socket: io(this.uri),
			isConnected: false,
		}
	},

	created() {
		this.socket.on("connect", () => {
			this.isConnected = true;
		});
		this.socket.on("disconnect", () => {
			this.isConnected = false;
		});
	},

	unmounted() {
		this.socket.disconnect();
	},
})
</script>