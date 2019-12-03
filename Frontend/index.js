import * as THREE from 'three';
import Drawable from './js/objects/Drawable';
import Handler from './js/objects/Handler';
import Viewport from './js/objects/Drawer';

Handler.init();

var camera1 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera1.position.z = 5;

var camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera2.position.z = 5;
camera2.position.x = 2;


Handler.registerDrawer(new Viewport(0.5, 0, 0.5, 1, camera1));
Handler.registerDrawer(new Viewport(0, 0, 0.5, 1, camera2));

var testDrawable = new Drawable(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0x00ff00}));
console.log(testDrawable);

function rotate() {
    testDrawable.rotateZ(20);
}

function remove() {
    testDrawable = testDrawable.destroy();
}
