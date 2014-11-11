EyePlay.controller('ModalInstance', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
        $scope.exit = function(){
            $modalInstance.close();
        }
    }]);