enum user_status {
	online,
	offline,
	ingame
}

export interface User {
	readonly id: number;
	username: string;
	status: user_status;
	oauth_refresh_token: string;
	oauth_token_expiration_timestamp: string; // format it https://en.wikipedia.org/wiki/ISO_8601
	gamesPlayed?: number; //TODO remove this later on
	gamesWon?: number; //TODO remove this later on
	gamesLost?: number; //TODO remove this later on
	isLoggedIn: boolean;
	leaderboardPosition?: number;
}

export interface newUsername {
	username: string;
}