export interface Ladder {
	readonly user_id: number;
	username: string;
	games_played: number;
	wins: number;
	losses: number;
	ladder_position: number;
}