import io from 'socket.io-client';

var socket = io('http://' + window.location.hostname + ':8000');
var name;

function buttonhold(btn, action, delay) {
	var t;

    var repeat = function (e) {
        action(e);
        t = setTimeout(repeat, delay);
    }

    btn.ontouchstart = function(e) {
        repeat(e);
    }

    btn.ontouchend = function (e) {
        clearTimeout(t);
    }
};

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
	buttonhold(document.getElementById('left'), function(e){
		leftController(e);
	}, 100);
	buttonhold(document.getElementById('right'), function(e){
		rightController(e);
	}, 100);
	buttonhold(document.getElementById('forward'), function(e){
		forwardController(e);
	}, 100);

	console.log("Connecting...");

	socket.on('connect', function () {
		console.log("Connected.", socket);
		name = prompt("Nama:");
		socket.emit("join", { name: name });
		socket.emit('log', socket.connected);
		window.onbeforeunload = (e) => {
			e.preventDefault();
			socket.emit('close', { name: name, action: 'close' });
			socket.close();
		};
	});
	// socket.on('log', function (emission) {
	// 	console.log('Server Log:', emission);
	// });

}

main();