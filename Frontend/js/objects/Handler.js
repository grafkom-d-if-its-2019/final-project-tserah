import * as THREE from 'three';
import Drawable from './Drawable';
import Viewport from './Drawer';
// import Food from './Food';

console.log("Handler");
export default class Handler {

    static collisionSemaphore;

    /** @type {THREE.Scene} */
    static scene;

    /** @type {THREE.WebGLRenderer} */
    static renderer;

    /** @type {Viewport[]} */
    static drawers;

    static init() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.collisionSemaphore = false;
        this.drawers = new Array();
        this.animate = this.animate.bind(this);
        this.animate();
    }

    static animate() {
        requestAnimationFrame(this.animate);
        this.checkCollision();
        this.drawers.forEach(drawer => {
            let left = Math.floor(window.innerWidth * drawer.viewport_left);
            let bottom = Math.floor(window.innerHeight * drawer.viewport_bottom);
            let width = Math.floor(window.innerWidth * drawer.viewport_width);
            let height = Math.floor(window.innerHeight * drawer.viewport_height);
            this.renderer.setViewport(left, bottom, width, height);
            this.renderer.setScissor(left, bottom, width, height);
            this.renderer.setScissorTest(true);
            this.renderer.render(this.scene, drawer.camera);
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
     * @param {Viewport} drawer 
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
                    if (drawable !== against) {
                        drawable.collideWith(against);
                    }
                });
            });
            this.collisionSemaphore = false;
        }
    }
}
