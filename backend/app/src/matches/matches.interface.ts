
//DTO for POST and PATCH requests at the start and end of pong games
export interface Match {
	readonly id: number;
	player_one: number;
	player_two: number;
	winner: number;
}

//For GET requests in the select-game page
export interface OngoingMatch {
	readonly match_id: number;
	player_one: string;
	player_two: string;
	game_mode: string;	
}

//For GET requests -> match history
export interface CompletedMatch {
	readonly match_id: number;
	p1_name: string;
	p2_name: string;
	game_mode: string;
	p1_points: number;
	p2_points: number;
}

/*
	"match_id": 1,
	"player_one": "nkuipers",
	"player_two": "tmullan",
	"winner": "nkuipers",
	"game_mode": "rush"
	"p1_points": 3,
	"p2_points": 1,
	
	"match_status": "finished",
	"start_time": "2022-07-13T15:41:28.804",
	"end_time": "2022-07-13T15:42:25.594",
	"loose_reason": "max-points-reached",

	"user_id": 3,
*/