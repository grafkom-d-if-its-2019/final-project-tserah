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
}
