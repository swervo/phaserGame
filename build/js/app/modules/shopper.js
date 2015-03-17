/* global define */

define([
    'app/modules/utils'
], function(utils) {
    'use strict';
    var gameState;

    function init (aGameState) {
        gameState = aGameState;
        var playerHeight = gameState.game.cache.getImage('shopper').height;
        gameState.player = gameState.game.add.sprite(
            gameState.world.width/4,
            ((gameState.world.height * 0.8) - playerHeight),
            'shopper'
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
        gameState.player.body.velocity.y = -utils.JUMP;
        gameState.player.animations.stop('walk');
        gameState.player.frame = 5;
    }

    return {
        init: init,
        walk: walk,
        jump: jump
    };

});