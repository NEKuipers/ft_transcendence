import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { SpectateMatch, Match } from './matches.interface';

@Controller('matches')
export class MatchesController {
	constructor(private readonly matchesService: MatchesService) {}
	
	@Get()
	findAll(): SpectateMatch[] {
		return this.matchesService.findAll();
	}

	//idk if we even need this but I'm adding it just in case
	@Get(':id')
	findOne(@Param('id') id: number): SpectateMatch { 
		return this.matchesService.findOne(id);
	}
	
	//POST request at the start of a pong game
	@Post()
	create(): string {
		return 'Match created';
	}
	
	//PATCH request at the end of a pong game
	@Patch(':id')
	update() : string {
		return 'Match updated';
	}

}
