import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:8080",
		credentials: true
	},
	allowEIO3: true
});

/*
io.use((socket, next) => {
	console.log("handshake: ", socket.handshake)
	return next();
})
*/

let last_room_id = 0;
function get_new_match_room_name(): string {
	last_room_id += 1;
	return "match:" + last_room_id;
}

class match {
	p1: Socket;
	p2: Socket;
	room_name: string;
	p1_score: number;
	p2_score: number;

	constructor(p1: Socket, p2: Socket) {
		this.p1 = p1;
		this.p2 = p2;
		this.p1_score = 0;
		this.p2_score = 0;

		this.room_name = get_new_match_room_name();

		console.log("Playing match between", p1.id, "and", p2.id)
		p1.join(this.room_name);
		p2.join(this.room_name);

		p1.emit("match_start", 1)
		p2.emit("match_start", 2)

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
			this.p1.removeAllListeners("disconnect");
			this.p1.removeAllListeners("paddle:1");
			this.p1.removeAllListeners("loss");
			this.p1.removeAllListeners("ball");

			add_to_waiting_list(this.p1);
		}
		if (this.p2.connected) {
			this.p2.removeAllListeners("disconnect");
			this.p2.removeAllListeners("paddle:2");
			this.p2.removeAllListeners("loss");
			this.p2.removeAllListeners("ball");
			
			add_to_waiting_list(this.p2);
		}
	}
}

let waiting_for_game_connections : Array<Socket> = new Array();
function matchmake() {
	while (waiting_for_game_connections.length >= 2) {
		let p1 = waiting_for_game_connections.pop();
		let p2 = waiting_for_game_connections.pop();

		p1.removeAllListeners("disconnect");
		p2.removeAllListeners("disconnect");

		new match(p1, p2);
	}
}
function add_to_waiting_list(socket: Socket) {
	waiting_for_game_connections.push(socket);
	socket.on("disconnect", (reason) => {
		console.log("waiting list disconenct: ", socket.id, reason);
		let index = waiting_for_game_connections.indexOf(socket);
		if (index >= 0) {
			waiting_for_game_connections.splice(index, 1);
		}
	})
	matchmake();
}

io.on("connection", (socket) => {
	console.log("Got connection:", socket.id);

	add_to_waiting_list(socket);
	
	socket.emit("customEmit", "Hello from socketio server!");

	socket.on('message', (msg) => {
		console.log("Got message:", msg)
		//io.emit('customEmit', `server: ${msg}`);	// This is broadcast
		socket.emit('customEmit', `server: ${msg}`);
	});

	
});

const port = 4113;
httpServer.listen(port, () => {
	console.log("SocketIO server running on port,", port, "!")
});