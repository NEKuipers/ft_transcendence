import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { BlockedUsersService } from './blocked_users.service';
import { BlockedUser } from './blocked_users.interface';

@Controller('blocked-users')
export class BlockedUsersController {
	constructor(private readonly blockedUsersService: BlockedUsersService) {}
}
