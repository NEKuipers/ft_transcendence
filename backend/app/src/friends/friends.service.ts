import { Injectable } from '@nestjs/common';
import { Friend } from './friends.interface';

@Injectable()
export class FriendsService {
	friends: Friend[] = [];

	findAll(): Friend[] {
		return this.friends;
	}

	createFriendRequest(friend: Friend): string {
		//add friend to db via post request here
		return "Friend request added to database";
	}

	updateFriendRequest(id: number, friend: Friend) : string { 
		//update friend request when person who received the request responds
		return "Friend request updated";
	}

	deleteFriend(id: number) : string {
		//remove friend with id of number from friend table
		return "Friend deleted"
	}

}
