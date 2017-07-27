/**
 * Created by admin on 2017/7/27.
 */
angular.module ('starter.withdrawCtrl', [])
    //提现
    .controller ('withdrawCtrl', function ($scope, $state, $rootScope) {
        
        $scope.widthdrawMoney = {money:''}; //提现金额
        $scope.whetherShow1 = true; //控制展示可提现余额
        $scope.whetherShow2 = true; //控制提现提交按钮disable
    
        //先定义后面取到数据替换
        $scope.widthdrawAble = 15;
        
        $scope.whetherOK = function () {
            if ($scope.widthdrawMoney.money > 15) {
                $scope.cantWidthdraw = '输入金额超出可提现余额';
                $scope.whetherShow1 = false;
                $scope.whetherShow2 = true;
            }
            //小于1 disable
            else if ($scope.widthdrawMoney.money <= 15) {
                $scope.cantWidthdraw = '';
                $scope.whetherShow1 = true;
                $scope.whetherShow2 = false;
            }
            else if ( $scope.widthdrawAble > 15 && $scope.widthdrawMoney.money != $scope.widthdrawAble) {
                $scope.cantWidthdraw = '';
                $scope.whetherShow1 = true;
                $scope.whetherShow2 = true;
            }
            else {
                $scope.cantWidthdraw = '';
                $scope.whetherShow1 = true;
                $scope.whetherShow2 = false;
            }
        };
        //提现所有可用余额
        $scope.widthdrawAll = function () {
            $scope.widthdrawMoney.money = $scope.widthdrawAble;
            $scope.whetherOK();
        };
        //提现确定按钮
        $scope.confirmWidthdraw = function () {
            $state.go('withDrawFailed');
        }
        
        
        
        
    
    
    });
