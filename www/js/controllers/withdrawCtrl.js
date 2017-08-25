/**
 * Created by admin on 2017/7/27.
 */
angular.module ('starter.withdrawCtrl', [])
//提现
    .controller ('withdrawCtrl', function ($scope, $state, $rootScope, $ionicModal, $rechargeService, $ionicLoading, $util) {
        
        $scope.widthdrawMoney = {//提现金额
            money : ''
        };
        $scope.whetherShow1 = true; //控制展示可提现余额
        $scope.whetherShow2 = true; //控制提现提交按钮disable
        
        //账户余额  先定义后面取到数据替换
        
        //$ionicLoading.show ();
        var userInfo = $util.getUserInfo ();
        $scope.widthdrawAble = userInfo.customer.money;
      
        $scope.whetherOK = function () {
            if ($scope.widthdrawMoney.money > $scope.widthdrawAble) {
                $scope.cantWidthdraw = '输入金额超出可提现余额';
                $scope.whetherShow1 = false;
                $scope.whetherShow2 = true;
            }
            //小于1 disable
            else if ($scope.widthdrawMoney.money < 1) {
                $scope.cantWidthdraw = '';
                $scope.whetherShow1 = true;
                $scope.whetherShow2 = true;
            }
            else if ($scope.widthdrawAble > $scope.widthdrawAble && $scope.widthdrawMoney.money != $scope.widthdrawAble) {
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
            $scope.whetherOK ();
        };
        //password
        $scope.inputNum = [];
        for (var i=0; i < 6; i++){
            $scope.inputNum.push(i);
        }
        
        //提现确定按钮  判断提现成功与否
        $rootScope.withdrawalState = false;
        $scope.confirmWidthdraw = function () {
            var token = userInfo.token;
            var data = {
                data:{
                
                },
                params:{
                    money :  $scope.widthdrawMoney.money
                }
            };
            
            $rechargeService.recharge (data, token)
                .then (function (response) {
                    $ionicLoading.hide ();
                    console.info(response);
                    
                    if(response.error == '0'){
                        $rootScope.auditStatus = '恭喜您，提现成功';
                        $rootScope.withdrawalState = true;
                        $rootScope.placeholder = '提现成功，至转账至支付宝，请查收;';
                        $state.go('withDrawStatus');
                    }else {
                        $rootScope.auditStatus = '申请未通过审核，请重新申请';
                        $rootScope.withdrawalState = false;
                        $rootScope.placeholder = '提现失败的原因......';
                        $state.go('withDrawStatus');
                    }
                },function (error) {
                    //....
                });
            
            /*if (true) {
                $ionicModal.fromTemplateUrl ('templates/modal.html', {
                    scope : $scope,
                    animation : 'slide-in-up'
                })
                    .then (function (modal) {
                        modal.show ();
                        //关闭模态框
                        $scope.closeModal = function () {
                            modal.hide();
                        }
                    });
                //$state.go ('withDrawSuccess');
            }
            else {
                //$state.go ('withDrawFailed');
            }*/
        };
        
        
        
        
    });
