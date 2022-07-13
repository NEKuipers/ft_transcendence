import { MatchesService } from './matches.service';
import { OngoingMatch, Match, CompletedMatch } from './matches.interface';
export declare class MatchesController {
    private readonly matchesService;
    constructor(matchesService: MatchesService);
    findAllCompleted(): CompletedMatch[];
    findAllOngoing(): Promise<OngoingMatch[]>;
    findOne(id: number): OngoingMatch;
    create(match: Match): string;
    update(id: number, match: Match): string;
}
