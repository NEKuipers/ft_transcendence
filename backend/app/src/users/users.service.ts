import { Injectable } from '@nestjs/common';
import { User } from './user.interface'
import { HttpService } from '@nestjs/axios'
import axios from 'axios';
import { CreateUserDto } from './create-user.dto';
import { json } from 'stream/consumers';

@Injectable()
export class UsersService {

	constructor(private readonly httpService: HttpService) {}

	users: User[] = [
		// {id: 1, username: "jevan-de", status: 0, oauth_refresh_token: "", oauth_token_expiration_timestamp: "2022-06-16 17:00:00", gamesPlayed: 8, gamesWon: 2, gamesLost: 6, isLoggedIn: true, leaderboardPosition: 6},
		// {id: 2, username: "tmullan", status: 0, oauth_refresh_token: "", oauth_token_expiration_timestamp: "2022-06-16 17:00:00", gamesPlayed: 3, gamesWon: 2, gamesLost: 1, isLoggedIn: true, leaderboardPosition: 7},
		// {id: 3, username: "nkuipers", status: 0, oauth_refresh_token: "", oauth_token_expiration_timestamp: "2022-06-16 17:00:00", gamesPlayed: 42, gamesWon: 41, gamesLost: 1, isLoggedIn: true, leaderboardPosition: 3},
		// {id: 4, username: "jsimonis", status: 0, oauth_refresh_token: "",oauth_token_expiration_timestamp: "2022-06-16 17:00:00",  gamesPlayed: 100, gamesWon: 50, gamesLost: 50, isLoggedIn: true, leaderboardPosition: 2},
		// {id: 5, username: "a-user", status: 2, oauth_refresh_token: "", oauth_token_expiration_timestamp: "2022-06-16 17:00:00", gamesPlayed: 12, gamesWon: 3, gamesLost: 9, isLoggedIn: true, leaderboardPosition: 5},
		// {id: 6, username: "guy-last", status: 2, oauth_refresh_token: "", oauth_token_expiration_timestamp: "2022-06-16 17:00:00", gamesPlayed: 65, gamesWon: 24, gamesLost: 41, isLoggedIn: false, leaderboardPosition: 4},
		// {id: 7, username: "cwinner", status: 1, oauth_refresh_token: "", oauth_token_expiration_timestamp: "2022-06-16 17:00:00", gamesPlayed: 500, gamesWon: 500, gamesLost: 0, isLoggedIn: true, leaderboardPosition: 1},
		// {id: 8, username: "mrpers", status: 0, oauth_refresh_token: "", oauth_token_expiration_timestamp: "2022-06-16 17:00:00", gamesPlayed: 4, gamesWon: 0, gamesLost: 4, isLoggedIn: false, leaderboardPosition: 8}

	];

	user: User

	async findAll(): Promise<User[]> {
		const res = this.httpService.get('http://localhost:3000/users')
		await res.forEach(element => {
			this.users = element.data
		});
		return this.users;
	}

	async findOne(id: number): Promise<User> {
		// this.httpService.axiosRef.interceptors.request.use(function(config) {
		// 	console.log('Dicoane', config)
		// 	return config
		// }), function (error) {
		// 	return Promise.reject(error)
		// }
		const ret = await this.httpService.get('http://localhost:3000/users', {
			params: {
				id: 'eq.' + id
			}
		})
		await ret.forEach(element => {
			this.user = element.data[0]
		})
		return this.user
	}

	async findOneByName(userName: string): Promise<User> {
		// this.httpService.axiosRef.interceptors.request.use(function(config) {
		// 	console.log('Dicoane', config)
		// 	return config
		// }), function (error) {
		// 	return Promise.reject(error)
		// }
		const ret = await this.httpService.get('http://localhost:3000/users', {
			params: {
				username: 'eq.' + userName
			}
		})
		
		await ret.forEach(element => {
			this.user = element.data[0]
		})
		return this.user
		// return this.users.find(user => user.username == userName);
	}

	async createUser(CreateUserDto: CreateUserDto): Promise<User> {
		// this.httpService.axiosRef.interceptors.request.use(function(config) {
		// 	console.log('Dicoane', config)
		// 	return config
		// }), function (error) {
		// 	return Promise.reject(error)
		// }
		// console.log('Attempting to create user:', CreateUserDto)
		// this.httpService.axiosRef.interceptors.response.use(function(config) {
		// 	console.log('Rcoddio', config)
		// 	return config
		// }), function (error) {
		// 	return Promise.reject(error)
		// }
		const data = JSON.stringify(CreateUserDto)

		try {
			this.httpService.post('http://localhost:3000/users', {
				username: CreateUserDto.username,
				status: CreateUserDto.status,
				avatar_id: CreateUserDto.avatar_id,
				oauth_refresh_token: CreateUserDto.oauth_refresh_token,
				oauth_token_expiration_time: CreateUserDto.oauth_token_expiration_time,
				is_logged_in: CreateUserDto.is_logged_in
			})
			.subscribe(response => console.log('Creation request outcome:', response.statusText))
		}
		catch (error) {
			console.log('error', error.status);
		}


		// ret.forEach(element => console.log(element.data))
		// console.log('Well,', ret.subscribe(element => element.data))
		return this.findOneByName(CreateUserDto.username)
	}
}
