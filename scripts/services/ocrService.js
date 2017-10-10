angular.module('progressiveApp.ocrService', ['ngResource']);
ocrService.$inject = ['$resource'];

angular.module('progressiveApp.ocrService')
    .factory('ocrService', ocrService);

function ocrService($resource) {

    return $resource('https://westus.api.cognitive.microsoft.com/vision/v1.0/ocr?', null,
       {
           save: { method: 'POST', params: { "language": "unk", "detectOrientation": "true" }, headers: { 'Content-Type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': '36b089b183604598abda22b62cc8a0b1' } }
       });
}