(function() {
    'use strict';

    angular.module('progressiveApp.mainController', []);
    mainController.$inject = ['ocrService', '$localForage'];

    angular.module('progressiveApp.mainController')
            .controller('mainController', mainController);

    function mainController(ocrService, $localForage) {
        var vm = this;
        // scope functions
        vm.postPhoto = postPhoto;
        vm.clearImage = clearImage;
        vm.uploadImage = uploadImage;
        vm.setDefaultValues = setDefaultValues;
        // scope values
        vm.loading = false;
        vm.textReturn = "";
        vm.inputDefaultSate = "Attach File...";
        vm.photoPayload = {
            filename: vm.inputDefaultSate,
            url: ""
        };

        // use service to post photo
        function postPhoto(photoUrl) {
            vm.loading = true;
            var photo = makeBlob(photoUrl);
            ocrService.save(photo, function success(data) {
                vm.textReturn = data;
                vm.loading = false;
            }, function error(err) {
                console.log(err);
                vm.loading = false;
            }).$promise.then(parseReturnText);
        }

        // parse return object from MS OCR
        function parseReturnText() {
            var lines = vm.textReturn.regions[0].lines,
                returnArray = [];
            for (var i = 0; i < lines.length; i++) {
                Object.values(lines[i].words)
                    .forEach(function(value) {
                        returnArray.push(value.text);
                    });              
            }
            console.log(returnArray.toString());
        }

        // cancel image to upload
        function clearImage() {
            var file = { name: vm.inputDefaultSate };
            return imageBuilder(file);
        }

        // choose image upload
        function uploadImage() {
            var file = event.target.files[0];
            return imageBuilder(file);
        }

        // image builder
        function imageBuilder(file) {
            vm.photoPayload = {
                filename: file.name,
                url: file
            };
        }
        
        // convert base64 img to binary blob
        function makeBlob(dataUrl) {
            var base64Marker = ';base64,', parts, contentType, raw;                
            if (dataUrl.indexOf(base64Marker) === -1) {
               parts = dataUrl.split(',');
               contentType = parts[0].split(':')[1];
               raw = decodeURIComponent(parts[1]);
               return new Blob([raw], { type: contentType });
            }
               parts = dataUrl.split(base64Marker);
               contentType = parts[0].split(':')[1];
               raw = window.atob(parts[1]);

           var rawLength = raw.length,
               uInt8Array = new Uint8Array(rawLength);

           for (var i = 0; i < rawLength; ++i) {
               uInt8Array[i] = raw.charCodeAt(i);
           }

           return new Blob([uInt8Array], { type: contentType });
        }

        function setDefaultValues(defaults) {
            $localForage.setItem('defaultStoredValues', defaults).then(function (defaults) {
                //vm.myText = '';
                vm.defaultStoredValues = defaults;
            });
        }

    }
})();