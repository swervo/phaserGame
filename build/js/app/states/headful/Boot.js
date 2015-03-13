/* global define */

define([
    'phaser'
], function (
    Phaser
) {
    'use strict';

    function BootState() {}
    
    BootState.prototype = {
        preload: function() {
            // load preloader assets

        },
        create: function() {
            // setup game environment
            // scale, input etc..
            console.log(this.game.scale);
            // set the game to fit the parent element;
            this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.game.state.start('Preload');
        }
    };
    
    return BootState;
});