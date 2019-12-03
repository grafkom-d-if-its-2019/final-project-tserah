import * as THREE from 'three';
import Drawable from './js/objects/Drawable';
import Player from './js/objects/Player';
import Handler from './js/objects/Handler';
// import io from 'socket.io-client';

Handler.init();
var keyActions = {
    'backward': {
        enabled: true,
        action: () => {
            // Snake mudur
            keyActions.forward.enabled = false; // Disable forward action
            keyActions.left.enabled = true;
            keyActions.right.enabled = true;
            keyActions.pause.enabled = true;
        },

    },

    'forward': {
        enabled: true,
        action: () => {
            keyActions.backward.enabled = false;
            keyActions.left.enabled = true;
            keyActions.right.enabled = true;
            keyActions.pause.enabled = true;
        }
    },

    'left': {
        enabled: true,
        action: () => {
            keyActions.backward.enabled = true;
            keyActions.forward.enabled = true;
            keyActions.right.enabled = false;
            keyActions.pause.enabled = true;
        }
    },

    'right': {
        enabled: true,
        action: () => {
            keyActions.backward.enabled = true;
            keyActions.forward.enabled = true;
            keyActions.left.enabled = false;
            keyActions.pause.enabled = true;
        }
    }
}

var keys = {
    // event.code
    'ArrowDown': 'backward', // up key
    'ArrowUp': 'forward', // down key
    'ArrowRight': 'right', // -> key
    'ArrowLeft': 'left', // <- key
    'keyW': 'up', // W key
    'keyS': 'down', // S key
    'Escape': 'pause' // spacebar
}

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Global camera
// camera.position.z = 5;

// Handle client socket
var socket = io('http://localhost:8000');

var userId = 'abc';
socket.on('connect', ()=>{
    userId = socket.id;
});

var player = new Player(userId);

Handler.animate(renderer, player.camera);

var testDrawable = new Drawable(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));

function rotate() {
    testDrawable.rotateZ(20);
}

function remove() {
    testDrawable = testDrawable.destroy();
}

function onKeyPressUp(e) {
    let keyAction = keyAction[keys[e.code]];
    if (keyAction && keyAction.enabled) {
        keyAction.action();
    }
}

// function 
