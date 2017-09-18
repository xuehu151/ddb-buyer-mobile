/**
 * Created by admin on 2017/7/26.
 */
angular.module ('starter.allOrdersCtrl', [])
//全部订单
    .controller ('allOrdersCtrl', function ($scope, $state, $rootScope, $ionicActionSheet, $timeout, locals, $util, $interval, $getInfoService, $cordovaToast, $paymentService) {
        $scope.tabNames = ['待付款', '待出票', '待开奖', '待派奖', '已取票'];
        $scope.selectIndex = 0;

        $scope.activeTab = function (index) {//0 1 2 3 4
            $scope.selectIndex = index;
            $scope.hasMore = true;
            if ($scope.selectIndex == 3) {
                allOrdersList (4, 0);
            } else {
                allOrdersList ($scope.selectIndex);
            }
        };
        $scope.selectIndex = $rootScope.tabIndex;//我的页面点击进入
        $scope.viewList = '全部订单';

        //上拉菜单
        $scope.show = function () {
            var hideSheet = $ionicActionSheet.show ({
                buttons: [
                    {text: '全部订单'},
                    {text: '中奖订单'},
                    {text: '我的晒单'}
                ],
                //destructiveText: 'Delete',
                //titleText: 'Modify your album',
                cancelText: '取消',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    $scope.viewList = this.buttons[index].text;
                    if (index == 1) {
                        $scope.selectIndex = 3;
                    }
                    else if (index == 0) {
                        $scope.selectIndex = 0;
                    }
                    else {
                        //..........
                    }
                    hideSheet ();
                }
            });

        };
        allOrdersList ($scope.selectIndex);

        var userInfo = $util.getUserInfo ();
        var token = userInfo.token;

        function allOrdersList (status, isReturn) {
            $scope.hasMore = true;
            $scope.requesArr = [];
            //获取订单记录............
            var pageSize = 8;
            var pageNumber = 1;
            $scope.loadMore = function (status, isReturn) {
                data = {
                    data: {},
                    params: {
                        pageSize: pageSize,
                        pageNumber: pageNumber,
                        lotteryID: 2,
                        status: status,
                        isReturn: isReturn
                    }
                };
                loadajax ();
            };

            function loadajax () {
                $getInfoService.getOrderList (data, token)
                    .then (function (response) {

                        if (response.data.length != 0 && response.error == 0) {
                            $scope.requesArr = $scope.requesArr.concat (response.data);
                            for (var i = 0; i < $scope.requesArr.length; i++) {
                                var _createDate = $scope.requesArr[i].createDate;
                                $scope.requesArr[i].createDate = _createDate.split (' ')[0];

                                console.info ($scope.requesArr[i]);

                                var status = $scope.requesArr[i].status;
                                var isReturn = $scope.requesArr[i].isReturn;
                                var end_sale_time = locals.getObject ("end_sale_time");

                                var hours = $util.countTime (end_sale_time);
                                $scope.requesArr[i].end_sale_time = hours.hours;

                                switch (status) {
                                    case 0:
                                        $scope.requesArr[i].statusText = '待付款';
                                        $scope.requesArr[i].titleText = '大乐透';
                                        break;
                                    case 1:
                                        $scope.requesArr[i].statusText = '待出票';
                                        $scope.requesArr[i].titleText = '大乐透';
                                        break;
                                    case 2:
                                        $scope.requesArr[i].statusText = '待开奖';
                                        $scope.requesArr[i].titleText = '大乐透';
                                        break;
                                    case 3:
                                        $scope.requesArr[i].statusText = '待付款';
                                        $scope.requesArr[i].titleText = '大乐透';
                                        break;
                                    case 4:
                                        switch (isReturn) {
                                            case 0:
                                                $scope.requesArr[i].statusText = '未返奖';
                                                break;
                                            case 1:
                                                $scope.requesArr[i].statusText = '已返奖';
                                                break;
                                            default:
                                            //
                                        }
                                        $scope.requesArr[i].titleText = '大乐透';
                                        break;
                                    default:
                                    //$scope.requesArr[i].status = '已撤单';
                                }

                                drawTime = $scope.requesArr[i].lotteryList[0].drawTime.replace (/-/g, '/');
                                $scope.requesArr[i].setTime = $util.countTime (drawTime);

//                                console.info(drawTime);
//                                console.info( $scope.setTime);
                            }
                            pageNumber++;
                        } else {
                            $scope.hasMore = false;
                            $cordovaToast.showShortBottom ("暂无更多");
                        }
                        $scope.$broadcast ('scroll.refreshComplete');
                        $scope.$broadcast ('scroll.infiniteScrollComplete');
                    }, function (error) {
                        //.....
                    });
            }

            $scope.doRefresh = function () {
                pageNumber = 1;
                $scope.requesArr = [];
                if ($scope.selectIndex == 3) {
                    $scope.loadMore (4, 0);
                } else {
                    $scope.loadMore ($scope.selectIndex);
                }
            };
        }

        //查看详情
        $scope.viewDetails = function (orderId, statusText, titleText) {
            $rootScope.orderId = orderId;
            $rootScope.statusText = statusText;
            $rootScope.titleText = titleText;

            $state.go ('allOrderdetail');
        };
        //点击付款
        $scope.oncePayment = function (paymentId, payType) {
            var data = {
                data: {},
                params: {
                    id: paymentId,
                    payType: payType
                }
            };
            console.info (data);
            $paymentService.waitPay (data, token)
                .then (function (response) {
                    console.info (response);
                    if (response.error == 0) {
                        $scope.doRefresh ();
                    }
                    else if (response.error == 1110) {
                        $cordovaToast.showShortBottom (response.info);
                    }
                    else {
                        alert ('支付失败');
                    }
                }, function (error) {
                    alert ('服务连接失败，请重试!');
                })
        }


    });
