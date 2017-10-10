angular.module('progressiveApp', ['progressiveApp.mainController',
                                  'progressiveApp.constValueController',
                                  'progressiveApp.ocrService',
                                  'progressiveApp.FileUploadDirective',
                                  'progressiveApp.touchStartDirective',
                                  'progressiveApp.touchEndDirective',
                                  'progressiveApp.touchMoveDirective',
                                  'progressiveApp.touchTapDirective',
                                  'progressiveApp.buttonEventDirective',
                                  'LocalForageModule']).config(configFile);
               
configFile.$inject = ['$compileProvider'];

function configFile($compileProvider) {
    // disable debug info
    $compileProvider.debugInfoEnabled(false);
};