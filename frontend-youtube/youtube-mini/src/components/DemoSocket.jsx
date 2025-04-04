import React, { useState, useEffect } from 'react';
import { getSocket } from '../services/socketService';

const DemoSocket = () => {
    const [count, setCount] = useState(0);
    const [socketInstance, setSocketInstance] = useState(null);

    // Initialize socket connection
    useEffect(() => {
        const socket = getSocket();
        setSocketInstance(socket);
        
        // Cleanup function
        return () => {
            // Don't disconnect the socket here, just remove listeners
            console.log('Cleaning up socket listeners in DemoSocket');
        };
    }, []);

    // Set up socket event listeners
    useEffect(() => {
        if (!socketInstance) return;

        // gửi event connect tới server socketIO
        socketInstance.emit("send-message");

        // nhận dữ liệu từ server
        const handleSendMessage = (data) => {
            console.log(data);
        };

        socketInstance.on("sendMessage", handleSendMessage);

        // nhận dữ liệu từ server
        const handleServerSendCount = (data) => {
            console.log(data);
            setCount(data.count);
        };

        socketInstance.on("serverSendCount", handleServerSendCount);

        // Cleanup socket listeners
        return () => {
            socketInstance.off("sendMessage", handleSendMessage);
            socketInstance.off("serverSendCount", handleServerSendCount);
        };
    }, [socketInstance]);

    const Increment = () => {
        if (socketInstance) {
            socketInstance.emit("increment");
        }
    };

    const ResetCount = () => {
        if (socketInstance) {
            socketInstance.emit("resetCount");
        }
    };

    return (
        <div>
            <h1>Demo counter</h1>
            <h2>{count}</h2>
            <button onClick={Increment}>Add</button>
            <button onClick={ResetCount}>Reset count</button>
        </div>
    );
};

export default DemoSocket;