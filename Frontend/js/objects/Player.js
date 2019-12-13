import * as THREE from 'three';
import Positioning from './Positioning';
import Snake from './Snake';
import Handler from './Handler';

class Player {
    /**
     * 
     * @param {String} name 
     */
    constructor(name) {
        this.name = name;
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // TODO: benerin
        this.positioning = new Positioning(0, 0, 90, 0.05);
        this.snake = new Snake(this);
        this.positioning.speedZ=0;
        this.positioning.speedX=0;
    }

    // Mengatur movement
    move() {
        // this.snake.move(this.positioning.speedZ, this.positioning.speedX);
        // this.positioning.speedZ=0;
        // this.positioning.speedX=0;
    }

    forward() {
        this.positioning.speedZ = -0.5;
        this.positioning.speedX = 0;
        this.snake.moveKepala(this.positioning.speedZ, this.positioning.speedX);
    }

    left() {
        this.positioning.speedX = -0.25;
        this.positioning.rotateX= -0.25;
        this.positioning.speedZ = 0;
        this.snake.moveKepala(this.positioning.speedZ, this.positioning.speedX);
    }

    right() {
        this.positioning.speedX = 0.25;
        this.positioning.rotateX= 0.25;
        this.positioning.speedZ = 0;
        this.snake.moveKepala(this.positioning.speedZ, this.positioning.speedX);
    }   

    backward() {
        this.positioning.speedZ = 0.05;
        this.positioning.speedX = 0;
        this.snake.moveKepala(this.positioning.speedZ, this.positioning.speedX);
    }


}

export default Player;