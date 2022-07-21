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
	async create(@Body() friend: FriendTable): Promise<string> {
		return this.friendsService.createFriend(friend);
	}

	@Patch('/decline')
	async declineRequest(@Body() friend: FriendTable): Promise<string> {
		return this.friendsService.declineRequest(friend);
	}

	@Patch('/accept')
	async acceptRequest(@Body() friend: FriendTable): Promise<string> {
		return this.friendsService.acceptRequest(friend);
	}

	@Delete()
	async unfriend(@Body() friend: FriendTable): Promise<string> {
		return this.friendsService.deleteFriend(friend);
	}
}
