/**
 * Created by admin on 2017/7/24.
 */
angular.module ('starter.MineCtrl', [])
//我的
    .controller ('MineCtrl', function ($scope, $state, $rootScope) {
        $scope.bragePayment = true;
        $scope.brageDrawer = true;
        $scope.brageDrawerFail = true;
        $scope.brageRecord = true;
        
        $scope.allListOrder = function (num) {
            $rootScope.tabIndex = num;
            $state.go('allOrders');
        };
    
  
  
        
    });
