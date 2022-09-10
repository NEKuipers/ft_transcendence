import { Injectable } from '@nestjs/common';
import { Channel } from './channels.interface';
import axios from 'axios';
import * as bcrypt from 'bcrypt'


@Injectable()
export class ChannelsService {
	async findAll(): Promise<Channel[]> {
		let res = await axios.get(`http://pgrest:${process.env.PGREST_PORT}/channels?type=neq.direct&is_closed=eq.false`);
		return res.data;
	}

	async findAllNonDirect(): Promise<Channel[]> {
		let res = await axios.get(`http://pgrest:${process.env.PGREST_PORT}/channels?type=neq.direct&is_closed=eq.false`);
		return res.data;
	}

	async findAllForUser(user_id: number): Promise<Channel[]> { //
		let res = await axios.get(`http://pgrest:${process.env.PGREST_PORT}/participants?participant_id=eq.${user_id}`);
		let channels: Channel[] = [];
		for (let i = 0; i < res.data.length; i++) {
			let temp = await axios.get(`http://pgrest:${process.env.PGREST_PORT}/channels?id=eq.${res.data[i].channel_id}&type=neq.direct&is_closed=eq.false`);
			if (temp.data[0]) {	// If it does not find it because its a direct message, it can push a undefined in, and that will break the TS types, which will cause exceptions when making the assumtion that its actually that type (accessing the .id for example in findAllNotForUser)
				channels.push(temp.data[0]);
			}
		}
		return channels;
	}

	async findAllNotForUser(user_id: number): Promise<Channel[]> { 
		let all = await this.findAll();
		let joined = await this.findAllForUser(user_id);
		if (joined.length == 0) {
			return all;
		}
		
		let joined_ids: number[] = [];
		for (let x = 0; x < joined.length; x++) {
			joined_ids.push(joined[x].id);
		}

		let otherChannels: Channel[] = [];
		for (let x = 0; x < all.length; x++) {
			if (!joined_ids.includes(all[x].id)) {
				otherChannels.push(all[x]);
			}
		
		}
		return otherChannels;
	}

	async findOne(channel_id: number) : Promise<Channel> {
		let res = await axios.get(`http://pgrest:${process.env.PGREST_PORT}/channels?id=eq.${channel_id}`)
		return res.data;
	}

	async checkChannelName(newChannelName: string): Promise<string> {
		if (newChannelName.length > 22) {
			return "too-long";
		}
		let allOpenChannels = await this.findAllNonDirect();
		for (let x = 0; x < allOpenChannels.length; x++) {
			if (allOpenChannels[x].name == newChannelName) {
				return "taken";
			}
		}
		return "ok"
	}

	async createChannel(channel: Channel): Promise<string> {
		let channels = await this.findAll();
		if (channels.find((existingChannel) => existingChannel.name == channel.name)) {
			return "taken";
		}
		await axios.post(`http://pgrest:${process.env.PGREST_PORT}/channels`, {
			name: channel.name,
			type: channel.type,
			owner_id: channel.owner_id,
			is_closed: false
		})
		let id = channels.length + 1;
		return id.toString();
	}

	async changeOwner(id: number, channel: Channel): Promise<string> {
		axios.patch(`http://pgrest:${process.env.PGREST_PORT}/channels?id=eq.${channel.id}`, {
			owner_id: id
		})
		return "Channel owner changed";
	}

	async verifyPassword(id: number, password: string): Promise<boolean> {
		const channel = await this.findOne(id)
		// console.log(channel)
		// console.log('Plainpass', password, ' crypted', channel[0].id, channel[0].password)
		const correctPassword = await bcrypt.compare(password, channel[0].password)

		console.log('Does the password match:', correctPassword)
		return correctPassword;
	}
}
