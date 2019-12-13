import Drawable from "./Drawable";
// import { X_AXIS, Y_AXIS, Z_AXIS } from "../Constants";
import * as THREE from 'three';
import { X_AXIS, Y_AXIS, Z_AXIS } from "../Constants";

export default class Wall extends Drawable {


    /**
     * 
     * @param {Number} width 
     * @param {Number} height 
     */
    constructor(width, height, faceAxis) {
        let texture = new THREE.TextureLoader().load('../assets/images.jpg');
        switch (faceAxis) {
            case X_AXIS:
                super(new THREE.BoxBufferGeometry(.1, width, height), new THREE.MeshLambertMaterial({ color: 0xff0000 }));
                break;
            case Y_AXIS:
                super(new THREE.BoxBufferGeometry(width, .1, height), new THREE.MeshLambertMaterial({ color: 0x00ff00 }));
                break;
            case Z_AXIS:
                super(new THREE.BoxBufferGeometry(width, height, .1), new THREE.MeshLambertMaterial({ color: 0x0000ff }));
                break;
            default:
                super(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshLambertMaterial({ color: 0xff0000}));
        }
    }

    onCollide() {
        // Do nothing
    }
}