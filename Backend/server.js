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

    log("Hellow");

});