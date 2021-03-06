//The two interfaces below are for the vw_friend and vw_friendrequests
export interface Friend {
	user_id: number; 
	username: string;
	to_user_id: number;
	to_username: string;
	send_time: string;
	response_time: string;
}

export interface FriendRequest { 
	user_id: number; 
	username: string; 
	from_user_id: number;
	from_username: string;
	send_time: string;
}

//This is for POST, DELETE and PATCH requests only, this is a one on one representation of how the data is stored in the DB table
enum friend_status {
	sent,
	declined,
	accepted
}

export interface FriendTable {
	readonly id: number;
	from_user_id: number;
	to_user_id: number;
	status: friend_status;
	sent_time: string; 
	response_time: string;
}