/// <reference path="../../typings/index.d.ts" />
/// <reference path="./Handler.js" />

class Drawer {
    /**
     * 
     * @param {THREE.WebGLRenderer} renderer 
     * @param {THREE.Camera} camera 
     */
    constructor(renderer, camera) {
        this.renderer = renderer;
        this.camera = camera;
    }

}

export default Drawer;