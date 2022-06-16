enum friend_status {
	sent, // the past tense of 'send' is 'sent', jesse :)
	declined,
	accepted
}

export interface Friend {
	readonly id: number;
	from_user_id: number;
	to_user_id: number;
	status: friend_status;
	sent_time: string; 
	response_time: string;
}