import { Match, SpectateMatch } from './matches.interface';
export declare class MatchesService {
    ongoing_matches: SpectateMatch[];
    findAll(): SpectateMatch[];
    findOne(id: number): SpectateMatch;
    createMatch(match: Match): string;
    updateMatch(id: number, match: Match): string;
}
