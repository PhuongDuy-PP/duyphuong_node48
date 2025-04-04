import { io } from 'socket.io-client';

// Create a singleton socket instance
let socket = null;

// Store for unread messages
const unreadMessages = {};

// Function to get or create socket instance
const getSocket = () => {
    if (!socket) {
        console.log('Creating new socket connection');
        socket = io('http://localhost:3001', {
            withCredentials: true
        });
    }
    return socket;
};

// Function to disconnect socket
const disconnectSocket = () => {
    if (socket) {
        console.log('Disconnecting socket');
        socket.disconnect();
        socket = null;
    }
};

// Function to store unread message
const storeUnreadMessage = (message) => {
    const { senderId, receivedId } = message;
    const key = `${senderId}-${receivedId}`;
    
    if (!unreadMessages[key]) {
        unreadMessages[key] = [];
    }
    
    unreadMessages[key].push(message);
    console.log(`Stored unread message from ${senderId} to ${receivedId}`);
};

// Function to get unread messages for a specific chat
const getUnreadMessages = (senderId, receivedId) => {
    const key = `${senderId}-${receivedId}`;
    return unreadMessages[key] || [];
};

// Function to mark messages as read
const markMessagesAsRead = (senderId, receivedId) => {
    const key = `${senderId}-${receivedId}`;
    if (unreadMessages[key]) {
        unreadMessages[key] = [];
        console.log(`Marked messages from ${senderId} to ${receivedId} as read`);
    }
};

export { 
    getSocket, 
    disconnectSocket, 
    storeUnreadMessage, 
    getUnreadMessages, 
    markMessagesAsRead 
}; 