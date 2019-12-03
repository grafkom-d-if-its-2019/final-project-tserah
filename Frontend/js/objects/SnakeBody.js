import * as THREE from 'three';
import Drawable from './Drawable';
import Snake from './Snake';

class SnakeBody extends Drawable {
    /**
     * 
     * @param {Snake} snake 
     */
    constructor(snake) {
        this.snake = snake;
        super(null, null); // TODO: implement
    }
}

export default SnakeBody;