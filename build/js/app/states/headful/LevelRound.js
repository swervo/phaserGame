/* global define */


define([
    'phaser',
    'app/modules/eventHandler',
    'app/modules/utils',
    'app/prefabs/rope',
    'app/prefabs/lifeCounter',
    'app/prefabs/shopper',
    'app/prefabs/star'
], function (Phaser, eventHandler, utils, Rope, LifeCounter, Shopper, Star) {
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
            this.lifeCounter = new LifeCounter(this.game, this.world.width - 20, 10, 0);
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
            this.add.existing(this.lifeCounter);
            
            // do the stars thing
            this.stars = this.add.group();

        },
        start: function () {
            this.isStarted = true;
            this.score = 0;
            this.hits = 0;
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
            var starY = (0.75 * this.game.height) + this.game.rnd.integerInRange(-25, 25);
            var starX = this.game.width;
            var star = this.stars.getFirstExists(false);
            if(!star) {
                star = new Star(this.game, starX, starY, null);
                this.stars.add(star);
            } else {
                // reset and restart it;
                star.reset(starX, starY);
                star.start();
                
            }
        },
        walk: function () {
            if (this.isStarted) {
                this.shopper.walk();
            }
        },
        update: function () {
            this.physics.arcade.collide(this.shopper, this.rope, this.walk, null, this);
            this.stars.forEach(function(star) {
                this.checkScore(star);
                this.physics.arcade.collide(star, this.shopper, this.deathHandler, null, this);
            }, this);
        },
        checkScore: function(star) {
            if (star.exists && !star.hasScored && star.world.x <= this.shopper.world.x) {
                star.hasScored = true;
                this.score++;
                console.log('score = ' + this.score);
                // this.scoreText.setText(this.score.toString());
            }
        },
        deathHandler: function(star) {
            star.flyAway();
            this.hits++;
            console.log('star hit ' + this.hits);
            if (this.hits < 4) {
                this.lifeCounter.update(this.hits);
            } else {
                this.lifeCounter.update(this.hits);
                // game over;
                this.isStarted = false;
                this.shopper.kill();
                this.stars.callAll('stop');
                // this.starTimer.timer.stop();
                this.game.time.events.remove(this.starTimer);
                this.background.stopScroll();
                this.foreground.stopScroll();
                this.rope.stopScroll();
                console.log(Phaser.Timer.SECOND);
                this.game.time.events.add(Phaser.Timer.SECOND * 3, this.gameOver, this);
            }
        },
        gameOver: function() {
            this.game.state.start('GameOver');
        },
        duck: function() {
            console.log('Ducking');
        },
        jump: function() {
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
            this.stars.forEach(function(star) {
                this.game.debug.spriteBounds(star);
            }, this);
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
        },
        shutdown: function() {
            this.shopper.destroy();
            this.stars.destroy();
            this.lifeCounter.destroy();
        }
    };

    return LevelRoundState;

});