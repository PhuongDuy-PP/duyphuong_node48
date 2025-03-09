import express from "express";
import http from "http";
import { Server } from 'socket.io';
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { // define biến io server
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
})

// B2: nhận event từ client
// io: đối tượng server socket
// socket: đối tượng client socket
let count = 1;


// define danh sách lưu thông tin client đang online
let onlineUsers = new Map();
io.on('connection', (socket) => {
    console.log("New client connected: ", socket.id);

    // B3: gửi event tới client
    // define event cho client nhận
    io.emit("sendMessage", { message: "Hello from server" });

    // nhận event increment từ client
    socket.on("increment", () => {
        console.log("Client send increment event");
        count = count + 1;
        io.emit("serverSendCount", { count });
    })

    // handle logic chat realtime
    socket.on("userConnected", (userData) => {
        console.log("User connected: ", userData);
        if (!userData) {
            console.log("User data is invalid");
            return;
        }

        // kiểm tra nếu user đã tồn tại trong danh sách onlineUsers
        // thì không thêm vào nữa
        // nếu chưa tồn tại thì thêm vào
        // userData: { userId: 26, name: 'Phuong', avatar: '/src/assets/jack.png' }
        if (!onlineUsers.has(userData.userId)) {
            onlineUsers.set(userData.userId, {
                socketId: socket.id,
                userId: userData.userId,
                name: userData.name,
                avatar: userData.avatar
            });
        }

        // gửi danh sách onlineUsers cho tất cả client
        // convert Map to Array
        const onlineUsersArray = Array.from(onlineUsers.values());
        io.emit("onlineUsers", onlineUsersArray);

        // disconnect client
        // event disconnect là event mặc định của socketIO
        socket.on("disconnect", () => {
            console.log("Client disconnected: ", socket.id);

            // B1: xóa user khỏi danh sách onlineUsers
            onlineUsers.delete(userData.userId);

            // B2: gửi danh sách onlineUsers mới cho tất cả client
            const onlineUsersArray = Array.from(onlineUsers.values());
            io.emit("onlineUsers", onlineUsersArray);
        })
    })

    // server nhận event chat từ client
    socket.on("sendMessage", (messageData) => {
        console.log("Client send message: ", messageData);
        // destructuring messageData
        const {text, receivedId, senderId, avatar} = messageData;

        // filter user sẽ nhận message
        const receiverSocketId = onlineUsers.get(receivedId)?.socketId;
        if(receiverSocketId) {
            // gửi message tới receiver
            console.log("Receiver socketId: ", receiverSocketId);
            io.to(receiverSocketId).emit("receiveMessage", {
                senderId: senderId,
                text: text,
                avatar: avatar,
                receivedId: receivedId
            });
        }
    })


});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server socketIO is running on port ${PORT}`);
})