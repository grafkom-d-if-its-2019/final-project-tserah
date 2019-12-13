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
        this.kepala = null;
        
		/** @type {Positioning[]} */
		// this._pivot_checkpoint = new Array();
	}
    
	/**
	 * 
	 * @param {Positioning} positioning 
	 */
	moveKepala(speedZ, speedX) {
		
		this.body.forEach((bodyMember, index) => {
			if (index == 0) {
                bodyMember.prevSpeedZ = bodyMember.speedZ;
                bodyMember.prevSpeedX = bodyMember.speedX;
                bodyMember.speedZ = speedZ;
                bodyMember.speedX = speedX;
                this.kepala = bodyMember;
                if(speedX != 0){
                    bodyMember.translateX(speedX);
                    bodyMember.rotateX(speedX);
                    this.moveBadan();
                }else if (speedZ !=0) {
                    bodyMember.translateZ(speedZ);
                    this.moveBadan();
                }
			}
        });
        
    }
    
    move(){

    }
    moveBadan() {
		let prevBodyMember = this.kepala;
		this.body.forEach((bodyMember, index) => {
			if (index != 0) {
                bodyMember.prevSpeedZ = bodyMember.speedZ;
                bodyMember.prevSpeedX = bodyMember.speedX;
                bodyMember.speedZ = prevBodyMember.prevSpeedZ;
                bodyMember.speedX = prevBodyMember.prevSpeedX;
                if(bodyMember.speedX != 0){
                    bodyMember.translateX(bodyMember.speedX);
                    bodyMember.rotateX(bodyMember.speedX);
                }else if(bodyMember.speedZ != 0) {
                    bodyMember.translateZ(bodyMember.speedZ);
                }
				prevBodyMember = bodyMember;
            }
		});
	}

	appendBody() {
		this.body.push(new SnakeBody(
			this,
			new Positioning(
				this.body[this.body.length - 1].position.x,
				this.body[this.body.length - 1].position.z-1,
				0,
				0// this.body[this.body.length - 1].position.orientation
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