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
}
