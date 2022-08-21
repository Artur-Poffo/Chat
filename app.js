const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(3000, () => console.log('listening on port ' + 3000));

const messages = [];

const io = socketIO(server)

io.on('connection', socket => {
    console.log("Connected to server socket");

    socket.emit('update_message', messages);

    socket.on("New_Message", data => {
        messages.push(data.msg);
        
        io.emit('update_message', messages);

    })  
})