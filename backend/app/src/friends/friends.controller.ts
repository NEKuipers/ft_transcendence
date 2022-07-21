import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { Friend, FriendRequest, FriendTable } from './friends.interface';

@Controller('friends')
export class FriendsController {
	constructor(private readonly friendsService: FriendsService) {}

	@Get('/:id')
	async findAllForUser(@Param('id') id: number): Promise<Friend[]> {
		return this.friendsService.findAllForUser(id);
	}

	@Get('/requests/:id')
	async findAllRequestsForUser(@Param('id') id: number): Promise<FriendRequest[]> {		
		return this.friendsService.findAllRequestsForUser(id);
	} 
	
	@Post()
	create(@Body() friend: FriendTable): string {
		return this.friendsService.createFriend(friend);
	}

	@Patch()
	update(@Body() friend: FriendTable): string {
		return this.friendsService.updateFriend(friend);
	}

	@Delete()
	unfriend(@Body() friend: FriendTable): string {
		console.log(friend);
		return this.friendsService.deleteFriend(friend);
	}
}
