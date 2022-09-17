import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { TwoFactorAuthService } from '../two_factor_auth/two_factor_auth.service';

@Module({
  providers: [FriendsService, TwoFactorAuthService],
  controllers: [FriendsController]
})
export class FriendsModule {}
