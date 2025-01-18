import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/MessageList.css";

const MessageList = ({ onSelectChat, onClose }) => {
    const messages = [
        { id: 1, name: "Sơn Tùng", avatar: "/src/assets/jack.png", lastMessage: "Chào Phương, mình là Sơn Tùng MTP", time: "3 giờ" },
        { id: 2, name: "Minhh Thư", avatar: "/src/assets/jack.png", lastMessage: "Đã bày tỏ cảm xúc về tin nhắn", time: "4 giờ" },
        // Add more messages as needed
    ];

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
                <button className="active">Hộp thư</button>
                <button>Nhóm</button>
            </div>
            <div className="messages">
                {messages.map((message) => (
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
                ))}
            </div>
        </div>
    );
};

export default MessageList;