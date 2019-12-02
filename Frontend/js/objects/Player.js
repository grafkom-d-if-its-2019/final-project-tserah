/// <reference path="../../typings/index.d.ts" />
/// <reference path="./Positioning.js" />

class Player {
    /**
     * 
     * @param {String} name 
     */
    constructor(name) {
        this.name = name;
        this.snake = new Snake(this);
        this.camera = new THREE.PerspectiveCamera(); // TODO: benerin
        this.positioning = new Positioning(0, 0, 90, 1); // TODO: benerin
    }
}