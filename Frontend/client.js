import io from 'socket.io-client';

var socket = io('http://' + window.location.hostname + ':8000');
var name;
function leftController(e) {
	socket.emit('controller', { name: name, action: 'left' });
};

function rightController(e) {
	socket.emit('controller', { name: name, action: 'right' });
}

function forwardController(e) {
	socket.emit('controller', { name: name, action: 'forward' });
}

function backwardController(e) {
	socket.emit('controller', { name: name, action: 'backward' });
}

function main() {
	// Event emitters
	document.getElementById('left').onclick = leftController;
	document.getElementById('right').onclick = rightController;
	document.getElementById('forward').onclick = forwardController;
	// document.getElementById('backward').onclick = backwardController;

	console.log("Connecting...");

	socket.on('connect', function () {
		console.log("Connected.", socket);
		name = prompt("Nama:");
		socket.emit("join", { name: name });
		socket.emit('log', socket.connected);
		window.onbeforeunload = (e) => {
			e.preventDefault();
			socket.emit('close', {name:name, action:'close'});
			socket.close();
		};
	});
	// socket.on('log', function (emission) {
	// 	console.log('Server Log:', emission);
	// });

}

main();