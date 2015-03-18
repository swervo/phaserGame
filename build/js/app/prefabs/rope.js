/* global define */

define([
    'phaser',
    'app/modules/utils'
], function(Phaser, utils) {
    'use strict';

    function Rope(game, x, y, width, height) {
        Phaser.TileSprite.call(this, game, x, y, width, height, 'ropeSegment');
        // start scrolling our ground
        // this.autoScroll(-200, 0);

        // enable physics on the ground sprite
        // this is needed for collision detection
        this.game.physics.arcade.enableBody(this);

        // we don't want the ground's body
        // to be affected by gravity or external forces
        this.body.allowGravity = false;
        this.body.immovable = true;
    }

    Rope.prototype = Object.create(Phaser.TileSprite.prototype);
    Rope.prototype.constructor = Rope;

    Rope.prototype.update = function() {

        // write your prefab's specific update code here

    };
    Rope.prototype.startScrolling = function() {
        this.autoScroll(-utils.scrollspeed/5, 0);
    };

    return Rope;

});