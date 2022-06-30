import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { Ladder } from './ladder.interface';
import { LadderService } from './ladder.service';

@Controller('ladder')
export class LadderController {
	constructor(private readonly ladderService: LadderService) {}

	@Get()
	async findAll(): Promise<Ladder[]> {
		return this.ladderService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: number): Ladder { 
		return this.ladderService.findOne(id);
	}
}
