import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { Channel } from './channels.interface';

@Controller('channels')
export class ChannelsController {
	constructor(private readonly channelsService: ChannelsService) {}

	@Get() //Retrieve all existing channels
	async findAll(): Promise<Channel[]> {
		return this.channelsService.findAll();
	}
	
	@Get('/all') //Retrieve all non-dm
	async findAllNonDirect(): Promise<Channel[]> {
		return this.channelsService.findAllNonDirect();
	}
	
	@Get('/all_for_:id') //Retrieve all channels a user is in?
	async findAllForUser(@Param('id') id: number): Promise<Channel[]> {
		return await this.channelsService.findAllForUser(id);
	}
	
	@Get(':id')
	async findById(@Param('id') id: number): Promise<Channel> {
		return this.channelsService.findOne(id);
	}

	@Post()
	async createChannel(@Body() channel: Channel): Promise<string> {
		return this.channelsService.createChannel(channel);
	}
	
	@Post('/verify_password_for_:id')
	async verifyPassword(@Param('id') id: number, @Body() password: any) : Promise<boolean> {
		console.log('In the backend. Id:', id, password)
		// return true
		return this.channelsService.verifyPassword(id, password.password)
	}
	
	@Patch('/close-channel') //If channel is closed
	async closeChannel(@Body() channel: Channel): Promise<string> {
		return this.channelsService.closeChannel(channel);
	}


	@Patch('/change-owner/:id') //If the current owner leaves we need a new owner (how do we choose one?)
	async changeOwner(@Param(':id') id: number, @Body() channel: Channel): Promise<string> {
		return this.channelsService.changeOwner(id, channel);
	}

	@Patch('/make-private') //If it's set to private?
	async makePrivate(@Body() channel: Channel): Promise<string> {
		return this.channelsService.makePrivate(channel);
	}

	// @Patch('/set-password/') //No idea where to put the password yet tbh, also this needs to be hashed 
}
