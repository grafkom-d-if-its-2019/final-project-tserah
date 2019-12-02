/// <reference path="../../typings/index.d.ts" />
/// <reference path="./Drawable.js" />
/// <reference path="./Player.js" />
/// <reference path="./Food.js" />

class Handler {

    /** @type {Drawable[]} */
    static drawables = new Array();

    /** @type {THREE.Scene} */
    static scene;

    static init() {
        this.scene = new THREE.Scene();
    }

    /**
     * 
     * @param {Drawable} drawable 
     */
    static registerDrawable(drawable) {
        this.drawables.push(drawable);
        this.scene.add(drawable);
    }

    /**
     * 
     * @param {Drawable} drawable 
     */
    static removeDrawable(drawable) { // TODO: implement
        let index = this.drawables.indexOf(drawable);
        if (index !== -1) this.drawables.splice(index, 1);
        let selectedMesh = this.scene.getObjectById(drawable.id);
        this.scene.remove(selectedMesh);

    }

    static generateFood() {
        this.drawables.push(new Food(new Positioning())); // TODO: implement
    }

    /**
     * 
     * @param {THREE.WebGLREnderer} renderer 
     * @param {THREE.Camera} camera 
     */
    static animate(renderer, camera) {
        new Drawer(renderer, camera);
    }
}