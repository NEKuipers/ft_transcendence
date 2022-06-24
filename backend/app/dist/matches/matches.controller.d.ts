import { MatchesService } from './matches.service';
import { SpectateMatch } from './matches.interface';
export declare class MatchesController {
    private readonly matchesService;
    constructor(matchesService: MatchesService);
    findAll(): SpectateMatch[];
}
