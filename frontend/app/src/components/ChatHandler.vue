<template>
	<div>
		<SocketIoConnection ref="connection" :uri="uri" :server_name="server_name"/>
	</div>
</template>

<script lang = "ts">
import { io, Socket, ManagerOptions, SocketOptions } from "socket.io-client";
import { defineComponent } from 'vue'
import SocketIoConnection from '../components/SocketIoConnection.vue';

interface JoinedChannelStatus {
	is_admin: boolean;
	is_muted: boolean;
	is_banned: boolean;

	channel_id: number;
}

export {
	JoinedChannelStatus
};

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

	emits: {
		"serverMessage": (_channel_id: number, _user: number, _message: string) => { return true },
		"leave": (_channel_id: number) => { return true},
		"join": (_channel_id: number, _channel_name: string) => { return true },
		"clearData": () => { return true },
	},

	components: {
		SocketIoConnection
	},

	data() {
		return {
			socket: null as Socket | null,
		}
	},

	mounted() {
		let connection = (this.$refs.connection as typeof SocketIoConnection);
		connection.connect({}, (socket: Socket) => {
			this.socket = socket;

			socket.on("connect", async () => {
				console.log("Connected to Chat server!");

				this.$emit("clearData");
			})
			
			socket.on("disconnect", (reason, description) => {
				console.log(`Disconnected from chat server: ${reason}: ${description}`)
			});

			socket.on("server-message", (channel_id, user, message) => {	// This will get called whenever the server emits a message on channel "server-message"
				// console.log(`Received message in channel: ${channel_id} from ${user}: ${message}`)

				this.$emit("serverMessage", channel_id, user, message);
			})

			socket.on("join", (channel_id, channel_name) => {
				// console.log(`I am in channel ${channel_id}`)

				this.$emit("join", channel_id, channel_name);
			})

			socket.on("leave", (channel_id) => {
				// console.log(`I am no longer in channel ${channel_id}`)

				this.$emit("leave", channel_id);
			})
		})
	},

	methods: {
		async join_channel(channel_id: number, password: string | undefined | null): Promise<boolean> {
			return new Promise((resolve, reject) => {
				if (this.socket) {
					this.socket.emit("join_channel", channel_id, password,
					(success: boolean, result: any) => {
						if (success) {
							resolve(true);
						} else {
							reject(result);
						}
					});
				} else {
					reject("Not connected!");
				}
			})
		},

		async ban_user(channel_id: number, user_id: number): Promise<boolean> {
			return new Promise((resolve, reject) => {
				if (this.socket) {
					this.socket.emit("ban_user", channel_id, user_id,
					(success: boolean, result: any) => {
						if (success) {
							resolve(true);
						} else {
							reject(result);
						}
					});
				} else {
					reject("Not connected!");
				}
			})
		},

		async unban_user(channel_id: number, user_id: number): Promise<boolean> {
			return new Promise((resolve, reject) => {
				if (this.socket) {
					this.socket.emit("unban_user", channel_id, user_id,
					(success: boolean, result: any) => {
						if (success) {
							resolve(true);
						} else {
							reject(result);
						}
					});
				} else {
					reject("Not connected!");
				}
			})
		},

		async leave_channel(channel_id: number): Promise<boolean> {
			return new Promise((resolve, reject) => {
				if (this.socket) {
					this.socket.emit("leave_channel", channel_id, (success: boolean, result: any) => {
						if (success) {
							resolve(true);
						} else {
							reject(result);
						}
					});
				} else {
					reject("Not connected!");
				}
			})
		},

		async create_channel(name: string, type: string): Promise<number> {
			return new Promise((resolve, reject) => {
				if (this.socket) {
					this.socket.emit("create_channel", name, type, (success: boolean, result: any) => {
						if (success) {
							resolve(result as number);
						} else {
							reject(result);
						}
					});
				} else {
					reject("Not connected!");
				}
			})
		},

		async send_message(channel_id: number, message: string): Promise<boolean> {
			return new Promise((resolve, reject) => {
				if (this.socket) {
					this.socket.emit("client-message", channel_id, message, (success: boolean) => {
						if (success) {
							resolve(true);
						} else {
							resolve(false);
						}
					});
				} else {
					reject("Not connected!");
				}
			})
		},
	}
})
</script>