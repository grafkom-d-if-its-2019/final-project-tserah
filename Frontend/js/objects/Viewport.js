import * as THREE from 'three';

export default class Viewport {
    /**
     * 
     * @param {Number} viewport_left Jarak viewport dari kiri (0-1)
     * @param {Number} viewport_bottom Jarak viewport dari bawah (0-1)
     * @param {Number} viewport_width Lebar viewport (0-1)
     * @param {Number} viewport_height Tinggi viewport (0-1)
     * @param {THREE.PerspectiveCamera} camera Camera
     */
    constructor(viewport_left, viewport_bottom, viewport_width, viewport_height, camera) {
        this.viewport_left = viewport_left;
        this.viewport_bottom = viewport_bottom;
        this.viewport_width = viewport_width;
        this.viewport_height = viewport_height;
        this.camera = camera;
        this.camera.aspect = Math.floor(window.innerWidth * this.viewport_width) / Math.floor(window.innerHeight * this.viewport_height);
        this.camera.updateProjectionMatrix();
    }
}