import io from 'socket.io-client';

var socket = io('http://' + window.location.hostname + ':8000');
var name;

function buttonhold(btn, action, delay) {
	var t;

	var repeat = function (e) {
		action(e);
		t = setTimeout(repeat, delay);
	}

	btn.ontouchstart = function (e) {
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
	buttonhold(document.getElementById('left'), function (e) {
		leftController(e);
	}, 100);
	buttonhold(document.getElementById('right'), function (e) {
		rightController(e);
	}, 100);
	buttonhold(document.getElementById('forward'), function (e) {
		forwardController(e);
	}, 100);
	buttonhold(document.getElementById('backward'), function (e) {
		backwardController(e);
	}, 100);

	document.getElementById('joinbtn').onclick = function () {
		name = prompt("Nama:");
		if (name != null) {
			socket.emit("join", { name: name, id: socket.id });
			socket.emit('connected', socket.connected);
			document.getElementById('splash').style.display = "none";
			document.getElementById('controller').style.display = "inherit";
		}
	}

	console.log("Connecting...");

	socket.on('connect', function () {
		console.log("Connected.", socket);
		// window.addEventListener('beforeunload', (e) => {
		// 	e.preventDefault();

		// 	e.returnValue = '';
		// });
	});

	// Kalau nabrak dan mati
	socket.on('gameover', username => {
		if (name == username) {
			window.alert('Game Over!');
			socket.close();
		}
		// console.log("resetting view");
		// document.getElementById('splash').style.display = "inherit";
		// document.getElementById('controller').style.display = "none";
		socket.close();
	});

	// socket.on('disconnect', function () {
	// 	// socket.emit('close', { name: name, action: 'close', id: socket.id, socket: socket });
	// 	// socket.close();
	// });

}

main();