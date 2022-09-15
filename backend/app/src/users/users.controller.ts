import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { User, newUsername, newAvatar } from './user.interface';

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

	@Patch(':id')
	async editUsername(@Body() newname: newUsername, @Param('id') id: number): Promise<string> {
		return this.usersService.changeUsername(id, newname.username);
	}

	@Patch('/avatar/:id')
	async updateAvatar(@Body() newavatar: newAvatar, @Param('id') id: number): Promise<string> {
		return this.usersService.changeAvatar(id, newavatar.avatar_id);
	}

	@Patch('/set_online/:id')
	async setOnline(@Param('id') id: number) {
		return this.usersService.setOnline(id);
	}

	@Patch('/set_offline/:id')
	async setOffline(@Param('id') id: number) {
		return this.usersService.setOffline(id);
	}
}


