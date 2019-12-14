import * as THREE from 'three';
import Positioning from './Positioning';
import Snake from './Snake';
import Handler from './Handler';
import Multiplayer from '../Multiplayer';

class Player {
    /**
     * 
     * @param {String} name 
     */
    constructor(name) {
        this.name = name;

        // Default position
        this.positioning = new Positioning(0, 0, 90, 0.1);

        // Default camera view
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // TODO: benerin
        this.camera.rotateX(-Math.PI / 4);
        this.camera.updateProjectionMatrix();

        // Player create snake
        this.snake = new Snake(this);

        // Register animate di Handler
        Handler.registerFrameCallback(this.move.bind(this));
    }

    // Mengatur movement
    move() {
        this.positioning.z += this.positioning.speed * Math.cos(this.positioning.orientation) * (1 / Handler.framerate);
        // this.positioning.x = this.positioning.speed * Math.sin(this.positioning.orientation) * (1 / Handler.framerate);

        this.snake.move(new Positioning(0, 0, 0, this.positioning.speed * Math.cos(this.positioning.orientation) * (1 / Handler.framerate)));
        
        this.camera.position.set(this.snake.body[0].position.x, 2, this.snake.body[0].position.z);
        this.camera.rotation.set(this.snake.body[0].rotation.x, this.snake.body[0].rotation.y, this.snake.body[0].rotation.z);
        this.camera.translateZ(5);

        this.camera.lookAt(this.snake.body[0].position.x, -2, this.snake.body[0].position.z);

        this.camera.updateProjectionMatrix();
    }

    forward() {
        this.positioning.speed += 0.2;
    }

    left() {
        this.positioning.x = (1/16);
        var rotate = this.positioning.x * Math.PI;
        this.snake.move(new Positioning(0, 0, rotate, 0));
    }

    right() {
        this.positioning.x = -(1/16);
        var rotate = this.positioning.x * Math.PI;
        this.snake.move(new Positioning(0, 0, rotate, 0));
    }

    backward() {
        this.positioning.speed -= 0.2;
    }


}

export default Player;