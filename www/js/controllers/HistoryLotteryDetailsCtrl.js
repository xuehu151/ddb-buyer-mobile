/**
 * Created by admin on 2017/8/21.
 */
angular.module ('starter.HistoryLotteryDetailsCtrl', [])
    //首页 大乐透历史开奖详情列表页面
    .controller ('HistoryLotteryDetailsCtrl', function ($scope, $state, $rootScope, $util, $ionicLoading, $getListService, $ionicPopup) {
        $scope.resultDetailsArr = $rootScope.pastResult;
        
        var resultArray = $scope.resultDetailsArr.result.split('*');
        var _resultArrayRed =  resultArray[0].split(',');
        var _resultArrayBlue =  resultArray[1].split(',');

        $scope.resultArrayRed = _resultArrayRed;
        $scope.resultArrayBlue = _resultArrayBlue;
        $scope.wareIssue = $scope.resultDetailsArr.wareIssue;
        $scope.createDate = $scope.resultDetailsArr.createDate;
        
        
        
        
        
        
        
        
    
    });
