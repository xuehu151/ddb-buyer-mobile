/**
 * Created by admin on 2017/7/24.
 */
angular.module ('starter.RecommendCtrl', [])
    //推荐
    .controller ('RecommendCtrl', function ($scope, $ionicPopover) {
        $scope.popover = $ionicPopover.fromTemplateUrl ('my-popover.html', {
            scope: $scope
        });
        // .fromTemplate() 方法
        var template = '<ion-popover-view style="width: 100px; height: 140px;">' +
            ' <ion-content>' +
            '        <h4>订单金额</h4>' +
            '        <h4>订单金额</h4>' +
            '        <h4>订单金额</h4>' +
            '        <h4>订单金额</h4>' +
            '</ion-content>' +
            '</ion-popover-view>';
        
        $scope.popover = $ionicPopover.fromTemplate (template, {
            scope: $scope
        });
        
        $scope.openPopover = function ($event) {
            $scope.popover.show ($event);
        };
        $scope.closePopover = function () {
            $scope.popover.hide ();
        };
        // 清除浮动框
        $scope.$on ('$destroy', function () {
            $scope.popover.remove ();
        });
        // 在隐藏浮动框后执行
        $scope.$on ('popover.hidden', function () {
            // 执行代码
        });
        // 移除浮动框后执行
        $scope.$on ('popover.removed', function () {
            // 执行代码
        });
        
        
    });
