import * as THREE from "three";
import Drawable from "./Drawable";
import Viewport from "./Viewport";
import Food from "./Food";
import Positioning from "./Positioning";
import Wall from "./Wall";
import { X_AXIS, Y_AXIS, Z_AXIS } from "../Constants";
import THREECache from "../THREECache"
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';


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
    var pointLight = new THREE.PointLight(0xffffff, 3, 50);
    pointLight.position.y = 25;
    this.scene.add(pointLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    this.scene.add(directionalLight);
    var ambientLight = new THREE.AmbientLight(0x999999); // soft white light
    this.scene.add(ambientLight);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth - 10, window.innerHeight - 2);
    document.body.appendChild(this.renderer.domElement);

    // var spotLight = new THREE.SpotLight(0xffffff);
    // spotLight.position.set(0, 50, 0);
    // spotLight.intensity = 3;
    // this.scene.add(spotLight);

    this.viewports = new Array();
    // this.addBGM = this.addBGM.bind(this);
    this.animate = this.animate.bind(this);
    // this.loadGTLF = this.loadGTLF.bind(this);
    this.lastAnimatedTimestamp = performance.now();
    this.framerate = 0;
    /** @type {Function[]} */
    this.frameRefreshCallbacks = new Array();
    // this.addBGM();
    // this.loadGTLF();
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

  static resetViewport() {
    this.viewports = new Array();
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

  static addBGM(input) {
    if (input == 1) {
      this.bgm = new Audio('../assets/gagak.mp3');
      this.bgm.volume = 0.3;
      this.bgm.loop = true;
      this.bgm.play();
    }
    else {
      this.bgm.pause();
    }
  }
  static loadGTLF() {
    var loader = new ColladaLoader();
    loader.load("../assets/SpaceShip.dae", (result) => {
      this.scene.add(result.scene);
      result.scene.position.y = -15;
      result.scene.position.z = 0;
      result.scene.position.x = 0;
      result.scene.rotation.z = 2;
      result.scene.scale.set(1, 1, 1);
      window.space = result.scene;

    });

    loader.load("../assets/SpaceShip.dae", (result) => {
      this.scene.add(result.scene);
      result.scene.position.y = 5;
      result.scene.position.z =30;
      result.scene.position.x = 30;
      result.scene.rotation.z = 2;
      result.scene.scale.set(1, 1, 1);
      window.space2 = result.scene;
    });

    loader.load("../assets/SpaceShip.dae", (result) => {
      this.scene.add(result.scene);
      result.scene.position.y = 5;
      result.scene.position.z = -30;
      result.scene.position.x = 30;
      result.scene.rotation.z = 2;
      result.scene.scale.set(1, 1, 1);
      window.space2 = result.scene;
    });

    loader.load("../assets/SpaceShip.dae", (result) => {
      this.scene.add(result.scene);
      result.scene.position.y = 5;
      result.scene.position.z = 30;
      result.scene.position.x = -30;
      result.scene.rotation.z = 2;
      result.scene.scale.set(1, 1, 1);
      window.space2 = result.scene;
    });

    loader.load("../assets/SpaceShip.dae", (result) => {
      this.scene.add(result.scene);
      result.scene.position.y = 5;
      result.scene.position.z = -30;
      result.scene.position.x = -30;
      result.scene.rotation.z = 2;
      result.scene.scale.set(1, 1, 1);
      window.space2 = result.scene;
    });
  };

  static loadSky() {
    var loader = new THREE.TextureLoader(),
      texture = loader.load("../assets/sky.jpg");
    var geometry = new THREE.SphereGeometry(100, 32, 32);
    var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    var plane = new THREE.Mesh(geometry, material);
    this.scene.add(plane);
    plane.position.y = 10;
  };


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
