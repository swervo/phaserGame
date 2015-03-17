/* global define */


define([
    'phaser',
    'app/modules/eventHandler',
    'app/modules/utils',
    'app/modules/shopper'
], function (Phaser, eventHandler, utils, shopper) {
    'use strict';
    var myText, add, shopperSprite;
    var SPAWN_RATE = 1;

    function LevelRoundState () {
    }

    LevelRoundState.prototype = {
        init: function(levelData) {
            console.log('== Level Round State ==');
            console.log('== Round ' + levelData.round + ' ==');
            add = this.game.add;
            this.levelData = levelData;
        },
        create: function() {
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.physics.arcade.gravity.y = utils.GRAVITY;
            this.eventHandler = eventHandler(this.game, this.duck, this.jump);
            this.background = add.tileSprite(0,0, this.world.width, this.world.height, 'wallpaper');
            this.foreground = add.tileSprite(0,0, this.world.width, this.world.height, 'foreground');
            this.rope = add.sprite(0, this.world.height * 0.85, 'rope');
            this.physics.arcade.enableBody(this.rope);
            this.rope.body.allowGravity = false;
            this.rope.body.immovable = true;
            
            myText = this.game.add.text(
                this.game.world.centerX,
                this.game.world.centerY, 'Round ' + this.levelData.round, utils.textStyles.base);
            myText.anchor.set(0.5);
            myText.alpha = 0.5;
            // create the shopperSprite;
            shopperSprite = shopper.init(this);
            
            // do the stars thing
            this.stars = this.add.group();

        },
        start: function () {
            this.isStarted = true;
            this.background.autoScroll(- utils.scrollspeed, 0);
            this.foreground.autoScroll(- utils.scrollspeed/2, 0);
            this.walk();
            this.starTimer = this.game.time.events.loop(
                Phaser.Timer.SECOND * SPAWN_RATE,
                this.spawnStar,
                this
            );
            this.starTimer.timer.start();
        },
        spawnStar: function () {
            var star = this.stars.create(
                this.game.width,
                this.game.height/2,
                'star'
            );
            this.physics.arcade.enableBody(star);
            star.body.allowGravity = false;
            star.scored = false;
            star.body.immovable = false;
            star.body.velocity.x = -200;
        },
        walk: function () {
            if (this.isStarted) {
                shopper.walk();
            }
        },
        update: function () {
            this.physics.arcade.collide(shopperSprite, this.rope, this.walk, null, this);
        },
        duck: function() {
            console.log('Ducking');
        },
        jump: function() {
            console.log('Jumping');
            if (this.isStarted) {
                shopper.jump();
            } else {
                this.start();
            }
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