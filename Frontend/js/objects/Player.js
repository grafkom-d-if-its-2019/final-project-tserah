/// <reference path="../../typings/index.d.ts" />
/// <reference path="./Positioning.js" />

class Player {
    /**
     * 
     * @param {String} name 
     */
    constructor(name) {
        this.name = name;
        this.snake = new Snake(this);
        this.camera = new THREE.PerspectiveCamera(); // TODO: benerin
        this.positioning = new Positioning(0, 0, 90, 1); // TODO: benerin

        this.keyActions = {
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

        this.keys = {
            // event.code
            'ArrowDown': 'backward', // up key
            'ArrowUp': 'forward', // down key
            'ArrowRight': 'right', // -> key
            'ArrowLeft': 'left', // <- key
            'keyW': 'up', // W key
            'keyS': 'down', // S key
            'Escape': 'pause' // spacebar
        }

        this.onKeyPressUp = this.onKeyPressUp.bind(this);
    }

    onKeyPressUp(e) {
        let keyAction = keyAction[keys[e.code]];
        if(keyAction && keyAction.enabled){
            keyAction.action();
        }
    }

    


}