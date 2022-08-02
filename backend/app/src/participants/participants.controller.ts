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

	@Post()
	async addUserToChannel(@Body() participant: Participant) : Promise<string> {
		return this.participantsService.addUserToChannel(participant);
	}

	@Patch('/make-admin')
	async makeUserAdmin(@Body() participant: Participant) : Promise<string> {
		return this.participantsService.makeUserAdmin(participant);
	}

	@Patch('/ban-user')
	async banUserFromChannel(@Body() participant: Participant) : Promise<string> {
		return this.participantsService.banUserFromChannel(participant);
	}

	@Patch('/mute-user')
	async muteUserInChannel(@Body() participant: Participant) : Promise<string> {
		return this.participantsService.muteUserInChannel(participant);
	}

	@Delete()
	async removeUserFromChannel(@Body() participant: Participant) : Promise<string> {
		return this.participantsService.removeUserFromChannel(participant);
	}

}
