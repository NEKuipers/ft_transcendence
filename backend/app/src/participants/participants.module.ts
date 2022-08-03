import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { ChannelsService } from 'src/channels/channels.service';

@Module({
  providers: [ParticipantsService, ChannelsService],
  controllers: [ParticipantsController]
})
export class ParticipantsModule {}
