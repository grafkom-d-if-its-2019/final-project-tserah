/// <reference path="../../typings/index.d.ts" />
/// <reference path="./Drawable.js" />
/// <reference path="./Player.js" />
/// <reference path="./Food.js" />

class Handler {
    /** @type {Player[]} */
    static players = new Array();

    /** @type {Food[]} */
    static foods = new Array();

    /** @type {Drawable[]} */
    static otherDrawables = new Array();

    /**
     * 
     * @param {Drawable} drawable 
     */
    static registerDrawable(drawable) {
        this.otherDrawables.push(drawable);
    }

    /**
     * 
     * @param {Player} player 
     */
    static registerPlayer(player) {
        this.players.push(player);
    }

    static generateFood() {
        this.foods.push(new Food(new Positioning())); // TODO: implement
    }
}