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
        this.player = player;
        this.body.push(new SnakeBody(this));
        /** @type {Positioning[]} */
        this._positioning_stack = new Array();
        this._positioning_stack.push(this.player.positioning);
    }

    move() {
        this.body.forEach((bodyMember, index) => {
            if (index==0) {
                bodyMember.mesh.position.x = this.player.positioning.x;
                bodyMember.mesh.position.y = this.player.positioning.y;
                bodyMember.mesh.rotateZ(this.player.positioning.orientation - this._positioning_stack[index]);
                this._positioning_stack[index] = this.player.positioning;
            } else {
                bodyMember.mesh.position.x = this._positioning_stack[index-1];
                bodyMember.mesh.position.y = this._positioning_stack[index-1];
                bodyMember.mesh.rotateZ(this._positioning_stack[index-1] - this._positioning_stack[index]);
                this._positioning_stack[index] = this._positioning_stack[index-1];
            }
        });
    }

    appendBody() {

    }
}