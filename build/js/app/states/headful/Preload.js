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
            // environment
            this.game.load.image('wallpaper', 'assets/wallpapers/sky.png');
            this.game.load.image('foreground', 'assets/wallpapers/foreground.png');
            this.game.load.image('ropeSegment', 'assets/ropeSegment.png');
            // controls
            this.game.load.spritesheet('button', 'assets/controls/button.png', 193, 71);


            this.game.load.spritesheet('fShopper', 'assets/fShopper.png', 170, 226);
            this.game.load.spritesheet('mShopper', 'assets/mShopper.png', 170, 226);
            this.game.load.image('star', 'assets/star.png');

        },
        create: function() {
            this.game.state.start('MainIntro');
        }
    };
    
    return PreloadState;
});