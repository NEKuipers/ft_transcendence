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

				let room_id = await this.create_room("test", "public");	// Create a room
				
				let success = await this.send_message(room_id, "hello, this is the first message in the room!")	// Send a message

				if (success) {
					console.log("Message sent!");
				} else {
					console.log("Message failed to be sent!");
				}
			})
			socket.on("disconnect", (reason, description) => {
				console.log(`Disconnected from chat server: ${reason}: ${description}`)
			});

			socket.on("server-message", (channel, user, message) => {	// This will get called whenever the server emits a message on channel "server-message"
				console.log(`Received message in channel: ${channel} from ${user}: ${message}`)
			})

			socket.on("join", (channel_id) => {
				console.log(`I am in channel ${channel_id}`)
			})

			socket.on("leave", (channel_id) => {
				console.log(`I am no longer in channel ${channel_id}`)
			})
		})
	},

	methods: {
		async create_room(name: string, type: string): Promise<number> {
			return new Promise((resolve, reject) => {
				if (this.socket) {
					this.socket.emit("create_room", name, type, (success: boolean, result: any) => {
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
		async send_message(room_id: number, message: string): Promise<boolean> {
			return new Promise((resolve, reject) => {
				if (this.socket) {
					this.socket.emit("client-message", room_id, message, (success: boolean) => {
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