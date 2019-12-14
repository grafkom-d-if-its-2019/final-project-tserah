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
        this.positioning = new Positioning(0, 0, 0, 0.1);

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
        var deltaRotate = this.positioning.orientation * (10/Handler.framerate)
        this.snake.move(new Positioning(0, 0, deltaRotate, this.positioning.speed * Math.cos(90) * (1 / Handler.framerate)));
        this.positioning.orientation-=deltaRotate;

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
        var rotate = (1/16) * Math.PI;
        this.positioning.orientation+=rotate;
        // this.snake.move(new Positioning(0, 0, rotate, 0));
    }

    right() {
        var rotate = -(1/16) * Math.PI;
        this.positioning.orientation+=rotate;
        // this.snake.move(new Positioning(0, 0, rotate, 0));
    }

    backward() {
        this.positioning.speed -= 0.2;
    }

    // Freeze player
    gameover(user){
        this.positioning.speed = 0;
        this.positioning.x = 0;
        this.positioning.z = 0;
        this.positioning.orientation = 0;
        console.log(user+' GAME OVER');
    }

}

export default Player;