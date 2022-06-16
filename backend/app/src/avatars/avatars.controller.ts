import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { AvatarsService } from './avatars.service';

@Controller('avatars')
export class AvatarsController {
	constructor(private readonly avatarsService: AvatarsService) {}
}
