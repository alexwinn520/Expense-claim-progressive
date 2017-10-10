angular.module("progressiveApp.touchEndDirective", [])
    .directive("touchEnd", touchEnd);

function touchEnd() {
    return {
        scope: true,
        controller: [
            "$scope", "$element", function ($scope, $element) {
                $element.bind("touchend", onTouchEnd);

                function onTouchEnd(event) {
                    var method = $element.attr("touch-end");
                    $scope.$event = event;
                    $scope.$apply(method);
                }
            }
        ]
    };
}