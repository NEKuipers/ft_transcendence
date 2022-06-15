export class CreateUserDto {
	readonly id: string;
	userName: string;
	gamesPlayed: number;
	gamesWon: number;
	gamesLost: number;
}