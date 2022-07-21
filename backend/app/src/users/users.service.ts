import { Injectable } from '@nestjs/common';
import { User } from './user.interface'
import { CreateUserDto } from './create-user.dto';
import axios from 'axios';

@Injectable()
export class UsersService {
	async findAll(): Promise<User[]> {
		let res = await axios.get(`http://localhost:${process.env.PGREST_PORT}/users`);
		return res.data;
	}

	async findOne(id: number): Promise<User | undefined> {
		let res = await axios.get(`http://localhost:${process.env.PGREST_PORT}/users?id=eq.${id}`)
		return res.data[0];
	}

	// TODO: FindOneByIntra -> Finds a user by intra id, required for oauth, currently it searches by username, so if you change your name it will create a new account

	async findOneByName(userName: string): Promise<User | undefined> {
		let res = await axios.get(`http://localhost:${process.env.PGREST_PORT}/users?username=eq.${userName}`)
		return res.data[0];
	}

	async createUser(CreateUserDto: CreateUserDto): Promise<User | undefined> {
		await axios.post('http://localhost:${process.env.PGREST_PORT}/users', {
			username: CreateUserDto.username,
			status: CreateUserDto.status,
			avatar_id: CreateUserDto.avatar_id,
			oauth_refresh_token: CreateUserDto.oauth_refresh_token,
			oauth_token_expiration_time: CreateUserDto.oauth_token_expiration_time,
			is_logged_in: CreateUserDto.is_logged_in
		}).then((res) => {
			console.log('Creation request outcome:', res.statusText)
		});

		return this.findOneByName(CreateUserDto.username)
	}

	async changeUsername(id: number, newUsername: string) : Promise<string> {
		let users = await this.findAll();
		if (users.find((user) => user.username == newUsername && user.id != id)) {
			return "taken";
		}

		await axios.patch(`http://localhost:${process.env.PGREST_PORT}/users?id=eq.${id}`, {
			username: newUsername})
		return "success";
	}
}
