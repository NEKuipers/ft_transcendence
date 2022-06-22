import { Module } from '@nestjs/common';
import { BlockedUsersService } from './blocked_users.service';
import { BlockedUsersController } from './blocked_users.controller';

@Module({
  providers: [BlockedUsersService],
  controllers: [BlockedUsersController]
})
export class BlockedUsersModule {}
