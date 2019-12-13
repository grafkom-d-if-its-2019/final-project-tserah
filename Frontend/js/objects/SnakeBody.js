import * as THREE from 'three';
import Drawable from './Drawable';
import Snake from './Snake';
import Food from './Food';

class SnakeBody extends Drawable {
    /**
     * 
     * @param {Snake} snake 
     */

    constructor(snake, x=0, z=0) {
        var texture = new THREE.TextureLoader().load( '../assets/skinn3.png' );


        super(new THREE.SphereGeometry(0.5, 10, 10), new THREE.MeshBasicMaterial({ map: texture})); // TODO: implement
        
        if(snake == null){
            this.position.setX(x);
            this.position.setZ(z);            
        }
        else{
            this.snake = snake;
            this.position.setX(0);
            this.position.setZ(snake.position.z + 1);
        }

    }

    onCollide(drawable) {
        if (drawable instanceof Food) {
            this.snake.onCollideWithFood();
        }
        else if (drawable instanceof SnakeBody) {
            this.snake.onCollideWithSnake();
        }
    }

}

export default SnakeBody;