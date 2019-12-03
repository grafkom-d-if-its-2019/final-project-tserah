import * as THREE from 'three';
import Handler from './Handler';


export default class Drawable extends THREE.Mesh {
    /**
     * 
     * @param {THREE.Material} material 
     * @param {THREE.Geometry|THREE.BufferGeometry} geometry 
     */
    constructor(geometry, material, isInvisible = false) {
        /** @type {THREE.Mesh} */
        super(geometry, material);
        this.isInvisible = isInvisible;
        Handler.registerDrawable(this);
    }

    /**
     * 
     * @param {Drawable} drawable 
     */
    collideWith(drawable) { // TODO: implement
        this.geometry.computeBoundingBox();
        drawable.geometry.computeBoundingBox();
        this.updateMatrixWorld();
        drawable.updateMatrixWorld();

        var box1 = this.geometry.boundingBox.clone();
        box1.applyMatrix4(this.matrixWorld);
      
        var box2 = drawable.geometry.boundingBox.clone();
        box2.applyMatrix4(drawable.matrixWorld);

        if (box1.intersectsBox(box2) && !this.isInvisible && !drawable.isInvisible) {
            this.onCollide(drawable);
        }
    }

    /**
     * 
     * @param {Drawable} drawable 
     */
    onCollide(drawable) { // Implementasikan fungsi ini di child
        throw Error("Unimplemented function!");
    }


    destroy() {
        Handler.removeDrawable(this);
        return null;
    }
}