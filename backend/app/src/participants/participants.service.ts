import { Injectable } from '@nestjs/common';
import { Participant } from './participants.interface';
import axios from 'axios';


@Injectable()
export class ParticipantsService {

	async findAllParticipantsOfChannel(channel_id: number): Promise<Participant[]> {
		let res = await axios.get(`http://localhost:${process.env.PGREST_PORT}/participants?channel_id=eq.${channel_id}`);
		return res.data;
	}

	async addUserToChannel(participant: Participant): Promise<string> {
		axios.post(`http://localhost:${process.env.PGREST_PORT}/participants`, {
			channel_id: participant.channel_id,
			is_admin: false,
			is_banned: false,
			is_muted: false,
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
			is_muted: true
		})
		return "User muted";
		//TODO figure out ban/mute timer or something?
	}
	
	async removeUserFromChannel(participant: Participant): Promise<string> {
		axios.delete(`http://localhost:${process.env.PGREST_PORT}/participants?channel_id=eq.${participant.channel_id}&participant_id=eq.${participant.participant_id}`);
		return "User removed from channel";
	}

}
