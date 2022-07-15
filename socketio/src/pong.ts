export class settings {
	paddle_width: number;
	paddle_height: number;
	ball_size: number;
	wall_offset: number;
	move_speed: number;
	ball_speed: number;
	speed_increment: number;
	bounce_strength: number;
	border_size: number;
	rounds: number;
	width: number;
	height: number;

	constructor(
		paddle_width: number,
		paddle_height: number,
		ball_size: number,
		wall_offset: number,
		move_speed: number,
		ball_speed: number,
		speed_increment: number,
		bounce_strength: number,
		border_size: number,
		rounds: number,
		width: number,
		height: number,)
	{
		this.paddle_width = paddle_width;
		this.paddle_height = paddle_height;
		this.ball_size = ball_size;
		this.wall_offset = wall_offset;
		this.move_speed = move_speed;
		this.ball_speed = ball_speed;
		this.speed_increment = speed_increment;
		this.bounce_strength = bounce_strength;
		this.border_size = border_size;
		this.rounds = rounds;
		this.width = width;
		this.height = height;
	}
}