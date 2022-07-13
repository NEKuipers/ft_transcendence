import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { Friend, FriendRequest, FriendTable } from './friends.interface';

@Controller('friends')
export class FriendsController {
	constructor(private readonly friendsService: FriendsService) {}

	@Get()
	findAll(): Friend[] {
		return this.friendsService.findAll();
	}

	@Get('/requests')
	findAllRequests(): FriendRequest[] { 
		return this.friendsService.findAllRequests();
	} 

	@Post()
	create(@Body() friendtable: FriendTable): string {
		return this.friendsService.createFriend(friendtable);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() friendtable: FriendTable) : string {
		return this.friendsService.updateFriend(id, friendtable);
	}

	@Delete(':id')
	unfriend(@Param('id') id: number): string {
		return this.friendsService.deleteFriend(id);
	}

}
