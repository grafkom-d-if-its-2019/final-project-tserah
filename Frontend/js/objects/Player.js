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
        this.positioning = new Positioning(0, 0, 90, 0.1);
        this.snake = new Snake(this);
        

        // Register animate di Handler
        Handler.registerFrameCallback(this.move.bind(this));
    }

    // Mengatur movement
    move() {
        // X,Y baru
        this.positioning.z += this.positioning.speed * Math.cos(this.positioning.orientation) * (1 / Handler.framerate);
        // this.positioning.x = this.positioning.speed * Math.sin(this.positioning.orientation) * (1 / Handler.framerate);

        this.snake.move(new Positioning(0, 0, 0, this.positioning.speed * Math.cos(this.positioning.orientation) * (1 / Handler.framerate)));
    }

    forward() {
        this.positioning.speed += 0.2;
    }

    left() {
        this.positioning.x = 0.25;
        var rotate = this.positioning.x * Math.PI;
        this.snake.move(new Positioning(0, 0, rotate, 0));
    }

    right() {
        this.positioning.x = -0.25;
        var rotate = this.positioning.x * Math.PI;
        this.snake.move(new Positioning(0, 0, rotate, 0));
    }

    backward() {
        this.positioning.speed -= 0.2;
    }


}

export default Player;