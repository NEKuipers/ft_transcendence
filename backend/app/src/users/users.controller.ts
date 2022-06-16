import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
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
		return 'User creation not yet implemented';
	}

	@Delete(':id')
	delete(@Param('id') id) : string {
		return 'User deletion not yet implemented';
		//return `Deleted user ${id}`;
	}
	@Patch(':id')
	update(@Body() updateUserDto: CreateUserDto, @Param('id') id): string {
		return 'User edit not yet implemented';
		//return (`Update ${id} - Username ${updateUserDto.userName}`);
	}
}
