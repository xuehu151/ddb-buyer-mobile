/**
 * Created by admin on 2017/8/22.
 */
angular.module ('starter.allOrderdetailCtrl', [])
    //全部订单详情
    .controller ('allOrderdetailCtrl', function ($scope, $rootScope, $ionicActionSheet, $timeout) {
        $rootScope.selectIndex = 0;
    
        $scope.groups = [];//将来作为失败的多个凭证数组
        $scope.ballContentArr = [];
        for (var i = 0; i < 2; i++) {//循环列表
            $scope.groups[i] = {
                items : []
            };
        }
        for (var i = 0; i < 2; i++) {//循环列表
            $scope.ballContentArr.push(i);
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
