/**
 * Created by admin on 2017/7/28.
 */
angular.module ('starter.rechargeCtrl', [])
    //充值
    .controller ('rechargeCtrl', function ($scope, $state, $rootScope) {
        $scope.RechargeMoney = {money:''};
        $scope.Recharge = true; //控制提现提交按钮disable
        $scope.RechargeOK = function () {
            if ($scope.RechargeMoney.money > 0 || $scope.RechargeMoney.money === 'null'){
                $scope.Recharge = false;
            }
            console.info($scope.RechargeMoney.money);
        };
        
        //充值确定按钮
        $scope.RechargeSure = function () {
        
        };
        
        $scope.groups = [];//将来作为失败的多个凭证数组
        for (var i = 0; i < 1; i++) {//循环列表
            $scope.groups[i] = {
                items : []
            };
        }
        $scope.toggleGroup = function (group) {//循环渲染出的列表实现折叠和收缩效果
            if ($scope.isGroupShown (group)) {
                $scope.shownGroup = null;
            }
            else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };
    

        
        
        
        
        
        
        
        
        
        
        
        
        
    });
