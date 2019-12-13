import * as THREE from 'three';
import Positioning from './Positioning';
import Snake from './Snake';

class Player {
    /**
     * 
     * @param {String} name 
     */
    constructor(name, geometry, material) {
        this.name = name;
        this.snake = new Snake(this, geometry, material);
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // TODO: benerin
        this.positioning = new Positioning(0, 0, 90, 0.05);
    }

    // Mengatur movement
    move() {
        // X,Y baru
        this.positioning.x += this.positioning.speed * Math.cos(this.positioning.orientation);
        this.positioning.y += this.positioning.speed * Math.sin(this.positioning.orientation);

        // this.snake.move();
    }

    forward(object) {
        this.snake.forward();
    }

    left(object) {
        this.snake.left();
    }

    right(object) {
        this.snake.right();
    }

    backward(object) {
        this.snake.backward();
    }


}

export default Player;