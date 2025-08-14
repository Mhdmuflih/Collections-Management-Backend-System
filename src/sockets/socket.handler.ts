import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

let io: SocketIOServer;

export const initSocket = (server: HttpServer) => {
    io = new SocketIOServer(server, {
        cors: { origin: "*" },
    });
    
    console.log("✅ Socket.IO initialized and waiting for connections...");

    io.on("connection", (socket: Socket) => {
        console.log("User Connected:", socket.id);
    });
};

export const getIO = (): SocketIOServer => {
    if (!io) throw new Error("Socket is not initialized");
    return io;
};
