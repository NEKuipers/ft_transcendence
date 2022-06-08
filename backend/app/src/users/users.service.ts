import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface'

@Injectable()
export class UsersService {
	users: User[] = [
		{id: "1", firstName: "Jesse", lastName: "van der Wolf", userName: "jevan-de", gamesPlayed: 8, gamesWon: 2, gamesLost: 6},
		{id: "2", firstName: "Turlough", lastName: "Mullan", userName: "tmullan", gamesPlayed: 3, gamesWon: 2, gamesLost: 1},
		{id: "3", firstName: "Nick", lastName: "Kuipers", userName: "nkuipers",  gamesPlayed: 42, gamesWon: 41, gamesLost: 1},
		{id: "4", firstName: "Jasper", lastName: "Simonis", userName: "jsimonis", gamesPlayed: 100, gamesWon: 50, gamesLost: 50}
	];

	findAll(): User[] {
		return this.users;
	}

	findOne(id: string): User {
		return this.users.find(user => user.id === id);
	}
}
