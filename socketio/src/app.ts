import { request, createServer, IncomingMessage } from "http";
import { Namespace, Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";

import { EventEmitter } from 'events';

import { settings as pong_settings } from './pong';
import { HttpService } from "@nestjs/axios";

const SECRET_AUTH = process.env.JSON_WEB_TOKEN_SECRET;
const DATABASE_PORT = +process.env.PGREST_PORT;

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "*",
		credentials: true
	},
	allowEIO3: true
});

enum SocketState {
	Menu,
	InQueue,
	InMatch,
	Spectating,
}

function make_request(port: number, path: string, method: string, data: object, data_callback?: (data: Object) => void, error_callback?: (data: Object) => void) {
	let json_data = JSON.stringify(data);
	console.log(`Sending ${method} request to ${path} with data: ${json_data}`)

	if (!error_callback) {
		error_callback = (error) => {
			console.error(`Got error doing request to: ${path}: ${error}`);
		}
	}

	let req = request({
		hostname: 'localhost',
		port: port,
		path: path,
		method: method,
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': json_data.length,
		},
	}, res => {
		if (method == "POST") {
			if (res.statusCode != 201) {	// 201 created
				console.log(`Got statusCode for ${path}: ${res.statusCode} (${res.statusMessage}): ${JSON.stringify(res.headers, null, 4)}`)

				data_callback = function(data: Object) {
					console.log(`Its hint is: ${JSON.stringify(data, null, 4)}`);
				}
			}
			if (data_callback) {
				res = res.setEncoding('utf8');

				let combined = "";
				res.on("data", chunk => {
					//console.log("Got chunk:", chunk)
					combined += chunk;
				})
				res.on("end", () => {
					//console.log("End of transmission")
					data_callback(JSON.parse(combined));
				})
			}
		} else if (method == "PATCH") {
			if (res.statusCode != 204) {	// 204 no content
				console.log(`Got statusCode for ${path}: ${res.statusCode} (${res.statusMessage}): ${JSON.stringify(res.headers, null, 4)}`)
			}
		}
	});

	req.on("error", error => {
		if (error_callback) {
			error_callback(error);
		}
	})

	if (data_callback) {
		req.setHeader("Prefer", "return=representation");
	}
	req.write(json_data);
	req.end();
}

// Delete matches that are still "ongoing", even though we just started, therefore they are NOT running
make_request(DATABASE_PORT, `/matches?status=eq.ongoing`, "DELETE", {});

io.use((socket, next) => {
	let data = jwt.verify(socket.handshake.auth.token, SECRET_AUTH);
	if (data === undefined) {
		const err = new Error("Bad auth token!");
		err.stack = null;
		next(err);
		return;
	}

	if (typeof(data.userid) !== typeof(0) || typeof(data.username) !== typeof("")) {
		const err = new Error("Auth token valid, but contains bad data!");
		err.stack = null;
		next(err);
		return;
	}
	
	socket.data.userid = data.userid;
	socket.data.username = data.username;
	next();
})

let all_matches : { [key: string]: Match } = {}

class Match {
	settings: pong_settings;
	p1: Socket;
	p2: Socket;
	gamemode_name: string;
	room_name: string;
	p1_score: number;
	p2_score: number;
	event: EventEmitter;
	start_time: number;
	spectators: Array<Socket>;
	match_id: number;

