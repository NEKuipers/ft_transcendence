export class CreateUserDto {
	readonly id: string;
	readonly firstName: string;
	readonly lastName: string;
	userName: string;
	gamesPlayed: number;
	gamesWon: number;
	gamesLost: number;
}