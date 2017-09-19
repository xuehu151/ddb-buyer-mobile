/**
 * Created by admin on 2017/7/27.
 */
angular.module ('starter.withDrawStatusCtrl', [])
    //提现失败
    .controller ('withDrawStatusCtrl', function ($scope, $state, $rootScope) {
        $scope.toggleGroup = function () {//循环渲染出的列表实现折叠和收缩效果
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
    
        //确定按钮
        $scope.makeSure = function () {
            $state.go('tab.mine');
        }
        
        
        
        
        
        
    });
