var os = require('os');
var nodeStatic = require('node-static');
var http = require('http');
var socketIO = require('socket.io');

var fileServer = new (nodeStatic.Server)();
var app = http.createServer(function (req, res) {
    fileServer.serve(req, res);
}).listen(8000);

var io = socketIO.listen(app);
function iolog(socket, item) {
    socket.emit("log", item);
}

var gameHostSocket = null;

io.sockets.on('connection', (socket) => {
    iolog(socket, true);
    socket.on('join', function (request) {
        iolog(socket, "Join acknowledged");
        if (gameHostSocket){
            gameHostSocket.emit("new_player", { name: request.name });
        }
        else{
            alert('GameHost is disconnect. Please refresh host page.');
        }
    });

    socket.on('iamhost', function () {
        gameHostSocket = socket;
        iolog(socket, "Host acknowledged");
    });

    socket.on('controller', control=>{
        if (gameHostSocket == null) {
            alert('Game Host not connected. Refresh host page.');
        }
        gameHostSocket.emit('controller', control);
    });
});