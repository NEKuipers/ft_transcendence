import { Injectable } from '@nestjs/common';
import { Friend, FriendRequest, FriendTable } from './friends.interface';

@Injectable()
export class FriendsService {
	friends: Friend[] = [
		{
			user_id: 3,
			username: "nkuipers",
			to_user_id: 1,
			to_username: "jevan-de",
			send_time: "2022-06-16 17:00:00",
			response_time: "2022-06-17 17:00:00",
		},
		{
			user_id: 3,
			username: "nkuipers",
			to_user_id: 4,
			to_username: "jsimonis",
			send_time: "2022-06-16 17:00:00",
			response_time: "2022-06-17 17:00:00",
		},
	];
	friendrequests: FriendRequest[] = [
		{
			user_id: 3,
			username: "nkuipers", 
			from_user_id: 5,
			from_username: "a-user",
			send_time: "2022-06-16 17:00:00",
		},
	];

	findAll(): Friend[] {
		//get request to db here
		return this.friends;
	}

	findAllRequests(): FriendRequest[] {
		//get request to db here
		return this.friendrequests;
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
