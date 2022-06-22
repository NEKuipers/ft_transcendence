import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { Friend } from './friends.interface';

@Controller('friends')
export class FriendsController {
	constructor(private readonly friendsService: FriendsService) {}
}