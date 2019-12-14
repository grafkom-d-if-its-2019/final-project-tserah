import io from 'socket.io-client';



function main() {
	console.log("Connecting...");
	var socket = io('http://'+window.location.hostname+':8000');
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