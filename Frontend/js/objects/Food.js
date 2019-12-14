import * as THREE from 'three';
import Drawable from './Drawable';
import Positioning from './Positioning';

export default class Food extends Drawable {
    /**
     * 
     * @param {Positioning} positioning 
     */
    constructor(positioning) {  
        var texture = new THREE.TextureLoader().load( '../js/objects/2.png' );
        
        super(new THREE.SphereGeometry(0.1, 32, 32), new THREE.MeshBasicMaterial({map : texture}));
        this.position.setX(positioning.x);
        this.position.setZ(positioning.y);
    }
}