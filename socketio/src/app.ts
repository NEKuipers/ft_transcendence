import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:8080",
		credentials: true
	},
	allowEIO3: true
});

io.on("connection", (socket) => {
	console.log("Got connection:", socket.id)
	
	socket.emit("customEmit", "Hello from socketio server!");

	socket.on('message', (msg) => {
		console.log("Got message:", msg)
		io.emit('customEmit', `server: ${msg}`);
	});

	socket.on("disconnect", (reason) => {
		console.log("disconnected: ", socket.id, reason);
	})
});

const port = 4113;
httpServer.listen(port, () => {
	console.log("SocketIO server running on port,", port, "!")
});