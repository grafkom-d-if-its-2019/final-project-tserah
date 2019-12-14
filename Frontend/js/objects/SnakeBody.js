import * as THREE from 'three';
import Drawable from './Drawable';
import Snake from './Snake';
import Food from './Food';
import Positioning from './Positioning';
import Wall from './Wall';

class SnakeBody extends Drawable {
    /**
     * 
     * @param {Snake} snake 
     * @param {Positioning} positioning 
     */
    constructor(snake, positioning, _delay) {
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
        this.position.setY(0.52);
        this._delay = _delay;

    }

    onCollide(drawable) {
        if (drawable instanceof Food) {
            this.snake.onCollideWithFood();
        }
        else if (drawable instanceof SnakeBody) {
            this.snake.onCollideWithSnake(drawable);
        }
        else if (drawable instanceof Wall) {
            console.log("nabrak tembok");
        }
    }

}

export default SnakeBody;