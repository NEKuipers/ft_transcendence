import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { BlockedUsersService } from './blocked_users.service';
import { BlockedUser, BlockedUserVW } from './blocked_users.interface';

@Controller('blocked_users')
export class BlockedUsersController {
	constructor(private readonly blockedUsersService: BlockedUsersService) {}

	@Get(':id')
	findAllForUser(@Param('id') id: number): Promise<BlockedUserVW[]> {
		return this.blockedUsersService.findAllForUser(id);
	}

	@Get('have_you_blocked_them/:your_id&:other_id')
	async haveYouBlockedUser(@Param('your_id') your_id: number, @Param('other_id') other_id: number) : Promise<boolean> {
		return this.blockedUsersService.haveYouBlockedUser(your_id, other_id);
	}

	@Get('have_they_blocked_you/:your_id&:other_id') 
	async hasUserBlockedMe(@Param('your_id') your_id: number, @Param('other_id') other_id: number) : Promise<boolean> {
		return this.blockedUsersService.hasUserBlockedMe(your_id, other_id);
	}

	@Post()
	blockUser(@Body() blockedUser: BlockedUser): string {		
		return this.blockedUsersService.blockUser(blockedUser);
	}

	@Delete()
	unblockUser(@Body() blockedUser: BlockedUser): string {
		return this.blockedUsersService.unblockUser(blockedUser);
	}
}
