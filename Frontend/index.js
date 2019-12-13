import * as THREE from 'three';
import Handler from './js/objects/Handler';
import Drawable from './js/objects/Drawable';
import Viewport from './js/objects/Viewport';
import io from 'socket.io-client';
import Wall from './js/objects/Wall';
import { X_AXIS, Y_AXIS, Z_AXIS } from './js/Constants';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SnakeBody from './js/objects/SnakeBody';
import Player from './js/objects/Player';

Handler.init();

function main() {// Flag ready
    let ready = false;
    let room = 'roomku'; // default room

    // Listen to server
    var socket = io('http://localhost:8000');
    /*
    ** Socket Function
    */
    // Create session ID
    var userID = 'abcd';
    socket.on('connect', () => {
        console.log("User connected");
        userID = socket.id;
        console.log("User ID: " + userID);
    });
    // Ask room
    // const room = window.alert('Enter room name');
    socket.emit('getRoom', room);

    socket.on('joined', (room, id) => {
        console.log(id + " has joined the room " + room);
    });
    socket.on('ready', () => {
        ready = true; // Set ready to play
    });
    // TODO: Buat ready or not
}


function testObjects() {
    document.addEventListener('keyup', onKeyPressUp, false);
    var camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera1.position.z = 5;

    var camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera2.position.z = 5;
    camera2.position.x = 2;

    Handler.registerViewport(new Viewport(0.5, 0, 0.5, 1, camera1));
    Handler.registerViewport(new Viewport(0, 0, 0.5, 1, camera2));

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var player = new Player('test', geometry, material);
    window.player = player;
    // var testDrawable = new Drawable(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    // console.log(testDrawable);
    // var objectB = new Drawable(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x0000ff }), true);
    // objectB.position.x = -3;
    // console.log(objectB);
    
    
    window.Handler = Handler;

    // Key map
    var keys = {
        'KeyW': 'forward',
        'KeyS': 'backward',
        'KeyA': 'left',
        'KeyD': 'right'
    };

    var keyActions = {
        // Decrease speed?
        'backward': {
            enabled: true,
            action: function () {
                // snake.back();
                console.log('mundur');
                keyActions.forward.enabled = false;
                keyActions.left.enabled = true;
                keyActions.right.enabled = true;
                player.backward();
            }
        },
        // Increase speed
        'forward': {
            enabled: true,
            action: function () {
                // snake.forward();
                console.log('maju');
                keyActions.backward.enabled = false;
                keyActions.left.enabled = true;
                keyActions.right.enabled = true;
                player.forward();
            }
        },
        'right': {
            enabled: true,
            action: function () {
                // snake.right();
                console.log('kanan');
                keyActions.left.enabled = false;
                keyActions.forward.enabled = true;
                keyActions.backward.enabled = true;
                player.right();
            }
        },
        'left': {
            enabled: true,
            action: function () {
                // snake.left();
                console.log('kiri');
                keyActions.right.enabled = false;
                keyActions.backward.enabled = true;
                keyActions.forward.enabled = true;
                player.left();
            }
        },
    };

    function onKeyPressUp(e) {
        var keyAction = keyActions[keys[e.code]];
        if (keyAction && keyAction.enabled) {
            keyAction.action();
        }
    }

    // Controller Camera
    let control = new OrbitControls(camera1, Handler.renderer.domElement);
    // TODO: pisah controller pake 2 canvas?
    // let control2 = new OrbitControls(camera2, Handler.renderer.domElement);
    // Handler.controller = control;
    window.control = control;

    function rotate() {
        testDrawable.rotateZ(20);
    }

    function remove() {
        testDrawable = testDrawable.destroy();
    }
}

function contohMapDenganTembok() {
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 1;

    Handler.registerViewport(new Viewport(0, 0, 1, 1, camera));
    window.Handler = Handler;
    
    Handler.drawWalls();
}

testObjects();
// coba();
