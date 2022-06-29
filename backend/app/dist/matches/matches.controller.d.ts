import { MatchesService } from './matches.service';
import { SpectateMatch, Match } from './matches.interface';
export declare class MatchesController {
    private readonly matchesService;
    constructor(matchesService: MatchesService);
    findAll(): SpectateMatch[];
    findOne(id: number): SpectateMatch;
    create(match: Match): string;
    update(id: number, match: Match): string;
}
