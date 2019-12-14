import io from 'socket.io-client';



function main() {
	console.log("Connecting...");
	var address = prompt("socket address");
	var socket = io('http://'+address+':8000');
	socket.on('connect', function () {
		console.log("Connected.", socket);
		var name = prompt("Nama:");
		socket.emit("join", {name: name});
	});
	socket.on('log', function (emission) {
		console.log('Server Log:', emission);
	});
}

main();