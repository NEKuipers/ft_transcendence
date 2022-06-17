import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ParticipantsService } from './participants.service'
import { Participant } from './participants.interface';

@Controller('participants')
export class ParticipantsController {
	constructor(private readonly participantsService: ParticipantsService) {}
}
