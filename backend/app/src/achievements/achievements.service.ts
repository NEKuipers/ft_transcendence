import { Injectable } from '@nestjs/common';
import { Achievement } from './achievements.interface';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AchievementsService {

	constructor (private readonly httpService: HttpService) {}

	achievements: Achievement[] = [
		// {id: 1, name: "beginner", description: "play 10 games", function: {}},
		// {id: 2, name: "first win", description: "win 1 game", function: {}},
		// {id: 3, name: "junior", description: "win 3 games", function: {}},
		// {id: 4, name: "medior", description: "win 10 games", function: {}},
		// {id: 5, name: "senior", description: "win 20 games", function: {}},
		// {id: 6, name: "turkey", description: "win 3 consecutive games", function: {}},

	] //TODO collect from DB instead

	async findAll(): Promise<Achievement[]> {
		//http request -> postgress/achievemnents
		// return this.achievements;
		const res = this.httpService.get('http://localhost:3000/achievements')
		await res.forEach(element => {
			this.achievements = element.data
		})
		return this.achievements
	}

	findOne(id: number): Achievement {
		return this.achievements.find(achievement => achievement.id == id);
	}
}
