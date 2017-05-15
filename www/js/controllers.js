angular.module('starter.controllers', [])

    .controller('SignInCtrl', function ($scope, $state, $ionicPopup, $ionicLoading) {

        $scope.signIn = function (user) {

            /* if (typeof(user) == 'undefined') {

             var alertPopup = $ionicPopup.alert({
             template: '<p style="text-align: center;">请填写登录信息</p>',
             okText: "确定"
             });
             return;
             }
             $ionicLoading.show();*/

            $state.go('tab.home');

            $ionicLoading.hide();

        };
    })

    //首页
    .controller('HomeCtrl', function ($scope) {

    })

    //***首页  竞彩足球下单详情
    .controller('RaceColorFootballCtrl', function ($scope) {
        $scope.groups = [];
        for (var i = 0; i < 3; i++) {//循环列表
            $scope.groups[i] = {
                name: i,
                items: []
            };
            for (var j = 0; j < 3; j++) {
                $scope.groups[i].items.push(i + '-**-' + j);
            }
        }
        $scope.toggleGroup = function (group) {//循环渲染出的列表实现折叠和收缩效果
            if ($scope.isGroupShown(group)) {
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
    .controller('BigLottoCtrl', function ($scope, $state, $ionicPopover, $interval, $ionicPopup) {
        //设置红球和篮球号码
        $scope.numDataRed = [];
        $scope.numDataBlue = [];


        //时间获取
        $scope.now = new Date;
        var timer = $interval(function () {
            $scope.now = new Date;
        }, 1000);

        // Create the red items   红球
        for (var j = 1; j <= 35; j++) {
            var itemsRed = {
                num: j,
                check: false
            };
            $scope.numDataRed.push(itemsRed);
        }

        //给红色球添加点击事件
        $scope.addRedClick = function (item) {
            var filterDataRed = [];//存放选中后的号码
            //先看选中了几个
            for (var i = 0; i < $scope.numDataRed.length; i++) {
                if ($scope.numDataRed[i].check == true) {
                    filterDataRed.push($scope.numDataRed[i]);
                }
            }
            /*判断原来的状态*/
            if (item.check != true) {
                if (filterDataRed.length >= 5) {
                    alert("选择的红球号码不能大于五个");
                } else {
                    selectedRedBallNum();
                }
            } else {
                selectedRedBallNum();
            }
            console.log(filterDataRed);
            /*封装选择后的红色号码数*/
            function selectedRedBallNum() {
                item.check = !item.check;
                filterDataRed = [];
                for (var i = 0; i < $scope.numDataRed.length; i++) {
                    if ($scope.numDataRed[i].check == true) {
                        filterDataRed.push($scope.numDataRed[i]);
                    }
                }
            }
        };

        // Create the blue items  篮球
        for (var i = 1; i <= 12; i++) {
            var itemsBlue = {
                num: i,
                check: false
            };
            $scope.numDataBlue.push(itemsBlue);
        }

        //给蓝色球添加点击事件
        $scope.addBlueClick = function (item) {
            var filterDataBlue = [];//存放选中后的号码
            //先看选中了几个
            for (var i = 0; i < $scope.numDataBlue.length; i++) {
                if ($scope.numDataBlue[i].check == true) {
                    filterDataBlue.push($scope.numDataBlue[i]);
                }
            }
            /*判断原来的状态*/
            if (item.check != true) {
                if (filterDataBlue.length >= 2) {
                    alert("选择的篮球号码不能大于两个");
                } else {
                    selectedBlueBallNum();
                }
            } else {
                selectedBlueBallNum();
            }
            console.log(filterDataBlue);
            /*封装选择后的号码数*/
            function selectedBlueBallNum(){
                item.check = !item.check;
                filterDataBlue = [];
                for (var i = 0; i < $scope.numDataBlue.length; i++) {
                    if ($scope.numDataBlue[i].check == true) {
                        filterDataBlue.push($scope.numDataBlue[i]);
                    }
                }
            }
        };


        //清空已选中的红蓝色球
        $scope.clearSelected = function () {
            filterDataRed = [];//清空选中后的红色号码数据
            filterDataBlue = [];//清空选中后的蓝色号码数据

            //清空选中后的红色号码
            for (var i = 0; i < $scope.numDataRed.length; i++) {
                if ($scope.numDataRed[i].check == true) {
                    $scope.numDataRed[i].check = !$scope.numDataRed[i].check;
                }
            }
            //清空选中后的蓝色号码
            for (var i = 0; i < $scope.numDataBlue.length; i++) {
                if ($scope.numDataBlue[i].check == true) {
                    $scope.numDataBlue[i].check = !$scope.numDataBlue[i].check;
                }
            }
            //console.log(filterDataBlue);
            //console.log(filterDataRed);
        };

        //随机选择   红蓝  色球
        $scope.randomBall = function () {
            alert('机选随机数');
        };

        //确认提交按钮
        $scope.saveBallSelect = function () {
            var alertPopup = $ionicPopup.alert({
                template: '<p style="text-align: center; letter-spacing: 2px;">订单已提交到我的订单</p>',
                okText: "确定"
            });

            alertPopup.then(function () {
                $state.go('bettingDetail');
            });

        };


        // .fromTemplate() 方法
        var template = '<ion-popover-view style="width: 100px; height: 140px; text-align: center;">' +
            ' <ion-content>' +
            '        <h4>走势图</h4>' +
            '        <h4>历史开奖</h4>' +
            '        <h4>玩法说明</h4>' +
            '</ion-content>' +
            '</ion-popover-view>';

        $scope.popover = $ionicPopover.fromTemplate(template, {
            scope: $scope
        });

        $scope.openPopover = function ($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function () {
            $scope.popover.hide();
        };
        // 清除浮动框
        $scope.$on('$destroy', function () {
            $scope.popover.remove();
        });
        // 在隐藏浮动框后执行
        $scope.$on('popover.hidden', function () {
            // 执行代码
        });
        // 移除浮动框后执行
        $scope.$on('popover.removed', function () {
            // 执行代码
        });


    })

    //方案保存成功提示
    .controller('bettingHaveSaved', function ($scope, $ionicPopup, $timeout, $state) {

        // Triggered on a button click, or some other target
        $scope.showSaveAlert = function () {
            var alertPopup = $ionicPopup.alert({
                template: '<div style="text-align:center">方案保存成功</div>',
                title: '<i class="icon ion-ios-checkmark-outline" style="font-size:26px"></i>'
            });
        };
        $scope.showOrderAlert = function () {
            var alertPopup = $ionicPopup.alert({
                template: '<div style="text-align:center">订单提交成功</div>',
                title: '<i class="icon ion-ios-checkmark-outline" style="font-size:26px"></i>'
            });
            alertPopup.then(function () {
                $state.go('orderStatus');
            });
        };
    })

    //推荐
    .controller('RecommendCtrl', function ($scope, $ionicPopover) {
        $scope.popover = $ionicPopover.fromTemplateUrl('my-popover.html', {
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

        $scope.popover = $ionicPopover.fromTemplate(template, {
            scope: $scope
        });

        $scope.openPopover = function ($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function () {
            $scope.popover.hide();
        };
        // 清除浮动框
        $scope.$on('$destroy', function () {
            $scope.popover.remove();
        });
        // 在隐藏浮动框后执行
        $scope.$on('popover.hidden', function () {
            // 执行代码
        });
        // 移除浮动框后执行
        $scope.$on('popover.removed', function () {
            // 执行代码
        });


    })

    //资讯
    .controller('InformationCtrl', function ($scope) {

    })

    //资讯   竞彩足球
    .controller('BiddingFootballCtrl', function ($scope) {

    })

    //资讯   大乐透
    .controller('SuperLottoCtrl', function ($scope) {

    })


    //我的
    .controller('MineCtrl', function ($scope) {

    });
