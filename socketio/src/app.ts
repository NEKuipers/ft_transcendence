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

class match {
	p1: Socket;
	p2: Socket;

	constructor(p1: Socket, p2: Socket) {
		this.p1 = p1;
		this.p2 = p2;

		console.log("Playing match between", p1.id, "and", p2.id)

		p1.emit("match_start")
		p2.emit("match_start")

		p1.on("disconnect", (reason) => { console.log("match-disconnect! p1", reason); this.finish(); } );
		p2.on("disconnect", (reason) => { console.log("match-disconnect! p2", reason); this.finish(); } );
	}

	finish() {
		if (this.p1.connected) {
			this.p1.emit("match_stop");
			this.p1.off("disconnect", this.finish);
			add_to_waiting_list(this.p1);
		}
		if (this.p2.connected) {
			this.p2.emit("match_stop");
			this.p2.off("disconnect", this.finish);
			add_to_waiting_list(this.p2);
		}
	}
}

let waiting_for_game_connections : Array<Socket> = new Array();
function matchmake() {
	while (waiting_for_game_connections.length >= 2) {
		let p1 = waiting_for_game_connections.pop();
		let p2 = waiting_for_game_connections.pop();
		
		new match(p1, p2);
	}
}
function add_to_waiting_list(socket: Socket) {
	waiting_for_game_connections.push(socket);
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

	socket.on("disconnect", (reason) => {
		console.log("disconnected: ", socket.id, reason);
		let index = waiting_for_game_connections.indexOf(socket);
		if (index >= 0) {
			waiting_for_game_connections.slice(index, 1);
		}
	})
});

const port = 4113;
httpServer.listen(port, () => {
	console.log("SocketIO server running on port,", port, "!")
});