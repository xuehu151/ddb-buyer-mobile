/**
 * Created by admin on 2017/7/25.
 */
angular.module ('starter.registerCtrl', [])
    //注册
    .controller ('registerCtrl', function ($scope, $state) {
        $scope.sureNextStep = function () {
            $state.go('verify');
        }
    });
