export interface Message {
	readonly id: number;
	channel_id: number;
	user_id: number;
	message: string;
}