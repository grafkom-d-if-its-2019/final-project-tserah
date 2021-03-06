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
        let texture = new THREE.TextureLoader().load('../assets/red-grid.svg');
        let texture2 = new THREE.TextureLoader().load('../assets/3.jpg');
        let material = new THREE.MeshStandardMaterial({ map : texture });
        material.transparent = true;
        material.opacity = 0.7;

        switch (faceAxis) {
            case X_AXIS:
                super(new THREE.BoxBufferGeometry(.1, width, height), new THREE.MeshLambertMaterial({ map : texture2 }));
                break;
            case Y_AXIS:
                super(new THREE.BoxBufferGeometry(width, .1, height), material);
                break;
            case Z_AXIS:
                super(new THREE.BoxBufferGeometry(width, height, .1), new THREE.MeshLambertMaterial({ map : texture2 }));
                break;
            default:
                super(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshLambertMaterial({ color: 0xff0000}));
        }
        this.axis = faceAxis;
    }

    onCollide() {
        // Do nothing
    }
}