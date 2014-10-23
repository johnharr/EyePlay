var EyePlay = angular.module('EyePlay', [
    'ui.bootstrap'
]);

EyePlay.controller('main', ['$scope', '$modal',
    function ($scope, $modal) {

        $scope.setGame = function (g) {
            $scope.game = g
        }
    }]);