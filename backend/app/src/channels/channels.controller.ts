import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { Channel, channelName } from './channels.interface';

@Controller('channels')
export class ChannelsController {
	constructor(private readonly channelsService: ChannelsService) {}
	
	@Get('/all_for_:id') 
	async findAllForUser(@Param('id') id: number): Promise<Channel[]> {
		return await this.channelsService.findAllForUser(id);
	}

	@Get('/all_not_for_:id') 
	async findAllNotForUser(@Param('id') id: number): Promise<Channel[]> {
		return await this.channelsService.findAllNotForUser(id);
	}
	
	@Get(':id')
	async findById(@Param('id') id: number): Promise<Channel> {
		return this.channelsService.findOne(id);
	}

	@Post('/check_channel_name')
	async checkChannelName(@Body() newChannelName: channelName): Promise<string> {
		return this.channelsService.checkChannelName(newChannelName.name);
	}

	@Post('/verify_password_for_:id')
	async verifyPassword(@Param('id') id: number, @Body() password: any) : Promise<boolean> {
		return this.channelsService.verifyPassword(id, password.password)
	}
}
