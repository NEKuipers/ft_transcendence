import { ParticipantsService } from './participants.service';
import { Participant } from './participants.interface';
export declare class ParticipantsController {
    private readonly participantsService;
    constructor(participantsService: ParticipantsService);
    findAllParticipantsOfChannel(channel_id: number): Promise<Participant[]>;
}
