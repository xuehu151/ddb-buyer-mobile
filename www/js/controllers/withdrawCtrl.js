/**
 * Created by admin on 2017/7/27.
 */
angular.module ('starter.withdrawCtrl', [])
    //提现
    .controller ('withdrawCtrl', function ($scope, $state, $rootScope, $ionicModal, $rechargeService, $ionicLoading, $util, $timeout) {
        var userInfo = $util.getUserInfo ();
        var token = userInfo.token;
        $scope.widthdrawMoney = {//提现金额
            money : ''
        };
        $scope.whetherShow1 = true; //控制展示可提现余额
        $scope.whetherShow2 = true; //控制提现提交按钮disable
        $scope.widthdrawAble = $rootScope.users.usableMoney;//获取的可用余额

        $scope.whetherOK = function () {
            console.info($scope.widthdrawMoney.money[0] == 0);
            if ($scope.widthdrawMoney.money > $scope.widthdrawAble) {//大于
                $scope.cantWidthdraw = '输入金额超出可提现余额';
                $scope.whetherShow1 = false;
                $scope.whetherShow2 = true;
            }
            //小于1 disable
            else if ($scope.widthdrawMoney.money < 1) {//小于
                $scope.cantWidthdraw = '';
                $scope.whetherShow1 = true;
                $scope.whetherShow2 = true;
            }
            else if($scope.widthdrawMoney.money >= 1 || $scope.widthdrawMoney.money[0] == 0){
                $scope.cantWidthdraw = '';
                $scope.whetherShow1 = true;
                $scope.whetherShow2 = false;
            }
            else {
                $scope.cantWidthdraw = '';
                $scope.whetherShow1 = true;
                $scope.whetherShow2 = true;
            }
        };
        //提现所有可用余额
        $scope.widthdrawAll = function () {
            $scope.widthdrawMoney.money = $scope.widthdrawAble;
            $scope.whetherOK ();
        };
        //提现确定按钮
        $rootScope.withdrawalState = false;
        $scope.confirmWidthdraw = function () {
            var data = {
                data : {},
                params : {
                    money : $scope.widthdrawMoney.money
                }
            };
            console.info(data);
            $rootScope.money = data.params.money;//保存提现金额
            $scope.withDrawPassWord = {
                password : ''
            };
            $ionicModal.fromTemplateUrl ('templates/modal.html', {
                scope : $scope,
                animation : 'slide-in-up'
            })
                .then (function (modal) {
                    $scope.passWord = modal;
                    $scope.passWord.show ();
                    var oChargePass = document.getElementById('chargePass');
                    oChargePass.focus();//自动获得焦点
                    $scope.confirmVerify = function () {
                        if ($scope.withDrawPassWord.password.toString().length === 6) {
                            oChargePass.blur();//自动失去焦点
                            $scope.closeModal();
                            
                            $rechargeService.withdraw (data, token)
                                .then (function (response) {
                                    $ionicLoading.hide ();
                                    console.info(response);
            
                                    if(response.error == '0'){
                                        $rootScope.auditStatus = '恭喜您，提现成功';
                                        $rootScope.withdrawalState = true;
                                        $rootScope.placeholder = '提现成功，至转账至支付宝，请查收';
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
                        }
                    };
                    //关闭模态框
                    $scope.closeModal = function () {
                        modal.hide ();
                    }
                });
        };




    });
