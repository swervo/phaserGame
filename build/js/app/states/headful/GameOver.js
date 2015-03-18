/* global define */

define([
    'phaser',
    'app/modules/utils'
], function (Phaser, utils) {
    'use strict';
    var myText;

    function GameOverState() {}

    GameOverState.prototype = {
        init: function() {
            console.log('== Game Over State ==');
        },
        create: function() {
            // add main intro assets into the world

            myText = this.game.add.text(
                this.game.world.centerX,
                this.game.world.centerY, 'Game Over', utils.textStyles.base);
            myText.anchor.set(0.5, 0.5);
            this.game.add.tween(myText.scale)
                .to({x:2, y:2}, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        }
    };

    return GameOverState;
});