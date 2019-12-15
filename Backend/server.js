var os = require('os');
var nodeStatic = require('node-static');
var http = require('http');
var socketIO = require('socket.io');

var fileServer = new (nodeStatic.Server)();
var app = http.createServer(function (req, res) {
    fileServer.serve(req, res);
}).listen(8000);

var io = socketIO.listen(app);
/**
 * 
 * @param {SocketIO.Socket} socket 
 * @param {string} item 
 */
function iolog(socket, item) {
    socket.broadcast.emit("log", item);
}

var gameHostSocket = null;

io.sockets.on('connection', (socket) => {
    iolog(socket, true);
    socket.on('join', function (request) {
        iolog(socket, "Join acknowledged");
        if (gameHostSocket) {
            gameHostSocket.emit("new_player", { name: request.name });
        }
        else {
            console.log('GameHost is disconnect. Please refresh host page.');
        }
    });

    socket.on('iamhost', function () {
        gameHostSocket = socket;
        iolog(socket, "Host acknowledged");
    });

    socket.on('controller', control => {
        if (gameHostSocket == null) {
            console.log('Game Host not connected. Refresh host page.');
        }
        gameHostSocket.emit('controller', control);
    });

    socket.on('log', log => {
        console.log('Server Log:', log);
    });

    socket.on('connected', msg=>{
        console.log('Client connected: '+msg);
    });

    socket.on('close', emission => {
        console.log('User ' + emission.name + ' close the game');
        gameHostSocket.emit('close', emission);
        gameHostSocket.emit('player_leave', emission.id);

        // setTimeout(() => {
        //     emission.socket.disconnect(emission.socket.disconnected);
        //     console.log('socket.disconnect');
        // }, 2000);
    });
    
});