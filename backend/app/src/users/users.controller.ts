import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, newUsername, newAvatar } from './user.interface';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async findAll(): Promise<User[]> {
		const users = await this.usersService.findAll()
		return users
	}

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<User> {
		const user = await this.usersService.findOne(id)
		return user;
	}

	@Patch(':id')//TODO needs guard
	async editUsername(@Body() newname: newUsername, @Param('id') id: number): Promise<string> {
		return this.usersService.changeUsername(id, newname.username);
	}

	@Patch('/avatar/:id')//TODO needs guard
	async updateAvatar(@Body() newavatar: newAvatar, @Param('id') id: number): Promise<string> {
		return this.usersService.changeAvatar(id, newavatar.avatar_id);
	}

	@Patch('/set_online/:id')//TODO needs guard
	async setOnline(@Param('id') id: number) {
		return this.usersService.setOnline(id);
	}

	@Patch('/set_offline/:id')//TODO needs guard
	async setOffline(@Param('id') id: number) {
		return this.usersService.setOffline(id);
	}
}


