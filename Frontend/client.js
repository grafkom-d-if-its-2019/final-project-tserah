import io from 'socket.io-client';

var socket = io('http://' + window.location.hostname + ':8000');
var name;
function leftController(e) {
	console.log(name);
	socket.emit('controller', {name: name, action:'left'});
};

function rightController(e){
	console.log(name);
	socket.emit('controller', {name: name, action:'right'});
}

function forwardController(e){
	console.log(name);
	socket.emit('controller', {name: name, action:'forward'});
}

function backwardController(e){
	console.log(name);
	socket.emit('controller', {name: name, action:'backward'});
}

function main() {

	document.getElementById('joinbtn').onclick = function(){
		name = document.getElementById("nameinput").value;
		socket.emit("join", {name: name});
	};
	// Event emitters
	document.getElementById('left').onclick = leftController;
	document.getElementById('right').onclick = rightController;
	document.getElementById('forward').onclick = forwardController;
	// document.getElementById('backward').onclick = backwardController;

	// console.log("Connecting...");
	
	socket.on('connect', function () {
		// console.log("Connected.", socket);
	});
	socket.on('log', function (emission) {
		// console.log('Server Log:', emission);
	});
}

main();