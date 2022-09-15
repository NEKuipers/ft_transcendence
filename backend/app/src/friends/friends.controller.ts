import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { Friend, FriendRequest, FriendTable, friend_status } from './friends.interface';

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

	@Get('is_friend/:your_id&:other_id')
	async isFriend(@Param('your_id') your_id: number, @Param('other_id') other_id: number) : Promise<number> {
		return this.friendsService.isFriend(your_id, other_id);
	}
	
	@Post()//TODO needs guard
	async create(@Body() friend: FriendTable): Promise<string> {
		return this.friendsService.createFriend(friend);
	}

	@Patch('/decline')//TODO needs guard
	async declineRequest(@Body() friend: FriendTable): Promise<string> {
		return this.friendsService.declineRequest(friend);
	}

	@Patch('/accept')//TODO needs guard
	async acceptRequest(@Body() friend: FriendTable): Promise<string> {
		return this.friendsService.acceptRequest(friend);
	}

	@Delete()//TODO needs guard
	async unfriend(@Body() friend: FriendTable): Promise<string> {
		return this.friendsService.deleteFriend(friend);
	}
}
