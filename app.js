const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(PORT, () => console.log('listening on port ' + PORT));

const messages = [];

const io = socketIO(server)

io.on('connection', socket => {
    console.log("Connected to server socket");

    socket.emit('update_message', messages);

    socket.on("New_Message", data => {
        messages.push(data);
        
        io.emit('update_message', messages);

    })  
})