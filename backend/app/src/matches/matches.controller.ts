import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { OngoingMatch, Match, CompletedMatch } from './matches.interface';

@Controller('matches')
export class MatchesController {
	constructor(private readonly matchesService: MatchesService) {}
	
	@Get()
	findAllCompleted(): CompletedMatch[] {
		return this.matchesService.findAllCompleted();
	}

	@Get('/ongoing')
	findAllOngoing(): OngoingMatch[] {
		return this.matchesService.findAllOngoing();
	}	

	//idk if we even need this but I'm adding it just in case
	@Get(':id')
	findOne(@Param('id') id: number): OngoingMatch { 
		return this.matchesService.findOne(id);
	}
	
	//POST request at the start of a pong game
	@Post()
	create(@Body() match: Match): string {
		return this.matchesService.createMatch(match);
	}
	
	//PATCH request at the end of a pong game
	@Patch(':id')
	update(@Param('id') id: number, @Body() match: Match) : string {
		return this.matchesService.updateMatch(id, match);
	}

}
