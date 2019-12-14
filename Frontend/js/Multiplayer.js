import * as THREE from 'three';
import Handler from "./objects/Handler";
import Viewport from './objects/Viewport';
import Player from './objects/Player';

export default class Multiplayer {

	/** @type {THREE.PerspectiveCamera} */
	static overviewCamera;
	/** @type {Player[]} */
	static players;
	static init() {
		// Default viewports
		this.overviewCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.overviewCamera.rotateX(-Math.PI / 2);
		this.overviewCamera.position.y = 20;
		Handler.registerViewport(new Viewport(0, 0.5, 1, 0.5, this.overviewCamera));
	}
	/**
	 * 
	 * @param {String} name 
	 */
	static newPlayer(name) {
		if (this.players.length == 2) throw new Error("Maximum player count exceeded");
		this.players.push(new Player(name));
		Handler.registerViewport(new Viewport(0.5 * (this.players.length - 1), 0, 0.5, 0.5, this.players[this.players.length - 1].camera));
	}
}