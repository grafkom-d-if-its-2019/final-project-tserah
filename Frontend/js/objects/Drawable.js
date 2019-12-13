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
        var box1;
        if (this.geometry instanceof THREE.SphereGeometry) {
            this.geometry.computeBoundingSphere();
            box1 = this.geometry.boundingSphere.clone();
        }
        else {
            this.geometry.computeBoundingBox();
            box1 = this.geometry.boundingBox.clone();
        }
        box1.applyMatrix4(this.matrixWorld);

        var box2;
        if (drawable.geometry instanceof THREE.SphereGeometry) {
            drawable.geometry.computeBoundingSphere();
            box2 = drawable.geometry.boundingSphere.clone();
        }
        else {
            drawable.geometry.computeBoundingBox();
            box2 = drawable.geometry.boundingBox.clone();
        }
        box2.applyMatrix4(drawable.matrixWorld);

        var collides;
        if (drawable instanceof THREE.SphereGeometry)
            collides = box1.intersectsSphere(box2);
        else
            collides = box1.intersectsBox(box2);
        if (collides && !this.isInvisible && !drawable.isInvisible) {
            this.onCollide(drawable);
        }

        return collides;
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