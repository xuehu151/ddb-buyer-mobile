/**
 * Created by admin on 2017/8/22.
 */
angular.module ('starter.allOrderdetailCtrl', [])
//全部订单详情
    .controller ('allOrderdetailCtrl', function ($scope, $rootScope, $ionicActionSheet, $timeout, $getInfoService, $util) {
        //$rootScope.selectIndex = 0;
        
        $scope.groups = [];
        for (var i = 0; i < 1; i++) {//循环列表
            $scope.groups[i] = {
                items : []
            };
        }
        $scope.toggleGroup = function (group) { //循环渲染出的列表实现折叠和收缩效果
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
        
        //订单详情
        var userInfo = $util.getUserInfo ();
        var token = userInfo.token;
        var data = {
            data : {},
            params : {
                id : $rootScope.orderId
            }
        };
        var orderDataBase = {};
        $getInfoService.getOrderInfo (data, token)
            .then (function (response) {
                orderDataBase = response.data;
                    $scope.lotteryListCount = orderDataBase.lotteryList.length;
                for(var i = 0; i < orderDataBase.lotteryList.length; i++){
                    $scope.multiple = orderDataBase.lotteryList[i];
                    console.info($scope.multiple);
                }
                switch ( orderDataBase.status ) {
                    case 0:
                        $scope.statusText = '待付款';
                        $scope.titleText = '大乐透';
                        break;
                    case 1:
                        $scope.statusText = '待出票';
                        $scope.titleText = '大乐透';
                        break;
                    case 2:
                        $scope.statusText = '待开奖';
                        $scope.titleText = '大乐透';
                        break;
                    case 3:
                        $scope.statusText = '待付款';
                        $scope.titleText = '大乐透';
                        break;
                    case 4:
                        switch ( orderDataBase.isReturn ) {
                            case 0:
                                $scope.statusText = '未返奖';
                                break;
                            case 1:
                                $scope.statusText = '已返奖';
                                break;
                            default:
                            //
                        }
                        $scope.titleText = '大乐透';
                        break;
                    default:
                    //$scope.requesArr[i].status = '已撤单';
                }
                
                $scope.ordersInfo = {
                    wareIssue : orderDataBase.wareIssue,
                    money : orderDataBase.money,
                    ticketID : orderDataBase.ticketID,
                    createDate : orderDataBase.createDate,
                    investCode : orderDataBase.lotteryList
                };
            });
        //继续投注
        
        
        
        
    });
