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

// Xóa tất cả kết nối cũ khi server khởi động
io.sockets.sockets.forEach((socket) => {
    socket.disconnect(true);
});
onlineUsers.clear();

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

        // Kiểm tra nếu user đã có kết nối cũ
        const existingUser = onlineUsers.get(userData.userId);
        if (existingUser) {
            // Nếu user đã có kết nối, disconnect kết nối cũ
            const oldSocket = io.sockets.sockets.get(existingUser.socketId);
            if (oldSocket) {
                oldSocket.disconnect(true);
            }
        }

        // Thêm hoặc cập nhật thông tin user mới
        onlineUsers.set(userData.userId, {
            socketId: socket.id,
            userId: userData.userId,
            name: userData.name,
            avatar: userData.avatar
        });

        // gửi danh sách onlineUsers cho tất cả client
        const onlineUsersArray = Array.from(onlineUsers.values());
        io.emit("onlineUsers", onlineUsersArray);

        // disconnect client
        socket.on("disconnect", () => {
            console.log("Client disconnected: ", socket.id);
            // Chỉ xóa user nếu socket ID khớp với socket ID đã lưu
            const user = onlineUsers.get(userData.userId);
            if (user && user.socketId === socket.id) {
                onlineUsers.delete(userData.userId);
                const onlineUsersArray = Array.from(onlineUsers.values());
                io.emit("onlineUsers", onlineUsersArray);
            }
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