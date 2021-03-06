/**
 * Created by admin on 2017/7/24.
 */
angular.module ('starter.bettingDetailCtrl', [])
    
    .controller ('bettingDetailCtrl', function ($scope, $rootScope, $ionicPopup, $timeout, $state, $cordovaToast, $ionicLoading, $util, $http, $getInfoService, $bettingService, $ionicModal, locals) {
        $scope.multiple = '1';
        $scope.countMoney = '2';
        $scope.sessionJsonWarp = JSON.parse (sessionStorage.jsonWrap);//反解析
        $scope.totalMoney = $scope.sessionJsonWarp.length; //设置倍数及金额

        //是否追加  0未追加false   1 追加true
        $scope.isSelected = {
            checked: false
        };
        var addFlag = '0';
        $scope.onchange = function () {
            $scope.isSelected.checked = !$scope.isSelected.checked;
            if ($scope.isSelected.checked == true) {
                addFlag = '1';
                $scope.countMoney = '3';
            }
            else {
                addFlag = '0';
                $scope.countMoney = '2';
            }
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
                $scope.liAutoAdds.push ({num: 1});
            }
            else {
                $scope.liAutoAdds[$scope.liAutoAdds.length - 1].num++;
            }
            addMachine = ($scope.liAutoAdds.length - 1) * 5 + $scope.liAutoAdds[$scope.liAutoAdds.length - 1].num;
            $scope.totalMoney = $scope.sessionJsonWarp.length + addMachine;
        };

        //点击删除一组机选号码
        $scope.machineDelete = function ($index) {
            if ($scope.liAutoAdds.length == 1) {
                $scope.liAutoAdds[$scope.liAutoAdds.length - 1].num = 1;
            } else {
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
             console.log(sessionStorage.jsonWrap);
            $scope.totalMoney--;
        };

        $scope.editThisOrder = function ($index) {
            
            /*1.先转成数组
            2.数组中获取当前修改的一组
            3.sessionStorage保存当前修改的一组*/
            var changeToArr = JSON.parse (sessionStorage.jsonWrap);
            var thisIndexOrder = changeToArr[$index];

            var changeToArr1 = JSON.stringify (thisIndexOrder);
            sessionStorage.editThisOrderData = changeToArr1;

            // console.log(thisIndexOrder);
            $rootScope.editIndex = $index;
            $state.go ('BigLotto');
            $scope.deleteRow ($index);
        };

        // 保存
        $scope.showSaveAlert = function (payType) {
            $scope.showOrderAlertCms (payType);
            console.info (payType);
        };

        //提交彩店
        $scope.showOrderAlertCms = function (payType) {
            //处理默认的倍数
            if ($scope.multiple * 1 <= 0 || $scope.multiple * 1 == '') {
                alert ('倍数设置错误');
                //$cordovaToast.showShortCenter ("倍数设置错误");
                return;
            }
            //获取大乐透期号
            var reques = {};
            var userInfo = $util.getUserInfo ();
            var token = userInfo.token;
            var data = {
                data: {},
                params: {
                    lotteryID: 2
                }
            };

            $getInfoService.getWareIssue (data, token)
                .then (function (response) {
                    reques = response.data;
                    //console.info (reques);
                    if(response.error == '0'){//判断token过期
                        locals.setObject("end_sale_time", reques.end_sale_time);//保存订单的截止销售时间
                        getdltadd (payType);
                    }
                    else if (response.error == '1110') {
                        $cordovaToast.showShortCenter (response.info)
                            .then (function (success) {
                                $timeout (function () {
                                    $state.go ('orderStatus');
                                }, 2000);
                            }, function (error) {
                                //.....
                            });
                    }
                    else {
                        alert ('未知错误!');
                    }
                }, function (error) {
                    alert ("期号获取失败，请检查网络");
                });
            // 大乐透投注接口信息
            function getdltadd (payType) {
                var dataArrayBig = [];
                for (var i in $scope.sessionJsonWarp) {
                    var dataObj = {
                        investCode: "", //"investCode":"01,03,05,07,09*06,08"
                        multiple: $scope.multiple
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
                    console.log (dataArrayBig);
                }
                if(dataArrayBig.length == '0'){//未选择号码提交失败
                    $cordovaToast.showShortCenter ("请选择号码!");
                    return;
                }

                var vid = '20170525170402702001';//先放这里 后面 在登录返回数据取
                var data = {
                    data: {
                        wareIssue: reques.wareIssue,
                        payType: payType,//0 保存  1 投注
                        vid: vid,
                        addFlag: addFlag,
                        data: dataArrayBig
                    },
                    params: {}
                };
                console.info (data);
                $bettingService.dltadd (data, token)
                    .then (function (response) {
                        //console.info (response);
                        if (response.error == '0') {
                            if (payType == 0) {
                                $cordovaToast.showShortCenter ("方案保存成功");
                                return;
                            }
                            else {
                                $cordovaToast.showShortCenter ("订单提交成功")
                                    .then (function (success) {
                                        $timeout (function () {
                                            $state.go ('orderStatus');
                                            jsonWrap = [];
                                            $scope.sessionJsonWarp = [];
                                            sessionStorage.jsonWrap = '';
                                        }, 2000);
            
                                    }, function (error) {
            
                                    });
                            }
                        }
                        else if (response.error == '1110') {
                            $cordovaToast.showShortCenter (response.info)
                                .then (function (success) {
                                    $timeout (function () {
                                        $state.go ('signin');
                                    }, 2000);
                                }, function (error) {

                                });
                        }
                        else {
                            $cordovaToast.showShortCenter (response.info);
                        }

                    }, function (error) {
                        $cordovaToast.showShortCenter ("投注失败!");
                    });
            }
        };


    });
