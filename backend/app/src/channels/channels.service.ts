import { Injectable } from '@nestjs/common';
import { Channel } from './channels.interface';
import axios from 'axios';


@Injectable()
export class ChannelsService {
	async findAll(): Promise<Channel[]> {
		let res = await axios.get(`http://localhost:${process.env.PGREST_PORT}/channels`);
		return res.data;
	}

	async findAllNonDirect(): Promise<Channel[]> {
		let res = await axios.get(`http://localhost:${process.env.PGREST_PORT}/channels?type=neq.direct&is_closed=eq.false`);
		return res.data;
	}

	async findAllForUser(user_id: number): Promise<Channel[]> { //
		//This returns all participants entries of user
		let res = await axios.get(`http://localhost:${process.env.PGREST_PORT}/participants?participant_id=eq.${user_id}`);
		//Find all of those channels and return an array. Might be a better way to do this but ¯\_(ツ)_/¯
		let channels: Channel[] = [];
		for (let i = 0; i < res.data.length; i++) {
			let temp = await axios.get(`http://localhost:${process.env.PGREST_PORT}/channels?id=eq.${res.data[i].channel_id}`);
			channels.push(temp.data);
		}
		return channels;
	}

	async findOne(channel_id: number) : Promise<Channel> {
		let res = await axios.get(`http://localhost:${process.env.PGREST_PORT}/channels?id=eq.${channel_id}`)
		return res.data;
	}

	async createChannel(channel: Channel): Promise<string> {
		let channels = await this.findAll();
		if (channels.find((existingChannel) => existingChannel.name == channel.name)) {
			return "taken";
		}
		await axios.post(`http://localhost:${process.env.PGREST_PORT}/channels`, {
			name: channel.name,
			type: channel.type,
			owner_id: channel.owner_id,
			is_closed: false
		})
		let id = channels.length + 1;
		return id.toString();
	}

	async closeChannel(channel: Channel): Promise<string> {
		//this doesn't seem to work
		await axios.patch(`http://localhost:${process.env.PGREST_PORT}/channels?id=eq.${channel.id}`, {
			is_closed: true
		})
		console.log(channel);
		return "Channel closed";
	}

	async changeOwner(id: number, channel: Channel): Promise<string> {
		axios.patch(`http://localhost:${process.env.PGREST_PORT}/channels?id=eq.${channel.id}`, {
			owner_id: id
		})
		return "Channel owner changed";
	}

	async makePrivate(channel: Channel): Promise<string> {
		axios.patch(`http://localhost:${process.env.PGREST_PORT}/channels?id=eq.${channel.id}`, {
			type: "private"
		})
		return "Channel set to private";
	}
}
