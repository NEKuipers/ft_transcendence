import { Match, OngoingMatch, CompletedMatch } from './matches.interface';
export declare class MatchesService {
    ongoing_matches: OngoingMatch[];
    matches: CompletedMatch[];
    findAllCompleted(): CompletedMatch[];
    findAllOngoing(): OngoingMatch[];
    findOne(id: number): OngoingMatch;
    createMatch(match: Match): string;
    updateMatch(id: number, match: Match): string;
}