	constructor(gamemode_name: string, settings: pong_settings, p1: Socket, p2: Socket) {
		p1.data.state = SocketState.InMatch;
		p2.data.state = SocketState.InMatch;

		this.settings = settings;
		this.p1 = p1;
		this.p2 = p2;
		this.gamemode_name = gamemode_name;
		this.p1_score = 0;
		this.p2_score = 0;
		this.event = new EventEmitter();
		this.start_time = Date.now();
		this.spectators = new Array();

		this.room_name = undefined;

		this.match_id = -1;

		// TODO: Maybe not allow the match to start in case this call fails
		make_request(DATABASE_PORT, "/matches", "POST", {
			"player_one": this.p1.data.userid,
			"player_two": this.p2.data.userid,
			"winner_id": this.p1.data.userid,	// IDK
			"start_time": new Date(this.start_time).toISOString(),
			"end_time": new Date(this.start_time).toISOString(),	// IDK
			"p1_points": 0,	// IDK
			"p2_points": 0,	// IDK
			"status": "ongoing",
			"reason": "out-of-time",	// IDK
			"mode": this.gamemode_name,
		}, data => {
			this.match_id = data[0].id;
			console.log("Got match id: ", this.match_id);

			this.room_name = "match:" + this.match_id;

			console.log("Playing match between", p1.id, "and", p2.id, "in room", this.room_name)
			p1.join(this.room_name);
			p2.join(this.room_name);

			p1.emit("match_start", 1, settings, p1.data.username, p2.data.username);
			p2.emit("match_start", 2, settings, p1.data.username, p2.data.username);

			p1.on("disconnect", () => this.finish());
			p2.on("disconnect", () => this.finish());

			p1.on("paddle:1", (pos: number) => this.p1.to(this.room_name).emit("paddle:1", pos));
			p2.on("paddle:2", (pos: number) => this.p2.to(this.room_name).emit("paddle:2", pos));

			p1.on("ball", (pos_x: number, pos_y: number, vel_x: number, vel_y: number) => this.p1.to(this.room_name).emit("ball", pos_x, pos_y, vel_x, vel_y));
			p2.on("ball", (pos_x: number, pos_y: number, vel_x: number, vel_y: number) => this.p2.to(this.room_name).emit("ball", pos_x, pos_y, vel_x, vel_y));

			p1.on("loss", () => {
				this.p2_score += 1
				io.to(this.room_name).emit("match_winner", 2)
				this.event.emit("match_winner", 2);

				this.reset_ball(true);
			});
			p2.on("loss", () => {
				this.p1_score += 1
				io.to(this.room_name).emit("match_winner", 1)
				this.event.emit("match_winner", 1)

				this.reset_ball(false);
			});

			this.event.on("match_winner", () => {
				if (this.p1_score >= this.settings.rounds || this.p2_score >= this.settings.rounds) {
					this.finish();
				}
			});

			this.reset_ball(true);

			all_matches[this.room_name] = this;
		}, error => {
			console.error(`Got error when making POST request to database to start match: ${error}`);

			p1.emit("match_stop", 0);
			p1.emit("match_stop", 0);

			this.p1.data.state = SocketState.Menu;
			this.p1.data.state = SocketState.Menu;
		})
	}

	spectate(spectator: Socket) {
		if (this.match_id < 0) {
			console.error(`Someone tried to spectate a match THAT HAS NOT STARTED`);
			spectator.disconnect();
			return;
		}

		spectator.emit("match_start", 0, this.settings, this.p1.data.username, this.p2.data.username);
		spectator.join(this.room_name);
		spectator.data.state = SocketState.Spectating;
		this.spectators.push(spectator);

		// Wow this is a AWFULL way of setitng the scores correct
		for (let step = 0; step < this.p1_score; step++) {
			spectator.emit("match_winner", 1)
		}
		for (let step = 0; step < this.p2_score; step++) {
			spectator.emit("match_winner", 2)
		}
	}

	reset_ball(for_p1: boolean) {
		let settings = this.settings;

		io.to(this.room_name).emit("ball",
			(settings.width - settings.ball_size) / 2,
			(settings.height - settings.ball_size) / 2,
			for_p1 ? -settings.ball_speed : settings.ball_speed,
			settings.ball_speed
		);
	}

	finish() {
		// Decide winner
		let winner : number;
		let winner_reason : string;

		if (this.p1.connected != this.p2.connected) {
			winner = this.p1.connected ? 1 : 2;
			winner_reason = "disconnect";
		} else if (this.p1_score != this.p2_score) {
			winner = this.p1_score > this.p2_score ? 1 : 2;
			winner_reason = "max-points-reached";
		} else {
			// Guess its a tie
			winner = 0;
			winner_reason = "tie";
		}

		// Disconnect events & apply state
		if (this.p1.connected) {
			this.p1.data.state = SocketState.Menu;

			this.p1.removeAllListeners("disconnect");
			this.p1.removeAllListeners("paddle:1");
			this.p1.removeAllListeners("loss");
			this.p1.removeAllListeners("ball");
		}
		if (this.p2.connected) {
			this.p2.data.state = SocketState.Menu;

			this.p2.removeAllListeners("disconnect");
			this.p2.removeAllListeners("paddle:2");
			this.p2.removeAllListeners("loss");
			this.p2.removeAllListeners("ball");
		}
		for (let spectator of this.spectators) {
			spectator.data.state = SocketState.Menu;
		}
		
		// Send results
		console.log("The winner is:", winner)
		io.to(this.room_name).emit("match_stop", winner);
		io.sockets.in(this.room_name).socketsLeave(this.room_name);	// Make all sockets leave the room

		let winner_id : number;
		if (winner != 0) {
			winner_id = winner == 1 ? this.p1.data.userid : this.p2.data.userid;
		} else {
			winner_id = 0;
		}

		if (this.match_id >= 0) {
			make_request(DATABASE_PORT, `/matches?id=eq.${this.match_id}`, "PATCH", {
				"winner_id": winner_id,
				"end_time": new Date(Date.now()).toISOString(),
				"p1_points": this.p1_score,
				"p2_points": this.p2_score,
				"status": "finished",
				"reason": winner_reason,
			})
		}

		delete all_matches[this.room_name];
	}
}

