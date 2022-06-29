import { Match, OngoingMatch } from './matches.interface';
export declare class MatchesService {
    ongoing_matches: OngoingMatch[];
    findAll(): OngoingMatch[];
    findOne(id: number): OngoingMatch;
    createMatch(match: Match): string;
    updateMatch(id: number, match: Match): string;
}
