/**
 * Created by admin on 2017/8/22.
 */
angular.module ('starter.allOrderdetailCtrl', [])
//全部订单详情
    .controller ('allOrderdetailCtrl', function ($scope, $rootScope, $ionicActionSheet, $timeout, $getInfoService, $util) {
        //$rootScope.selectIndex = 0;
 
        $scope.toggleGroup = function () { //循环渲染出的列表实现折叠和收缩效果
            if ($scope.isGroupShown ()) {
                $scope.shownGroup = null;
            }
            else {
                $scope.shownGroup = '';
            }
        };
        $scope.isGroupShown = function () {
            return $scope.shownGroup === '';
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
                $scope.ordersInfo = {
                    wareIssue : orderDataBase.wareIssue,
                    money : orderDataBase.money,
                    ticketID : orderDataBase.ticketID,
                    createDate : orderDataBase.createDate,
                    investCode : orderDataBase.lotteryList,
                    statusText : $rootScope.statusText,
                    titleText : $rootScope.titleText
                };
            });
        //继续投注
        
        
        
        
    });
