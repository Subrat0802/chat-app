import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port:8080});

wss.on("connection", (socket) => {
    console.log("hello");

    socket.on("message", (message) => {
        if(message.toString() === "ping"){
            return socket.send("Pong")
        }
        socket.send("Bro nahh please send ping");
    })
})