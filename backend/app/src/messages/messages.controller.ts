import { Controller } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './messages.interface';

@Controller('messages')
export class MessagesController {
	constructor(private readonly messagesService: MessagesService) {}

}
