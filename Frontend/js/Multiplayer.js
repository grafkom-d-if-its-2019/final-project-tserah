import * as THREE from 'three';
import Handler from "./objects/Handler";
import Viewport from './objects/Viewport';
import Player from './objects/Player';
import Positioning from './objects/Positioning';

export default class Multiplayer {

	/** @type {THREE.PerspectiveCamera} */
	static overviewCamera;
	/** @type {Player[]} */
	static players;
	/** @type {String} */
	static name;
	/** @type {Positioning} */
	static position;
	static init() {
		// Default viewports
		this.overviewCamera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.5, 1000);
		this.overviewCamera.rotateX(-Math.PI / 2);
		this.overviewCamera.position.y = 15;
		Handler.registerViewport(new Viewport(0, 0.5, 1, 0.5, this.overviewCamera));
		this.players = new Array();
	}
	/**
	 * 
	 * @param {String} name 
	 */
	static newPlayer(name) {
		this.name = name;
		this.players[name] = new Player(name);
		this.players[name].positioning.speed = 1;
		this.position = this.players[name].positioning;
		
		window.camera = this.players[name].camera;
		window.player = this.players[name];
		
		Handler.registerViewport(new Viewport(0.5 * ((Object.keys(this.players).length - 1)), 0, 0.5, 0.5, this.players[name].camera));
	}

}