export interface Channel {
	readonly id: number;
	name: string;
	type: number;
	owner_id: number;
	is_closed: boolean; 
}