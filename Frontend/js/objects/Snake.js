import * as THREE from 'three';
import Player from './Player';
import SnakeBody from './SnakeBody';
import Positioning from './Positioning';

class Snake {
	/**
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		/** @type {SnakeBody[]} */
		this.body = new Array();
		this.player = player;
		let head = new SnakeBody(this, new Positioning(0, 0, 0, 0)); // TODO: randomize
		this.body.push(head); 
		window.head = head;

		/** @type {Positioning[][]} */
		this._command_queue = new Array();
		this._command_queue.push(new Array());

		/** @type {Number} */
        this._delay = 360
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
            if(this._delay <= 1 && this.isDeath == false) {
                this.isDeath = true;
                this.onCollideWithSnake();
            }
            this._delay--;

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
				}
				else {
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
		this.body.push(new SnakeBody(
			this,
			new Positioning(
				this.body[this.body.length - 1].position.x,
				this.body[this.body.length - 1].position.z,
				0,
				0
			), 35
		));
		this.body[this.body.length - 1].rotation.set(
			this.body[this.body.length - 2].rotation.x,
			this.body[this.body.length - 2].rotation.y,
			this.body[this.body.length - 2].rotation.z
		);
		this._command_queue.push(new Array());
		// bodyMember._delay = 120;
	}

	onCollideWithFood() {
		this.appendBody();
	}

	/**
	 * 
	 * @param {SnakeBody} snakeBody 
	 */
	onCollideWithSnake(snakeBody) {
        if (snakeBody.snake.player != this.player)
        this.body.forEach((bodyMember, index) => {
            bodyMember.destroy();
		});
        // if (snakeBody.snake != this)
       
			// this.player.onDie();
	}
}

export default Snake;