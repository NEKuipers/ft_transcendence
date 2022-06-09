import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
	console.log("Got connection:", socket)
});

httpServer.listen(4113);
console.log("SocketIO server running!")