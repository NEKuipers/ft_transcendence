import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { Friend } from './friends.interface';

@Controller('friends')
export class FriendsController {
	constructor(private readonly friendsService: FriendsService) {}

	@Get()
	findAll(): Friend[] {
		return this.friendsService.findAll();
	}

	@Post()
	create(@Body() friend: Friend): string {
		return this.friendsService.createFriendRequest(friend);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() friend: Friend) : string {
		return this.friendsService.updateFriendRequest(id, friend);
	}

	@Delete(':id')
	unfriend(@Param('id') id: number): string {
		return this.friendsService.deleteFriend(id);
	}

}
