define([], function() {
    'use strict';

    function eventHandler(game, swipeCallback, clickCallback) {
        var eventDuration;
        var startPoint = {};
        var endPoint = {};
        var direction;
        var minimum = {
            duration: 150,
            end: 500,
            distance: 20
        };

        game.input.onDown.add(function(pointer) {
            startPoint.x = pointer.clientX;
            startPoint.y = pointer.clientY;
        });

        game.input.onUp.add(function(pointer) {
            // need to know the distance travelled
            // if its only a few pixels, its a click
            // also if its very short duration its also a click

            direction = '';
            eventDuration = game.input.activePointer.duration;
            if (eventDuration > minimum.end) {
                //ignore it
                return false;
            }
                // its a click

            if (eventDuration > minimum.duration) {
                endPoint.x = pointer.clientX;
                endPoint.y = pointer.clientY;
                console.log(Math.abs(startPoint.y - endPoint.y));

                // Check direction
                if (endPoint.x - startPoint.x > minimum.distance) {
                    direction = 'right';
                } else if (startPoint.x - endPoint.x > minimum.distance) {
                    direction = 'left';
                } else if (endPoint.y - startPoint.y > minimum.distance) {
                    direction = 'swipeDown';
                } else if (startPoint.y - endPoint.y > minimum.distance) {
                    direction = 'swipeUp';
                }

                if (direction) {
                    if (direction === 'swipeDown') {
                        swipeCallback(direction);
                    }
                } else {
                    // it's a click
                    console.log('shortswipe');
                    clickCallback();
                }
            } else {
                // it's a click
                clickCallback();
            }
        });
    }

    return eventHandler;

});