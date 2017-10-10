angular.module("progressiveApp.touchTapDirective", [])
    .directive("touchTap", touchTap);

function touchTap() {
    return {
        controller: [
            "$scope", "$element", function ($scope, $element) {
                var moved = false;
                $element.bind("touchstart", onTouchStart);
                function onTouchStart(event) {
                    $element.bind("touchmove", onTouchMove);
                    $element.bind("touchend", onTouchEnd);
                }

                function onTouchMove(event) {
                    moved = true;
                }

                function onTouchEnd(event) {
                    $element.unbind("touchmove", onTouchMove);
                    $element.unbind("touchend", onTouchEnd);
                    if (!moved) {
                        var method = $element.attr("touch-tap");
                        $scope.$apply(method);
                    }
                }
            }
        ]
    };
}