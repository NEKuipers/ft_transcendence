import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { Avatar } from './avatars.interface';

@Controller('avatars')
export class AvatarsController {
	constructor(private readonly avatarsService: AvatarsService) {}

	// @Get()
	// findAll(): Avatar[] {

	// }

	// @Get(':id')

	// }
}
