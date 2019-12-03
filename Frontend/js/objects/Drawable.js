import * as THREE from 'three';
import Handler from './Handler';

console.log("Drawable");

function uuidv4() { // Generate uuid
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export default class Drawable extends THREE.Mesh {
    /**
     * 
     * @param {THREE.Material} material 
     * @param {THREE.Geometry|THREE.BufferGeometry} geometry 
     */
    constructor(geometry, material) {
        /** @type {THREE.Mesh} */
        super(geometry, material);
        this.name = uuidv4();
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

        if (box1.intersectsBox(box2)) {
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