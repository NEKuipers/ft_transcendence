import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { intraStrategy } from './strategies';
import { UsersModule } from '../users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [HttpModule, UsersModule],
  controllers: [LoginController],
  providers: [LoginService, intraStrategy, UsersService]
})
export class LoginModule {}
