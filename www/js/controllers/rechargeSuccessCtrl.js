/**
 * Created by admin on 2017/8/24.
 */
angular.module ('starter.rechargeSuccessCtrl', [])
    //充值成功
    .controller ('rechargeSuccessCtrl', function ($scope, $state) {
    
        $scope.rechargeMakeSure = function  () {
            $state.go('tab.mine');
        }
        
    });
