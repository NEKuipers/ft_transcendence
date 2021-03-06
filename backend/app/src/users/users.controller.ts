import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { User, newUsername } from './user.interface';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async findAll(): Promise<User[]> {
		const users = await this.usersService.findAll()
		// console.log('Diocane',users)
		return users
	}

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<User> {
		const user = await this.usersService.findOne(id)
		return user;
	}

	/* Not entirely sure this route is necessary */
	// @Get(':userName')
	// async findOneByName(@Param('userName') userName: string): Promise<User> {
	// 	const user = await this.usersService.findOneByName(userName)
	// 	return user;
	// }

	@Post()
	create(@Body() createUserDto: CreateUserDto): string {
		//Create user
		return 'User created';
	}

	@Patch(':id')
	async editUsername(@Body() newname: newUsername, @Param('id') id: number): Promise<string> {
		return this.usersService.changeUsername(id, newname.username);
	}

	@Delete(':id')
	delete(@Param('id') id) : string {
		//Delete user
		return `Deleted user ${id}`;
	}

}


