/**
 * Created by admin on 2017/7/24.
 */
//***首页  竞彩足球下单详情
angular.module ('starter.RaceColorFootballCtrl', [])
    
    .controller ('RaceColorFootballCtrl', function ($scope) {
        $scope.groups = [];
        for (var i = 0; i < 3; i++) {//循环列表
            $scope.groups[i] = {
                name : i,
                items : []
            };
            for (var j = 0; j < 3; j++) {
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
