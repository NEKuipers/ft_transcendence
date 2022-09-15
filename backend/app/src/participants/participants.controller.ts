import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ParticipantsService } from './participants.service'
import { Participant } from './participants.interface';

@Controller('participants')
export class ParticipantsController {
	constructor(private readonly participantsService: ParticipantsService) {}

	@Get('/:channel_id')
	async findAllParticipantsOfChannel(@Param('channel_id') channel_id: number): Promise<Participant[]> {
		return this.participantsService.findAllParticipantsOfChannel(channel_id);
	}
}
