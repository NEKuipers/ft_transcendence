import { Injectable } from '@nestjs/common';
import { Friend, FriendRequest, FriendTable } from './friends.interface';
import axios from 'axios';


@Injectable()
export class FriendsService {

	findAllForUser(id:number): Promise<Friend[]> {
		return new Promise((accept, reject) => {
			axios.get(`http://localhost:${process.env.PGREST_PORT}/vw_friends?user_id=eq.${id}`)
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

	createFriend(friend: FriendTable): string {
		//add friend to db via post request here
		return "Friend request added to database";
	}

	updateFriend(friend: FriendTable) : string { 
		//update friend request when person who received the request responds
		console.log(friend);
		
		return "Friend request updated";
	}

	deleteFriend(friend: FriendTable) : string {
		//TODO make delete request to DB
		return "Friend deleted"
	}
}
