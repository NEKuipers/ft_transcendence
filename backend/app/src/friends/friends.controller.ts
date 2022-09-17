import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { Friend, FriendRequest} from './friends.interface';
import { TFAGuard } from '../two_factor_auth/tfa.guard';

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
	
	@Post()
	@UseGuards(TFAGuard)
	async create(@Req() req: any, @Body() other_id: number): Promise<string> {
		return this.friendsService.createFriend(req.user.id, other_id);
	}

	@Patch('/decline')
	@UseGuards(TFAGuard)
	async declineRequest(@Req() req: any, @Body() other_id: number): Promise<string> {
		return this.friendsService.declineRequest(req.user.id, other_id);
	}

	@Patch('/accept')
	@UseGuards(TFAGuard)
	async acceptRequest(@Req() req: any, @Body() other_id: number): Promise<string> {
		return this.friendsService.acceptRequest(req.user.id, other_id);
	}

	@Delete()
	@UseGuards(TFAGuard)
	async unfriend(@Req() req: any, @Body() other_id: number): Promise<string> {
		return this.friendsService.deleteFriend(req.user.id, other_id);
	}
}
