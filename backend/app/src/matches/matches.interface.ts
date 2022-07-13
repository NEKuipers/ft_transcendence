
//DTO for POST and PATCH requests at the start and end of pong games
export interface Match {
	readonly id: number;
	player_one: number;
	player_two: number;
	winner: number;
	meta: Object;
	options: Object;
}

//For GET requests in the select-game page
export interface OngoingMatch {
	readonly match_id: number;
	player_one: string;
	player_two: string;
	mode: string;	
}

//For GET requests -> match history
export interface CompletedMatch {
	readonly match_id: number;
	player_one: string;
	player_two: string;
	mode: string;
	player_one_score: number;
	player_two_score: number;
}