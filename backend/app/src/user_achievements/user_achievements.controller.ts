import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { UserAchievementsService } from './user_achievements.service';

@Controller('user-achievements')
export class UserAchievementsController {
	constructor(private readonly userAchievementsService: UserAchievementsService) {}
}
