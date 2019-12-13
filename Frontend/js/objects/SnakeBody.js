import * as THREE from 'three';
import Drawable from './Drawable';
import Snake from './Snake';

class SnakeBody extends Drawable {
    /**
     * 
     * @param {Snake} snake 
     */
    constructor(snake, geometry, material) {
        super(geometry, material); // TODO: implement
        this.snake = snake;
    }
}

export default SnakeBody;