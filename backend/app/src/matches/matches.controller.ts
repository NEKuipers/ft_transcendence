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
	
}
