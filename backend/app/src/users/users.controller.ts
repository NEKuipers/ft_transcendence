import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	findAll(): User[] {
		return this.usersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id): User { 
		return this.usersService.findOne(id);
	}

	@Post()
	create(@Body() CreateUserDto: CreateUserDto): string {
		return 'User created';
	}

	@Delete(':id')
	delete(@Param('id') id) : string {
		return `Deleted user ${id}`
	}
	@Put(':id')
	update(@Body() updateUserDto: CreateUserDto, @Param('id') id): string {
		return (`Update ${id} - Username ${updateUserDto.userName}`);
	}
}
