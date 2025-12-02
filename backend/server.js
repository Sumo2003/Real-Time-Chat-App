// server.js


const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
console.log("✅ WebSocket server running on ws://localhost:8080");
let clients = new Set(); 

wss.on("connection", (ws) => {
  ws.username = null; 
  clients.add(ws);
  console.log("🔗 New client connected. Total:", clients.size);

  ws.on("message", (data) => {
    try {
      const msg = JSON.parse(data);

    
      if (msg.type === "join") {
        ws.username = msg.user;
        console.log(`👤 ${ws.username} joined`);
        broadcastUsers();
      }

      if (msg.type === "chat") {
        if (!ws.username) return;

        const chatMsg = {
          type: "chat",
          user: ws.username,
          text: msg.text,
          time: new Date().toLocaleTimeString(),
        };

        broadcast(chatMsg);
        const botReply = {
          type: "chat",
          user: "Helper Bot",
          text: `Thanks for your message, ${ws.username}. You said: "${msg.text}"`,
          time: new Date().toLocaleTimeString(),
        };

        setTimeout(() => {
          broadcast(botReply);
        }, 600);
      }
      if (msg.type === "typing") {
        if (!ws.username) return;
        const typingMsg = {
          type: "typing",
          user: ws.username,
          isTyping: msg.isTyping,
        };
        
        broadcastExcept(ws, typingMsg);
      }
    } catch (err) {
      console.error("❌ Error parsing message:", err);
    }
  });

  ws.on("close", () => {
    console.log(`❌ Client disconnected: ${ws.username || "unknown"}`);
    clients.delete(ws);
    broadcastUsers();
  });
});

function broadcast(obj) {
  const json = JSON.stringify(obj);
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(json);
    }
  }
}

function broadcastExcept(excluded, obj) {
  const json = JSON.stringify(obj);
  for (const client of clients) {
    if (client !== excluded && client.readyState === WebSocket.OPEN) {
      client.send(json);
    }
  }
}
function broadcastUsers() {
  const users = [...clients]
    .filter((c) => c.username)
    .map((c) => c.username);

  broadcast({
    type: "users",
    count: users.length,
    users,
  });
}
