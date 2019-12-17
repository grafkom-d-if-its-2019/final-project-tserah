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
var client = new Array();

io.sockets.on('connection', (socket) => {
    iolog(socket, true);
    socket.on('join', function (request) {
        iolog(socket, "Join acknowledged");

        // Save client
        client[request.name] = {id: request.id, socket: request.socket};
        let countClient = Object.keys(client).length;

        if (gameHostSocket && countClient <= 2) {
            gameHostSocket.emit("new_player", { name: request.name });
            gameHostSocket.emit("ready", {name: request.name, status: true});
        } else if (gameHostSocket && countClient > 2){ // Limit user
            var user = client[request.name];
            io.to(user.id).emit('full', 'Sorry, room is full. Currently, only 2 players can play the game.');
            console.log('Room is full');
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
    });

    socket.on('gameover', username=>{
        console.log('From host: [Game over] '+username);
        var userGameOver = client[username];
        // console.log(userGameOver);
        io.to(userGameOver.id).emit('gameover', username);
        
        // Force kick client
        socket.leave(userGameOver.id);
        delete client[username];
    })

});