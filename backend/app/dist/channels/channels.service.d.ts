import { Channel } from './channels.interface';
export declare class ChannelsService {
    findAllNonDirect(): Promise<Channel[]>;
    findAllForUser(user_id: number): Promise<Channel[]>;
    findAllNotForUser(user_id: number): Promise<Channel[]>;
    findOne(channel_id: number): Promise<Channel>;
    checkChannelName(newChannelName: string): Promise<string>;
}
