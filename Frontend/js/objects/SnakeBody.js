import * as THREE from 'three';
import Drawable from './Drawable';
import Snake from './Snake';
import Food from './Food';

class SnakeBody extends Drawable {
    /**
     * 
     * @param {Snake} snake 
     */

    constructor(snake, x=0, z=0) {
        // var texture = new THREE.TextureLoader().load( '../js/objects/photo6312031187316615685.jpg' );
        // var texture = new THREE.TextureLoader().load( '../js/objects/snake.jpg' );
        // var texture = new THREE.TextureLoader().load( '../js/objects/skin2.jpeg' );
        var texture = new THREE.TextureLoader().load( '../js/objects/skin3.jpeg' );
        // var texture = new THREE.TextureLoader().load( '../js/objects/earth.png' );


        super(new THREE.SphereGeometry(0.5, 10, 10), new THREE.MeshBasicMaterial({ map: texture})); // TODO: implement
        
        if(snake == null){
            this.position.setX(x);
            this.position.setZ(z);            
        }
        else{
            this.snake = snake;
            this.position.setX(0);
            this.position.setZ(snake.position.z + 1);
        }

    }

}

export default SnakeBody;