class MatchMaker {
	gamemode_name: string;
	settings: pong_settings;
	waiting_for_game_connections : Array<Socket>;
	running_matches : Array<Match>;

	constructor(gamemode_name: string, settings: pong_settings) {
		this.gamemode_name = gamemode_name;
		this.settings = settings;
		this.waiting_for_game_connections = new Array();
		this.running_matches = new Array();
	}

	matchmake() {
		while (this.waiting_for_game_connections.length >= 2) {
			let p1 = this.waiting_for_game_connections.pop();
			let p2 = this.waiting_for_game_connections.pop();
	
			p1.removeAllListeners("disconnect");
			p2.removeAllListeners("disconnect");
			
			let match = new Match(this.gamemode_name, this.settings, p1, p2);	// Will set socket state to be in match

			this.running_matches.push(match);
			match.event.addListener("match-stop", () => {
				let index = this.running_matches.indexOf(match);
				this.running_matches.splice(index, 1);
			})
		}
	}

	add_to_waiting_list(socket: Socket) {
		socket.data.state = SocketState.InQueue;

		this.waiting_for_game_connections.push(socket);
		socket.on("disconnect", (_) => {
			let index = this.waiting_for_game_connections.indexOf(socket);
			if (index >= 0) {
				this.waiting_for_game_connections.splice(index, 1);
			}
		})

		this.matchmake();
	}
}

let matchmakers = [
	new MatchMaker("classic", new pong_settings(20, 60, 20, 20, 400, 300, 1, 1, 20, 5, 700, 400)),
	new MatchMaker("speedup", new pong_settings(20, 60, 20, 20, 400, 300, 1.05, 2, 20, 4, 700, 400)),
	new MatchMaker("rush", new pong_settings(20, 60, 20, 20, 550, 300, 1.1, 3, 20, 3, 700, 400)),
	new MatchMaker("expert", new pong_settings(10, 20, 20, 20, 200, 300, 1.05, 3, 20, 5, 700, 400)),

	// Secret modes /shrug
	new MatchMaker("tiny", new pong_settings(10, 30, 10, 20, 400, 300, 1.05, 2, 20, 4, 350, 200)),
	new MatchMaker("big", new pong_settings(40, 120, 40, 20, 400, 300, 1.05, 2, 20, 4, 1400, 800)),
	new MatchMaker("speed", new pong_settings(20, 60, 20, 20, 1500, 300, 1.2, 5, 20, 4, 700, 400)),
];

io.on("connection", (socket) => {
	console.log("Got connection:", socket.id);
	socket.data.state = SocketState.Menu;

	socket.on("join", (request) => {
		if (socket.data.state !== SocketState.Menu) {
			console.log("socket", socket.id, "tired to join while it was not in the menu state, it was in:", socket.data.state);
			socket.disconnect(true);
			return;
		}

		// Spectate request?
		let data = all_matches[request];
		if (data) {
			data.spectate(socket);
			return;
		}

		//console.log(`${socket.id} wants to join on ${queue}`)
		for (let matchmaker of matchmakers) {
			if (matchmaker.gamemode_name === request) {
				matchmaker.add_to_waiting_list(socket);
				return;
			}
		}
		
		console.log("socket", socket.id, "tired to join that does not exist:", request);
		socket.disconnect(true);
	})
});

const port = 4113;
httpServer.listen(port, () => {
	console.log("SocketIO server running on port,", port, "!")
});