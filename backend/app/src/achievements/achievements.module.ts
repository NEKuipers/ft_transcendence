import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';

@Module({
  imports: [],
  providers: [AchievementsService],
  controllers: [AchievementsController]
})
export class AchievementsModule {}
