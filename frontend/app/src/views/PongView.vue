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
		time_step_ms: {
			type: Number,
			default: 16
		}
	},
	components: {
		SocketIoConnection
	},

	data() {
		return {
			canvas: null as HTMLCanvasElement?,
			context: null as CanvasRenderingContext2D?,

			ball_x: 0,
			ball_y: 0,

			ball_vx: this.ball_speed,
			ball_vy: this.ball_speed,

			p1_paddle_y: 0,
			p2_paddle_y: 0,

			running: false,

			last_frame: 0,

			keysPressed: {} as {[key: string]: boolean},

			p1_score: 21,
			p2_score: 42,
		}
	},

	mounted() {
		let socket = this.$refs.connection.socket as Socket;
		
		socket.on("connect", () => {
			this.start();
		})
		socket.on("disconnect", () => {
			this.stop();
		})
		socket.on("customEmit", (data : string) => {
			console.log("Got custom emit data via extra event:", data);
		});

		socket.emit('message', "extra client dataaas")

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

		start() {
			this.last_frame = Date.now();

			window.addEventListener("keydown", this.keydown);
			window.addEventListener("keyup", this.keyup);

			this.running = true;
			this.game_loop();
		},
		stop() {
			window.removeEventListener("keydown", this.keydown);
			window.removeEventListener("keyup", this.keyup);

			this.running = false;
		},

		game_loop() {
			if (!this.running) {
				return
			}
			// Request another frame
			window.requestAnimationFrame(this.game_loop);

			let current = Date.now();	// in ms
			while (current > this.last_frame) {
				this.update();
				this.last_frame += this.time_step_ms;
			}

			this.draw_game();

		},
		
		update() {
			let dt = this.time_step_ms / 1000;
			this.update_p1(dt);
			this.update_ball(dt);
		},

		update_p1(dt: number) {
			let height = this.canvas.height;

			let up = this.keysPressed["KeyW"] || this.keysPressed["ArrowUp"];
			let down = this.keysPressed["KeyS"] || this.keysPressed["ArrowDown"];

			let dir = (up ? -1 : 0) + (down ? 1 : 0);

			this.p1_paddle_y += dir * dt * this.move_speed;

			// Clamp to game bounds
			if (this.p1_paddle_y < this.border_size) {
				this.p1_paddle_y = this.border_size;
			}
			if (this.p1_paddle_y + this.paddle_height > height - this.border_size) {
				this.p1_paddle_y = height - this.border_size - this.paddle_height;
			}
			

			// TEMP: p2 is p1 also
			this.p2_paddle_y = this.p1_paddle_y;
		},

		update_ball(dt: number) {
			let width = this.canvas.width;
			let height = this.canvas.height;

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
				}
			}
			if (this.ball_x + this.ball_size >= width - this.wall_offset - this.paddle_width && this.ball_vx > 0) {	// Can bounce of p2 (x)
				if (this.ball_y <= this.p2_paddle_y + this.paddle_height && this.ball_y + this.ball_size >= this.p2_paddle_y) {	// And y also matches
					this.ball_vx = -this.ball_vx;
					let diff = (this.ball_y + this.ball_size / 2) - (this.p2_paddle_y + this.paddle_height / 2);
					this.ball_vy += diff * this.bounce_strength;
				}
			}
		},

		draw_game() {
			let context = this.context as CanvasRenderingContext2D;
			let width = this.canvas.width;
			let height = this.canvas.height;

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
