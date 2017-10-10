angular.module("progressiveApp.touchStartDirective", [])
    .directive("touchStart", touchStart);

function touchStart() {
    return {
        scope: true,
        controller: [
            "$scope", "$element", function ($scope, $element) {    
                $element.bind("touchstart", onTouchStart);
    
                function onTouchStart(event) {
                    var method = $element.attr("touch-start");
                    $scope.$event = event;
                    $scope.$apply(method);
                }
            }
        ]
    };
}