import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => console.log("✅ Connected:", socket.id));
socket.on("payment:new", (data) => console.log("💰 New Payment:", data));
socket.on("payment:statusUpdated", (data) => console.log("💳 Payment Updated:", data));
