import * as THREE from 'three';
import Positioning from './Positioning';
import Snake from './Snake';

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
    }

    // Mengatur movement
    move() {
        // X,Y baru
        this.positioning.x += this.positioning.speed * Math.cos(this.positioning.orientation);
        this.positioning.z += this.positioning.speed * Math.sin(this.positioning.orientation);

        // this.snake.move();
        this.snake.forward(this.positioning.x);
    }

    forward() {
        this.positioning.x += this.positioning.speed * Math.cos(this.positioning.orientation);
        this.positioning.z += this.positioning.speed * Math.sin(this.positioning.orientation);

        console.log(this.positioning.x, this.positioning.z);

        this.snake.forward(this.positioning.x);
    }

    left() {
        this.snake.left();
    }

    right() {
        this.snake.right();
    }

    backward() {
        this.snake.backward();
    }


}

export default Player;