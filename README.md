#🚀 Real-Time Chat Application

A full-stack real-time chat application built using Node.js, WebSockets, and a modern responsive HTML/CSS UI, featuring online users list, typing indicators, local chat history, and a built-in Helper Bot that generates automated replies.
This project demonstrates real-time communication, event-driven backend development, and a clean, user-friendly chat interface.

---

##✨ Features

🔹 Real-Time Messaging

Send and receive messages instantly using WebSocket connections.

🔹 Online Users List

See who is currently online in the chat room.

🔹 Typing Indicators

Displays “User is typing…” in real time.

🔹 Helper Bot 🤖

A simple in-room bot that replies automatically to user messages:

“Thanks for your message, <username>. You said: <text>”

🔹 Modern UI

Custom-designed interface with:

Smooth gradients

Bubble-style chat messages

Responsive layout

Sidebar user list


---


##🛠️ Tech Stack

Frontend:

HTML5

CSS3 (Custom UI design, responsive layout)

Vanilla JavaScript

Backend:

Node.js

WebSocket Server (ws library)


---


##📁 Project Structure

realtime-chat-app/
│
├── backend/
│   ├── server.js         # WebSocket server (main backend)
│   ├── package.json
│   └── node_modules/
│
└── frontend/
    ├── index.html        # UI + JS logic
    ├── style.css         # (Optional) external styling
    └── script.js         # (Optional) external JS


    ---
 
##▶️ How to Run the Project Locally

🔮 Future Enhancements

🔐 User authentication (login/signup)

📁 Multiple chat rooms

🧑‍🤝‍🧑 Private messaging (DMs)

💾 Database storage (MongoDB/Firebase)

🌐 Deployment (Render + Netlify/Vercel)

🎨 Dark/Light theme toggle

🔊 Voice messages


---


##👩‍💻 Author

Sumaira Ashfaque
Real-time systems enthusiast, frontend developer, and backend learner.

💼 Passionate about building modern and interactive web applications.

1️⃣ Clone the Repository

git clone https://github.com/<your-username>/<repository-name>.git

cd <repository-name>

2️⃣ Install Backend Dependencies
cd backend
npm install

3️⃣ Start the WebSocket Server
node server.js


Server runs on:

ws://localhost:8080

4️⃣ Run the Frontend

Option A: Using Live Server (recommended)

Open frontend/index.html in VS Code

Right-click → Open with Live Server

Option B: Manual

Double-click index.html → open in Chrome

5️⃣ Test in Multiple Tabs




Open 2 tabs/windows → join with different usernames → chat in real time.

🔹 Local Chat History

Chat history persists even after page refresh using localStorage.
