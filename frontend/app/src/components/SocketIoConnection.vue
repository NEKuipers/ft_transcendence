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
			connecting: false,
			socket: null as Socket | null,
			isConnected: false,
			connection_error: null as string | null,
		}
	},

	unmounted() {
		this.disconnect();
	},

	methods: {
		connect(options: object, callback: (socket: Socket) => void) {
			this.disconnect();

			fetch("/api/login/jwt/")
				.then((data) => {
					if (data.ok) {
						return data.text()
					} else {
						throw data.text()
					}
				})
				.then((token) => {
					this.connecting = true;

					(options as ManagerOptions & SocketOptions).auth = { token: token };
		
					this.socket = io(this.uri, options);
		
					this.socket.on("connect", () => {
						this.isConnected = true;
						this.connection_error = null;
						this.connecting = false;
					});
					this.socket.on("connect_error", (err) => {
						this.isConnected = false;
						this.connecting = false;
						this.connection_error = err.message;
					});
					this.socket.on("disconnect", () => {
						this.isConnected = false;
					});

					callback(this.socket as Socket);

				})
			.catch((err) => {
				this.connection_error = "Failed to fetch token"
				console.log(err)
			})
			.catch((err) => {
				console.log("err", err)
			});
		},
		disconnect() {
			if (this.socket) {
				this.socket.disconnect();
				this.connecting = false;
				this.socket = null;
			}
		}
	}
})
</script>