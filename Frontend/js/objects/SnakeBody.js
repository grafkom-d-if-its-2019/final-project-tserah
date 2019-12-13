import * as THREE from 'three';
import Drawable from './Drawable';
import Snake from './Snake';
import Food from './Food';
import Positioning from './Positioning';

class SnakeBody extends Drawable {
    /**
     * 
     * @param {Snake} snake 
     * @param {Positioning} positioning 
     */
    constructor(snake, positioning) {
        // var texture = new THREE.TextureLoader().load( '../assets/skinn3.png' );
        var texture = new THREE.TextureLoader().load( '../assets/images.jpeg' );
        super(new THREE.SphereGeometry(0.5, 100, 100), new THREE.MeshBasicMaterial({ map: texture})); // TODO: implement


        this.isInvisible = true;
        
        if(snake == null){
            this.position.setX(0);
            this.position.setZ(0);
        }
        else{
            this.snake = snake;
            window.snake = snake;
            this.position.setX(positioning.x)
            this.position.setZ(positioning.z);
        }

    }

    onCollide(drawable) {
        if (drawable instanceof Food) {
            this.snake.onCollideWithFood();
        }
        else if (drawable instanceof SnakeBody) {
            this.snake.onCollideWithSnake(drawable);
        }
    }

}

export default SnakeBody;