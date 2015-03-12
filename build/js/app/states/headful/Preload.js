/* global define */

define([
    'phaser'
], function (Phaser) {
    'use strict';

    function PreloadState() {}
    
    PreloadState.prototype = {
        preload: function() {
            // load all game assets
            // images, spritesheets, atlases, audio etc..
            this.game.load.image('wallpaper', 'assets/highWire.jpg');

        },
        create: function() {
            this.game.state.start('MainIntro');
        }
    };
    
    return PreloadState;
});