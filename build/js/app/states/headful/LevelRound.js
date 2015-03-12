/* global define */


define([
    'phaser',
    'app/modules/eventHandler',
    'app/modules/textStyles'
], function (Phaser, eventHandler, textStyles) {
    'use strict';
    var myText, keyboard;

    function LevelRoundState () {
    }

    LevelRoundState.prototype = {
        init: function(levelData) {
            console.log('== Level Round State ==');
            console.log('== Round ' + levelData.round + ' ==');
            keyboard = this.game.input.keyboard;
            this.levelData = levelData;
        },
        create: function() {
            this.eventHandler = eventHandler(this.game, this.duck, this.jump);

            this.enterKey = keyboard.addKey(Phaser.Keyboard.ENTER);
            this.spaceKey = keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            this.enterKey.onDown.add(this.roundEnd, this);
            this.spaceKey.onUp.add(this.addOneToScore, this);
            myText = this.game.add.text(
                this.game.world.centerX,
                this.game.world.centerY, 'Round ' + this.levelData.round, textStyles.base);
            myText.anchor.set(0.5);
            myText.alpha = 0.5;
        },
        render: function() {
                //  Just renders out the pointer data when you touch the canvas
            // this.game.debug.pointer(this.game.input.mousePointer);
            // this.game.debug.pointer(this.game.input.pointer1);
        },
        duck: function() {
            console.log('Ducking');
        },
        jump: function() {
            console.log('Jumping');
        },
        addOneToScore: function() {
            this.levelData.players[0].score++;
            this.levelData.players[1].score++;

        },
        roundEnd: function() {
            this.nextRound();
        },
        nextRound: function() {
            this.game.state.start('LevelMaster', true, false, this.levelData);
        }
    };

    return LevelRoundState;

});