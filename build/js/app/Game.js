/* global define */

define([
    'phaser',
    'app/states/headful/Boot',
    'app/states/headful/Preload',
    'app/states/headful/MainIntro',
    'app/states/headful/MainMenu',
    'app/states/headless/LevelMaster',
    'app/states/headful/LevelIntro',
    'app/states/headful/LevelRound',
    'app/states/headful/GameOver'
], function (
    Phaser,
    BootState,
    PreloadState,
    MainIntroState,
    MainMenuState,
    LevelMasterState,
    LevelIntroState,
    LevelRoundState,
    GameOverState
) {
    'use strict';

    function Game() {}
    
    Game.prototype = {
        start: function() {
            console.log('== Game start ==');
            var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game');
            game.state.add('Boot', BootState);
            game.state.add('Preload', PreloadState);
            game.state.add('MainIntro', MainIntroState);
            game.state.add('MainMenu', MainMenuState);
            game.state.add('LevelMaster', LevelMasterState);
            game.state.add('LevelIntro', LevelIntroState);
            game.state.add('LevelRound', LevelRoundState);
            game.state.add('GameOver', GameOverState);
            game.state.start('Boot');
        }
    };
    
    return Game;
});