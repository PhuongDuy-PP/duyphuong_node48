import React, { useState } from 'react';
import io from 'socket.io-client';

// Kết nối tới server socket
const socket = io("http://localhost:3001", {
    withCredentials: true
});

// rafce
const DemoSocket = () => {
    const [count, setCount] = useState(0);

    //  gửi event connet tới server socketIO
    // emit: gửi dữ liệu từ client tới server
    // on: nhận dữ liệu từ server

    // B1: gửi event connect tới server
    socket.emit("send-message");

    // nhận dữ liệu từ server
    socket.on("sendMessage", (data) => {
        console.log(data);
    })
    const Increment = () => {
        socket.emit("increment");
        

    }

    socket.on("serverSendCount", (data) => {
        console.log(data);
        setCount(data.count);
    })
    return (
        <div>
            <h1>Demo counter</h1>
            <h2>{count}</h2>
            <button onClick={Increment}>Add</button>
            <button>Minor</button>
            <button onClick={ResetCount}>Reset count</button>
        </div>
    )
}

export default DemoSocket