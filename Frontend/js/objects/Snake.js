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

		/** @type {Positioning[]} */
		this._pivot_checkpoint = new Array();
	}

	/**
	 * 
	 * @param {Positioning} positioning 
	 */
	move(positioning) {
		let prevBodyMember = null;
		this.body.forEach((bodyMember, index) => {
			if (index == 0) {
				bodyMember.translateZ(positioning.speed);
				bodyMember.rotateY(positioning.orientation);

				if (positioning.orientation != 0) {
					this.body.forEach((b, i) => {
						if (i != 0) {
							let item = new Positioning(bodyMember.position.x, bodyMember.position.z, positioning.orientation, );
							this._pivot_checkpoint.push(item);
							console.log(this._pivot_checkpoint);
						}
					});
				}

				prevBodyMember = bodyMember;
			} else {
				if (bodyMember.isInvisible) {
					if (!bodyMember.collideWith(prevBodyMember)) {
						bodyMember.isInvisible = false;
					}
				}
				else {
					if (this._pivot_checkpoint.length > 0 &&
						bodyMember.position.x == this._pivot_checkpoint[this._pivot_checkpoint.length - 1].x &&
						bodyMember.position.z == this._pivot_checkpoint[this._pivot_checkpoint.length - 1].z) {
						bodyMember.rotateY(this._pivot_checkpoint.pop().orientation);
					}
					bodyMember.translateZ(positioning.speed);

					prevBodyMember = bodyMember;
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
		window.bro = this.body[this.body.length - 1];
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