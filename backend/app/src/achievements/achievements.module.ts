import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  providers: [AchievementsService],
  controllers: [AchievementsController]
})
export class AchievementsModule {}
