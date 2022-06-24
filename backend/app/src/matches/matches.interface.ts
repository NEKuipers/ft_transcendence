export interface Match {
	readonly id: number;
	player_one: number;
	player_two: number;
	winner: number;
	meta: Object;
	options: Object;
}

export interface SpectateMatch {
	readonly match_id: number;
	player_one: string;
	player_two: string;
	mode: string;	
}