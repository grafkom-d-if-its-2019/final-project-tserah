/// <reference path="../../typings/index.d.ts" />
/// <reference path="./Player.js" />
/// <reference path="./SnakeBody.js" />

class Snake {
    /**
     * 
     * @param {Player} player 
     */
    constructor(player) {
        this.player = player;
        /** @type {SnakeBody[]} */
        this.body = new Array();
        this.body.push(new SnakeBody(this));
    }
}