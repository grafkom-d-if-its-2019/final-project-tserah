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
        if (gameHostSocket)
            gameHostSocket.emit("new_player", { name: request.name });
    });

    socket.on('iamhost', function () {
        gameHostSocket = socket;
        iolog(socket, "Host acknowledged");
    });
});