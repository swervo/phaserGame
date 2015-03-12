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
            this.game.state.start('Preload');
        }
    };
    
    return BootState;
});