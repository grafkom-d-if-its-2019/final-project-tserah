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
		let head = new SnakeBody(this, new Positioning(0, 0, 0, 0));
		this.body.push(head); // TODO: randomize
		window.head = head;
		this.body[0].isInvisible = false;

		/** @type {Positioning[][]} */
		this._command_queue = new Array();
		this._command_queue.push(new Array());

		/** @type {Number} */
		this._delay = 0;
	}

	/**
	 * 
	 * @param {Positioning} move_command 
	 */
	move(move_command) {
		let prevBodyMember = null;
		this._command_queue[0].push(move_command);
		console.log(this.body[this.body.length-1].position);
		this.body.forEach((bodyMember, index) => {
			if (index == 0) {
				var cmd = this._command_queue[index].shift();
				bodyMember.translateZ(cmd.speed);
				bodyMember.rotateY(cmd.orientation);

				prevBodyMember = bodyMember;

				if (this._command_queue[index + 1] !== undefined)
					this._command_queue[index + 1].push(cmd);
			} else {
				if (this._delay != 0) {
					this._delay--;
				}
				else {
					if (bodyMember.isInvisible)
						bodyMember.isInvisible = false;
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
			)
		));
		this.body[this.body.length - 1].rotation.set(
			this.body[this.body.length - 2].rotation.x,
			this.body[this.body.length - 2].rotation.y,
			this.body[this.body.length - 2].rotation.z
		);
		this._command_queue.push(new Array());
		this._delay = 60;
	}

	onCollideWithFood() {
		this.appendBody();
	}

	/**
	 * 
	 * @param {SnakeBody} snakeBody 
	 */
	onCollideWithSnake(snakeBody) {
		if (snakeBody.snake != this)
			this.player.onDie();
	}
}

export default Snake;