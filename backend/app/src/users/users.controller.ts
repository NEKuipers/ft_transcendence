import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.interface';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	findAll(): User[] {
		return this.usersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: number): User { 
		return this.usersService.findOne(id);
	}

	@Post()
	create(@Body() createUserDto: CreateUserDto): string {
		//Create user
		return 'User created';
	}

	@Delete(':id')
	delete(@Param('id') id) : string {
		//Delete user
		return `Deleted user ${id}`;
	}
	@Patch(':id')
	update(@Body() updateUserDto: CreateUserDto, @Param('id') id: number): string {
		console.log('bleas')
		return 'User edit not yet implemented';
		//return (`Update ${id} - Username ${updateUserDto.userName}`);
	}
}
