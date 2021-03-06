var EyePlay = angular.module('EyePlay', [
    'ui.bootstrap'
]);

EyePlay.controller('main', ['$scope', '$modal',
    function ($scope, $modal) {
        $scope.setGame = function (g) {
            $scope.game = "htmlPartials/" + g
        };

        $scope.getWidth = function(){
            setTimeout(function(){}, 1000);
            var widthCol = $(".gameChoice").width();
            return {'width' : widthCol+"px"};
        };

        $scope.open = function() {
            var modalInstance = $modal.open({
                templateUrl: 'htmlPartials/about.html',
                controller: 'ModalInstance'
            });
        }
    }]);