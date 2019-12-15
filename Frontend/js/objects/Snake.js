import * as THREE from "three";
import Player from "./Player";
import SnakeBody from "./SnakeBody";
import Positioning from "./Positioning";

class Snake {
  /**
   *
   * @param {Player} player
   */
  constructor(player) {
    /** @type {SnakeBody[]} */
    this.body = new Array();
    this.player = player;
    let coor = Math.floor(Math.random() * 23) * (Math.floor(Math.random() * 2) == 1 ? 1 : -1);
    let coor2 = Math.floor(Math.random() * 23) * (Math.floor(Math.random() * 2) == 1 ? 1 : -1);
    let head = new SnakeBody(this, new Positioning(coor, coor2, 0, 0)); // TODO: randomize
    this.body.push(head);
    window.head = head;

    /** @type {Positioning[][]} */
    this._command_queue = new Array();
    this._command_queue.push(new Array());

    /** @type {Number} */
    this.isDeath = false;
  }

  /**
   *
   * @param {Positioning} move_command
   */
  move(move_command) {
    let prevBodyMember = null;
    this._command_queue[0].push(move_command);
    this.body.forEach((bodyMember, index) => {
      if (index == 0) {
        var cmd = this._command_queue[index].shift();
        bodyMember.translateZ(cmd.speed);
        bodyMember.rotateY(cmd.orientation);

        prevBodyMember = bodyMember;

        if (this._command_queue[index + 1] !== undefined)
          this._command_queue[index + 1].push(cmd);
      } else {
        if (bodyMember._delay != 0) {
          bodyMember._delay--;
        } else {
          var cmd = this._command_queue[index].shift();
          bodyMember.translateZ(cmd.speed);
          bodyMember.rotateY(cmd.orientation);

          prevBodyMember = bodyMember;

          if (this._command_queue[index + 1] !== undefined)
            this._command_queue[index + 1].push(cmd);
        }
      }
    });
  }

  appendBody() {
    this.body.push(
      new SnakeBody(
        this,
        new Positioning(
          this.body[this.body.length - 1].position.x,
          this.body[this.body.length - 1].position.z,
          0,
          0
        ),
        10,
        this.body.length
      )
    );
    this.body[this.body.length - 1].rotation.set(
      this.body[this.body.length - 2].rotation.x,
      this.body[this.body.length - 2].rotation.y,
      this.body[this.body.length - 2].rotation.z
    );
    this._command_queue.push(new Array());
    // bodyMember._delay = 35;
  }

  onCollideWithFood() {
    this.appendBody();
  }

  /**
   *
   * @param {SnakeBody} snakeBody
   */
  onCollideWithSnake() {
    console.log("TABRAK SNAKE snake.js");
    this.body.forEach((bodyMember, index) => {
      bodyMember.destroy();
    });
    this.player.gameover(this.player.name);
  }
  onCollideWithWall() {
    console.log("TABRAK TEMBOK snake.js");
    this.body.forEach((bodyMember, index) => {
      bodyMember.destroy();
    });
    this.player.gameover(this.player.name);
  }
}

export default Snake;
