/// <reference path="../../typings/index.d.ts" />
/// <reference path="./Drawable.js" />
/// <reference path="./Snake.js" />

class SnakeBody extends Drawable {
    /**
     * 
     * @param {Snake} snake 
     */
    constructor(snake) {
        this.snake = snake;
        // super(something, something);
    }
}
