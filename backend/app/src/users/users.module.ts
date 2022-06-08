import { Module } from '@nestjs/common';
import { UsersController } from './Users.controller';
import { UsersService } from './Users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
