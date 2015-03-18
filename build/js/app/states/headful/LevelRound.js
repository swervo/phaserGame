/* global define */


define([
    'phaser',
    'app/modules/eventHandler',
    'app/modules/utils',
    'app/prefabs/rope',
    'app/prefabs/shopper'
], function (Phaser, eventHandler, utils, Rope, Shopper) {
    'use strict';
    var myText;
    var SPAWN_RATE = 3.5;

    function LevelRoundState () {
    }

    LevelRoundState.prototype = {
        init: function(levelData) {
            console.log('== Level Round State ==');
            console.log('== Round ' + levelData.round + ' ==');
            this.levelData = levelData;
        },
        create: function() {
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.physics.arcade.gravity.y = utils.GRAVITY;
            this.eventHandler = eventHandler(this.game, this.duck, this.jump);
            this.background = this.add.tileSprite(0,0, this.world.width, this.world.height, 'wallpaper');
            this.foreground = this.add.tileSprite(0,0, this.world.width, this.world.height, 'foreground');
            this.rope = new Rope(this.game, 0, this.world.height * 0.85, this.world.width, 14);
            this.add.existing(this.rope);
            
            myText = this.game.add.text(
                this.game.world.centerX,
                this.game.world.centerY, 'Round ' + this.levelData.round, utils.textStyles.base);
            myText.anchor.set(0.5);
            myText.alpha = 0.5;
            this.shopper = new Shopper(
                this.game,
                this.game.width/4,
                this.game.height/2,
                5
            );
            // and add it to the game
            this.add.existing(this.shopper);
            
            // do the stars thing
            this.stars = this.add.group();

        },
        start: function () {
            this.isStarted = true;
            this.background.autoScroll(- utils.scrollspeed, 0);
            this.foreground.autoScroll(- utils.scrollspeed/2, 0);
            this.rope.startScrolling();
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
                this.shopper.walk();
            }
        },
        update: function () {
            this.physics.arcade.collide(this.shopper, this.rope, this.walk, null, this);
            this.stars.forEachAlive(function(star) {
                if (star.x < this.game.world.bounds.left + 100) {
                    star.kill();
                }
            }, this);
            // console.log(this.stars.countDead());
        },
        duck: function() {
            console.log('Ducking');
        },
        jump: function() {
            console.log('Jumping');
            if (this.isStarted) {
                this.shopper.jump();
            } else {
                this.start();
            }
        },
        render: function() {
            this.game.debug.text('Click anywhere to start', 32, 32);
            // this.game.debug.pointer(this.game.input.mousePointer);
            this.game.debug.spriteBounds(this.shopper);
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