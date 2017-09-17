/**
 * Created by admin on 2017/8/21.
 */
angular.module ('starter.HistoryLotteryDetailsCtrl', [])
    //首页 大乐透历史开奖详情列表页面
    .controller ('HistoryLotteryDetailsCtrl', function ($scope, $state, $rootScope, $util) {
        var historyInfoStr = $rootScope.pastResult;

        var resultArray = historyInfoStr.result.split('*');
        var _resultArrayRed =  resultArray[0].split(',');
        var _resultArrayBlue =  resultArray[1].split(',');

        $scope.resultArrayRed = _resultArrayRed;
        $scope.resultArrayBlue = _resultArrayBlue;

        $scope.historyInfo = {
            wareIssue : historyInfoStr.wareIssue,
            drawTime : historyInfoStr.drawTime
        };

        getDay = $util.getWeekByDay ($scope.historyInfo.drawTime);//判断周几
        $scope.getDay = getDay;

    });
