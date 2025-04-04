import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/MessageList.css";
import { getSocket, storeUnreadMessage, getUnreadMessages } from '../services/socketService';

const MessageList = ({ onSelectChat, onClose }) => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socketInstance, setSocketInstance] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userName, setUserName] = useState("");
    const [unreadCounts, setUnreadCounts] = useState({});

    // Initialize socket connection
    useEffect(() => {
        const socket = getSocket();
        setSocketInstance(socket);
        
        // Cleanup function
        return () => {
            // Don't disconnect the socket here, just remove listeners
            console.log('Cleaning up socket listeners in MessageList');
        };
    }, []);

    // Get current user info
    useEffect(() => {
        const token = localStorage.getItem("USER_LOGIN");
        if (token) {
            try {
                const parts = token.split('.');
                if (parts.length === 3) {
                    const payload = parts[1];
                    const decodedPayload = atob(payload);
                    const userInfor = JSON.parse(decodedPayload).payload;
                    setCurrentUser(userInfor.userId);
                    setUserName(userInfor.username || userInfor.name || "User"); // Get username from token, fallback to name or "User"
                    console.log('Current user ID in MessageList:', userInfor.userId);
                    console.log('Current user name in MessageList:', userInfor.username || userInfor.name);
                }
            } catch (error) {
                console.error('Error parsing user token:', error);
            }
        }
    }, []);

    // useEffect để hiển thị list user đang online
    useEffect(() => {
        if (!socketInstance || !currentUser) return;

        // gửi info user lên server socketIO để thông báo là user đã online
        socketInstance.emit("userConnected", {
            userId: currentUser,
            name: userName, // Use the name from token
            avatar: "/src/assets/jack.png"
        });

        // nhận danh sách user online từ server
        const handleOnlineUsers = (users) => {
            console.log("Danh sách user online: ", users);

            // filter user hiện tại ra khỏi danh sách user online
            const filterUsers = users.filter(u => u.userId !== currentUser);
            setOnlineUsers(filterUsers);
        };

        socketInstance.on("onlineUsers", handleOnlineUsers);

        // Listen for incoming messages
        const handleReceiveMessage = (message) => {
            console.log('Received message in MessageList:', message);
            
            // If the message is for the current user, store it as unread
            if (message.receivedId === currentUser) {
                storeUnreadMessage(message);
                
                // Update unread count for this sender
                setUnreadCounts(prevCounts => {
                    const senderId = message.senderId;
                    return {
                        ...prevCounts,
                        [senderId]: (prevCounts[senderId] || 0) + 1
                    };
                });
            }
        };

        socketInstance.on('receiveMessage', handleReceiveMessage);

        // Cleanup socket listener
        return () => {
            socketInstance.off("onlineUsers", handleOnlineUsers);
            socketInstance.off('receiveMessage', handleReceiveMessage);
        };
    }, [socketInstance, currentUser, userName]);

    // Load unread counts for all users
    useEffect(() => {
        if (!currentUser) return;
        
        const counts = {};
        onlineUsers.forEach(user => {
            const unreadMsgs = getUnreadMessages(user.userId, currentUser);
            if (unreadMsgs.length > 0) {
                counts[user.userId] = unreadMsgs.length;
            }
        });
        
        setUnreadCounts(counts);
    }, [onlineUsers, currentUser]);

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
                            {unreadCounts[user.userId] > 0 && (
                                <div className='unread-badge'>{unreadCounts[user.userId]}</div>
                            )}
                            <div className='online-indicator'></div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default MessageList;