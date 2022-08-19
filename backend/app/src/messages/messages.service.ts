import { Injectable } from '@nestjs/common';
import { Message } from './messages.interface';
import axios from 'axios';

@Injectable()
export class MessagesService {
	
    async findAll(): Promise<Message[]> {
        let res = await axios.get(`http://localhost:${process.env.PGREST_PORT}/messages`)
        return res.data
    }

    async findByChannel(channel_id: number): Promise<Message[]> {
        // console.log('Is this request gonna go gthrough?', channel_id)
        let res = await axios.get(`http://localhost:${process.env.PGREST_PORT}/messages?channel_id=eq.${channel_id}`)
        // console.log('Nah huh?')
        return res.data
    }

    async saveMessage(msg: Message) {
        await axios.post(`http://localhost:${process.env.PGREST_PORT}/messages`, {
            channel_id: msg.channel_id,
            user_id: msg.user_id,
            message: msg.message
        })
        .then()
        .catch(err => console.log(err))
    }
}
