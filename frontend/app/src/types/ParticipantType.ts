export enum channel_type {
	public,
	protected,
	direct
}

export type Participant  = {
	id: number;
	channel_id: number,
	channel_name: string,
	channel_type: channel_type,
	channel_owner_id: number,
	channel_is_closed: boolean,
	participant_id: number,
	participant_username: string,
	participant_is_joined: boolean,
	participant_is_admin: boolean,
	participant_is_muted: string,
	participant_is_banned: boolean
}