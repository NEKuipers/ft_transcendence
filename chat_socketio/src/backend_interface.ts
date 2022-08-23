import axios from 'axios';

const DATABASE_PORT = +process.env.PGREST_PORT;

interface JoinedChannelStatus {
	is_admin: boolean;
	is_muted: boolean;
	is_banned: boolean;

	channel_id: number;
}

interface CreateChannel {
	name: string,
	type: string,
	owner_id: number,
	is_closed: boolean,
}

interface Channel {
	id: number,
	name: string,
	type: string,
	owner_id: number,
	is_closed: boolean,
};

interface Message {
	userId: number,
	message: string,
};

let cached_names = {}
async function get_channel_name(channel_id: number): Promise<String> {
	let cached = cached_names[channel_id];
	if (cached) {
		return cached;
	}

	let data = await axios.get(`http://localhost:${DATABASE_PORT}/channels?id=eq.${channel_id}`);
	let name = data.data[0].name;
	cached_names[channel_id] = name;
	return name;
}

async function make_channel(channel: CreateChannel): Promise<Channel> {
	let data = await axios.post(`http://localhost:${DATABASE_PORT}/channels`, channel, {
		headers: {
			"Prefer": "return=representation",
		}
	});

	let result_channel = data.data[0];
	cached_names[result_channel.id] = result_channel.name;
	return result_channel;
}
async function delete_channel(channelId: number) {
	throw "TODO: deleting channels is not yet implemented";
}

async function join_channel(channel: JoinedChannelStatus, userId: number) {
	// TODO: Error checking
	await axios.post(`http://localhost:${DATABASE_PORT}/participants`, {
		participant_id: userId,
		is_admin: channel.is_admin,
		is_muted: channel.is_muted,
		is_banned: channel.is_banned,
		channel_id: channel.channel_id,
	});
}
async function leave_channel(channelId: number, userId: number) {
	// TODO: Error checking
	await axios.delete(`http://localhost:${DATABASE_PORT}/participants?channel_id=eq.${channelId}&participant_id=eq.${userId}`);
}

async function ban_user_from_room(channelId: number, userId: number) {
	await axios.patch(`http://localhost:${DATABASE_PORT}/participants?channel_id=eq.${channelId}&participant_id=eq.${userId}`, {
		is_banned: true,
	});
}
async function unban_user_from_room(channelId: number, userId: number) {
	await axios.patch(`http://localhost:${DATABASE_PORT}/participants?channel_id=eq.${channelId}&participant_id=eq.${userId}`, {
		is_banned: false,
	});
}

async function get_messages_from_channel(channelId: number): Promise<Message[]> {	// userId, message
	let data = await axios.get(`http://localhost:${DATABASE_PORT}/messages?channel_id=eq.${channelId}`);

	let ret = new Array();
	for (let elem of data.data) {
		ret.push({
			userId: elem.user_id,
			message: elem.message
		});
	}

	return ret;
}
async function add_message_to_channel(channelId: number, userId: number, message: string) {
	await axios.post(`http://localhost:${DATABASE_PORT}/messages`, {
		channel_id: channelId,
		user_id: userId,
		message: message
	});
}

async function get_joined_channels(userId: number): Promise<JoinedChannelStatus[]> {
	let data = await axios.get(`http://localhost:${DATABASE_PORT}/participants?participant_id=eq.${userId}`);
	// TODO: Error checking
	
	return data.data;
}

export {
	JoinedChannelStatus,

	make_channel,
	delete_channel,

	get_channel_name,

	join_channel,
	leave_channel,

	ban_user_from_room,
	unban_user_from_room,

	get_messages_from_channel,
	add_message_to_channel,

	get_joined_channels,
}