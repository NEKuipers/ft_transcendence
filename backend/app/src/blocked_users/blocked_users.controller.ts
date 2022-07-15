import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { BlockedUsersService } from './blocked_users.service';
import { BlockedUser, BlockedUserVW } from './blocked_users.interface';

@Controller('blocked-users')
export class BlockedUsersController {
	constructor(private readonly blockedUsersService: BlockedUsersService) {}

	@Get(':id')
	findAllForUser(@Param('id') id: number): Promise<BlockedUserVW[]> {
		return  this.blockedUsersService.findAllForUser(id);
	}

	@Post()
	blockUser(@Body() blockedUser: BlockedUser): string {
		console.log(blockedUser);
		return this.blockedUsersService.blockUser(blockedUser);
	}

	// @Delete(':id')
	// unblockUser(@Param('id') id: number): BlockedUser {
	// 	return this.blockedUsersService.unblockUser(id);
	// }
}
