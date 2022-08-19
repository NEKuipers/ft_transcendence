import { createServer } from "http";
import { Server, Socket } from "socket.io";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as backend from './backend_interface';

const SECRET_AUTH = process.env.JSON_WEB_TOKEN_SECRET;

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "*",
		credentials: true
	},
	allowEIO3: true
});

interface SocketData {
	userid: number;
	username: string;

	joined_channels: backend.JoinedChannelStatus[]
}

io.use((socket, next) => {
	let data = jwt.verify(socket.handshake.auth.token, SECRET_AUTH) as JwtPayload;
	if (data === undefined) {
		const err = new Error("Bad auth token!");
		err.stack = null;
		next(err);
		return;
	}

	if (typeof(data.userid) !== typeof(0) || typeof(data.username) !== typeof("")) {
		const err = new Error("Auth token valid, but contains bad data!");
		err.stack = null;
		next(err);
		return;
	}

	socket.data.userid = data.userid,
	socket.data.username = data.username;

	socket.data.joined_channels = [];

	next();
})

function get_channel_name(channel_id: number): string {
	return `room_${channel_id}`
}

async function join_rooms(socket: Socket) {
	let data = socket.data as SocketData;

	let joined_channels = data.joined_channels
	let actual_joined_channels = await backend.get_joined_channels(data.userid);

	// Join new rooms
	for (let channel_status of actual_joined_channels) {
		joined_channels.push(channel_status);

		if (channel_status.is_banned) {
			continue;
		}

		socket.emit("join", channel_status.channel_id);
		socket.join(get_channel_name(channel_status.channel_id));
		backend.get_messages_from_channel(channel_status.channel_id)
			.then((messages) => {
				for (let message of messages) {
					socket.emit("server-message", channel_status.channel_id, `User${message.userId}`, message.message)
				}
			});
	}
}

async function join_channel(socket: Socket, channel: backend.JoinedChannelStatus) {
	let data = socket.data as SocketData;

	await backend.join_channel(channel, data.userid)
		.then(() => {
			console.log(`${data.username} is joining channel ${channel.channel_id}!`);

			data.joined_channels.push(channel);
			socket.join(get_channel_name(channel.channel_id));
	
			io.to(get_channel_name(channel.channel_id)).emit("server-message", channel.channel_id, "Server", `${data.username} has joined the room`);
		})
		.catch((err) => console.error(`Failed to join room ${channel.channel_id} for user: ${data.userid} because:`, err))
}

io.on("connection", async (socket) => {
	let data = socket.data as SocketData;

	console.log(`User ${data.username} connected!`);

	await join_rooms(socket)
		.catch((err) => console.error(`Failed to update joined rooms for user: ${data.userid} because:`, err));

	socket.on("create_room", (name: string, type: string, callback: (success: boolean, data: any) => void) => {
		backend.make_channel({
			name: name,
			type: type,
			owner_id: data.userid,
			is_closed: false
		}).then((channel) => {
			console.log("Created channel:", channel)

			// Also join it
			join_channel(socket, {
				is_admin: true,
				is_muted: false,
				is_banned: false,
				channel_id: channel.id
			}).then(() => {
				callback(true, channel.id);
			}).catch(() => {
				console.error("Failed to join room")
				callback(false, "Failed to join room")

				// Try to delete it
				backend.delete_channel(channel.id)
					.catch((err) => {
						console.error("Created a room, failed to join, and then failed to delete:", err);
					});
			})

		}).catch((err) => {
			console.error(err);
			callback(false, "Failed to create room");
		})
	});

	socket.on("join_room", (channel_id: number) => {
		if (data.joined_channels.find((elem) => elem.channel_id == channel_id)) {
			console.log(`User ${data.username} tried to join room ${channel_id} but was already joined (or banned)!`);
			return;
		}

		join_channel(socket, {
			is_admin: false,
			is_muted: false,
			is_banned: false,
			channel_id: channel_id
		})
	})

	socket.on("client-message", (channel_id: number, message: string, callback: (success: boolean) => void) => {	// This function will get called whenever this client emits a message on channel "client-message"
		if (!data.joined_channels.find((elem) => elem.channel_id == channel_id)) {
			console.log(`User ${data.username} tried to send the message: ${message} in channel ${channel_id}, but was not in the room!`);
			callback(false);
			return;
		}
		
		socket.to(get_channel_name(channel_id)).emit("server-message", channel_id, data.username, message);	// Send all the other clients in the room a message on channel "server-message" with the first argument being the sender username, and the second argument their message
		console.log(`User ${data.username} has send the message: ${message} in room ${channel_id}!`);

		backend.add_message_to_channel(channel_id, data.userid, message)
			.then(() => {
				callback(true);	// Message is sent successfully once it has been added to the database
			})
	})

	socket.on("disconnect", () => {
		console.log(`User ${data.username} has disconnected!`);
	})
});

const port = 4114;
httpServer.listen(port, () => {
	console.log("Chat-SocketIO server running on port,", port, "!")
});