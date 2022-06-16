import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { AchievementsService } from 'src/achievements/achievements.service';

@Controller('achievements')
export class AchievementsController {
	constructor(private readonly achievementsService: AchievementsService) {}
}
