var os = require('os');
var nodeStatic = require('node-static');
var http = require('http');
var socketIO = require('socket.io');

var fileServer = new (nodeStatic.Server)();
var app = http.createServer(function (req, res) {
    fileServer.serve(req, res);
}).listen(8000);

var io = socketIO.listen(app);
io.sockets.on('connection', (socket) => {
    function log() {
        var array = ['[----From Server----]'];
        array.push.apply(array, arguments);
        socket.emit('log', array);
    };

    socket.on('getRoom', (room) => {
        log('Create or join room ' + room);
        var clientInRoom = socket.adapter.rooms[room];
        var numClients = clientInRoom ? Object.keys(clientInRoom.sockets).length : 0;
        log('Room ' + room + ' now has ' + numClients + ' client(s)');
        // TODO: limit user
        if (numClients === 0) {
            socket.join(room);
            log('Client ID ' + socket.id + ' create room ' + room);
        } else if (numClients == 1) {
            // Broadcast to user in 'room'
            socket.in(room).emit('join', room);

            // Join the room
            socket.join(room);
            log('Client ID ' + socket.id + ' join the room ' + room);
            socket.emit('joined', room, socket.id);

            // Tell the user in 'room' to ready
            socket.in(room).emit('ready');
        } else {
            socket.in(room).emit('ready');
            log('Room is full');
        }
    });

});