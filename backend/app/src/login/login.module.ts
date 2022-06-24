import { Module } from '@nestjs/common';
// import { HttpModule, HttpService } from '@nestjs/axios';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  // imports: [HttpModule, HttpService],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
