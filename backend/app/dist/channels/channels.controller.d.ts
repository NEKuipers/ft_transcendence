import { ChannelsService } from './channels.service';
import { Channel, channelName } from './channels.interface';
export declare class ChannelsController {
    private readonly channelsService;
    constructor(channelsService: ChannelsService);
    findAllForUser(id: number): Promise<Channel[]>;
    findAllNotForUser(id: number): Promise<Channel[]>;
    findById(id: number): Promise<Channel>;
    checkChannelName(newChannelName: channelName): Promise<string>;
}
