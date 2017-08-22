/**
 * Created by admin on 2017/7/24.
 */
angular.module ('starter.BigLottoCtrl', [])
//***首页  大乐透下单详情
    .controller ('BigLottoCtrl', function ($scope, $rootScope, $state, $ionicPopover, $interval, $ionicPopup, $cordovaToast) {
        //设置红球和篮球号码
        $scope.numDataRed = [];
        $scope.numDataBlue = [];
        var filterDataRed = [];//存放选中后的红色号码
        var filterDataBlue = [];//存放选中后的蓝色号码
        $scope.Note = '0';  //初始化注数
        $scope.NoteMoney = '0';//初始化钱数
        
        //时间获取
        $scope.now = new Date;
        var timer = $interval (function () {
            $scope.now = new Date;
        }, 1000);
        
        // Create the red items   红球
        for (var j = 1; j < 36; j++) {
            if (j < 10) {
                var itemsRed = {
                    num : '0' + j,
                    check : false
                };
            }
            else {
                var itemsRed = {
                    num : j,
                    check : false
                };
            }
            $scope.numDataRed.push (itemsRed);
        }
        
        //给红色球添加点击事件
        $scope.addRedClick = function (item) {
            filterDataRed = [];
            //先看选中了几个
            for (var i = 0; i < $scope.numDataRed.length; i++) {
                if ($scope.numDataRed[i].check == true) {
                    filterDataRed.push ($scope.numDataRed[i]);
                }
            }
            /*判断原来的状态*/
            if (item.check != true) {
                if (filterDataRed.length >= 5) {
                    alert ("选择的红球号码不能大于五个");
                }
                else {
                    selectedRedBallNum ();
                }
            }
            else {
                selectedRedBallNum ();
            }
            console.log (filterDataRed);
            /*封装选择后的红色号码数*/
            function selectedRedBallNum () {
                item.check = !item.check;
                filterDataRed = [];
                for (var i = 0; i < $scope.numDataRed.length; i++) {
                    if ($scope.numDataRed[i].check == true) {
                        filterDataRed.push ($scope.numDataRed[i]);
                    }
                }
            }
            
            noteCount ();//调取多少注以及多少钱
        };
        
        // Create the blue items  篮球
        for (var i = 1; i <= 12; i++) {
            if (i < 10) {
                var itemsBlue = {
                    num : '0' + i,
                    check : false
                };
            }
            else {
                var itemsBlue = {
                    num : i,
                    check : false
                };
            }
            $scope.numDataBlue.push (itemsBlue);
        }
        
        //给蓝色球添加点击事件
        $scope.addBlueClick = function (item) {
            filterDataBlue = [];
            //先看选中了几个
            for (var i = 0; i < $scope.numDataBlue.length; i++) {
                if ($scope.numDataBlue[i].check == true) {
                    filterDataBlue.push ($scope.numDataBlue[i]);
                }
            }
            /*判断原来的状态*/
            if (item.check != true) {
                if (filterDataBlue.length >= 2) {
                    alert ("选择的篮球号码不能大于两个");
                }
                else {
                    selectedBlueBallNum ();
                }
            }
            else {
                selectedBlueBallNum ();
            }
            console.log (filterDataBlue);
            /*放置选择后的号码数 函数 */
            function selectedBlueBallNum () {
                item.check = !item.check;
                filterDataBlue = [];
                for (var i = 0; i < $scope.numDataBlue.length; i++) {
                    if ($scope.numDataBlue[i].check == true) {
                        filterDataBlue.push ($scope.numDataBlue[i]);
                    }
                }
            }
            
            noteCount ();//调取多少注以及多少钱函数
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
            noteCount ();//调取多少注以及多少钱函数
            console.log (filterDataBlue);
            console.log (filterDataRed);
        };
        
        //随机选择   红蓝  色球
        $scope.randomBall = function () {
            //处理随机选取红色球***********************
            for (var i = 0; i < 35; i++) {//首先清空选中的号码效果
                $scope.numDataRed[i].check = false;
                filterDataRed = [];
            }
            var randomRed = [];//原数组
            //给原数组randomBlue赋值
            for (var i = 1; i <= 35; i++) {
                randomRed[i] = i;
            }
            randomRed.sort (function () {
                return 0.5 - Math.random ();
            });
            //随机打撒
            for (var i = 0; i < 5; i++) {
                // console.log (randomRed[i]);
                $scope.numDataRed[randomRed[i] - 1].check = true;
                filterDataRed.push (randomRed[i]);
            }
            
            //处理随机选取蓝色球***********************
            for (var i = 0; i < 12; i++) {//首先清空选中的号码效果
                $scope.numDataBlue[i].check = false;
                filterDataBlue = [];
            }
            var randomBlue = [];//原数组
            //给原数组randomBlue赋值
            for (var i = 1; i <= 12; i++) {
                randomBlue[i] = i;
            }
            randomBlue.sort (function () {
                return 0.5 - Math.random ();
            });
            //随机打撒
            for (var i = 0; i < 2; i++) {
                // console.log (randomBlue[i]);
                $scope.numDataBlue[randomBlue[i] - 1].check = true;
                filterDataBlue.push (randomBlue[i]);
            }
            noteCount ();//调取多少注以及多少钱函数
            // console.log (filterDataRed);
            // console.log (filterDataBlue);
        };
        //根据选中的多少注来确定  注数和金额数；
        function noteCount () {
            if (filterDataRed.length == 5 && filterDataBlue.length == 2) {
                $scope.Note = '1';
                $scope.NoteMoney = '2';
            }
            else {
                $scope.Note = '0';
                $scope.NoteMoney = '0';
            }
        }
        
        /* console.log(filterDataRed.length);
         console.log(filterDataBlue.length);*/
        
        /**
         * 1.此if是用来判断是不是在投注详情页面点击修改后跳转过来的
         * 2.如果是点击修改后跳转过来的需要渲染红篮球
         */
        if (sessionStorage.editThisOrderData) {
            var changeToArray1 = JSON.parse (sessionStorage.editThisOrderData);
            filterDataBlue = changeToArray1.blue;
            filterDataRed = changeToArray1.red;
            
            for (var i = 0; i < 5; i++) {
                $scope.numDataRed[changeToArray1.red[i].num - 1].check = true;
            }
            
            for (var i = 0; i < 2; i++) {
                $scope.numDataBlue[changeToArray1.blue[i].num - 1].check = true;
            }
            $scope.Note = '1'; // 判断如果点击修改查看按钮返回到详情投注页面后添加注数以及金额
            $scope.NoteMoney = '2';
        }
        //确认按钮
        $scope.saveBallSelect = function () {
            var filterDataRed1 = [];        //用来保存本次点击确定后的红球
            var filterDataBlue1 = [];       //用来保存本次点击确定后的蓝球
            
            if (filterDataRed.length == 5 && filterDataBlue.length == 2) {      //判断用户未选择号码时点击确定无效
                var alertPopup = $ionicPopup.alert ({
                    template : '<p style="text-align: center; letter-spacing: 2px;">订单已提交到我的订单！</p>',
                    okText : "确定"
                })
                
//                $cordovaToast.showShortCenter ("订单已提交到我的订单")      /* 暂时注释掉 为了测试浏览器*/
                    .then(function(success) {
                        // success
                        if (sessionStorage.jsonWrap) { //判断是否第一次点击确定
                            var changeToArray = JSON.parse (sessionStorage.jsonWrap);
                            //把controller(bettingHaveSaved)中获取的sessionStorage.jsonWrap放到此controller中来，在这个pushWrap上push新号码
                            jsonWrap = changeToArray;
                        }
    
                        //如果红篮球就添加进数组
                        for (var i = 0; i < 35; i++) {
                            if ($scope.numDataRed[i].check == true) {
                                filterDataRed1.push ($scope.numDataRed[i]);
                            }
                        }
                        for (var i = 0; i < 12; i++) {
                            if ($scope.numDataBlue[i].check == true) {
                                filterDataBlue1.push ($scope.numDataBlue[i]);
                            }
                        }
                        // console.log(filterDataBlue1)
                        //以对象的方式存放每一注的  红篮球 的数据
                        var jsonInner = {
                            red : filterDataRed1,
                            blue : filterDataBlue1
                        };
                        /**
                         * 1.如果是在bettingDetail中点击修改订单过来的,则把这个序号的内容变成本次确定的号码
                         * 2.如果不是则push新的号码
                         */
                        if ($rootScope.editIndex) {
                            jsonWrap[$rootScope.editIndex] = jsonInner;
                        }
                        else {
                            jsonWrap.push (jsonInner);
                        }
                        var sessionJsonWarp = JSON.stringify (jsonWrap);//解析数组
                        sessionStorage.jsonWrap = sessionJsonWarp;//保存解析后的数组
    
                        // console.log (sessionStorage.jsonWrap);
                        $state.go ('bettingDetail');
                    }, function (error) {
                        // error
                    });
            }
            else {
                $cordovaToast.showShortCenter ("您还未选择号码请正确选择号码");
                return
            }
        };
        
        $scope.trendHistoryLottery = ['走势图', '历史开奖', '玩法说明'];
        $scope.clickHide = function (listBtnNum) {
            console.info (listBtnNum);
            $scope.popover.hide ();
            if(listBtnNum == '历史开奖'){
                $state.go('HistoryLottery');
            }
        };
        // .fromTemplate() 方法
        $ionicPopover.fromTemplateUrl ('templates/rightTopPopover.html', {
            scope : $scope
        })
            .then (function (popover) {
                $scope.popover = popover;
            });
        
        $scope.openPopover = function ($event) {
            $scope.popover.show ($event);
        };
        
        
        
        
    });
