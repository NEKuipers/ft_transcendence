import { Injectable } from '@nestjs/common';
import { BlockedUserVW } from './blocked_users.interface';
import axios from 'axios';

@Injectable()
export class BlockedUsersService {

	findAllForUser(id: number) : Promise<BlockedUserVW[]> {
		return new Promise((accept, reject) => {
			axios.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/vw_blocked_users?user_id=eq.${id}`)
				.then((response) => {
					if (response.status != 200) {
						console.log(`Got statusCode: ${response.status} (${response.statusText}): ${JSON.stringify(response.headers, null, 4)}`)
						reject(response);
						return;
					}
					accept(response.data);
				}).catch((error) => {
					console.log(`Got error: ${error}`)
					reject(error);
				});
		});
	}

	async haveYouBlockedUser(your_id: number, other_id: number) : Promise<boolean> {
		let res = await axios.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/blocked_users?blocked_by_id=eq.${your_id}&blocked_user_id=eq.${other_id}`);
		return (res.data.length > 0);
	}

	async hasUserBlockedMe(your_id: number, other_id: number) : Promise<boolean> {
		let res = await axios.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/blocked_users?blocked_user_id=eq.${your_id}&blocked_by_id=eq.${other_id}`);
		return (res.data.length > 0);
	}

	async getAllWhoBlockedMe(id: number) : Promise<number[]> {
		let res = await axios.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/blocked_users?blocked_user_id=eq.${id}`);
		let ids = [];
		let blockers = res.data;
		for (let x = 0; x < blockers.length ; x++) {
			ids.push(blockers[x].blocked_by_id);
		}
		return ids;
	}

	async getAllWhoIHaveBlocked(id: number) : Promise<number[]> {
		let res = await axios.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/vw_blocked_users?user_id=eq.${id}`);
		let ids = [];
		let blocked_users = res.data;
		for (let x = 0; x < blocked_users.length ; x++) {
			ids.push(blocked_users[x].blocked_user_id);
		}
		return ids;
	}

	blockUser(from_id: number, other_id: number) : string {
		axios.post(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/blocked_users`, {
			"blocked_by_id": from_id,
			"blocked_user_id": other_id})
				.then(res => res)
				.catch(err => console.log(err));
		return "success";
	}

	unblockUser(from_id: number, other_id: number): string {
		axios.delete(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/blocked_users?blocked_by_id=eq.${from_id}&blocked_user_id=eq.${other_id}`)
				.then(res => res)
				.catch(err => console.log(err));
		return "success";
	}
}
