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

	@Get('/blocked_by/:id')
	findAllWhoBlockedUser(@Param('id') id: number) : Promise<BlockedUser[]> {
		return this.blockedUsersService.findAllWhoBlockedUser(id);
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
