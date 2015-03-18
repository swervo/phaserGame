/* global define */

define([
    'phaser',
], function(Phaser) {
    'use strict';

    function Star(game, x, y, frame) {
        Phaser.Sprite.call(this, game, x, y, 'star', frame);
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enableBody(this);

        this.body.allowGravity = false;
        this.body.immovable = true;
        this.hasScored = false;
        this.body.velocity.x = -200;
        this.game.add.tween(this.scale).to( { x: 3, y: 3 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    }

    Star.prototype = Object.create(Phaser.Sprite.prototype);
    Star.prototype.constructor = Star;
    Star.prototype.update = function() {
        if (!this.inWorld) {
            this.exists = false;
        }
        // add other star specific stuff here;
        // spin?
    };
    Star.prototype.start = function() {
        this.hasScored = false;
        this.body.velocity.x = -200;
    },
    Star.prototype.stop = function() {
        this.body.velocity.x = 0;
    };
    Star.prototype.flyAway = function() {
        // make it fly up to the scoreboard
        this.exists = false;
        this.visible = false;
    };

    return Star;

});