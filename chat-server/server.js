const WebSocket = require("ws");

const wss = new WebSocket.Server({port: 8080});
const clients = new Set();

wss.on("connection",(ws)=>{
    clients.add(ws);
    console.log("New client connected. Total:",clients.size);

    ws.on("message", (msg)=>{
        for(let client of clients){
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(msg);
            }
        }
    });

    ws.on("close", ()=>{
            clients.delete(ws);
            console.log("client disconnected : total ",clients.size);
    });
});


console.log("🔌 WebSocket server running on ws://localhost:8080");
