import { Module } from '@nestjs/common';
import { TwoFactorAuthService } from './two_factor_auth.service';
import { TwoFactorAuthController } from './two_factor_auth.controller';

@Module({
  providers: [TwoFactorAuthService],
  controllers: [TwoFactorAuthController]
})
export class TwoFactorAuthModule {}
