import { WebSocket, WebSocketServer } from "ws";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

const usersSocket: WebSocket[] = [];
console.log(usersSocket);

wss.on("connection", (socket, request) => {
  const url = request.url; // "/?roomId=abc123&user=xyz456"
  if (!url) return;

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const roomId = queryParams.get("roomId"); // "abc123"
  const userId = queryParams.get("user"); // "xyz456"

  // console.log("Client connected:", { roomId, userId });

  console.log("Client connected", url);
  usersSocket.push(socket);

  socket.on("message", async (message) => {
    const msg = message.toString().trim();
    console.log("Received:", msg);

    if (msg) {
      if (!roomId || !userId) {
        console.log("Missing roomId or userId");
        return;
      }

      const response = await prismaClient.chat.create({
        data: {
          roomId: roomId,
          text: msg,
          senderId: userId,
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
