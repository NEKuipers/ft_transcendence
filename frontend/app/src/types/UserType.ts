enum user_status {
	online,
	offline,
	ingame
}

export type UserInterface = {
	readonly id: number;
	userName: string;
	status: user_status;
	oauth_refresh_token: string;
	oauth_token_expiration_timestamp: string; //TODO ask jesse if this is the correct format -> TIMESTAMP '2004-10-19 10:23:54'
	gamesPlayed: number; //TODO remove this later on
	gamesWon: number; //TODO remove this later on
	gamesLost: number; //TODO remove this later on
	isLoggedIn: boolean;
} 
