import io from 'socket.io-client';

export default class Client {
	/** @type {SocketIOClient.Socket} */
	static socket;
	static init() {
		console.log("Connecting...");
		this.socket = io('http://localhost:8000');
		this.socket.on('connect', function () { 
			console.log("Connected.");
		});
		this.socket.on('log', function (emission) {
			console.log(emission);
		});
	}
}