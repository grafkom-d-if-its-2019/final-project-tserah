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
import Multiplayer from './js/Multiplayer';

Handler.init();
Multiplayer.init();
let finish = false;
/*****************************
 * Socket Client
 *****************************/

Multiplayer.socket.on('controller', control => {
    if (control.action == 'forward') {
        Multiplayer.players[control.name].forward();
    } else if (control.action == 'backward') {
        Multiplayer.players[control.name].backward();
    } else if (control.action == 'left') {
        Multiplayer.players[control.name].left();
    } else if (control.action == 'right') {
        Multiplayer.players[control.name].right();
    } else {
        console.log('----ERROR CONTROLLER----');
    }
});

// User left the game
Multiplayer.socket.on('close', emission=>{
    console.log('User '+emission.name+' left the game');
    finish = true;
    Multiplayer.players[emission.name].gameover(emission.name, finish);
});

var test_username = "";

/*********************************
 * Controller section
 *********************************/

// Key map
var keys = {
    'KeyW': 'forward',
    'KeyS': 'backward',
    'KeyA': 'left',
    'KeyD': 'right',
    'KeyB': 'append',
};

var keyActions = {
    // TODO: delete on prod
    // Decrease speed
    'backward': {
        enabled: true,
        action: function () {
            console.log('mundur');
            backward();
        }
    },
    // Increase speed
    'forward': {
        enabled: true,
        action: function () {
            console.log('maju');
            forward();
        }
    },
    'right': {
        enabled: true,
        action: function () {
            console.log('kanan');
            right();
        }
    },
    'left': {
        enabled: true,
        action: function () {
            console.log('kiri');
            left();
        }
    },
    'append': {
        enabled: true,
        action: function () {
            append();
        }
    }
};

function onKeyPressDown(e) {
    var keyAction = keyActions[keys[e.code]];
    if (keyAction && keyAction.enabled) {
        keyAction.action();
    }
}

document.addEventListener('keydown', onKeyPressDown, false);

function forward() {
    Multiplayer.players[test_username].forward();
}

function backward() {
    Multiplayer.players[test_username].backward();
}

function left() {
    Multiplayer.players[test_username].left();
}

function right() {
    Multiplayer.players[test_username].right();
}

function append() {
    Multiplayer.players[test_username].snake.appendBody();
}

/****************************************************************************************/

/*******************************************
 * HTML Section
 *******************************************/

// // if()
//  document.getElementById('overview').innerHTML();

 /**************************************************************************************/

function testObjects() {
    Handler.drawWalls();
    Handler.loadGTLF();
    Handler.loadSky();
    Handler.addBGM(1); 
    console.log("Loading map...");
    // Multiplayer.newPlayer(username);

    window.Handler = Handler;

    // Controller Camera
    let controlOverview = new OrbitControls(Multiplayer.overviewCamera, Handler.renderer.domElement);
    window.controlOverview = controlOverview;

    function rotate() {
        testDrawable.rotateZ(20);
    }

    function remove() {
        testDrawable = testDrawable.destroy();
    }
}

function coba() {
    // document.addEventListener('keyup', onKeyPressUp, false);
    var camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera1.position.z = 5;

    Handler.registerViewport(new Viewport(0, 0, 1, 1, camera1));

    // var snake = new SnakeBody(null);
    // Handler.generateFood();
    // window.snake = snake;


    window.Handler = Handler;

    // Controller Camera
    let control = new OrbitControls(camera1, Handler.renderer.domElement);
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
    window.camera = camera;

    Handler.registerViewport(new Viewport(0, 0, 1, 1, camera));
    window.Handler = Handler;

    Handler.drawWalls();
}

function new_food() {
    var camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    Handler.registerViewport(new Viewport(0, 0, 1, 1, camera1));
    camera1.position.z = 5;

    var pos = new Positioning(0, 0);
    var foods = new Food(pos);
    console.log(foods);

    window.Handler = Handler;

    // Controller Camera
    let control = new OrbitControls(camera1, Handler.renderer.domElement);
    // TODO: pisah controller pake 2 canvas?
    window.control = control;

    function rotate() {
        testDrawable.rotateZ(20);
    }

    function remove() {
        testDrawable = testDrawable.destroy();
    }
}

testObjects();
// Handler.generateFood();
// coba();
// contohMapDenganTembok();
