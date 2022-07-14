import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { OngoingMatch, Match, CompletedMatch } from './matches.interface';

@Controller('matches')
export class MatchesController {
	constructor(private readonly matchesService: MatchesService) {}
	
	@Get('/last/:id')
	findLastMatchesFromUser(@Param('id') id: number): Promise<CompletedMatch[]> {
		return this.matchesService.findLastMatchesFromUser(id);
	}

	@Get('/ongoing')
	findAllOngoing(): Promise<OngoingMatch[]> {
		return this.matchesService.findAllOngoing();
	}	
}
