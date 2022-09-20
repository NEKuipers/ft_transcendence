export interface Match {
    readonly id: number;
    player_one: number;
    player_two: number;
    winner: number;
}
export interface OngoingMatch {
    readonly match_id: number;
    player_one: string;
    player_two: string;
    game_mode: string;
}
export interface CompletedMatch {
    readonly match_id: number;
    p1_name: string;
    p2_name: string;
    game_mode: string;
    p1_points: number;
    p2_points: number;
}
