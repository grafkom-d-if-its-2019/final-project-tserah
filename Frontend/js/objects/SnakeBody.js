import * as THREE from 'three';
import Drawable from './Drawable';
import Snake from './Snake';
import Food from './Food';

class SnakeBody extends Drawable {
    /**
     * 
     * @param {Snake} snake 
     */
    constructor(snake) {
        // var texture = new THREE.TextureLoader().load( '../js/objects/photo6312031187316615685.jpg' );
        // var texture = new THREE.TextureLoader().load( '../js/objects/snake.jpg' );
        // var texture = new THREE.TextureLoader().load( '../js/objects/skin2.jpeg' );
        var texture = new THREE.TextureLoader().load( '../js/objects/skin3.jpeg' );
        // var texture = new THREE.TextureLoader().load( '../js/objects/earth.png' );


        super(new THREE.SphereGeometry(0.5, 10, 10), new THREE.MeshBasicMaterial({ map: texture})); // TODO: implement
        
        if(snake == null){
            this.position.setX(0);
            this.position.setZ(0);            
        }
        else{
            this.snake = snake;
            console.log(snake);
            window.snake = snake;
            this.position.setX(0);
            this.position.setZ(this.snake.player.positioning.z + 1);
        }

    }

}

export default SnakeBody;