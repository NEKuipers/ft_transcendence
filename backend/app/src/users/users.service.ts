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

	async findOneIntra(intra_id: number): Promise<User | undefined> {
		let res = await axios.get(`http://localhost:${process.env.PGREST_PORT}/users?intra_id=eq.${intra_id}`)
		return res.data[0];
	}

	async findOneByName(userName: string): Promise<User | undefined> {
		let res = await axios.get(`http://localhost:${process.env.PGREST_PORT}/users?username=eq.${userName}`)
		return res.data[0];
	}

	async createUser(CreateUserDto: CreateUserDto): Promise<User | undefined> {
		await axios.post(`http://localhost:${process.env.PGREST_PORT}/users`, {
			username: CreateUserDto.username,
			status: CreateUserDto.status,
			avatar_id: CreateUserDto.avatar_id,
			intra_id: CreateUserDto.intra_id,
			oauth_refresh_token: CreateUserDto.oauth_refresh_token,
			oauth_token_expiration_time: CreateUserDto.oauth_token_expiration_time,
			is_logged_in: CreateUserDto.is_logged_in
		}).then((res) => {
			// console.log('Creation request outcome:', res.statusText)
			res
		}).catch((err) => {
			console.error(err);
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

	async changeAvatar(id: number, newavatar: number) {
		await axios.patch(`http://localhost:${process.env.PGREST_PORT}/users?id=eq.${id}`, {
			avatar_id: newavatar})
		return "success";
	}
}
