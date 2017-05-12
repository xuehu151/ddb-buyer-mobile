angular.module ('starter.controllers', [])

    .controller ('SignInCtrl', function ($scope, $state, $ionicPopup, $ionicLoading) {

        $scope.signIn = function (user) {

            /* if (typeof(user) == 'undefined') {

             var alertPopup = $ionicPopup.alert({
             template: '<p style="text-align: center;">请填写登录信息</p>',
             okText: "确定"
             });
             return;
             }
             $ionicLoading.show();*/

            $state.go ('tab.home');

            $ionicLoading.hide ();

        };
    })

    //首页
    .controller ('HomeCtrl', function ($scope) {

    })

    //***首页  竞彩足球下单详情
    .controller ('RaceColorFootballCtrl', function ($scope) {
        $scope.groups = [];
        for (var i = 0; i < 3; i++) {//循环列表
            $scope.groups[i] = {
                name: i,
                items: []
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



    })

    //***首页  大乐透下单详情
    .controller ('BigLottoCtrl', function ($scope, $ionicPopover) {
        $scope.numDataRed = [];
        $scope.numDataBlue = [];

        // Create the red items
        for (var i = 0; i < 35; i++) {
            $scope.numDataRed.push (i + 1);
        }
        // Create the blue items
        for (var i = 0; i < 12; i++) {
            $scope.numDataBlue.push (i + 1);
        }

        //添加点击效果




        // .fromTemplate() 方法
        var template = '<ion-popover-view style="width: 100px; height: 140px; text-align: center;">' +
            ' <ion-content>' +
            '        <h4>走势图</h4>' +
            '        <h4>历史开奖</h4>' +
            '        <h4>玩法说明</h4>' +
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


    })

    //方案保存成功提示
    .controller('bettingHaveSaved',function($scope, $ionicPopup, $timeout,$state) 
    {
    
             // Triggered on a button click, or some other target
       $scope.showSaveAlert = function() 
       {
           var alertPopup = $ionicPopup.alert({
               template: '<div style="text-align:center">方案保存成功</div>',
               title: '<i class="icon ion-ios-checkmark-outline" style="font-size:26px"></i>',
           });
       };
       $scope.showOrderAlert = function() 
       {
           var alertPopup = $ionicPopup.alert({
               template: '<div style="text-align:center">订单提交成功</div>',
               title: '<i class="icon ion-ios-checkmark-outline" style="font-size:26px"></i>',
           });
               alertPopup.then(function () {
               $state.go ('orderStatus');
           })
       };
    })

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



    })

    //资讯
    .controller ('InformationCtrl', function ($scope) {

    })

    //资讯   竞彩足球
    .controller ('BiddingFootballCtrl', function ($scope) {

    })

    //资讯   大乐透
    .controller ('SuperLottoCtrl', function ($scope) {

    })


    //我的
    .controller ('MineCtrl', function ($scope) {

    });
