/**
 * Created by admin on 2017/7/27.
 */
angular.module ('starter.withDrawFailedCtrl', [])
    //提现失败
    .controller ('withDrawFailedCtrl', function ($scope, $state, $rootScope) {
        $scope.groups = [];//将来作为失败的多个凭证数组
        for (var i = 0; i < 1; i++) {//循环列表
            $scope.groups[i] = {
                items : []
            };
            for (var j = 0; j < 1; j++) {
                $scope.groups[i].items.push (i + '-**-' + j);
            }
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
