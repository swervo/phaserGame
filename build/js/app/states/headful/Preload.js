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
            this.game.load.image('wallpaper', 'assets/wallpapers/sky.png');
            this.game.load.image('foreground', 'assets/wallpapers/foreground.png');
            this.game.load.image('rope', 'assets/rope.png');
            this.game.load.spritesheet('shopper', 'assets/shopper.png', 170, 226);
            this.game.load.image('star', 'assets/star.png');

        },
        create: function() {
            this.game.state.start('MainIntro');
        }
    };
    
    return PreloadState;
});