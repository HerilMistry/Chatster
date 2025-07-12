const express = require("express");
const WebSocket = require("ws");
const http = require("http");

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Basic WebSocket logic
wss.on("connection", (ws) => {
  console.log("New client connected");
  ws.on("message", (msg) => {
    console.log("Received:", msg);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });
});

app.get("/", (req, res) => {
  res.send("WebSocket server is running!");
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
