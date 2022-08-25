const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const httpServer = http.createServer(app);

const io = new socketio.Server(httpServer);
app.use(express.static(`${__dirname}`));

// SOCKET IO
io.on('connection', (socket, req) => {

    //  THIS EVENT WILL SHOW IN CLIENT -- SERVER -> CLIENT
    socket.emit('welcome', 'Welcome to websocket as socket.io server');

    //  THIS EVENT WILL SHOW IN CLIENT -- SERVER -> CLIENT
    socket.on('message', (data) => {
        console.log(data);
    });

    socket.on('sum', (data) => {
        const sum = data.a + data.b;
        socket.emit('sum', sum);
    });

});


//  SOCKET-IO ENDS



app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/basic.html`);
    console.log(__dirname);
});


httpServer.listen(3000, () => {
    console.log('Server listen on http://127.0.0.1:3000');
});