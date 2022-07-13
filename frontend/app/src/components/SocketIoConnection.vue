<template>
	<div>
		<p v-if="isConnected">Connected to {{server_name}}</p>
		<p v-else-if="connection_error">Failed to connect to {{server_name}}: "{{connection_error}}"</p>
		<p v-else>Not connected to {{server_name}}!</p>
	</div>
</template>

<script lang = "ts">
import { io, Socket, ManagerOptions, SocketOptions } from "socket.io-client";
import { defineComponent } from 'vue'
import { loginStatusStore } from '../stores/profileData';

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
			socket: null as Socket | null,
			isConnected: false,
			connection_error: null as string | null,
		}
	},

	unmounted() {
		this.disconnect();
	},

	methods: {
		connect(options: object) {
			this.disconnect();
			
			(options as ManagerOptions & SocketOptions).auth = { token: loginStatusStore().loggedInStatus?.authString };

			this.socket = io(this.uri as unknown as string, options);

			this.socket.on("connect", () => {
				this.isConnected = true;
				this.connection_error = null;
			});
			this.socket.on("connect_error", (err) => {
				this.isConnected = false;
				this.connection_error = err.message;
			});
			this.socket.on("disconnect", () => {
				this.isConnected = false;
			});
		},
		disconnect() {
			if (this.socket) {
				this.socket.disconnect();
				this.socket = null;
			}
		}
	}
})
</script>