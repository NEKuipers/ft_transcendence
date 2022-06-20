import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { AchievementsService } from 'src/achievements/achievements.service';
import { Achievement } from './achievements.interface';

@Controller('achievements')
export class AchievementsController {
	constructor(private readonly achievementsService: AchievementsService) {}

	@Get()
	findAll(): Achievement[] {
		return this.achievementsService.findAll();
	}

	@Get('id')
	findOne(@Param('id') id: number): Achievement {
		return this.achievementsService.findOne(id);
	}

}
