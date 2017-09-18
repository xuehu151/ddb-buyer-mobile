/**
 * Created by admin on 2017/8/21.
 */

angular.module ('starter.HistoryLotteryCtrl', [])
//首页历史开奖
    .controller ('HistoryLotteryCtrl', function ($scope, $state, $rootScope, $util, $ionicLoading, $getInfoService, $ionicPopup, $cordovaToast) {
        //获取历史投注记录............
        var userInfo = $util.getUserInfo ();
        var token = userInfo.token;
        var pageSize = 8;
        var pageNumber = 1;

        $scope.hasMore = true;
        $scope.bitLotto = [];
        $scope.loadMore = function () {
            data = {
                data : {},
                params : {
                    lotteryID : 2,
                    pageSize : pageSize,
                    pageNumber : pageNumber
                }
            };
            loadajax ();
        };
        function loadajax () {
            $getInfoService.getHistoryList (data, token)
                .then (function (response) {
                    console.info(response);
                    if (response.data.length != 0) {
                        $scope.bitLotto = $scope.bitLotto.concat (response.data);
                        for (var i = 0; i < $scope.bitLotto.length; i++) {
                            var drawTime = $scope.bitLotto[i].drawTime;

                            var blank_drawTime = drawTime.split (' ')[0];
                            getDay = $util.getWeekByDay (drawTime);//判断周几

                            $scope.bitLotto[i].getDay = getDay;
                            $scope.bitLotto[i].drawTime = blank_drawTime.replace(/-/g,'/');
                        }
                        //无数据提示
                        if ($scope.bitLotto.length === 0) {
                            $cordovaToast.showLongBottom ('暂无数据')
                                .then (function (success) {
                                    // success
                                }, function (error) {
                                    // error
                                });
                        }
                        pageNumber++;
                    }
                    else {
                        $scope.hasMore = false;
                        $cordovaToast.showShortBottom ("暂无更多了");
                    }
                    $scope.$broadcast ('scroll.refreshComplete');
                    $scope.$broadcast ('scroll.infiniteScrollComplete');

                    //开奖历史详情
                    $scope.goToHistory = function ( pastResult) {
                        $rootScope.pastResult = pastResult;
                        console.info(pastResult);
                        $state.go ('HistoryLotteryDetails');
                    }
                }, function (response) {
                    alert ("获取列表失败");
                });
        }

        $scope.doRefresh = function () {
            pageNumber = 1;
            $scope.bitLotto = [];
            $scope.loadMore ();
        };


        $scope.toArray = function (string2, num) {
            var array1 = string2.split ("*");
            var arrFront = array1[0].split (",");
            var arrBehind = array1[1].split (",");
            var array = arrFront.concat (arrBehind);
            //console.log(array);
            return array[num];
        };
    });
