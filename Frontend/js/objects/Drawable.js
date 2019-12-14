import * as THREE from 'three';
import Handler from './Handler';

{ // HELPER
    THREE.Sphere.__closest = new THREE.Vector3();
    THREE.Sphere.prototype.intersectsBox = function (box) {
        // get box closest point to sphere center by clamping
        THREE.Sphere.__closest.set(this.center.x, this.center.y, this.center.z);
        THREE.Sphere.__closest.clamp(box.min, box.max);

        var distance = this.center.distanceToSquared(THREE.Sphere.__closest);
        return distance < (this.radius * this.radius);
    };
}
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
    collideWith(drawable) {
        var bounding1;
        if (this.geometry instanceof THREE.SphereGeometry) {
            this.geometry.computeBoundingSphere();
            bounding1 = this.geometry.boundingSphere.clone();
        }
        else {
            this.geometry.computeBoundingBox();
            bounding1 = this.geometry.boundingBox.clone();
        }
        bounding1.applyMatrix4(this.matrixWorld);

        var bounding2;
        if (drawable.geometry instanceof THREE.SphereGeometry) {
            drawable.geometry.computeBoundingSphere();
            bounding2 = drawable.geometry.boundingSphere.clone();
        }
        else {
            drawable.geometry.computeBoundingBox();
            bounding2 = drawable.geometry.boundingBox.clone();
        }
        bounding2.applyMatrix4(drawable.matrixWorld);
        var collides = false;
        if (this.geometry instanceof THREE.SphereGeometry) {
            if (drawable.geometry instanceof THREE.SphereGeometry)
                collides = bounding1.intersectsSphere(bounding2);
            else
                collides = bounding1.intersectsBox(bounding2);
        }
        else if (this.geometry instanceof THREE.BoxGeometry) {
            if (drawable.geometry instanceof THREE.BoxGeometry)
                collides = bounding1.intersectsBox(bounding2);
        }
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