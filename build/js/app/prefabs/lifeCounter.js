/* global define */

define([
    'phaser',

], function(Phaser) {
    'use strict';

    function LifeCounter(game, x, y, frame) {
        Phaser.Sprite.call(this, game, x, y, 'lifeCounter', frame);
        this.anchor.setTo(1, 0);
    }

    LifeCounter.prototype = Object.create(Phaser.Sprite.prototype);
    LifeCounter.prototype.constructor = LifeCounter;

    LifeCounter.prototype.update = function(aFrame) {
        this.frame = aFrame;
    };

    return LifeCounter;

});