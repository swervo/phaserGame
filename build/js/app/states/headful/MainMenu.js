/* global define */

define([
    'phaser',
    'app/modules/utils'
], function (Phaser, utils) {
    'use strict';
    var myText;
    function MainMenuState() {}

    MainMenuState.prototype = {
        init: function() {
            console.log('== Main Menu State ==');
        },
        create: function() {
            myText = this.game.add.text(
                this.game.world.centerX,
                this.game.world.centerY, 'Main menu state', utils.textStyles.base);
            myText.anchor.set(0.5);
            myText.alpha = 0.5;

            // this.enterKey = this.game.input.keyboard
            //     .addKey(Phaser.Keyboard.ENTER);

            // this.enterKey.onDown.add(this.tweenPlayState, this);
            this.tweenPlayState();
        },
        tweenPlayState: function() {
            var tweenMenuMove = this.game.add.tween(myText)
                .to({
                    x: 0,
                    y: 0
                }, 200);

            tweenMenuMove.onComplete.add(function() {
                this.game.state.start('LevelMaster');
            }, this);

            tweenMenuMove.start();
        }
    };

    return MainMenuState;

});