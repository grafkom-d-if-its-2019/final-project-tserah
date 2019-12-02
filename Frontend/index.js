/// <reference path="./typings/index.d.ts" />
/// <reference path="js/objects/Drawable.js" />
/// <reference path="js/objects/Player.js" />
/// <reference path="js/objects/Snake.js" />
/// <reference path="js/objects/Food.js" />
/// <reference path="js/objects/Handler.js" />
/// <reference path="js/objects/SnakeBody.js" />


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var testDrawable = new Drawable(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0x00ff00}));
