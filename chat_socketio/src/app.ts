import { createServer } from "http";
import { Server, Socket } from "socket.io";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as backend from './backend_interface';
import * as bcrypt from 'bcrypt'

// Naming:
//	Rooms are SOCKETIO rooms
//	Channels are chat channels

const SECRET_AUTH = process.env.JSON_WEB_TOKEN_SECRET;

if (!SECRET_AUTH) {
	throw "Missing JSON_WEB_TOKEN_SECRET env token!"
}

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

let signedInUsers: {[key: number]: Socket} = {}

io.use((socket, next) => {
	let data = jwt.verify(socket.handshake.auth.token, SECRET_AUTH) as JwtPayload;
	if (data === undefined) {
		const err = new Error("Bad auth token!");
		err.stack = undefined;
		next(err);
		return;
	}

	if (typeof(data.userid) !== typeof(0) || typeof(data.username) !== typeof("")) {
		const err = new Error("Auth token valid, but contains bad data!");
		err.stack = undefined;
		next(err);
		return;
	}

	socket.data.userid = data.userid,
	socket.data.username = data.username;

	socket.data.joined_channels = [];

	next();
})

function get_room_name(channel_id: number): string {
	return `room_${channel_id}`
}

async function send_messages_to_socket(socket: Socket, channel_id: number) {
	let channel = await backend.get_channel(channel_id);

	socket.emit("join", channel_id, channel.name, channel.type, channel.owner_id);

	let data = socket.data as SocketData;
	let status = data.joined_channels.find((elem) => elem.channel_id == channel_id);
	if (status) {
		socket.emit("mute_status", channel_id, status.muted_until);
		socket.emit("admin_status", channel_id, status.is_admin);
	} else {
		console.error(`${data.username} is receiving messages from ${channel_id}, BUT WASN'T JOINED!`);
	}

	backend.get_messages_from_channel(channel_id)
		.then((messages) => {
			for (let message of messages) {
				socket.emit("server_message", channel_id, message.userId, message.message)
			}
		});
	socket.join(get_room_name(channel_id));
}

async function join_channel(socket: Socket, channel: backend.JoinedChannelStatus) {
	let data = socket.data as SocketData;

	await backend.join_channel(channel, data.userid)
		.then(() => {
			console.log(`${data.username} is joining channel ${channel.channel_id}!`);

			data.joined_channels.push(channel);
			
			send_messages_to_socket(socket, channel.channel_id)
		})
}
async function leave_channel(socket: Socket, channel_status: backend.JoinedChannelStatus) {
	let data = socket.data as SocketData;

	await backend.leave_channel(channel_status.channel_id, data.userid)
		.then(() => {
			console.log(`${data.username} is leaving channel ${channel_status.channel_id}!`);
			
			socket.leave(get_room_name(channel_status.channel_id));
			socket.emit("leave", channel_status.channel_id);

			data.joined_channels = data.joined_channels.filter((elem) => elem.channel_id != channel_status.channel_id);
		})
}
async function ban_user(user_id: number, channel_id: number) {
	await backend.ban_user_from_channel(channel_id, user_id)
		.then(() => {
			console.log(`user ${user_id} is banned from channel ${channel_id}!`);

			let socket = signedInUsers[user_id];
			if (socket) {
				let data = socket.data as SocketData;

				let status = data.joined_channels.find((elem) => elem.channel_id == channel_id);
				if (!status || status.is_banned) {
					console.error(`${data.username} was banned from channel ${channel_id}, BUT WASN'T JOINED!`);
					return;
				}
				status.is_banned = true;
				status.is_joined = false;

				socket.leave(get_room_name(channel_id));
				socket.emit("leave", channel_id);
			}
		})
}
async function unban_user(user_id: number, channel_id: number) {
	await backend.unban_user_from_channel(channel_id, user_id)
		.then(() => {
			console.log(`user ${user_id} is un-banned from channel ${channel_id}!`);
			
			let socket = signedInUsers[user_id];
			if (socket) {
				let data = socket.data as SocketData;

				let status = data.joined_channels.find((elem) => elem.channel_id == channel_id);
				if (!status || !status.is_banned) {
					console.error(`${data.username} was un-banned from channel ${channel_id}, BUT WASN'T BANNED!`);
					return;
				}

				status.is_banned = false;
				send_messages_to_socket(socket, channel_id)
			}
		})
}

