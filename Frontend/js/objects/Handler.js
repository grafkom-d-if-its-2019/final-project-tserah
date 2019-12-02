/// <reference path="../../typings/index.d.ts" />
/// <reference path="./Drawable.js" />
/// <reference path="./Player.js" />
/// <reference path="./Food.js" />

class Handler {

    static collisionSemaphore;

    /** @type {THREE.Scene} */
    static scene;

    static init() {
        this.scene = new THREE.Scene();
        this.collisionSemaphore = false;
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
        var selectedMesh = this.scene.getObjectById(drawable.id);
        this.scene.remove(selectedMesh);
    }

    /**
     * @returns {Drawable[]}
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

    static checkCollision() {
        if (!this.collisionSemaphore) {
            this.collisionSemaphore = true;
            this.getDrawables().forEach(drawable => {
                this.getDrawables().forEach(against => {
                    if (drawable!==against) {
                        drawable.collideWith(against);
                    }
                });
            });
            this.collisionSemaphore = false;
        }
    }
}