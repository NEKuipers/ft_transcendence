import { Match, OngoingMatch, CompletedMatch } from './matches.interface';
export declare class MatchesService {
    ongoing_matches: OngoingMatch[];
    matches: CompletedMatch[];
    updateOngoingMatchesFromDataBase(): Promise<OngoingMatch[]>;
    findAllCompleted(): CompletedMatch[];
    findAllOngoing(): Promise<OngoingMatch[]>;
    findOne(id: number): OngoingMatch;
    createMatch(match: Match): string;
    updateMatch(id: number, match: Match): string;
}
