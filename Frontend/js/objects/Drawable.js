/// <

/**
 * @typedef {Object} THREE
 * @typedef {Object} THREE.Material
 * @typedef {Object} THREE.Geometry
 */
class Drawable {
    /**
     * 
     * @param {THREE.Material} material 
     * @param {THREE.Geometry} geometry 
     */
    construct(material, geometry) {
        /** @type {THREE.Material} */
        this.material = material;
        /** @type {THREE.Geometry} */
        this.geometry = geometry;
    }

    getMesh() {
        return new THREE.Mesh(this.geometry, this.material);
    }
    ThetaH
}

var a = new Drawable();
a.mater
