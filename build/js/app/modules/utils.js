/* global define */

define([], function() {
    'use strict';

    var utils = {
        textStyles: {
            base: {
                font: '65px Arial',
                fill: '#FFFFFF',
                align: 'center'
            },
            button: {
                font: '30px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        },
        avatar: undefined,
        scrollspeed: 500,
        GRAVITY: 900
    };

    window.utils = utils;

    return utils;
});
