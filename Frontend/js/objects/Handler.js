import * as THREE from 'three';
import Drawable from './Drawable';
import Drawer from './Drawer';
// import Food from './Food';

console.log("Handler");
export default class Handler {
    
    static collisionSemaphore;

    /** @type {THREE.Scene} */
    static scene;

    /** @type {Drawer[]} */
    static drawers;

    static init() {
        this.scene = new THREE.Scene();
        this.collisionSemaphore = false;
        this.drawers = new Array();
        this.animate = this.animate.bind(this);
        this.animate();
    }

    static animate() {
        requestAnimationFrame(this.animate);
        this.checkCollision();
        this.drawers.forEach(drawer => {
            drawer.renderer.render(this.scene, drawer.camera);
        });
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
     * Ambil semua Drawable yang didaftarkan ke Handler
     * 
     * @returns {Drawable[]}
     */
    static getDrawables() {
        return this.scene.children;
    }

    /**
     * 
     * @param {Drawer} drawer 
     */
    static registerDrawer(drawer) {
        this.drawers.push(drawer);
    }

    static generateFood() { // nunggu food
        this.drawables.push(new Food(new Positioning())); // TODO: implement
    }

    static checkCollision() { // TODO: fix semaphore
        if (this.collisionSemaphore = !this.collisionSemaphore) {
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
