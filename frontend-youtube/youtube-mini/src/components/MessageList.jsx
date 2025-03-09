import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/MessageList.css";
import { io } from 'socket.io-client';

// kết nối tới server socket
const socket = io("http://localhost:3001", {
    withCredentials: true
});

const MessageList = ({ onSelectChat, onClose }) => {
    const [onlineUsers, setOnlineUsers] = useState([]);

    const messages = [
        { id: 1, name: "Sơn Tùng", avatar: "/src/assets/jack.png", lastMessage: "Chào Phương, mình là Sơn Tùng MTP", time: "3 giờ" },
        { id: 2, name: "Minhh Thư", avatar: "/src/assets/jack.png", lastMessage: "Đã bày tỏ cảm xúc về tin nhắn", time: "4 giờ" },
        // Add more messages as needed
    ];

    // useEffect để hiển thị list user đang online
    useEffect(() => {
        // get user info từ localStorage
        const token = localStorage.getItem("USER_LOGIN");

        // decode token (cheat decode)
        const parts = token.split('.');
        if (parts.length !== 3) throw new Error('Invalid token format');

        const payload = parts[1]; // Lấy phần payload của JWT (Base64 encoded)
        const decodedPayload = atob(payload); // Giải mã Base64

        // parse string JSON thành JSON
        // {"payload":{"userId":26},"iat":1741419151,"exp":1741426351}
        const userInfor = JSON.parse(decodedPayload).payload;
        console.log(userInfor);

        // gửi info user lên server socketIO để thông báo là user đã online
        socket.emit("userConnected", {
            userId: userInfor.userId,
            name: userInfor.name,
            avatar: "/src/assets/jack.png"
        })

        // nhận danh sách user online từ server
        socket.on("onlineUsers", (users) => {
            console.log("Danh sách user online: ", users);

            // filter user hiện tại ra khỏi danh sách user online
            const filterUsers = users.filter(u => u.userId !== userInfor.userId);
            setOnlineUsers(filterUsers);

        })

        // return userInfor.payload;
    }, [])

    return (
        <div className="message-list-container">
            <div className="message-list-header">
                <h3>Đoạn chat</h3>
                <button onClick={onClose}>&times;</button>
            </div>
            <div className="search-box">
                <input type="text" placeholder="Tìm kiếm trên Messenger" />
            </div>
            <div className="tabs">
                <button className="active">Hộp thư ({onlineUsers.length})</button>
                <button>Nhóm</button>
            </div>
            <div className="messages">
                {/* {messages.map((message) => (
                    <div key={message.id} className="message-item" onClick={() => onSelectChat(message)}>
                        <img src={message.avatar} alt={message.name} className="avatar" />
                        <div className="message-content">
                            <h4>{message.name}</h4>
                            <p>
                                {message.lastMessage.length > 20
                                    ? `${message.lastMessage.slice(0, 20)}...`
                                    : message.lastMessage}
                                · {message.time}
                            </p>
                        </div>
                    </div>
                ))} */}
                {onlineUsers.map(user => {
                    return (
                        <div key={user.socketId} className='message-item' onClick={() => {
                            onSelectChat(user);
                        }}>
                            <img src={user.avatar} className='avatar' alt="" />
                            <div className='message-content'>
                                <h4>{user.name}</h4>
                                <p className='online-status'>Đang online</p>
                            </div>
                            <div className='online-indicator'></div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default MessageList;