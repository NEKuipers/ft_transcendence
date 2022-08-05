import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './messages.interface';

@Controller('messages')
export class MessagesController {
	constructor(private readonly messagesService: MessagesService) {}

	@Get()
	async findAll(): Promise<Message[]> {
		return this.messagesService.findAll();
	}

	@Get('/channel/:id')
	async findByChannel(@Param('id') id: number): Promise<Message[]> {
		// console.log("What is up here")
		return this.messagesService.findByChannel(id);
	}

	@Post()
	sendMessage(@Body() msg: Message) {
		this.messagesService.saveMessage(msg)
	}
}
