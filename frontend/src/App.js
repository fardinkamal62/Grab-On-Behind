import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:8000';
const socket = io(ENDPOINT);

const App = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [serverMessages, setServerMessages] = useState([]);

    useEffect(() => {
        socket.emit('join')

        socket.on('server', (message) => {
            setServerMessages([...messages, message]);
        });

        socket.on('message', (message) => {
            setMessages([...messages, message]);
            console.log(messages)
        })
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('sendMessage', message);
        setMessage('')
    };

    return (
        <div>
            <h1>Real-time Chat</h1>
            <ul>
                {messages && messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <form onSubmit={sendMessage}>
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