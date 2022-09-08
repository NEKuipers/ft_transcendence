import { Injectable } from '@nestjs/common';
import { Participant } from './participants.interface';
import axios from 'axios';
import { ChannelsService } from 'src/channels/channels.service';


@Injectable()
export class ParticipantsService {
	constructor(private readonly channelsService: ChannelsService) {}

	async findAllParticipantsOfChannel(channel_id: number): Promise<Participant[]> {
		let res = await axios.get(`http://localhost:${process.env.PGREST_PORT}/vw_participants?channel_id=eq.${channel_id}`);
		return res.data;
	}

	async addUserToChannel(participant: Participant): Promise<string> {
		axios.post(`http://localhost:${process.env.PGREST_PORT}/participants`, {
			channel_id: participant.channel_id,
			is_admin: false,
			is_banned: false,
			is_muted: null,
			participant_id: participant.participant_id,
			ban_meta: ""
		})
		return "User added to channel";
	}

	async makeUserAdmin(participant: Participant): Promise<string> {
		axios.patch(`http://localhost:${process.env.PGREST_PORT}/participants?participant_id=eq.${participant.participant_id}&channel_id=eq.${participant.channel_id}`, {
			is_admin: true
		})
		return "User made admin";
	}

	async banUserFromChannel(participant: Participant): Promise<string> {
		axios.patch(`http://localhost:${process.env.PGREST_PORT}/participants?participant_id=eq.${participant.participant_id}&channel_id=eq.${participant.channel_id}`, {
			is_banned: true
		})
		return "User banned";
		//TODO figure out ban/mute timer or something?
	}

	async muteUserInChannel(participant: Participant): Promise<string> {
		axios.patch(`http://localhost:${process.env.PGREST_PORT}/participants?participant_id=eq.${participant.participant_id}&channel_id=eq.${participant.channel_id}`, {
			is_muted: (Date.now() + 300000).toString(),
		})
		return "User muted";
		//TODO figure out ban/mute timer or something?
	}
	
	async removeUserFromChannel(participant: Participant): Promise<string> {
		let channel = await this.channelsService.findOne(participant.channel_id);
		let channelParticipants = await this.findAllParticipantsOfChannel(participant.channel_id);
			//TODO some stuff here is still not working, esp below.
		// if (channelParticipants.length === 1) {
		// 	await this.channelsService.closeChannel(channel);
		// }
		if (channelParticipants.length > 1 && channel.owner_id === participant.participant_id) {
			let newOwner = 1;
			for (let x = 0; x < channelParticipants.length; x++) {
				if (channelParticipants[x].participant_id != participant.participant_id) {
					let newOwner = channelParticipants[x].participant_id;
					break;
				}
				this.channelsService.changeOwner(newOwner, channel);
			}
		}
		await axios.delete(`http://localhost:${process.env.PGREST_PORT}/participants?channel_id=eq.${participant.channel_id}&participant_id=eq.${participant.participant_id}`);


		return "User removed from channel";
	}

}
