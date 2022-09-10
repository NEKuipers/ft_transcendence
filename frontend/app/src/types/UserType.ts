enum user_status {
	online,
	offline,
	ingame
}

export type User = {
	readonly id: number;
	username: string;
	status: user_status;
	avatar_id: number;
	intra_id: number;
	oauth_refresh_token: string;
	oauth_token_expiration_time: string;
	is_logged_in: boolean;
} 
