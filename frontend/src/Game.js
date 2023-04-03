import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {useLocation} from "react-router-dom";

const ENDPOINT = 'http://localhost:8000';
const socket = io(ENDPOINT);

const App = () => {
    const location = useLocation();
    const roomID = location.state;

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [serverMessages, setServerMessages] = useState([]);

    useEffect(() => {
        socket.emit('join', roomID);
    }, []);

    socket.on('server', (message) => {
        setServerMessages([...messages, message]);
    });

    socket.on('message', (message) => {
        setMessages([...messages, message]);
    })

    const sendMessage = (e) => {
        e.preventDefault();
        if (message === '') return null;

        socket.emit('sendMessage', message);
        setMessage('')
    };

    return (
        <div>
            <h1>Real-time Chat</h1>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <form>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" onClick={(e) => sendMessage(e)}>Send</button>
            </form>
        </div>
    );
};

export default App;