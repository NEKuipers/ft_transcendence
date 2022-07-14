export interface BlockedUser {
	readonly id: number;
	blocked_by_id: number;
	blocked_user_id: number;
}

export interface BlockedUserVW {
	user_id: number;
	blocked_user_id: number;
	blocked_user_name: string
}