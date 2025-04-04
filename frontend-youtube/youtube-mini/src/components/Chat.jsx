import React, { useEffect, useState, useRef } from 'react';
import "../style/Chat.css";
import { getSocket, getUnreadMessages, markMessagesAsRead } from '../services/socketService';

const Chat = ({ chat, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [image, setImage] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userName, setUserName] = useState("");
    const [socketInstance, setSocketInstance] = useState(null);
    const messagesEndRef = useRef(null);

    // Initialize socket connection
    useEffect(() => {
        const socket = getSocket();
        setSocketInstance(socket);
        
        // Cleanup function
        return () => {
            // Don't disconnect the socket here, just remove listeners
            console.log('Cleaning up socket listeners in Chat');
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
                    console.log('Current user ID in Chat:', userInfor.userId);
                    console.log('Current user name in Chat:', userInfor.username || userInfor.name);
                }
            } catch (error) {
                console.error('Error parsing user token:', error);
            }
        }
    }, []);

    // Load unread messages when chat is opened
    useEffect(() => {
        if (!currentUser || !chat?.userId) return;

        const unreadMsgs = getUnreadMessages(chat.userId, currentUser);
        if (unreadMsgs.length > 0) {
            setMessages(prevMessages => [...prevMessages, ...unreadMsgs]);
            markMessagesAsRead(chat.userId, currentUser);
        }
    }, [currentUser, chat]);

    // Listen for incoming messages
    useEffect(() => {
        if (!socketInstance || !currentUser) return;

        const handleReceiveMessage = (message) => {
            console.log('Received message in Chat:', message);
            
            // If the message is for the current user and from the current chat
            if (message.receivedId === currentUser && message.senderId === chat.userId) {
                setMessages(prevMessages => [...prevMessages, message]);
            }
        };

        socketInstance.on('receiveMessage', handleReceiveMessage);

        // Cleanup socket listener
        return () => {
            socketInstance.off('receiveMessage', handleReceiveMessage);
        };
    }, [socketInstance, currentUser, chat]);

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if ((newMessage.trim() || image) && currentUser && socketInstance) {
            const newMsg = {
                id: Date.now(),
                text: newMessage,
                receivedId: chat.userId,
                senderId: currentUser,
                avatar: '/src/assets/jack.png',
                image: image,
                timestamp: new Date().toISOString()
            };

            console.log('Sending message:', newMsg);
            
            // Send message to server
            socketInstance.emit('sendMessage', newMsg);

            // Update local messages state
            setMessages(prevMessages => [...prevMessages, newMsg]);
            
            // Clear input fields
            setNewMessage('');
            setImage(null);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="user-info">
                    <div className="avatar-container">
                        <img
                            src={chat.avatar}
                            alt="Avatar"
                            className="avatar"
                        />
                        <div className="status-dot"></div>
                    </div>
                    <div className="user-details">
                        <div className="user-name">{chat.name}</div>
                        <div className="user-status">Đang hoạt động</div>
                    </div>
                </div>
                <div className="header-actions">
                    <button className="header-button">
                        <i className="fas fa-phone-alt"></i>
                    </button>
                    <button className="header-button">
                        <i className="fas fa-video"></i>
                    </button>
                    <button className="header-button">-</button>
                    <button className="header-button close" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>

            <div className="messages-container">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message ${message.senderId === currentUser ? 'sent' : 'received'}`}
                    >
                        {message.senderId === currentUser && (
                            <img
                                src={message.avatar}
                                alt="Avatar"
                                className="message-avatar"
                            />
                        )}
                        <div className="message-content">
                            <div>{message.text}</div>
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt="Uploaded"
                                    className="message-image"
                                />
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
                <div className="input-container">
                    <div className="input-actions">
                        <label className="action-button">
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                                accept="image/*"
                            />
                            <i className="fas fa-image"></i>
                        </label>
                        <button className="action-button">
                            <i className="fas fa-paperclip"></i>
                        </button>
                        <button className="action-button">
                            <i className="fas fa-gift"></i>
                        </button>
                    </div>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Aa"
                        className="message-input"
                    />
                    <button className="action-button">
                        <i className="fas fa-smile"></i>
                    </button>
                    <button
                        className="action-button"
                        onClick={handleSendMessage}
                    >
                        <i className="fas fa-thumbs-up"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
