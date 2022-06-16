import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';

@Module({
  providers: [ParticipantsService],
  controllers: [ParticipantsController]
})
export class ParticipantsModule {}
