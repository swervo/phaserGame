/* global define */

define([
    'phaser',
    'app/states/headful/Boot',
    'app/states/headful/Preload',
    'app/states/headful/MainIntro',
    'app/states/headful/MainMenu',
    'app/states/headless/LevelMaster',
    'app/states/headful/LevelIntro',
    'app/states/headful/LevelRound'
], function (
    Phaser,
    BootState,
    PreloadState,
    MainIntroState,
    MainMenuState,
    LevelMasterState,
    LevelIntroState,
    LevelRoundState
) {
    'use strict';

    function Game() {}
    
    Game.prototype = {
        start: function() {
            console.log('== Game start ==');
            var game = new Phaser.Game(964, 478, Phaser.WEBGL, '');
            game.state.add('Boot', BootState);
            game.state.add('Preload', PreloadState);
            game.state.add('MainIntro', MainIntroState);
            game.state.add('MainMenu', MainMenuState);
            game.state.add('LevelMaster', LevelMasterState);
            game.state.add('LevelIntro', LevelIntroState);
            game.state.add('LevelRound', LevelRoundState);
            game.state.start('Boot');
        }
    };
    
    return Game;
});