/**
 * Created by admin on 2017/7/26.
 */
angular.module ('starter.allOrdersCtrl', [])
//全部订单
    .controller ('allOrdersCtrl', function ($scope, $rootScope, $ionicActionSheet, $timeout) {
        $scope.tabNames = ['待付款','待出票', '待开奖', '待派奖', '已取票'];
        $scope.selectIndex = 0;
    
        $scope.activeTab = function (index) {
            $scope.selectIndex = index;
        };
        $scope.selectIndex = $rootScope.tabIndex;//我的页面点击进入
        $scope.viewList = '全部订单';
        //上拉菜单
        // Triggered on a button click, or some other target
        $scope.show = function() {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '全部订单' },
                    { text: '中奖订单' },
                    { text: '我的晒单' }
                ],
                //destructiveText: 'Delete',
                //titleText: 'Modify your album',
                cancelText: '取消',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {
                    $scope.viewList = this.buttons[index].text;
                    if (index == 1) {
                        $scope.selectIndex = 3;
                    }
                    else if(index == 0){
                        $scope.selectIndex = 0;
                    }else {
                        //..........
                    }
                    hideSheet();
                }
            });
            // For example's sake, hide the sheet after two seconds
           /* $timeout(function() {
                hideSheet();
            }, 2000);*/
        };
    
    
    
    
    });
