import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { intraStrategy } from './strategies';
import { UsersModule } from '../users/users.module';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { SessionSerialiser } from './utils/Serialiser';
import { TwoFactorAuthService } from 'src/two_factor_auth/two_factor_auth.service';

@Module({
  imports: [HttpModule, UsersModule],
  controllers: [LoginController],
  providers: [LoginService, SessionSerialiser, intraStrategy, UsersService, ConfigService, TwoFactorAuthService]
})
export class LoginModule {}
