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

