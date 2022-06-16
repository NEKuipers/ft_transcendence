import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ParticipantsService } from './participants.service'

@Controller('participants')
export class ParticipantsController {
	constructor(private readonly participantsService: ParticipantsService) {}
}
