import * as THREE from "three";
import Drawable from "./Drawable";
import Viewport from "./Viewport";
import Food from "./Food";
import Positioning from "./Positioning";
import Wall from "./Wall";
import { X_AXIS, Y_AXIS, Z_AXIS } from "../Constants";
import THREECache from "../THREECache"

function removeArr(arr) {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax = arr.indexOf(what)) !== -1) {
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
    var light = new THREE.PointLight(0xffffff, 25, 50);
    light.position.y = 25;
    this.scene.add(light);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth - 10, window.innerHeight - 2);
    document.body.appendChild(this.renderer.domElement);

    this.viewports = new Array();
    this.animate = this.animate.bind(this);
    this.lastAnimatedTimestamp = performance.now();
    this.framerate = 0;
    /** @type {Function[]} */
    this.frameRefreshCallbacks = new Array();
    this.animate();

    THREECache.init();
  }

  static drawWalls() {
    var wallFloor = new Wall(50, 50, Y_AXIS);
    wallFloor.isInvisible = true;
    var wallLeft = new Wall(2, 50, X_AXIS);
    wallLeft.position.x = -25;
    wallLeft.position.y = 1;
    var wallRight = new Wall(2, 50, X_AXIS);
    wallRight.position.x = 25;
    wallRight.position.y = 1;
    var wallFront = new Wall(50, 2, Z_AXIS);
    wallFront.position.z = -25;
    wallFront.position.y = 1;
    var wallBack = new Wall(50, 2, Z_AXIS);
    wallBack.position.z = 25;
    wallBack.position.y = 1;
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
  static removeDrawable(drawable) {
    // TODO: implement
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
    } else throw Error("Wrong type");
  }

  static removeFrameCallback(callback) {
    removeArr(this.frameRefreshCallbacks, callback);
  }

  static generateFood() {
    var coor = Math.floor(Math.random() * 25);
    coor *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    var coor2 = Math.floor(Math.random() * 25);
    coor2 *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    // console.log(coor);
    // console.log(coor2);
    new Food(new Positioning(coor, coor2, 0, 0)); // TODO: implement
  }

  static checkCollision() {
    this.getDrawables().forEach(drawable => {
      this.getDrawables().forEach(against => {
        if (
          drawable !== against &&
          drawable instanceof Drawable &&
          against instanceof Drawable
        ) {
          let isCollide = drawable.collideWith(against);
          // console.log(isCollide);
          if (isCollide == true) return;
        }
      });
    });
  }
}
