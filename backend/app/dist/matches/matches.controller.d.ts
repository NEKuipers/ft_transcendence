import { MatchesService } from './matches.service';
import { OngoingMatch, CompletedMatch } from './matches.interface';
export declare class MatchesController {
    private readonly matchesService;
    constructor(matchesService: MatchesService);
    findLastMatchesFromUser(id: number): Promise<CompletedMatch[]>;
    findAllOngoing(): Promise<OngoingMatch[]>;
}
