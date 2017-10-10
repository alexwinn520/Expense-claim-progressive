angular.module('progressiveApp.FileUploadDirective', [])
    .directive('fileread', fileread);
    
function fileread() {
    return {
        scope: {
            fileread: "="
        },
        require: "ngModel",
        link: function (scope, element, attributes, ngModel) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                var files = changeEvent.target.files;
                var file = files[0];
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(file);
                ngModel.$setViewValue(file);
            });
        }
    }
};