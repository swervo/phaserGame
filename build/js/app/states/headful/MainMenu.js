/* global define */

define([
    'phaser',
    'app/modules/utils',
    'app/prefabs/shopper'
], function (Phaser, utils, shopper) {
    'use strict';
    var spriteOffset;
    var hilight;
    var maleSpriteName = 'mShopper';
    var femaleSpriteName = 'fShopper';
    function MainMenuState() {}

    MainMenuState.prototype = {
        init: function() {
            console.log('== Main Menu State ==');
        },
        create: function() {
            this.game.stage.backgroundColor = '#4b0049';

            this.startButton = this.add.button(
                this.game.world.centerX - 95,
                460,
                'button',
                this.nextState,
                this,
                2, 1, 0
            );
            this.startButton.input.useHandCursor = true;
            this.startLabel = new Phaser.Text(this.game, 0, 0, 'Start', utils.textStyles.button);
            this.startButton.addChild(this.startLabel);
            this.startLabel.x = Math.floor((this.startButton.width - this.startLabel.width)*0.5);
            this.startLabel.y = Math.floor((this.startButton.height - this.startLabel.height)*0.5);

            this.maleAvatar = new Phaser.Sprite(this.game, 0,
                this.world.height * 0.2,
                maleSpriteName);
            spriteOffset = this.maleAvatar.width/2;
            this.maleAvatar.x = (this.world.width/4) - spriteOffset;
            this.game.add.existing(this.maleAvatar);
            this.maleAvatar.animations.add('walk', [5, 6, 7, 8], 5, true);
            this.maleAvatar.animations.play('walk');
            this.femaleAvatar = this.game.add.sprite(
                (3 * (this.world.width/4)) - spriteOffset,
                this.world.height * 0.2,
                femaleSpriteName
            );
            this.femaleAvatar.animations.add('walk', [3, 2, 1, 0], 5, true);
            this.femaleAvatar.animations.play('walk');

            this.maleAvatar.inputEnabled = true;
            this.femaleAvatar.inputEnabled = true;
            this.maleAvatar.name = maleSpriteName;
            this.femaleAvatar.name = femaleSpriteName;
            this.maleAvatar.events.onInputDown.add(this.selectMe, this);
            this.femaleAvatar.events.onInputDown.add(this.selectMe, this);
        },
        selectMe: function (aSprite) {
            utils.avatar = aSprite.name;
            var padding = 50;
            if (!hilight) {
                hilight = this.game.add.graphics();
                hilight.lineStyle(8, 0xFFFF00, 1);
                hilight.drawRoundedRect(
                    aSprite.x - padding/2,
                    aSprite.y - padding/2,
                    aSprite.width + 50,
                    aSprite.height + 50,
                    5
                );
            } else {
                // position it
                // not clear sprite is reporting
                // its x position on the right edge
                hilight.position.x = aSprite.x - aSprite.width;
            }
        },
        render: function () {
            this.game.debug.text('Click avatar to select', 32, 32);
        },
        nextState: function() {
            this.game.state.start('LevelMaster');
        }
    };

    return MainMenuState;

});