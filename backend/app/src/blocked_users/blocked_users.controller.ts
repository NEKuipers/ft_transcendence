import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { BlockedUsersService } from './blocked_users.service';
import { BlockedUser, BlockedUserVW } from './blocked_users.interface';
import { TFAGuard } from '../two_factor_auth/tfa.guard';

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

	@Get('all_who_blocked_me/:id')
	async getAllWhoBlockedMe(@Param('id') id: number) : Promise<number[]> {
		return this.blockedUsersService.getAllWhoBlockedMe(id);
	}

	@Get('all_who_i_have_blocked/:id')
	async getAllWhoIHaveBlocked(@Param('id') id: number) : Promise<number[]> {
		return this.blockedUsersService.getAllWhoIHaveBlocked(id);
	}

	@Post()
	@UseGuards(TFAGuard)
	blockUser(@Body() blockedUser: BlockedUser): string {		
		return this.blockedUsersService.blockUser(blockedUser);	// TODO: Needs verification
	}

	@Delete()
	@UseGuards(TFAGuard)
	unblockUser(@Body() blockedUser: BlockedUser): string {
		return this.blockedUsersService.unblockUser(blockedUser);	// TODO: Needs verification
	}
}
