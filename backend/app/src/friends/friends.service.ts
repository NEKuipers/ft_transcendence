import { Injectable } from '@nestjs/common';
import { Friend, FriendRequest} from './friends.interface';
import axios from 'axios';
import { time } from 'console';
import * as moment from 'moment';
import { NONAME } from 'dns';


@Injectable()
export class FriendsService {

	findAllForUser(id:number): Promise<Friend[]> {
		return new Promise((accept, reject) => {
			axios.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/vw_friends?user_id=eq.${id}&request_status=eq.accepted`)
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

	findAllRequestsForUser(id: number) : Promise<FriendRequest[]> {
		return new Promise((accept, reject) => {
			axios.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/vw_friend_requests?user_id=eq.${id}`)
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

	async isFriend(your_id: number, other_id: number) : Promise<number> {
		const res = await axios.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/friends?from_user_id=eq.${your_id}&to_user_id=eq.${other_id}`);
		if (res.data.length == 0)
			return -1;
		if (res.data[res.data.length - 1].status == 'accepted')
			return 2;
		if (res.data[res.data.length - 1].status == 'send')
			return 0;
		return 1;
	}

	async createFriend(from_id: number, other_id: number): Promise<string> {
		axios.post(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/friends`, {
			from_user_id: from_id,
			to_user_id: other_id,
			status: "send"
		})
		return "Friend request added to database";
	}

	async acceptRequest(from_id: number, other_id: number) : Promise<string> { 
		axios.patch(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/friends?from_user_id=eq.${other_id}&to_user_id=eq.${from_id}`, {
			status: "accepted",
			response_time: moment().format('YYYY-MM-DD HH:mm:ss')})
			.then(res => res)
			.catch(err => console.log(err));
		axios.post(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/friends`, {
			from_user_id: from_id,
			to_user_id: other_id,
			status: "accepted",
			response_time: moment().format('YYYY-MM-DD HH:mm:ss')
		})
		return "Friend request updated";
	}

	async declineRequest(from_id: number, other_id: number) : Promise<string> {
		axios.patch(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/friends?from_user_id=eq.${other_id}&to_user_id=eq.${from_id}`, {
			status: "declined",
			response_time: moment().format('YYYY-MM-DD HH:mm:ss')})
				.then(res => res)
				.catch(err => console.log(err));
		return "Friend request updated";
	}

	async deleteFriend(from_id: number, other_id: number) : Promise<string> {
		axios.delete(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/friends?from_user_id=eq.${from_id}&to_user_id=eq.${other_id}`)
				.then(res => res)
				.catch(err => console.log(err));
		axios.delete(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/friends?from_user_id=eq.${other_id}&to_user_id=eq.${from_id}`)
				.then(res => res)
				.catch(err => console.log(err));
		return "success";
	}
}
