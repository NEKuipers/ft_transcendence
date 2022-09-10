export interface Participant {
	id: number;
	participant_id: number;
	is_admin: boolean;
	is_muted: string;
	is_banned: boolean;
	channel_id: number;
}