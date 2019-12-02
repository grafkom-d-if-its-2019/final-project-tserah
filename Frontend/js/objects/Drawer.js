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
        this.animate = this.animate.bind(this);
        this.animate();
    }

    animate() {
        requestAnimationFrame(this.animate);
        this.renderer.render(Handler.scene, this.camera);
    }

}