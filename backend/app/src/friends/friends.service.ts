import { Injectable } from '@nestjs/common';
import { Friend, FriendRequest, FriendTable } from './friends.interface';

@Injectable()
export class FriendsService {
	friends: Friend[] = [];
	friendrequests: FriendRequest[] = [];

	findAll(): Friend[] {
		//get request to db here
		return this.friends;
	}

	findAllRequests(): FriendRequest[] {
		//get request to db here
		return this.friendrequests;
	}

	createFriend(friendtable: FriendTable): string {
		//add friend to db via post request here
		return "Friend request added to database";
	}

	updateFriend(id: number, friendtable: FriendTable) : string { 
		//update friend request when person who received the request responds
		return "Friend request updated";
	}

	deleteFriend(id: number) : string {
		//remove friend with id of number from friend table
		return "Friend deleted"
	}

}
