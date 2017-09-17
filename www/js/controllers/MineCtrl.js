/**
 * Created by admin on 2017/7/24.
 */
angular.module ('starter.MineCtrl', [])
//我的
    .controller ('MineCtrl', function ($scope, $state, $rootScope, locals, $util, $paymentService, $cordovaToast, $timeout) {
        $scope.bragePayment = false;
        $scope.brageDrawer = false;
        $scope.brageDrawerFail = false;
        $scope.brageRecord = false;
        var userInfo = $util.getUserInfo ();
        var token = userInfo.token;
        var data = {
            data : {},
            params : {}
        };
        $paymentService.accountMoney (data, token)
            .then (function (response) {
                //console.info(response);
                //账户相关信息
                $rootScope.users = {
                    realName : response.data.realName,
                    userHead : response.data.headImg,
                    userIphone : response.data.phone,
                    freeze : response.data.money,   //冻结
                    accountTotalMoney : response.data.money,    //总额
                    usableMoney : response.data.money - response.data.freeze,  //可用金额
                    publicMoney : response.data.redMoney    //公益金
                };
            }, function (error) {

            });

        //待付款
        $paymentService.getOrderDataStatistics (data, token)
            .then (function (response) {
                //console.info(response);
                if (response.error == 0) {
                    $scope.cornerMark = {
                        waitPaySum : response.data.waitPaySum,
                        waitReturnTicketSum : response.data.waitReturnTicketSum,
                        waitShowPrizeSum : response.data.waitShowPrizeSum
                    };
                    if ($scope.cornerMark.waitPaySum > 0) {
                        $scope.bragePayment = true;
                    }
                    if ($scope.cornerMark.waitReturnTicketSum > 0) {
                        $scope.brageDrawer = true;
                        $scope.brageDrawerFail = true;
                    }
                    if ($scope.cornerMark.waitShowPrizeSum > 0) {
                        $scope.brageRecord = true;
                    }
                }
                else if(response.error == '1110'){
                    $cordovaToast.showShortCenter (response.info)
                        .then (function (success) {
                            $timeout (function () {
                                $state.go ('signin');
                            }, 2000);
                        }, function (error) {

                        });
                }
                else {
                    $cordovaToast.showShortCenter (response.info);
                }
            }, function (error) {
                alert ('网络连接失败,请重试!');
            });
        //待出票
        $scope.allListOrder = function (num) {
            $rootScope.tabIndex = num;
            $state.go ('allOrders');
        };




    });
