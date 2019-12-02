/// <reference path="../../typings/index.d.ts" />


function uuidv4() { // Generate uuid
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

class Drawable extends THREE.Mesh {
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
