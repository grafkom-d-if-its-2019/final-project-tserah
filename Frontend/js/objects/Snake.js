/// <reference path="../../typings/index.d.ts" />
/// <reference path="./Player.js" />
/// <reference path="./SnakeBody.js" />
/// <reference path="./Positioning.js" />

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
        /** @type {Positioning[]} */
        this._positioning_stack = [];
    }

    move() {
        
    }
}