async function mute_user(user_id: number, channel_id: number) {
	await backend.mute_user_in_channel(channel_id, user_id)
		.then((date) => {
			console.log(`user ${user_id} is muted in channel ${channel_id}!`);

			let socket = signedInUsers[user_id];
			if (socket) {
				let data = socket.data as SocketData;

				let status = data.joined_channels.find((elem) => elem.channel_id == channel_id);
				if (!status || status.muted_until > new Date()) {
					console.error(`${data.username} was muted in channel ${channel_id}, BUT WASN'T JOINED!`);
					return;
				}
				
				status.muted_until = date;
				socket.emit("mute_status", channel_id, status.muted_until);
			}
		})
}
async function unmute_user(user_id: number, channel_id: number) {
	await backend.unmute_user_in_channel(channel_id, user_id)
		.then(() => {
			console.log(`user ${user_id} is un-muted in channel ${channel_id}!`);
			
			let socket = signedInUsers[user_id];
			if (socket) {
				let data = socket.data as SocketData;

				let status = data.joined_channels.find((elem) => elem.channel_id == channel_id);
				if (!status || status.muted_until < new Date()) {
					console.error(`${data.username} was un-muted in channel ${channel_id}, BUT WASN'T MUTED!`);
					return;
				}

				status.muted_until = null;
				socket.emit("mute_status", channel_id, status.muted_until);
			}
		})
}

async function make_user_admin(user_id: number, channel_id: number) {
	await backend.make_user_admin_in_channel(channel_id, user_id)
		.then(() => {
			console.log(`user ${user_id} made admin of channel ${channel_id}!`);

			let socket = signedInUsers[user_id];
			if (socket) {
				let data = socket.data as SocketData;

				let status = data.joined_channels.find((elem) => elem.channel_id == channel_id);
				if (!status || status.is_admin) {
					console.error(`${data.username} was made admin of channel ${channel_id}, BUT WASN'T JOINED!`);
					return;
				}

				status.is_admin = true;
				socket.emit("admin_status", channel_id, status.is_admin);
			}
		})
}

async function remove_user_admin(user_id: number, channel_id: number) {
	await backend.remove_user_admin_in_channel(channel_id, user_id)
		.then(() => {
			console.log(`user ${user_id} is no longer admin of channel ${channel_id}!`);
			
			let socket = signedInUsers[user_id];
			if (socket) {
				let data = socket.data as SocketData;

				let status = data.joined_channels.find((elem) => elem.channel_id == channel_id);
				if (!status || !status.is_admin) {
					console.error(`Tried to remove admin rights of ${data.username} in channel ${channel_id}, BUT WASN'T ADMIN!`);
					return;
				}

				status.is_admin = false;
				socket.emit("admin_status", channel_id, status.is_admin);
			}
		})
}

// Joins all the socketio-rooms this socket should be in
async function join_rooms(socket: Socket) {
	let data = socket.data as SocketData;

	let joined_channels = data.joined_channels
	let actual_joined_channels = await backend.get_joined_channels(data.userid);
	// console.log(actual_joined_channels);

	// Join new rooms
	for (let channel_status of actual_joined_channels) {
		joined_channels.push(channel_status);

		if (!channel_status.is_joined) {
			continue;
		}

		send_messages_to_socket(socket, channel_status.channel_id)
	}
}

