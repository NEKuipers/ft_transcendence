import axios from 'axios';
import * as bcrypt from 'bcrypt'

const DATABASE_PORT = +process.env.PGREST_PORT;

interface JoinedChannelStatus {
	is_admin: boolean;
	muted_until: Date | null;
	is_banned: boolean;
	is_joined: boolean;

	channel_id: number;
}

interface CreateChannel {
	name: string,
	type: string,
	password: string,
	owner_id: number,
	is_closed: boolean,
}

interface Channel {
	id: number,
	name: string,
	type: string,
	owner_id: number | undefined,	// Will be undefined only IF type is direct
	is_closed: boolean,
	password: string,
};

interface Message {
	userId: number,
	message: string,
};

let channels = {}
async function get_channel(channel_id: number): Promise<Channel> {
	let cached = channels[channel_id];
	if (cached) {
		return cached;
	}

	let data = await axios.get(`http://localhost:${DATABASE_PORT}/channels?id=eq.${channel_id}`);
	let channel = data.data[0] as Channel;

	// If you can't do it in the database, DO IT HERE INSTEAD!
	if (channel.type == "direct") {
		channel.owner_id = undefined;
	}

	channels[channel_id] = channel;
	return channels[channel_id];
}

async function make_channel(channel: CreateChannel): Promise<Channel> {
	let data = await axios.post(`http://localhost:${DATABASE_PORT}/channels`, channel, {
		headers: {
			"Prefer": "return=representation",
		}
	});

	let result_channel = data.data[0] as Channel;
	if (result_channel.type == "direct") {
		result_channel.owner_id = undefined;
	}
	channels[result_channel.id] = result_channel;
	return result_channel;
}
async function delete_channel(channelId: number) {
	throw "TODO: deleting channels is not yet implemented";
}

async function join_channel(channel: JoinedChannelStatus, userId: number) {
	// TODO: Error checking
	console.log(`Joining with:`, channel)
	await axios.post(`http://localhost:${DATABASE_PORT}/participants?on_conflict=channel_id,participant_id`, {
		participant_id: userId,
		is_admin: channel.is_admin,
		muted_until: channel.muted_until?.toISOString(),
		is_banned: channel.is_banned,
		channel_id: channel.channel_id,
		is_joined: channel.is_joined,
	}, {
		headers: {
			"Prefer": "resolution=merge-duplicates"
		}
	});
}
async function leave_channel(channelId: number, userId: number) {
	// TODO: Error checking

	let channel = await get_channel(channelId);
	if (channel.owner_id == userId) {
		await axios.patch(`http://localhost:${DATABASE_PORT}/channels?id=eq.${channelId}`, {
			is_closed: true,
		});
		channel.is_closed = true;
	}
	// await axios.delete(`http://localhost:${DATABASE_PORT}/participants?channel_id=eq.${channelId}&participant_id=eq.${userId}`);
	await axios.patch(`http://localhost:${DATABASE_PORT}/participants?channel_id=eq.${channelId}&participant_id=eq.${userId}`, {
		is_joined: false,
	});
}

async function ban_user_from_channel(channelId: number, userId: number) {
	await axios.patch(`http://localhost:${DATABASE_PORT}/participants?channel_id=eq.${channelId}&participant_id=eq.${userId}`, {
		is_banned: true,
		is_joined: false,
	});
}
async function unban_user_from_channel(channelId: number, userId: number) {
	await axios.patch(`http://localhost:${DATABASE_PORT}/participants?channel_id=eq.${channelId}&participant_id=eq.${userId}`, {
		is_banned: false,
	});
}

async function mute_user_in_channel(channelId: number, userId: number): Promise<Date> {
	var time = new Date(Date.now() + 300000);
	console.log(`Muting user ${userId} in ${channelId} til ${time} / ${time.toISOString()}`);
	await axios.patch(`http://localhost:${DATABASE_PORT}/participants?channel_id=eq.${channelId}&participant_id=eq.${userId}`, {
		muted_until: time.toISOString(),
	});
	return time;
}
async function unmute_user_in_channel(channelId: number, userId: number) {
	await axios.patch(`http://localhost:${DATABASE_PORT}/participants?channel_id=eq.${channelId}&participant_id=eq.${userId}`, {
		muted_until: null,
	});
}

async function make_user_admin_in_channel(channelId: number, userId: number) {
	await axios.patch(`http://localhost:${DATABASE_PORT}/participants?channel_id=eq.${channelId}&participant_id=eq.${userId}`, {
		is_admin: true,
	});
}
async function remove_user_admin_in_channel(channelId: number, userId: number) {
	await axios.patch(`http://localhost:${DATABASE_PORT}/participants?channel_id=eq.${channelId}&participant_id=eq.${userId}`, {
		is_admin: false,
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

// I hate this, why is it like this
function parseISOString(s: String): Date {	// It no worky with ts
	var b: any = s.split(/\D+/);	// just make it any i dont care
	return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }

async function get_joined_channels(userId: number): Promise<JoinedChannelStatus[]> {
	//let data = await axios.get(`http://localhost:${DATABASE_PORT}/participants?participant_id=eq.${userId}`);
	let data = await axios.get(`http://localhost:${DATABASE_PORT}/channels?select=is_closed,participants!inner(*)&participants.participant_id=eq.${userId}&is_closed=eq.false`);
	// TODO: This needs to be modified. You should make a request to /channels with these flags;
	// ?is_closed=eq.false	// &type=neq.direct	// No, direct messages should still be seen, if it filters it out you won't get the messages, it is on the frontends job to correctly filter it, however that was impossible as it has no idea what type of channel it is, now it is send in the join packet
	// and remove each channel in JoinedChannelStatus[] with a channel_id not in the response.

	let result = new Array<JoinedChannelStatus>;

	// console.log(`got joined channels:`, data.data);
	for (let elem of data.data) {
		let participant = elem.participants[0] as JoinedChannelStatus;
		participant.muted_until = parseISOString(participant.muted_until as unknown as String);
		// console.log(`time: ${participant.muted_until}`);
		result.push(participant);
	}
	// console.log(`into joined channels:`, result);
	return result;
}

async function matches_password(channelId: number, password: string) {
	let channel = await get_channel(channelId);

	let storedHashPassword = channel.password;
	if (storedHashPassword == '') { return true; }
	if (!password) { return false; }

	return await bcrypt.compare(password, storedHashPassword);
}

export {
	JoinedChannelStatus,

	make_channel,
	delete_channel,

	get_channel,

	join_channel,
	leave_channel,

	ban_user_from_channel,
	unban_user_from_channel,

	mute_user_in_channel,
	unmute_user_in_channel,

	make_user_admin_in_channel,
	remove_user_admin_in_channel,

	get_messages_from_channel,
	add_message_to_channel,

	get_joined_channels,

	matches_password,
}