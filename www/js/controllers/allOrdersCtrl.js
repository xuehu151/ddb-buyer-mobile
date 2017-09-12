/**
 * Created by admin on 2017/7/26.
 */
angular.module ('starter.allOrdersCtrl', [])
//全部订单
    .controller ('allOrdersCtrl', function ($scope, $state, $rootScope, $ionicActionSheet, $timeout, locals, $util, $ionicLoading, $interval, $getInfoService) {
        $scope.tabNames = ['待付款', '待出票', '待开奖', '待派奖', '已取票'];
        $scope.selectIndex = 0;
        
        $scope.activeTab = function (index) {
            $scope.selectIndex = index;
           // allOrdersList ($scope.selectIndex,0);
        };
        $scope.selectIndex = $rootScope.tabIndex;//我的页面点击进入
        $scope.viewList = '全部订单';
        
        //上拉菜单
        $scope.show = function () {
            var hideSheet = $ionicActionSheet.show ({
                buttons : [
                    { text : '全部订单' },
                    { text : '中奖订单' },
                    { text : '我的晒单' }
                ],
                //destructiveText: 'Delete',
                //titleText: 'Modify your album',
                cancelText : '取消',
                cancel : function () {
                    // add cancel code..
                },
                buttonClicked : function (index) {
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
    
        allOrdersList ($scope.selectIndex, 0);
    
        $scope.hasMore = true;
        $scope.bitLotto = [];
        function allOrdersList (status,isReturn) {
            //获取订单记录............
            var userInfo = $util.getUserInfo ();
            var token = userInfo.token;
            var pageSize = 8;
            var pageNumber = 1;
            var data = {
                data:{},
                params:{
                    pageSize : pageSize,
                    pageNumber : pageNumber,
                    lotteryID : 2,
                    status : status,
                    isReturn : isReturn
                }
            };
            $getInfoService.getOrderList(data, token)
                .then (function (response) {
                    $scope.requesArr = response.data;
                    console.info(response);
                    for (var i = 0; i < $scope.requesArr.length; i++) {
                        var _createDate = $scope.requesArr[i].createDate;
                        $scope.requesArr[i].createDate = _createDate.split (' ')[0];
    
                        console.info($scope.requesArr[i].status);
                
                        $scope.status = $scope.requesArr[i].status;
                        var isReturn = $scope.requesArr[i].isReturn;
                        var ticketID = $scope.requesArr[i].ticketID;
                        var orderMoney = $scope.requesArr[i].money;
                
                        switch ( $scope.status ) {
                            case 0:
                                $scope.requesArr[i].statusText = '待付款';
                                $scope.requesArr[i].titleText = '大乐透';
                                $scope.requesArr[i].ticketID = ticketID;
                                $scope.requesArr[i].money = orderMoney;
                                break;
                            case 1:
                                $scope.requesArr[i].statusText = '待出票';
                                $scope.requesArr[i].titleText = '大乐透';
                                $scope.requesArr[i].ticketID = ticketID;
                                $scope.requesArr[i].money = orderMoney;
                                break;
                            case 2:
                                $scope.requesArr[i].statusText = '待开奖';
                                $scope.requesArr[i].titleText = '大乐透';
                                $scope.requesArr[i].ticketID = ticketID;
                                $scope.requesArr[i].money = orderMoney;
                                break;
                            case 3:
                                $scope.requesArr[i].statusText = '待付款';
                                $scope.requesArr[i].titleText = '大乐透';
                                break;
                            case 4:
                                switch ( isReturn ){
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
                                $scope.requesArr[i].ticketID = ticketID;
                                $scope.requesArr[i].money = orderMoney;
                                break;
                            default:
                            //$scope.requesArr[i].status = '已撤单';
                        }
                    }
                },function (error) {
                    //.....
                });
        }
        
        //待付款
       
       
       
        //查看详情
        $scope.viewDetails = function (index) {
            console.info (index);
            $state.go ('allOrderdetail');
        }
        
        
        
        
    });
