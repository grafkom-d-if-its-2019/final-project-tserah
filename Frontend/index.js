/// <reference path="./typings/index.d.ts" />
/// <reference path="js/objects/Drawable.js" />
/// <reference path="js/objects/Player.js" />
/// <reference path="js/objects/Snake.js" />
/// <reference path="js/objects/Food.js" />
/// <reference path="js/objects/Handler.js" />
/// <reference path="js/objects/SnakeBody.js" />

var scene = new THREE.Scene();


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
