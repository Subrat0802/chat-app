import { WebSocket, WebSocketServer } from "ws";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

const usersSocket: WebSocket[] = [];
console.log(usersSocket);
wss.on("connection", (socket) => {
  console.log("Client connected");
  usersSocket.push(socket);

  socket.on("message", async (message) => {
    const msg = message.toString().trim();
    console.log("Received:", msg);

    if (msg === "ping") {
      console.log("Sending Pong and creating chat");

      const response = await prismaClient.chat.create({
        data: {
          roomId: "f0433a65-748b-449a-aec1-9c961660c91b",
          text: "jaiiiii hooooooooo",
          senderId: "83ec846a-f7f9-47e6-a934-11b6ca24ee57",
        },
      });

      usersSocket.forEach((el) => {
        if (el.readyState === WebSocket.OPEN) {
          el.send(
            JSON.stringify({
              type: "Chat",
              data: response,
              message: "Pong",
            })
          );
        }
      });
    } else {
      console.log("Sending fallback message");
      socket.send("Bro nahh please send ping");
    }
  });

  socket.on("close", () => {
    const index = usersSocket.indexOf(socket);
    if (index > -1) usersSocket.splice(index, 1);
    console.log("Client disconnected");
  });
});
