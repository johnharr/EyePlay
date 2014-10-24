var EyePlay = angular.module('EyePlay', [
    'ui.bootstrap'
]);

EyePlay.controller('main', ['$scope', '$modal',
    function ($scope, $modal) {

        $scope.setGame = function (g) {
            $scope.game = "htmlPartials/" + g
        };

        $scope.open = function() {
            var modalInstance = $modal.open({
                templateUrl: 'htmlPartials/about.html',
                controller: 'ModalInstance'
            });
        }
    }]);

EyePlay.controller('ModalInstance', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
        $scope.exit = function(){
            $modalInstance.close();
        }
    }]);