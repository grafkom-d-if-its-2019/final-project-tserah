import Drawable from "./Drawable";
import { X_AXIS, Y_AXIS, Z_AXIS } from "../Constants";

export default class Wall extends Drawable {


    /**
     * 
     * @param {Number} width 
     * @param {Number} height 
     */
    constructor(width, height, faceAxis) {
        switch (faceAxis) {
            case X_AXIS:
                super(new THREE.BoxGeometry(1, height, width), new THREE.MeshLambertMaterial({ color: 0xffffff }));
                break;
            case Y_AXIS:
                super(new THREE.BoxGeometry(width, 1, height), new THREE.MeshLambertMaterial({ color: 0xffffff }));
                break;
            case Z_AXIS:
                super(new THREE.BoxGeometry(width, height, 1), new THREE.MeshLambertMaterial({ color: 0xffffff }));
                break;
        }
    }

    onCollide() {
        // Do nothing
    }
}