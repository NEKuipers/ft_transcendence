import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { Channel } from './channels.interface';

@Controller('channels')
export class ChannelsController {
	constructor(private readonly channelsService: ChannelsService) {}
}
