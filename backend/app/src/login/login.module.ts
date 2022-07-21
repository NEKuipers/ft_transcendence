import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { intraStrategy } from './strategies';
import { UsersModule } from '../users/users.module';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { SessionSerialiser } from './utils/Serialiser';

@Module({
  imports: [HttpModule, UsersModule],
  controllers: [LoginController],
  providers: [LoginService, SessionSerialiser, intraStrategy, UsersService, ConfigService]
})
export class LoginModule {}