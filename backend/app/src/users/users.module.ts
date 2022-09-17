import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TwoFactorAuthService } from '../two_factor_auth/two_factor_auth.service';


@Module({
  controllers: [UsersController],
  providers: [UsersService, TwoFactorAuthService],
})
export class UsersModule {}