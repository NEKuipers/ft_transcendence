import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Achievement } from './achievements.interface';

@Injectable()
export class AchievementsService {

	constructor () {}

	async findAll(): Promise<Achievement[]> {
		//http request -> postgress/achievemnents
		let res = await axios.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/achievements`);
		return res.data;
	}

	async findUserAchievements(id: number): Promise<Achievement[]> {
		const ret = await axios.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/user_achievements?user_id=eq.${id}`);
		return ret.data
	}
}