io.on("connection", async (socket) => {
	let data = socket.data as SocketData;
	signedInUsers[data.userid] = socket;

	console.log(`User ${data.username} connected!`);

	await join_rooms(socket)
		.catch((err) => console.error(`Failed to update joined rooms for user: ${data.userid} because:`, err));

	socket.on("create_channel", async (name: string, password: string, callback: (success: boolean, data: any) => void) => {
		let type: string;
		let hash: string
		if (password) {
			type = "protected"
			// hash the password.
			hash = await bcrypt.hash(password, 10)
			console.log('hashed password is', hash)
		}
		else {
			hash = ""
			type = "public"
		}
		
			
		backend.make_channel({
			name: name,
			type: type,
			password: hash,
			owner_id: data.userid,
			is_closed: false
		}).then((channel) => {
			console.log("Created channel:", channel)

			// Also join it
			join_channel(socket, {
				is_admin: true,
				muted_until: null,
				is_banned: false,
				channel_id: channel.id,
				is_joined: true,
			}).then(() => {
				callback(true, channel.id);
			}).catch((err) => {
				console.error("Failed to join channel", err)
				callback(false, "Failed to join channel")

				// Try to delete it
				backend.delete_channel(channel.id)
					.catch((err) => {
						console.error("Created a channel, failed to join, and then failed to delete:", err);
					});
			})

		}).catch((err) => {
			console.error(err);
			callback(false, "Failed to create channel");
		})
	});

	socket.on("join_channel", (channel_id: number, password: string | undefined | null, callback: (success: boolean, reason: any) => void) => {
		console.log(password);
		
		let status = data.joined_channels.find((elem) => elem.channel_id == channel_id);
		if (status) {
			if (status.is_banned) {
				console.log(`User ${data.username} tried to join channel ${channel_id} but was banned!`);
				return callback(false, "You are banned!");
			} else {
				return callback(false, "Already joined!");
			}
		}
		
		backend.get_channel(channel_id)
			.then((channel) => {
				if (channel.is_closed) {
					return null;
				}
				return backend.matches_password(channel_id, password);
			})
			.then((allowedToJoin) => {
				if (allowedToJoin === null) {
					return callback(false, "Channel is closed!");;
				}
				if (!allowedToJoin) {
					return callback(false, "NEED_PASSWORD");
				}
				
				let use_status = status ?? {
					is_admin: false,
					muted_until: null,
					is_banned: false,
					channel_id: channel_id,
					is_joined: true,
				};
				use_status.is_joined = true;

				join_channel(socket, use_status)
					.then(_ => callback(true, null))
					.catch(err => callback(false, err))
			})
			.catch((err) => {
				callback(false, err)
			})
	})

	socket.on("leave_channel", (channel_id: number, callback: (success: boolean, reason: any) => void) => {
		let status = data.joined_channels.find((elem) => elem.channel_id == channel_id);
		if (!status || !status.is_joined) {
			console.log(`User ${data.username} tried to leave channel ${channel_id}, but is not in the channel!`);
			return callback(false, "You are not in the channel!");
		}

		leave_channel(socket, status)
			.then(_ => callback(true, null))
			.catch(err => callback(false, err))
	})

	socket.on("ban_user", (channel_id: number, user_id: number, callback: (success: boolean, reason: any) => void) => {
		let status = data.joined_channels.find((elem) => elem.channel_id == channel_id);
		if (!status || !status.is_joined) {
			return callback(false, "You are not in that channel!");
		}
		if (!status.is_admin) {
			return callback(false, "You are not admin!");
		}

		ban_user(user_id, channel_id)
			.then(_ => callback(true, null))
			.catch(err => callback(false, err))
	})

	socket.on("unban_user", (channel_id: number, user_id: number, callback: (success: boolean, reason: any) => void) => {
		let status = data.joined_channels.find((elem) => elem.channel_id == channel_id);
		if (!status || !status.is_joined) {
			callback(false, "You are not in that channel!");
			return;
		}
		if (!status.is_admin) {
			return callback(false, "You are not admin!");
		}

		unban_user(user_id, channel_id)
			.then(_ => callback(true, null))
			.catch(err => callback(false, err))
	})

	socket.on("mute_user", (channel_id: number, user_id: number, callback: (success: boolean, reason: any) => void) => {
		let status = data.joined_channels.find((elem) => elem.channel_id == channel_id);
		if (!status || !status.is_joined) {
			return callback(false, "You are not in that channel!");
		}
		if (!status.is_admin) {
			return callback(false, "You are not admin!");
		}
		
		mute_user(user_id, channel_id)
			.then(_ => callback(true, null))
			.catch(err => callback(false, err))
	})

	socket.on("unmute_user", (channel_id: number, user_id: number, callback: (success: boolean, reason: any) => void) => {
		let status = data.joined_channels.find((elem) => elem.channel_id == channel_id);
		if (!status || !status.is_joined) {
			return callback(false, "You are not in that channel!");
		}
		if (status.is_banned) {
			console.log(`User ${data.username} tried to unmute someone in channel ${channel_id} but was banned!`);
			return callback(false, "You are banned!");
		} else if (!status.is_admin) {
			return callback(false, "You are not admin!");
		}

		unmute_user(user_id, channel_id)
			.then(_ => callback(true, null))
			.catch(err => callback(false, err))
	})

	socket.on("make_user_admin", (channel_id: number, user_id: number, callback: (success: boolean, reason: any) => void) => {
		backend.get_channel(channel_id).then(
			(channel) => {
				if (channel.owner_id != data.userid) {
					return callback(false, "You are not the owner of that channel!");
				}
		
				make_user_admin(user_id, channel_id)
					.then(_ => callback(true, null))
					.catch(err => callback(false, err))
			}
		).catch(err => callback(false, err));
	})

	socket.on("remove_user_admin", (channel_id: number, user_id: number, callback: (success: boolean, reason: any) => void) => {
		backend.get_channel(channel_id).then(
			(channel) => {
				if (channel.owner_id != data.userid) {
					return callback(false, "You are not the owner of that channel!");
				}
		
				remove_user_admin(user_id, channel_id)
					.then(_ => callback(true, null))
					.catch(err => callback(false, err))
			}
		).catch(err => callback(false, err));
	})

	socket.on("client_message", (channel_id: number, message: string, callback: (success: boolean, reason: any) => void) => {	// This function will get called whenever this client emits a message on channel "client-message"
		let status = data.joined_channels.find((elem) => elem.channel_id == channel_id);
		if (!status || !status.is_joined) {
			console.error(`User ${data.username} tried to send the message: ${message} in channel ${channel_id}, but was not in the channel!`);
			callback(false, "You are not in that channel!");
			return;
		}
		if (status.muted_until > new Date()) {
			console.error(`User ${data.username} tried to send the message: ${message} in channel ${channel_id}, but was muted!`);
			callback(false, "You are muted!");
			return false;
		}
		
		
		io.to(get_room_name(channel_id)).emit("server_message", channel_id, data.userid, message);	// Send all the clients in the room a message on channel "server_message"
		console.log(`User ${data.username} has sent the message: ${message} in room ${channel_id}!`);

		backend.add_message_to_channel(channel_id, data.userid, message)
			.then(() => {
				callback(true, null);	// Message is sent successfully once it has been added to the database
			})
	})

	socket.on("create_dm", async (user_id: number, callback: (success: boolean, data: any) => void) => {
		// TODO: Validate that the 2 users are actually friends

		backend.make_channel({
			name: `dm-${Math.min(user_id, data.userid)}-${Math.max(user_id, data.userid)}`,
			type: "direct",
			password: "",
			owner_id: data.userid,
			is_closed: false
		}).then((channel) => {
			console.log("Created dm channel:", channel)

			// Also join it
			let my_join = join_channel(socket, {
				is_admin: false,
				muted_until: null,
				is_banned: false,
				channel_id: channel.id,
				is_joined: true,
			});
			let other_join: Promise<void>;
			if (signedInUsers[user_id]) {
				other_join = join_channel(signedInUsers[user_id], {
					is_admin: false,
					muted_until: null,
					is_banned: false,
					channel_id: channel.id,
					is_joined: true,
				});
			} else {
				other_join = backend.join_channel({
					is_admin: false,
					muted_until: null,
					is_banned: false,
					channel_id: channel.id,
					is_joined: true,
				}, user_id);
			}

			Promise.all([my_join, other_join])
				.then(() => {
					callback(true, channel.id);
				}).catch(() => {
					console.error("Failed to join channel")
					callback(false, "Failed to join channel")

					// Try to delete it
					backend.delete_channel(channel.id)
						.catch((err) => {
							console.error("Created a channel, failed to join, and then failed to delete:", err);
						});
				})
		}).catch((err) => {
			console.error(err);
			callback(false, "Failed to create channel");
		})
	});

	socket.on("disconnect", () => {
		console.log(`User ${data.username} has disconnected!`);
		delete signedInUsers[data.userid];
	})
});

const port = 4114;
httpServer.listen(port, () => {
	console.log("Chat-SocketIO server running on port,", port, "!")
});