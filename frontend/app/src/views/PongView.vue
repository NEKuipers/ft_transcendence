<template>
	<div class="game">
		<h1>Let's play!</h1>
		<SocketIoConnection ref="connection" uri=":4113" server_name="pong server"/>
		<!-- img alt="Vue logo" src="../assets/pong-video-game.gif"-->
		<canvas id="canvas=" ref="canvas" width="700" height="400" style="background: black;"></canvas>
	</div>
</template>

<script lang="ts">

import SocketIoConnection from '../components/SocketIoConnection.vue';
import { Socket } from "socket.io-client";
import { defineComponent } from 'vue'

class rect {
	x: number;
	y: number;
	size_x: number;
	size_y: number;

	constructor(x: number, y: number, size_x: number, size_y: number) {
		this.x = x;
		this.y = y;
		this.size_x = size_x;
		this.size_y = size_y;
	}

	intersects(other: rect): boolean {
		return this.x < other.x + other.size_x && this.x + this.size_x > other.x
			&& this.y < other.y + other.size_y && this.y + this.size_y > other.y;
	}


	draw(context: CanvasRenderingContext2D) {
		context.fillRect(this.x, this.y, this.size_x, this.size_y);
	}
}

class ball extends rect {
	vel_x: number;
	vel_y: number;
	bounce_strength: number;

	constructor(x: number, y: number, size_x: number, size_y: number, bounce_strength: number, vel_x: number, vel_y: number) {
		super(x, y, size_x, size_y);

		this.bounce_strength = bounce_strength;
		this.vel_x = vel_x;
		this.vel_y = vel_y;
	}

	update(dt: number, game: rect): number {
		this.x += this.vel_x * dt;
		this.y += this.vel_y * dt;

		// Bounce off game rect...
		if (this.y < game.y) {
			this.y = game.y + (game.y - this.y);	// Move back inside
			this.vel_y = -this.vel_y;	// Bounce!
		}

		if (this.y + this.size_y > game.y + game.size_y) {
			this.y = game.y + game.size_y - this.size_y + (game.y + game.size_y - this.y - this.size_y);	// Move back inside
			this.vel_y = -this.vel_y;	// Bounce!
		}

		// Get winner
		if (this.x < game.x) {
			return 2;
		} else if (this.x + this.size_x > game.x + game.size_x) {
			return 1;
		}
		return 0;
	}

	bounce(player: player, socket: Socket, speed_increment: number) {
		if(this.intersects(player)) {
			this.vel_x = -this.vel_x;
			let diff = (this.y + this.size_y / 2) - (player.y + player.size_y / 2);
			this.vel_y += diff * this.bounce_strength;

			this.vel_x *= speed_increment;
			this.vel_y *= speed_increment;

			if (player.owner) {
				this.send(socket);
			}
		}
	}

	send(socket: Socket) {
		socket.emit("ball", this.x, this.y, this.vel_x, this.vel_y);
	}
	add_recv(socket: Socket) {
		socket.on("ball", (pos_x: number, pos_y: number, vel_x: number, vel_y: number) => {
			this.x = pos_x;
			this.y = pos_y;
			this.vel_x = vel_x;
			this.vel_y = vel_y;
		})
	}
	rem_recv(socket: Socket) {
		socket.removeAllListeners("ball");
	}
}

class player extends rect {
	player_id: number;
	owner: boolean;
	score: number;

	constructor(player_id: number, owner: boolean, x: number, y: number, size_x: number, size_y: number) {
		super(x, y, size_x, size_y);

		this.player_id = player_id;
		this.owner = owner;
		this.score = 0;
	}

	update(move_if_owner: number, game: rect, socket: Socket | undefined) {
		if (this.owner) {
			this.y += move_if_owner;

			// Clamp
			if (this.y < game.y) {
				this.y = game.y;
			} else if (this.y + this.size_y > game.y + game.size_y) {
				this.y = game.y + game.size_y - this.size_y;
			}

			if (socket && move_if_owner !== 0) {
				socket.emit("paddle:" + this.player_id, this.y);
			}
		}
	}

