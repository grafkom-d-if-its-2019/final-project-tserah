import * as THREE from 'three';
import Player from './Player';
import SnakeBody from './SnakeBody';
import Positioning from './Positioning';

class Snake {
	/**
	 *
	 * @param {Player} player
	 */
	constructor(player, geometry, material) {
		/** @type {SnakeBody[]} */
		this.body = new Array();
		this.player = player;
		this.body.push(new SnakeBody(this, geometry, material));
		/** @type {Positioning[]} */
		this._positioning_stack = new Array();
		this._positioning_stack.push(this.player.positioning);
	}

	forward(steps=-1) {
		this.body[0].translateZ(steps);
	}

	backward(steps=1) {
		this.body[0].translateZ(steps);
	}

	right(steps=1, rotate=-1) {
		this.body[0].translateX(steps);
		this.body[0].rotateY(rotate);
	}

	left(steps=-1, rotate=1) {
		this.body[0].translateX(steps);
		this.body[0].rotateY(rotate);
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

	onCollideWithSnake() {
		this.player.onDie();
	}
}

export default Snake;