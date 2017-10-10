angular.module("progressiveApp.touchMoveDirective", [])
    .directive("touchMove", touchMove);

function touchMove() {
    return {
        controller: [
            "$scope", "$element", function ($scope, $element) {
                $element.bind("touchstart", onTouchStart);
                function onTouchStart(event) {
                    event.preventDefault();
                    $element.bind("touchmove", onTouchMove);
                    $element.bind("touchend", onTouchEnd);
                }

                function onTouchMove(event) {
                    var method = $element.attr("touch-move");
                    $scope.$event = event;
                    $scope.$apply(method);
                }

                function onTouchEnd(event) {
                    event.preventDefault();
                    $element.unbind("touchmove", onTouchMove);
                    $element.unbind("touchend", onTouchEnd);
                }
            }
        ]
    };
}