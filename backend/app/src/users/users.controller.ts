import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, newUsername, newAvatar } from './user.interface';
import { TFAGuard } from '../two_factor_auth/tfa.guard';

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

	@Patch('/username')
	@UseGuards(TFAGuard)
	async editUsername(@Req() req: any, @Body() newname: newUsername): Promise<string> {
		return this.usersService.changeUsername(req.user.id, newname.username);
	}

	@Patch('/avatar')
	@UseGuards(TFAGuard)
	async updateAvatar(@Req() req: any, @Body() newavatar: newAvatar): Promise<string> {
		return this.usersService.changeAvatar(req.user.id, newavatar.avatar_id);
	}

	@Patch('/set_online')
	@UseGuards(TFAGuard)
	async setOnline(@Req() req: any) {
		return this.usersService.setOnline(req.user.id);
	}

	@Patch('/set_offline')
	@UseGuards(TFAGuard)
	async setOffline(@Req() req: any) {
		return this.usersService.setOffline(req.user.id);
	}
}


