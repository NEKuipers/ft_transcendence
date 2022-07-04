export class CreateUserDto {
	readonly id: number;
	username: string;
	status: string;
	avatar_id: number;
	oauth_refresh_token: string;
	oauth_token_expiration_time: string;
	gamesPlayed?: number;
	gamesWon?: number;
	gamesLost?: number;
	is_logged_in: boolean;
}
