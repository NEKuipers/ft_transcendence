import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { Match } from './matches.interface';

@Controller('matches')
export class MatchesController {
	constructor(private readonly matchesService: MatchesService) {}
	
}
