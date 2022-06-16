export interface Avatar {
	readonly id: number;
	user_id: number;
	//img: string; TODO figure out what this is supposed to be
	width: number;
	height: number;
	name: string;
	format: string;
}