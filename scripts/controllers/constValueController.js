(function() {
    'use strict';

    angular.module('progressiveApp.constValueController', []);
    constValueController.$inject = ['$localForage'];

    angular.module('progressiveApp.constValueController')
        .controller('constValueController', constValueController);

    function constValueController($localForage) {
        var vm = this;
        vm.showInputLabels = showInputLabels;

        vm.offices = ["Auckland", "Group", "Manila", "Seattle", "Singapore", "Suite", "Wellington"];
        vm.constValues = { name: "", team: "", office: "" };
        vm.inputFocused = { name: false, team: false, office: false };

        function showInputLabels(input, model) {
            console.log(model)
            console.log(input)
            if (model !== "") {
                return input = true;
            } else {
                return input = false;
            }
        }
    }
})();