	add_recv(socket: Socket) {
		socket.on("paddle:" + this.player_id, (pos_y) => {
			this.y = pos_y;
		})
	}
	rem_recv(socket: Socket) {
		socket.removeAllListeners("paddle:" + this.player_id);
	}
}

export default defineComponent({
	props: {
		paddle_width: {
			type: Number,
			default: 20
		},
		paddle_height: {
			type: Number,
			default: 60
		},
		ball_size: {
			type: Number,
			default: 20
		},
		wall_offset: {
			type: Number,
			default: 20
		},
		move_speed: {
			type: Number,
			default: 400
		},
		ball_speed: {
			type: Number,
			default: 300
		},
		speed_increment: {
			type: Number,
			default: 1.05
		},
		bounce_strength: {
			type: Number,
			default: 2
		},
		border_size: {
			type: Number,
			default: 20
		},
		center_size: {
			type: Number,
			default: 10
		},
		center_num_lines: {
			type: Number,
			default: 10
		},
		send_time: {
			type: Number,
			default: 20
		}
	},
	components: {
		SocketIoConnection
	},

	data() {
		return {
			player: 0,
			has_lost: false,

			canvas: null as HTMLCanvasElement | null,
			context: null as CanvasRenderingContext2D | null,
			socket: null as Socket | null,

			ball: null as ball | null,

			p1: null as player | null,
			p2: null as player | null,

			game: null as rect | null,

			running: false,

			last_frame: 0,
			last_send: 0,

			keysPressed: {} as {[key: string]: boolean},
		}
	},

	mounted() {
		let socket = (this.$refs.connection as typeof SocketIoConnection).socket as Socket;
		this.socket = socket;
		
		socket.on("disconnect", () => {
			this.stop();
		})
		socket.on("match_start", (player: number) => {
			this.start(player);
		})
		socket.on("match_winner", (player: number) => {
			if (player === 1) {
				(this.p1 as player).score += 1;
			} else if (player === 2) {
				(this.p2 as player).score += 1;
			}

			this.has_lost = false;
		})
		socket.on("match_stop", () => {
			this.stop();
		})

		let canvas =  this.$refs.canvas as HTMLCanvasElement;
		this.canvas = canvas;

		this.context = canvas.getContext("2d");

		this.game = new rect(this.border_size - this.ball_size, this.border_size, canvas.width - (this.border_size - this.ball_size) * 2, canvas.height - this.border_size * 2);
	},

	methods: {
		keydown(e : KeyboardEvent) {
			//console.log("keydown: ", e);
			this.keysPressed[e.code] = true;
		},
		keyup(e : KeyboardEvent) {
			//console.log("keyup: ", e);
			this.keysPressed[e.code] = false;
		},

		start(player_id: number) {
			if (!this.running) {
				this.player = player_id;

				this.last_frame = Date.now();

				window.addEventListener("keydown", this.keydown);
				window.addEventListener("keyup", this.keyup);

				let canvas =  this.canvas as HTMLCanvasElement;
				this.ball = new ball(
					(canvas.width - this.ball_size) / 2,
					(canvas.height - this.ball_size) / 2,
					this.ball_size,
					this.ball_size,
					this.bounce_strength,
					this.ball_speed,
					this.ball_speed
				);

				this.p1 = new player(
					1,
					player_id == 1, 
					this.wall_offset,
					(canvas.height - this.paddle_height) / 2,
					this.paddle_width,
					this.paddle_height
				);

				this.p2 = new player(
					2,
					player_id == 2, 
					canvas.width - this.wall_offset - this.paddle_width,
					(canvas.height - this.paddle_height) / 2,
					this.paddle_width,
					this.paddle_height
				);

				let socket = this.socket as Socket;
				this.ball.add_recv(socket);
				this.p1.add_recv(socket);
				this.p2.add_recv(socket);

				this.running = true;
				this.game_loop();
			}
		},
		stop() {
			if (this.running) {
				window.removeEventListener("keydown", this.keydown);
				window.removeEventListener("keyup", this.keyup);

				this.running = false;

				// Clear the canvas
				let canvas = this.canvas as HTMLCanvasElement;
				let context = this.context as CanvasRenderingContext2D;
				let width = canvas.width;
				let height = canvas.height;
				
				context.fillStyle = "#000";
				context.fillRect(0, 0, width, height);

				let socket = this.socket as Socket;
				this.ball?.rem_recv(socket);
				this.p1?.rem_recv(socket);
				this.p2?.rem_recv(socket);
			}
		},

		game_loop() {
			if (!this.running) {
				return
			}
			// Request another frame
			window.requestAnimationFrame(this.game_loop);

			let current = Date.now();	// in ms
			let dt = (current - this.last_frame) / 1000;
			this.last_frame = current;
			let send = current > this.last_send + this.send_time;
			if (send) {
				this.last_send = current;
			}

			this.update(dt, send);
			this.draw_game();
		},
		
		update(dt: number, send: boolean) {
			let socket = this.socket as Socket;

			let diff = this.get_local_player_move_offset(dt);
			this.p1?.update(diff, this.game as rect, send ? socket : undefined);
			this.p2?.update(diff, this.game as rect, send ? socket : undefined);

			let ball = this.ball as ball;
			let winner = ball.update(dt, this.game as rect);

			if (ball.vel_x > 0) {
				ball.bounce(this.p2 as player, socket, this.speed_increment);
			} else if (ball.vel_x < 0) {
				ball.bounce(this.p1 as player, socket, this.speed_increment);
			}

			if (winner != 0 && winner != this.player && !this.has_lost) {
				this.has_lost = true;
				socket.emit("loss");

				let canvas = this.canvas as HTMLCanvasElement;
				ball.x = (canvas.width - this.ball_size) / 2;
				ball.y = (canvas.height - this.ball_size) / 2;
				ball.vel_y = this.ball_speed;
				ball.vel_x = ball.vel_x > 0 ? this.ball_speed : -this.ball_speed;
				ball.send(socket);
			}			
		},

		get_local_player_move_offset(dt: number) {
			let up = this.keysPressed["KeyW"] || this.keysPressed["ArrowUp"];
			let down = this.keysPressed["KeyS"] || this.keysPressed["ArrowDown"];

			let dir = (up ? -1 : 0) + (down ? 1 : 0);
			return dir * dt * this.move_speed;
		},

		draw_game() {
			let context = this.context as CanvasRenderingContext2D;
			let canvas = this.canvas as HTMLCanvasElement;
			let width = canvas.width;
			let height = canvas.height;

			// Clear the canvas
			context.fillStyle = "#000";
			context.fillRect(0, 0, width, height);

			// Test: draw game
			//context.fillStyle = "#aaa"
			//this.game?.draw(context);

			// Draw nice outline
			context.strokeStyle = "#fff";
			context.lineWidth = this.border_size / 4;
			context.strokeRect(this.border_size / 2, this.border_size / 2, width - this.border_size, height - this.border_size);

			// Draw players
			context.fillStyle = "#fff";
			this.p1?.draw(context);
			this.p2?.draw(context);

			// Draw ball
			this.ball?.draw(context);

			// Draw center
			let start = this.border_size / 2;
			let end = height - this.border_size / 2;
			let step = (end - start) / (this.center_num_lines * 2 - 1) * 2;
			for (var i = 0; i < this.center_num_lines; i += 1) {
				context.fillRect((width - this.center_size) / 2, start + i * step, this.center_size, step / 2);
			}

			// Draw scores
			context.font = "50px serif";
			context.textBaseline = "top";
			context.textAlign = "right";
			context.fillText((this.p1 as player).score.toString(), (width - this.center_size - this.border_size) / 2, this.border_size);
			context.textAlign = "left";
			context.fillText((this.p2 as player).score.toString(), (width + this.center_size + this.border_size) / 2, this.border_size);
		}
	},
})

</script>
