import { Module } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { AvatarsController } from './avatars.controller';

@Module({
  providers: [AvatarsService],
  controllers: [AvatarsController]
})
export class AvatarsModule {}
