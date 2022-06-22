import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { EventEmitter } from 'events';

import { settings as pong_settings } from './pong';


const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:8080",
		credentials: true
	},
	allowEIO3: true
});

enum SocketState {
	Menu,
	InQueue,
	InMatch,
}

io.use((socket, next) => {
	if (socket.handshake.auth.token !== "abcd") {	// TODO: Actually validate the auth token
		const err = new Error("Bad auth token (TODO: currently only \"abcd\" is valid, make this actually check if the token is valid)!");
		err.stack = null;
		next(err);
		return;
	}

	// TODO: Actually read username from auth token
	socket.data.username = "insert generic name here";
	socket.data.userid = 0;
	next();
})

let last_room_id = 0;
function get_new_match_room_name(): string {
	last_room_id += 1;
	return "match:" + last_room_id;
}

class Match {
	settings: pong_settings;
	p1: Socket;
	p2: Socket;
	room_name: string;
	p1_score: number;
	p2_score: number;
	events: EventEmitter;

	constructor(settings: pong_settings, p1: Socket, p2: Socket) {
		p1.data.state = SocketState.InMatch;
		p2.data.state = SocketState.InMatch;

		this.settings = settings;
		this.p1 = p1;
		this.p2 = p2;
		this.p1_score = 0;
		this.p2_score = 0;
		this.events = new EventEmitter();

		this.room_name = get_new_match_room_name();

		console.log("Playing match between", p1.id, "and", p2.id)
		p1.join(this.room_name);
		p2.join(this.room_name);

		p1.emit("match_start", 1, settings);
		p2.emit("match_start", 2, settings);

		p1.on("disconnect", () => this.finish());
		p2.on("disconnect", () => this.finish());

		p1.on("paddle:1", (pos: number) => this.p1.to(this.room_name).emit("paddle:1", pos));
		p2.on("paddle:2", (pos: number) => this.p2.to(this.room_name).emit("paddle:2", pos));

		p1.on("ball", (pos_x: number, pos_y: number, vel_x: number, vel_y: number) => this.p1.to(this.room_name).emit("ball", pos_x, pos_y, vel_x, vel_y));
		p2.on("ball", (pos_x: number, pos_y: number, vel_x: number, vel_y: number) => this.p2.to(this.room_name).emit("ball", pos_x, pos_y, vel_x, vel_y));

		p1.on("loss", () => {
			this.p2_score += 1
			io.to(this.room_name).emit("match_winner", 2)
		});
		p2.on("loss", () => {
			this.p1_score += 1
			io.to(this.room_name).emit("match_winner", 1)
		});
	}

	finish() {
		// Make everyone leave the room
		io.to(this.room_name).emit("match_stop");

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

		this.events.emit("match_stop");
	}
}

class MatchMaker {
	settings: pong_settings;
	waiting_for_game_connections : Array<Socket>;
	running_matches : Array<Match>;

	constructor(settings: pong_settings) {
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
			
			let match = new Match(this.settings, p1, p2);	// Will set socket state to be in match

			this.running_matches.push(match);
			match.events.addListener("match-stop", () => {
				let index = this.running_matches.indexOf(match);
				if (index >= 0) {
					this.running_matches.splice(index, 1);
				}
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
let classic_matchmaker = new MatchMaker(new pong_settings(20, 60, 20, 20, 400, 300, 1, 1, 20, 9));
let speedup_matchmaker = new MatchMaker(new pong_settings(20, 60, 20, 20, 400, 300, 1.05, 2, 20, 7));
let rush_matchmaker = new MatchMaker(new pong_settings(20, 60, 20, 20, 550, 300, 1.1, 3, 20, 5));
let expert_matchmaker = new MatchMaker(new pong_settings(10, 20, 20, 20, 200, 300, 1.05, 3, 20, 5));

io.on("connection", (socket) => {
	console.log("Got connection:", socket.id);
	socket.data.state = SocketState.Menu;

	socket.on("join_queue", (queue) => {
		if (socket.data.state !== SocketState.Menu) {
			console.log("socket", socket.id, "tired to join a queue while it was not in the menu state, it was in:", socket.data.state);
			socket.disconnect(true);
			return;
		}

		if (queue === "classic") {
			classic_matchmaker.add_to_waiting_list(socket);
		} else if (queue === "speedup") {
			speedup_matchmaker.add_to_waiting_list(socket);
		} else if (queue === "rush") {
			rush_matchmaker.add_to_waiting_list(socket);
		} else if (queue === "expert") {
			expert_matchmaker.add_to_waiting_list(socket);
		} else {
			console.log("socket", socket.id, "tired to join a queue that does not exist:", queue);
			socket.disconnect(true);
			return;
		}
	})	
});

const port = 4113;
httpServer.listen(port, () => {
	console.log("SocketIO server running on port,", port, "!")
});