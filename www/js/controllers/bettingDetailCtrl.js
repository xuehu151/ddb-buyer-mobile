/**
 * Created by admin on 2017/7/24.
 */
angular.module ('starter.bettingDetailCtrl', [])
    //方案保存成功提示
    .controller ('bettingDetailCtrl', function ($scope,$rootScope, $ionicPopup, $timeout, $state, $cordovaToast, $ionicLoading, $util, $http, $getInfoService, $bettingService, $ionicModal, locals) {
        $scope.multiple = '1';
        $scope.countMoney = '2';
       
        //处理默认的倍数
        $scope.blur = function (focus) {
            if($scope.multiple < 1){
                $cordovaToast.showShortCenter ("倍数最小为1倍");
             /*   var alertPopup = $ionicPopup.alert ({
                    template: '<div style="text-align:center">倍数最小为1倍</div>',
                    title: '<i class="icon ion-ios-checkmark-outline" style="font-size:26px"></i>'
                });*/
                $scope.multiple = '1';
                return
            }
        };

        $scope.sessionJsonWarp = JSON.parse (sessionStorage.jsonWrap);//反解析
        // console.log ($scope.sessionJsonWarp);
        $scope.totalMoney = $scope.sessionJsonWarp.length; //设置倍数及金额

        //是否追加  0未追加false   1 追加true
        $scope.isSelected = {
            checked: true
        };
        var addFlag = '1';
        $scope.onchange = function () {
            if ($scope.isSelected.checked == true) {
                $scope.isSelected.checked = false;
            }
            else {
                $scope.isSelected.checked = true;
            }
            // console.info($scope.isSelected.checked);
            if($scope.isSelected.checked == false){
                addFlag = '0';
            }else {
                addFlag = '1';
            }
            //console.info(addFlag);
        };

        //手动添加一组，返回大乐透选中页面
        $scope.manualAdd = function () {
            $state.go ('BigLotto');
            sessionStorage.editThisOrderData = '';  //清除点击修改后保存在session.editThisOrderData中的数据
        };

        //点击店家机选，添加机选一注
        $scope.liAutoAdds = [{num: 1}];   //初始化
        var addMachine = $scope.liAutoAdds.length;
        $scope.totalMoney = $scope.sessionJsonWarp.length + addMachine;

        $scope.autoAdd = function () {
            if ($scope.liAutoAdds[$scope.liAutoAdds.length - 1].num >= 5) { //当最后一个对象的num>=5时，push一个新对象
                $scope.liAutoAdds.push ({ num : 1 });
            }
            else {
                $scope.liAutoAdds[$scope.liAutoAdds.length - 1].num++;
            }
            addMachine = ($scope.liAutoAdds.length - 1) * 5 + $scope.liAutoAdds[$scope.liAutoAdds.length - 1].num;
            $scope.totalMoney = $scope.sessionJsonWarp.length + addMachine;
        };

        //点击删除一组机选号码
        $scope.machineDelete = function ($index) {
            if($scope.liAutoAdds.length == 1){
                $scope.liAutoAdds[$scope.liAutoAdds.length - 1].num = 1;
            }else {
                $scope.liAutoAdds.splice ($index, 1);
            }
            addMachine = ($scope.liAutoAdds.length - 1) * 5 + $scope.liAutoAdds[$scope.liAutoAdds.length - 1].num;
            $scope.totalMoney = $scope.sessionJsonWarp.length + addMachine;
        };

        //点击删除一组手选号码
        $scope.deleteRow = function ($index) {
            $scope.sessionJsonWarp.splice ($index, 1);   //点击删除本行

            //删除本行后的数据保存到sessionStorage
            var changeToStr = JSON.stringify ($scope.sessionJsonWarp);
            sessionStorage.jsonWrap = changeToStr;
            // console.log(sessionStorage.jsonWrap);
            $scope.totalMoney--;
        };

        $scope.editThisOrder = function ($index) {
            /**
             * 1.先转成数组
             * 2.数组中获取当前修改的一组
             * 3.sessionStorage保存当前修改的一组
             */
            var changeToArr = JSON.parse (sessionStorage.jsonWrap);
            var thisIndexOrder = changeToArr[$index];

            var changeToArr1 = JSON.stringify (thisIndexOrder);
            sessionStorage.editThisOrderData = changeToArr1;

            // console.log(thisIndexOrder);
            $rootScope.editIndex = $index;
            $state.go ('BigLotto');
            $scope.deleteRow($index);
        };

        // 方案保存成功提示框
        var totalSum = $scope.totalMoney * $scope.multiple * $scope.countMoney;
        var localsArrs = locals.getObject ("localsArr");
        //console.info (localsArrs);
        jsonWarpBall = [];
        for (var i = 0; i < localsArrs.length; i++) {
            jsonWarpBall.push (localsArrs[i]);
        }
  
        $scope.showSaveAlert = function () {
            var objBall = {
                totalSum : totalSum,
                ballList : $scope.sessionJsonWarp,
                status: 5
            };
            jsonWarpBall.push(objBall);
            locals.setObject("localsArr", jsonWarpBall);
            //console.info(jsonWarpBall);
            //$cordovaToast.showShortCenter ("方案保存成功");
            
            /*var alertPopup = $ionicPopup.alert ({
                template: '<div style="text-align:center">方案保存成功</div>',
                title: '<i class="icon ion-ios-checkmark-outline" style="font-size:26px"></i>'
            });*/
        };

        //提交彩店
        $scope.showOrderAlertCms = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
            //获取大乐透期号
            var reques = {};
            var userInfo = $util.getUserInfo ();
            console.log(userInfo);
            var token = userInfo.token;
            var data = {
                data:{

                },
                params:{
                    lotteryID : 2
                }
            };
//            console.info(data);
            $getInfoService.getWareIssue (data, token)
                .then (function (response) {
                    $ionicLoading.hide ();
                    reques = response.data;
                    console.info (reques);
                    console.info(response);
                    if(response.error == '0'){
                        getdltadd ();
                    }else {
                        var alertPopup = $ionicPopup.alert ({
                            template : '<div style="text-align:center">'+response.info+'</div>',
                            title : '<i class="icon ion-ios-checkmark-outline" style="font-size:26px"></i>'
                        })
                        //$cordovaToast.showShortCenter ("订单提交成功")   /*暂时注释掉为了测试浏览器*/
                            .then (function (success) {
                                // success
                                $state.go ('signin');
                            }, function (error) {

                            });

                    }
                }, function (error) {
                    $ionicLoading.hide ();
                    alert ("获取列表失败");
                });
            // 大乐透投注接口信息
            function getdltadd () {
                $ionicLoading.show ();
                // var userInfo = $util.getUserInfo ();
                var dataArrayBig = [];
                for (var i in $scope.sessionJsonWarp) {
                    var dataObj = {
                        investCode : "", //"investCode":"01,03,05,07,09*06,08"
                        multiple : 1
                    };
                    var investCode = '';
                    for (var j in $scope.sessionJsonWarp[i]) {
                        for (var k in $scope.sessionJsonWarp[i][j]) {
                            if (typeof $scope.sessionJsonWarp[i][j][k] === 'object') {

                                investCode += ',' + $scope.sessionJsonWarp[i][j][k].num;

                                if (investCode.substr (0, 1) == ',') investCode = investCode.substr (1); //截取第一位逗号
                                investCode = (investCode.substring (investCode.length - 1) == ',') ? investCode.substring (0, investCode.length - 1) : investCode; //截取最后一位逗号
                                var get_array = investCode.split ('');
                                get_array.splice (-6, 1, '*');
                                var investCodeStr = get_array.join ('');
                            }
                        }
                    }
                    //console.log (investCodeStr);
                    dataObj.investCode = investCodeStr;
                    dataArrayBig.push (dataObj);
                    // console.log (dataArrayBig);
                }
                var vid = '20170525170402702001';//先放这里 后面 在登录返回数据取
                var payType = '1';
                var data = {
                    data: {
                        wareIssue: reques.wareIssue,
                        payType: payType,
                        vid: vid,
                        addFlag: addFlag,
                        data: dataArrayBig
                    },
                    params: {

                    }
                };
                var token = userInfo.token;
                console.log(data);

                $bettingService.dltadd(data, token)
                    .then (function (response) {
                        $ionicLoading.hide ();
                        console.info(response);
                        if(response.error == '0'){
                            /* $cordovaToast.showShortCenter ("订单提交成功")      /!* 暂时注释掉 为了测试浏览器*!/
                             .then (function (success) {
                             // success
                             $state.go ('orderStatus');
                             }, function (error) {

                             });*/

                            var alertPopup = $ionicPopup.alert ({
                                template : '<div style="text-align:center">订单提交成功</div>',
                                title : '<i class="icon ion-ios-checkmark-outline" style="font-size:26px"></i>'
                            })
                                .then (function () {
                                    $state.go ('orderStatus');
                                });
                        }else {
                            alert('投注失败了');
                        }

                    }, function (error) {
                        //扫码后，所获赠注数的限制提示。
                        var confirmPopup = $ionicPopup.confirm ({
                            title : '<div class="confirmPopup-heads"><img src="./img/alert-img.png" alt=""  width = "30%"></div>',
                            template : '<div style="color: #132d8e;">您只获赠了真龙赠与您的 3 注彩票,想多来几注，再来一包真龙香烟吧！</div>',
                            okText : '确认',
                            okType : 'button-darkBlue'
                        })
                            .then (function () {

                            });
                    });
            }


        };
    });
