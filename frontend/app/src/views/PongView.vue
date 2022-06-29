<template>
	<div class="game">
		<SocketIoConnection ref="connection" uri=":4113" server_name="pong server"/>
		<!-- img alt="Vue logo" src="../assets/pong-video-game.gif"-->
		<canvas id="canvas=" ref="canvas" width="700" height="400" style="background: black;"></canvas>
	</div>
</template>

<script lang="ts">
/*
 list of data requirements (fetch() calls) for this view:
	GET:
		Not entirely sure, usernames?
	POST:
		- Matches (at start of game)
	
	PATCH:
		- Matches (at end of game)
*/
import SocketIoConnection from '../components/SocketIoConnection.vue';
import { Socket } from "socket.io-client";
import { defineComponent } from 'vue'

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
			canvas: null as HTMLCanvasElement | null,
			context: null as CanvasRenderingContext2D | null,
			socket: null as Socket | null,

			ball_x: 0,
			ball_y: 0,

			ball_vx: this.ball_speed,
			ball_vy: this.ball_speed,

			p1_paddle_y: 0,
			p2_paddle_y: 0,

			running: false,

			last_frame: 0,
			last_send: 0,

			keysPressed: {} as {[key: string]: boolean},

			p1_score: 21,
			p2_score: 42,

			player: 0
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
		socket.on("match_stop", () => {
			this.stop();
		})

		socket.on("paddle", (player: number, pos: number) => {
			//console.log("Got paddle:", player, pos);
			if (player === 1) {
				this.p1_paddle_y = pos;
			} else if (player === 2) {
				this.p2_paddle_y = pos;
			}
		})

		socket.on("ball", (pos_x: number, pos_y: number, vel_x: number, vel_y: number) => {
			//console.log("Got ball:", pos_x, pos_y, vel_x, vel_y);
			this.ball_x = pos_x;
			this.ball_y = pos_y;
			this.ball_vx = vel_x;
			this.ball_vy = vel_y;
		})

		let canvas =  this.$refs.canvas as HTMLCanvasElement;
		this.canvas = canvas;

		this.context = canvas.getContext("2d");

		this.ball_x = (canvas.width - this.ball_size) / 2;
		this.ball_y = (canvas.height - this.ball_size) / 2;

		this.p1_paddle_y = (canvas.height - this.paddle_height) / 2;
		this.p2_paddle_y = (canvas.height - this.paddle_height) / 2;
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

		start(player: number) {
			if (!this.running) {
				console.log("I am player", player);

				this.player = player;
				this.last_frame = Date.now();

				window.addEventListener("keydown", this.keydown);
				window.addEventListener("keyup", this.keyup);

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
			if (diff != 0) {
				if (this.player === 1) {
					this.p1_paddle_y += diff;
					this.p1_paddle_y = this.clamp_paddle_y(this.p1_paddle_y);
					if (send) {
						socket.emit("paddle", this.p1_paddle_y);
					}
				} else if (this.player === 2) {
					this.p2_paddle_y += diff;
					this.p2_paddle_y = this.clamp_paddle_y(this.p2_paddle_y);
					if (send) {
						socket.emit("paddle", this.p2_paddle_y);
					}
				}
			}

			this.update_ball(dt);
		},

		get_local_player_move_offset(dt: number) {
			let up = this.keysPressed["KeyW"] || this.keysPressed["ArrowUp"];
			let down = this.keysPressed["KeyS"] || this.keysPressed["ArrowDown"];

			let dir = (up ? -1 : 0) + (down ? 1 : 0);
			return dir * dt * this.move_speed;
		},
		clamp_paddle_y(y: number): number {
			let canvas = this.canvas as HTMLCanvasElement;
			let height = canvas.height;

			if (y < this.border_size) {
				return this.border_size;
			}
			if (y + this.paddle_height > height - this.border_size) {
				return height - this.border_size - this.paddle_height;
			}

			return y;
		},

		update_ball(dt: number) {
			let canvas = this.canvas as HTMLCanvasElement;
			let width = canvas.width;
			let height = canvas.height;

			// Update ball
			this.ball_x += this.ball_vx * dt;
			this.ball_y += this.ball_vy * dt;

			if (this.ball_y <= this.border_size) { this.ball_vy = Math.abs(this.ball_vy); }
			if (this.ball_y >= height - this.ball_size - this.border_size) { this.ball_vy = -Math.abs(this.ball_vy); }

			// Bounce off paddles
			if (this.ball_x <= this.wall_offset + this.paddle_width && this.ball_vx < 0) {	// Can bounce of p1
				if (this.ball_y <= this.p1_paddle_y + this.paddle_height && this.ball_y + this.ball_size >= this.p1_paddle_y) {	// And y also matches
					this.ball_vx = -this.ball_vx;
					let diff = (this.ball_y + this.ball_size / 2) - (this.p1_paddle_y + this.paddle_height / 2);
					this.ball_vy += diff * this.bounce_strength;

					if (this.player === 1) {
						this.socket?.emit("ball", this.ball_x, this.ball_y, this.ball_vx, this.ball_vy);
					}
				}
			}
			if (this.ball_x + this.ball_size >= width - this.wall_offset - this.paddle_width && this.ball_vx > 0) {	// Can bounce of p2 (x)
				if (this.ball_y <= this.p2_paddle_y + this.paddle_height && this.ball_y + this.ball_size >= this.p2_paddle_y) {	// And y also matches
					this.ball_vx = -this.ball_vx;
					let diff = (this.ball_y + this.ball_size / 2) - (this.p2_paddle_y + this.paddle_height / 2);
					this.ball_vy += diff * this.bounce_strength;

					if (this.player === 2) {
						this.socket?.emit("ball", this.ball_x, this.ball_y, this.ball_vx, this.ball_vy);
					}
				}
			}
		},

		draw_game() {
			let context = this.context as CanvasRenderingContext2D;
			let canvas = this.canvas as HTMLCanvasElement;
			let width = canvas.width;
			let height = canvas.height;

			// Clear the canvas
			context.fillStyle = "#000";
			context.fillRect(0, 0, width, height);

			// Draw nice outline
			context.strokeStyle = "#fff";
			context.lineWidth = this.border_size / 4;
			context.strokeRect(this.border_size / 2, this.border_size / 2, width - this.border_size, height - this.border_size);

			// Draw players
			context.fillStyle = "#fff";

			context.fillRect(this.wall_offset, this.p1_paddle_y, this.paddle_width, this.paddle_height);
			context.fillRect(width - this.wall_offset - this.paddle_width, this.p2_paddle_y, this.paddle_width, this.paddle_height);

			// Draw ball
			context.fillRect(this.ball_x, this.ball_y, this.ball_size, this.ball_size);

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
			context.fillText(this.p1_score.toString(), (width - this.center_size - this.border_size) / 2, this.border_size);
			context.textAlign = "left";
			context.fillText(this.p2_score.toString(), (width + this.center_size + this.border_size) / 2, this.border_size);
		}
	},
})

</script>
