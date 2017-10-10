angular.module('progressiveApp.buttonEventDirective', [])
    .directive('buttonEvent', buttonEvent);

function buttonEvent() {
    return {
        scope: true,
        require: ['^touchStart', '^touchEnd'],
        link: function (scope, element, attr, controllers) {
            scope.buttonFocused = false;
            var buttonFocus = function() {
                scope.buttonFocused = !scope.buttonFocused;
            };

            element.on('mousedown', function (event) {
                event.preventDefault();
                scope.$apply(buttonFocus);
            });

            element.on('mouseup', function (event) {
                event.preventDefault();
                scope.$apply(buttonFocus);
            });

            element.on('touchstart', function () {
                scope.$apply(buttonFocus);
            });

            element.on('touchend', function () {
                scope.$apply(buttonFocus);
            });
        }
    };
}