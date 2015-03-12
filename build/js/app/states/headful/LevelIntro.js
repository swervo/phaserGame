/* global define */

define([
    'phaser',
    'app/modules/textStyles'
], function(Phaser, textStyles) {
    'use strict';
    var myText;
    function LevelIntroState() {}

    LevelIntroState.prototype = {
        init: function(levelData) {
            console.log('== Level Intro State ==');
            console.log('== Level ' + levelData.level + ' ==');
            this.levelData = levelData;
        },
        create: function() {
            var tweenIntro = this.tweenIntro();

            if (this.levelData.level === 1) {
                var tweenSkillMenuPop = this.tweenSkillMenuPop();

                tweenIntro.chain(tweenSkillMenuPop);

                tweenSkillMenuPop.onComplete.add(this.levelStart, this);
            } else {
                tweenIntro.onComplete.add(this.levelStart, this);
            }
            myText = this.game.add.text(
                this.game.world.centerX,
                this.game.world.centerY, 'Level ' + this.levelData.level, textStyles.base);
            myText.anchor.set(0.5);
            myText.alpha = 0.5;
        },

        levelStart: function() {
            this.game.state.start('LevelRound', true, false, this.levelData);
        },

        tweenIntro: function() {
            var tween = this.game.add.tween({})
                    .to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
            return tween;
        },

        tweenSkillMenuPop: function() {
            var tween = this.game.add.tween({})
                    .to({x: 1, y: 1}, 500, Phaser.Easing.Linear.None, true);
            return tween;
        }
    };

    return LevelIntroState;
});