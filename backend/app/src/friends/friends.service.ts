import { Injectable } from '@nestjs/common';
import { Friend, FriendRequest, FriendTable } from './friends.interface';
import axios from 'axios';
import { time } from 'console';
import * as moment from 'moment';


@Injectable()
export class FriendsService {

	findAllForUser(id:number): Promise<Friend[]> {
		return new Promise((accept, reject) => {
			axios.get(`http://localhost:${process.env.PGREST_PORT}/vw_friends?user_id=eq.${id}&request_status=eq.accepted`)
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
			axios.get(`http://localhost:${process.env.PGREST_PORT}/vw_friend_requests?user_id=eq.${id}`)
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

	async createFriend(friend: FriendTable): Promise<string> {
		axios.post(`http://localhost:${process.env.PGREST_PORT}/friends`, {
			from_user_id: friend.from_user_id,
			to_user_id: friend.to_user_id,
			status: "send"
		})
		return "Friend request added to database";
	}

	async acceptRequest(friend: FriendTable) : Promise<string> { 
		axios.patch(`http://localhost:${process.env.PGREST_PORT}/friends?from_user_id=eq.${friend.from_user_id}&to_user_id=eq.${friend.to_user_id}`, {
			status: "accepted",
			response_time: moment().format('YYYY-MM-DD HH:mm:ss')})
				.then(res => res)
				.catch(err => console.log(err));
		axios.post(`http://localhost:${process.env.PGREST_PORT}/friends`, {
			from_user_id: friend.to_user_id,
			to_user_id: friend.from_user_id,
			status: "accepted",
			response_time: moment().format('YYYY-MM-DD HH:mm:ss')
		})
		return "Friend request updated";
	}

	async declineRequest(friend: FriendTable) : Promise<string> {
		axios.patch(`http://localhost:${process.env.PGREST_PORT}/friends?from_user_id=eq.${friend.from_user_id}&to_user_id=eq.${friend.to_user_id}`, {
			status: "declined",
			response_time: moment().format('YYYY-MM-DD HH:mm:ss')})
				.then(res => res)
				.catch(err => console.log(err));
		return "Friend request updated";
	}

	async deleteFriend(friend: FriendTable) : Promise<string> {
		axios.delete(`http://localhost:${process.env.PGREST_PORT}/friends?from_user_id=eq.${friend.from_user_id}&to_user_id=eq.${friend.to_user_id}`)
				.then(res => res)
				.catch(err => console.log(err));
		axios.delete(`http://localhost:${process.env.PGREST_PORT}/friends?from_user_id=eq.${friend.to_user_id}&to_user_id=eq.${friend.from_user_id}`)
				.then(res => res)
				.catch(err => console.log(err));
		return "success";
	}
}
