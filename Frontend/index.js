import * as THREE from 'three';
import Handler from './js/objects/Handler';
import Drawable from './js/objects/Drawable';
import Viewport from './js/objects/Viewport';
import io from 'socket.io-client';
import Wall from './js/objects/Wall';
import { X_AXIS, Y_AXIS, Z_AXIS } from './js/Constants';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
    var camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera1.position.z = 5;

    var camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera2.position.z = 5;
    camera2.position.x = 2;

    Handler.registerViewport(new Viewport(0.5, 0, 0.5, 1, camera1));
    Handler.registerViewport(new Viewport(0, 0, 0.5, 1, camera2));

    var testDrawable = new Drawable(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    console.log(testDrawable);
    var objectB = new Drawable(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x0000ff }), true);
    objectB.position.x = -3;
    console.log(objectB);
    
    window.Handler = Handler;

    // Controller Camera
    let control = new OrbitControls(camera1, Handler.renderer.domElement);
    // TODO: pisah controller pake 2 canvas?
    let control2 = new OrbitControls(camera2, Handler.renderer.domElement);
    // Handler.controller = control;
    window.control = control;

    function rotate() {
        testDrawable.rotateZ(20);
    }

    function remove() {
        testDrawable = testDrawable.destroy();
    }
}

function test2() {
    var floor = new Drawable(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({color: 0x0000ff}), true);
    window.floor = floor;

    var cube = new Drawable(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0x00ff00}));

    var camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera1.position.z = 5;
    window.camera = camera1;

    Handler.registerViewport(new Viewport(0, 0, 1, 1, camera1));

    var a = function() {
        console.log("refreshing");
    }
    window.a = a;
    Handler.registerFrameCallback(a);
    window.Handler = Handler;
}

function test3() {
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    window.camera = camera;
    Handler.registerViewport(new Viewport(0, 0, 1, 1, camera));
    window.Handler = Handler;

    var wall = new Wall(50, 50, X_AXIS);
    window.wall = wall;
}

testObjects();