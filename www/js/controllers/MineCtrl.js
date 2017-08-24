/**
 * Created by admin on 2017/7/24.
 */
angular.module ('starter.MineCtrl', [])
//我的
    .controller ('MineCtrl', function ($scope, $state, $rootScope, locals, $util) {
        $scope.bragePayment = false;
        $scope.brageDrawer = false;
        $scope.brageDrawerFail = false;
        $scope.brageRecord = false;
    
        var userInfo = $util.getUserInfo ();
        var token = userInfo.token;
        $scope.freeze = userInfo.customer.money;//冻结
        $scope.accountTotalMoney = userInfo.customer.money;//总额
        $scope.usableMoney = $scope.accountTotalMoney - $scope.freeze;//可用金额
        $scope.publicMoney = userInfo.customer.redMoney;//公益金
       
        
        //待付款
        $scope.localsArr = locals.getObject ("localsArr");
        if($scope.localsArr.length > 0){
            $scope.bragePayment = true;
            $scope.obligation = $scope.localsArr.length;
        }
        //待出票
        
        
        $scope.allListOrder = function (num) {
            $rootScope.tabIndex = num;
            $state.go('allOrders');
        };
    
  
  
        
    });
