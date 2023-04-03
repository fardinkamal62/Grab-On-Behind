const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const cors = require('cors');

app.use(cookie());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());

const io = socketio(server, {cors: {origin: "*"}});

io.on('connection', (socket) => {
    console.log('A user has connected');
    let id;
    socket.on('join', (roomID) => {
        id = roomID || socket.id;

        console.log(socket.id + ' joined')
        socket.join(id);
        socket.to(id).emit('server', 'Connection established');
    });

    // Listen for messages from the client
    socket.on('sendMessage', (message) => {
        io.in(id).emit('message', message);
    });

    // Disconnect listener
    socket.on('disconnect', () => {
        console.log('A user has disconnected');
    });
});

server.listen(8000, () => {
    console.log('Listening on port 8000');
});
