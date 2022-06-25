import { SpectateMatch } from './matches.interface';
export declare class MatchesService {
    ongoing_matches: SpectateMatch[];
    findAll(): SpectateMatch[];
    findOne(id: number): SpectateMatch;
}
