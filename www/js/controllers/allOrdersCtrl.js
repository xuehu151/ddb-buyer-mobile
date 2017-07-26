/**
 * Created by admin on 2017/7/26.
 */
angular.module ('starter.allOrdersCtrl', [])
//全部订单
    .controller ('allOrdersCtrl', function ($scope) {
        $scope.tabNames = ['待付款','待出票', '待开奖', '待派奖', '已取票'];
        $scope.selectIndex = 0;
        $scope.activeTab = function (index) {
            $scope.selectIndex = index;
        };
        
        
        
        
    });
