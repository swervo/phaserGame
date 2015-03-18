/* global define */

define([
    'phaser'
], function(Phaser) {
    'use strict';
    var JUMP = 750;

    function Shopper(game, x, y, frame) {
        Phaser.Sprite.call(this, game, x, y, 'mShopper', frame);
        this.anchor.setTo(0.5, 0.5);
        this.animations.add('walk', [5, 6, 7, 8], 10, true);

        this.name = 'shopper';
        this.alive = false;
        this.onGround = false;

        // enable physics on the shopper
        // and disable gravity on the shopper
        // until the game is started
        this.game.physics.arcade.enableBody(this);
        this.body.allowGravity = true;
        this.body.collideWorldBounds = true;
        this.body.bounce.x = 0;
        this.body.bounce.y = 0.2;
        this.frame = frame;
        this.events.onKilled.add(this.onKilled, this);
    }


    Shopper.prototype = Object.create(Phaser.Sprite.prototype);
    Shopper.prototype.constructor = Shopper;

    Shopper.prototype.update = function() {
        // prevent the shopper being pushed back
        // by objects it collides with.
        this.body.velocity.x = 0;
        // check to see if our angle is less than 90
        // if it is rotate the bird towards the ground by 2.5 degrees
        // if (this.angle < 90 && this.alive) {
        //     this.angle += 2.5;
        // }

        // if (!this.alive) {
        // }
    };

    Shopper.prototype.walk = function() {
        this.animations.play('walk');
        // if (!!this.alive) {
        //     //cause our bird to "jump" upward
        //     this.body.velocity.y = -400;
        //     // rotate the bird to -40 degrees
        //     this.game.add.tween(this).to({
        //         angle: -40
        //     }, 100).start();
        // }
    };

    Shopper.prototype.jump = function() {
        this.body.velocity.y = -JUMP;
        this.animations.stop();
        this.frame = 5;
    };

    Shopper.prototype.revived = function() {};

    Shopper.prototype.onKilled = function() {
        this.exists = true;
        this.visible = true;
        this.animations.stop();
        console.log('killed');
        console.log('alive:', this.alive);
    };

    return Shopper;

});