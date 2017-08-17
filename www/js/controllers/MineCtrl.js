/**
 * Created by admin on 2017/7/24.
 */
angular.module ('starter.MineCtrl', [])
//我的
    .controller ('MineCtrl', function ($scope, $state, $rootScope) {
        $scope.bragePayment = false;
        $scope.brageDrawer = false;
        $scope.brageDrawerFail = false;
        $scope.brageRecord = false;
        
        $scope.allListOrder = function (num) {
            $rootScope.tabIndex = num;
            $state.go('allOrders');
        };
    
  
  
        
    });
