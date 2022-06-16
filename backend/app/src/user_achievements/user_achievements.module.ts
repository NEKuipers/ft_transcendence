import { Module } from '@nestjs/common';
import { UserAchievementsService } from './user_achievements.service';
import { UserAchievementsController } from './user_achievements.controller';

@Module({
  providers: [UserAchievementsService],
  controllers: [UserAchievementsController]
})
export class UserAchievementsModule {}
