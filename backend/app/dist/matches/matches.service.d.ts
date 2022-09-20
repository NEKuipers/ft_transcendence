import { OngoingMatch, CompletedMatch } from './matches.interface';
export declare class MatchesService {
    findLastMatchesFromUser(id: number): Promise<CompletedMatch[]>;
    findAllOngoing(): Promise<OngoingMatch[]>;
}
