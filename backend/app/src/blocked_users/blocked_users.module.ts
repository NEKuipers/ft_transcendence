import { Module } from '@nestjs/common';
import { BlockedUsersService } from './blocked_users.service';
import { BlockedUsersController } from './blocked_users.controller';
import { TwoFactorAuthService } from '../two_factor_auth/two_factor_auth.service';


@Module({
  providers: [BlockedUsersService, TwoFactorAuthService],
  controllers: [BlockedUsersController]
})
export class BlockedUsersModule {}
