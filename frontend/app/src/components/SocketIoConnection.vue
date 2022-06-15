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
		options: {
			type: Object,
			default() {
				return {};	// Tbh i have NO CLUE how to set this as a property
				//return {query:"yeets=hi", auth:{ token: "hii"} };
			}
		},
		server_name: {
			type: String,
			default: "server"
		},
	},

	data() {
		return {
			socket: io(this.uri as unknown as string, this.options as unknown as object),
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