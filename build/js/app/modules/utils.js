/* global define */

define([], function() {
    'use strict';

    var utils = {
        textStyles: {
            base: {
                font: '65px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        },
        scrollspeed: 500,
        GRAVITY: 900,
        JUMP: 750
    };

    window.utils = utils;

    return utils;
});
