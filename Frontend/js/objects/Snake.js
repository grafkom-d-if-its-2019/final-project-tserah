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
      if (index == 0) {
        bodyMember.position.x = this.player.positioning.x;
        bodyMember.position.y = this.player.positioning.y;
        bodyMember.rotateZ(
          this.player.positioning.orientation - this._positioning_stack[index]
        );
        this._positioning_stack[index] = this.player.positioning;
      } else {
        bodyMember.position.x = this._positioning_stack[index - 1].x;
        bodyMember.position.y = this._positioning_stack[index - 1].y;
        bodyMember.rotateZ(
          this._positioning_stack[index - 1] - this._positioning_stack[index]
        );
        this._positioning_stack[index] = this._positioning_stack[index - 1];
      }
    });
  }

  appendBody() {
    this.body.push(new SnakeBody(this));
    this._positioning_stack = new Array();
    last_index = this._positioning_stack.length - 1;
    position = new Positioning(
      this._positioning_stack[last_index].x,
      this._positioning_stack[last_index].y
    );
    this._positioning_stack.push(position);
  }

  onCollideWithFood() {
    this.appendBody();
  }

  onCollideWithSnake() {}
}
