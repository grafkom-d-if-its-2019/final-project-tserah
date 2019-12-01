// import * as THREE from './js/three.js';
// /home/durianpeople/Project/Web/FP-GRAFKOM/Frontend/typings/index.d.ts
/// <reference path="./typings/index.d.ts" />
/// <reference path="js/objects/Drawable.js" />
/// <reference path="js/objects/Player.js" />
/// <reference path="js/objects/Snake.js" />

var scene = new THREE.Scene();


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );