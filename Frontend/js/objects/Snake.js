/// <reference path="../../typings/index.d.ts" />
/// <reference path="./Player.js" />
/// <reference path="./SnakeBody.js" />

const LEFT = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;
class Snake {
    /**
     * 
     * @param {Player} player 
     */
    constructor(player) {
        /** @type {SnakeBody[]} */
        this.body = new Array();
        this.body.push(new SnakeBody(this));
        this.player = player;
        this.headCoordX = 0;
        this.headCoordY = 0;
        this.direction = UP;
        this.speed = 1;
    }

    /**
     * 
     * @param {Number} direction 
     */
    move(direction) {
        switch(direction) {
            case UP:
                this.headCoordY+=this.speed;
                break;
            case DOWN:
                this.headCoordY-=this.speed;
                break;
            case LEFT:
                this.headCoordX-=this.speed;
                break;
            case RIGHT:
                this.headCoordX+=this.speed;
                break;
        }
    }
}