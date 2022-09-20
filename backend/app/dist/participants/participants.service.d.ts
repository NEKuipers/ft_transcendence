import { Participant } from './participants.interface';
import { ChannelsService } from 'src/channels/channels.service';
export declare class ParticipantsService {
    private readonly channelsService;
    constructor(channelsService: ChannelsService);
    findAllParticipantsOfChannel(channel_id: number): Promise<Participant[]>;
}
