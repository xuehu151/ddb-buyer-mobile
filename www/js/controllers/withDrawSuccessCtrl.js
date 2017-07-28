/**
 * Created by admin on 2017/7/28.
 */
angular.module ('starter.withDrawSuccessCtrl', [])
    //提现成功
    .controller ('withDrawSuccessCtrl', function ($scope, $state, $ionicPopup, $ionicLoading) {
        $scope.groups = [];//将来作为失败的多个凭证数组
        for (var i = 0; i < 1; i++) {//循环列表
            $scope.groups[i] = {
                items : []
            };
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
        
        //确定按钮
        $scope.makeSure = function () {
            $state.go('tab.mine');
        }
        
        
        
        
        
        
    
    });
