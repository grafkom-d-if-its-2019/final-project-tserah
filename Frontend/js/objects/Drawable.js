/// <reference path="../../typings/index.d.ts" />

/**
 * @property {THREE.Material} material
 * @property {THREE.Geometry} material
 */
class Drawable {
    /**
     * 
     * @param {THREE.Material} material 
     * @param {THREE.Geometry} geometry 
     */
    construct(material, geometry) {
        this.material = material;
        this.geometry = geometry;
    }

    getMesh() {
        return new THREE.Mesh(this.geometry, this.material);
    }
}
