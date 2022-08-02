export interface Participant {
	readonly id: number;
	participant_id: number;
	is_admin: boolean;
	is_muted: boolean;
	is_banned: boolean;
	ban_meta: string;
	channel_id: number;
}