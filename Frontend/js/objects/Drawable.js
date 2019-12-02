/// <reference path="../../typings/index.d.ts" />

class Drawable {
    /**
     * 
     * @param {THREE.Material} material 
     * @param {THREE.Geometry} geometry 
     */
    construct(material, geometry) {
        this.mesh = new THREE.Mesh(geometry, material);
    }

    /**
     * 
     * @param {Drawable} drawable 
     */
    collideWith(drawable) { // TODO: implement

    }

    /**
     * 
     * @param {Drawable} drawable 
     */
    onCollide(drawable) { // Implementasikan fungsi ini di child
        throw Error("Unimplemented function!");
    }
}
