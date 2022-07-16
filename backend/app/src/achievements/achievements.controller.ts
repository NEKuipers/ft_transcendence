import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { AchievementsService } from 'src/achievements/achievements.service';
import { Achievement } from './achievements.interface';

@Controller('achievements')
export class AchievementsController {
	constructor(private readonly achievementsService: AchievementsService) {}

	@Get()
	async findAll(): Promise<Achievement[]> {
		return await this.achievementsService.findAll();
	}

	@Get('/user/:id')
	async findUserAchievements(@Param('id') id: number): Promise<Achievement[]> {
		return await this.achievementsService.findUserAchievements(id);
	}

}
