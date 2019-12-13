import * as THREE from 'three';
import Positioning from './Positioning';
import Snake from './Snake';
import Handler from './Handler';

class Player {
    /**
     * 
     * @param {String} name 
     */
    constructor(name, geometry, material) {
        this.name = name;
        this.snake = new Snake(this);
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // TODO: benerin
        this.positioning = new Positioning(0, 0, 90, 0.05);
    }

    // Mengatur movement
    move() {
        // X,Y baru
        this.positioning.z += this.positioning.speed * Math.cos(this.positioning.orientation) * (1/Handler.framerate);
        // this.positioning.x = this.positioning.speed * Math.sin(this.positioning.orientation) * (1 / Handler.framerate);

        this.snake.forward(this.positioning.speed * Math.cos(this.positioning.orientation) * (1 / Handler.framerate));
    }

    forward() {
        this.positioning.speed += 0.2;
    }

    left() {
        this.snake.left();
    }

    right() {
        this.positioning.x += 0.25;
        var rotate = this.positioning.x * Math.PI;
        console.log(rotate);
        this.snake.right(rotate);
    }

    backward() {
        this.positioning.speed -= 0.2;
    }


}

export default Player;