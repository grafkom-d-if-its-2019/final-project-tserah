import * as THREE from 'three';
import Drawable from './Drawable';
import Viewport from './Viewport';
import Food from './Food';
import Positioning from './Positioning';

function removeArr(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

export default class Handler {

    /** @type {THREE.Scene} */
    static scene;

    /** @type {THREE.WebGLRenderer} */
    static renderer;

    /** @type {Viewport[]} */
    static viewports;

    /** @type {Number} FPS */
    static framerate;

    static lastAnimatedTimestamp;

    /** @type {Function[]} */
    static frameRefreshCallbacks;

    static controller;

    static init() {
        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth-10, window.innerHeight-2);
        document.body.appendChild(this.renderer.domElement);
        
        this.viewports = new Array();
        this.animate = this.animate.bind(this);
        this.lastAnimatedTimestamp = performance.now();
        this.framerate = 0;
        /** @type {Function[]} */
        this.frameRefreshCallbacks = new Array();
        this.animate();
    }

    static animate() {
        this.framerate = 1000 / (performance.now() - this.lastAnimatedTimestamp);
        this.lastAnimatedTimestamp = performance.now();
        requestAnimationFrame(this.animate);
        this.checkCollision();
        this.frameRefreshCallbacks.forEach(callback => {
            callback();
        });
        this.viewports.forEach(drawer => {
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
     * Daftarkan Viewport ke Handler
     * 
     * @param {Viewport} drawer 
     */
    static registerViewport(drawer) {
        this.viewports.push(drawer);
    }

    static registerFrameCallback(callback) {
        if (callback instanceof Function) {
            this.frameRefreshCallbacks.push(callback);
        }
    }

    static removeFrameCallback(callback) {
        removeArr(this.frameRefreshCallbacks, callback);
    }

    static generateFood() { // nunggu food
        this.drawables.push(new Food(new Positioning())); // TODO: implement

    }

    static checkCollision() {
        this.getDrawables().forEach(drawable => {
            this.getDrawables().forEach(against => {
                if (drawable !== against && drawable instanceof Drawable && against instanceof Drawable) {
                    drawable.collideWith(against);
                }
            });
        });
    }
}
