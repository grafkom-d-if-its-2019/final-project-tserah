/// <reference path="../../typings/index.d.ts" />
/// <reference path="./Drawable.js" />
/// <reference path="./Player.js" />
/// <reference path="./Food.js" />

class Handler {

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
        this.scene.add(drawable);
    }

    /**
     * 
     * @param {Drawable} drawable 
     */
    static removeDrawable(drawable) { // TODO: implement
        let selectedMesh = this.scene.getObjectById(drawable.id);
        this.scene.remove(selectedMesh);
    }

    /**
     * @returns {Drawable}
     */
    static getDrawables() {
        return this.scene.children;
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