/* global define */

define([
    'phaser',
    'app/modules/utils'
], function (Phaser, utils) {
    'use strict';
    var myText;

    function MainIntroState() {}

    MainIntroState.prototype = {
        init: function() {
            console.log('== Main Intro State ==');
        },
        create: function() {
            // add main intro assets into the world

            myText = this.game.add.text(
                this.game.world.centerX,
                this.game.world.centerY, 'Brought to you by Morrisons', utils.textStyles.base);
            myText.anchor.set(0.5);
            myText.alpha = 0.5;
            this.tweenFadeState();
        },

        tweenFadeState: function() {
            this.game.add.tween(myText).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true)
                .onComplete.add(function() {
                    this.game.state.start('MainMenu');
                }, this);
        }
    };

    return MainIntroState;
});