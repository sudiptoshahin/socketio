const http = require('http');
const express = require('express');
// const { WebSocketServer } = require('ws');
const ws = require('ws');
const app = express();

const httpServer = http.createServer(app);

const wss = new ws.WebSocketServer({ serve: httpServer, port: 8001 });

// WEBSOCKET-SERVER

// wss.on('headers', (headers, req) => {
//     console.log(req);
// });

wss.on('connection', (ws, req) => {
    //  SEND DATA TO CLIENT
    ws.send('Welcome to websocket server');

    // RECEIVE DATA FROM CLIENT
    ws.on('message', (msg) => {
        console.log(msg.toString());
    });

    const data = {a: 1, b:2};

    ws.emit('sum', data);
    ws.on('sum', (data) => {
        console.log('sum is ', data);
    })
});



//  WEBSOCKET-SERVER-ENDS

app.use(express.static(`${__dirname}`));
app.get('/ws-client', (req, res) => {
    res.sendFile(`${__dirname}/ws_client.html`);
});


app.listen(8000, (err) => {
    console.log('server is online at http://127.0.0.1:8000');
});

// httpServer.listen(3000);