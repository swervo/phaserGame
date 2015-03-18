/* global define */

define([], function() {
    'use strict';
    var gameState;
    var JUMP = 750;

    function init (aGameState, aSprite) {
        gameState = aGameState;
        var playerHeight = gameState.game.cache.getImage(aSprite).height;
        gameState.player = gameState.game.add.sprite(
            gameState.world.width/4,
            ((gameState.world.height * 0.8) - playerHeight),
            aSprite
        );
        gameState.physics.arcade.enableBody(gameState.player);
        gameState.player.body.collideWorldBounds = true;
        gameState.player.animations.add('walk', [5, 6, 7, 8], 10, true);
        gameState.player.frame = 5;
        return gameState.player;
    }

    function walk () {
        gameState.player.animations.play('walk');
    }

    function jump () {
        gameState.player.body.velocity.y = -JUMP;
        gameState.player.animations.stop('walk');
        gameState.player.frame = 5;
    }

    return {
        init: init,
        walk: walk,
        jump: jump
    };

});