
//For POST and PATCH requests at the start and end of pong games
export interface Match {
	readonly id: number;
	player_one: number;
	player_two: number;
	winner: number;
	meta: Object;
	options: Object;
}

//For GET requests in the select-game page
export interface SpectateMatch {
	readonly match_id: number;
	player_one: string;
	player_two: string;
	mode: string;	
}