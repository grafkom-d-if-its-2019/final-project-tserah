import * as THREE from 'three';
import Handler from './js/objects/Handler';
import Viewport from './js/objects/Viewport';
import io from 'socket.io-client';

Handler.init();
// Flag ready
let ready = false;
let room = 'roomku'; // default room

// Listen to server
var socket = io('http://localhost:8000');
/*
** Socket Function
*/
// Create session ID
var userID = 'abcd';
socket.on('connect', ()=>{
    console.log("User connected");
    userID = socket.id;
    console.log("User ID: "+userID);
});
// Ask room
// const room = window.alert('Enter room name');
socket.emit('getRoom', room);

socket.on('joined', (room, id)=>{
    console.log(id+" has joined the room "+room);
});
socket.on('ready', ()=>{
    ready = true; // Set ready to play
});

// TODO: Buat ready or not



var camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera1.position.z = 5;

var camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera2.position.z = 5;
camera2.position.x = 2;

Handler.registerDrawer(new Viewport(0.5, 0, 0.5, 1, camera1));
Handler.registerDrawer(new Viewport(0, 0, 0.5, 1, camera2));

var testDrawable = new Drawable(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0x00ff00}));
console.log(testDrawable);
var objectB = new Drawable(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0x0000ff}), true);
objectB.position.x = -3;
console.log(objectB);

function rotate() {
    testDrawable.rotateZ(20);
}

function remove() {
    testDrawable = testDrawable.destroy();
}
