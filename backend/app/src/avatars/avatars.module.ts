import { Module } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { AvatarsController } from './avatars.controller';
import { TwoFactorAuthService } from '../two_factor_auth/two_factor_auth.service';

@Module({
  providers: [AvatarsService, TwoFactorAuthService],
  controllers: [AvatarsController]
})
export class AvatarsModule {}
