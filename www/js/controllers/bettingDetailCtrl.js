/**
 * Created by admin on 2017/7/24.
 */
angular.module ('starter.bettingDetailCtrl', [])
    //方案保存成功提示
    .controller ('bettingDetailCtrl', function ($scope,$rootScope, $ionicPopup, $timeout, $state) {
        
        $scope.sessionJsonWarp = JSON.parse (sessionStorage.jsonWrap);//反解析
        // console.log ($scope.sessionJsonWarp);
        
        //手动添加一组，返回大乐透选中页面
        $scope.manualAdd = function () {
            $state.go ('BigLotto');
            sessionStorage.editThisOrderData = '';  //清除点击修改后保存在session.editThisOrderData中的数据
        };
        
        //点击店家机选，添加机选一注
        $scope.liAutoAdds = [{num: 1}];   //初始化
        $scope.autoAdd = function () {
            if ($scope.liAutoAdds[$scope.liAutoAdds.length - 1].num >= 5)  //当最后一个对象的num>=5时，push一个新对象
            {
                $scope.liAutoAdds.push ({num: 1});
                // $scope.liAutoAdds[$scope.liAutoAdds.length].num=1;
            }
            else {
                $scope.liAutoAdds[$scope.liAutoAdds.length - 1].num++;
            }
        };
        
        //点击删除一组
        $scope.deleteRow = function ($index) {
            $scope.sessionJsonWarp.splice ($index, 1);   //点击删除本行
            
            //删除本行后的数据保存到sessionStorage
            var changeToStr = JSON.stringify ($scope.sessionJsonWarp);
            sessionStorage.jsonWrap = changeToStr;
            // console.log(sessionStorage.jsonWrap);
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
            $rootScope.editIndex=$index;
            $state.go('BigLotto');
            // $scope.deleteRow($index);
        };
        
        // 方案保存成功提示框
        $scope.showSaveAlert = function () {
            var alertPopup = $ionicPopup.alert ({
                template: '<div style="text-align:center">方案保存成功</div>',
                title: '<i class="icon ion-ios-checkmark-outline" style="font-size:26px"></i>'
            });
        };
        $scope.showOrderAlertCms = function () {
            var alertPopup = $ionicPopup.alert ({
                template: '<div style="text-align:center">订单提交成功</div>',
                title: '<i class="icon ion-ios-checkmark-outline" style="font-size:26px"></i>'
            })
                .then (function () {
                    $state.go ('orderStatus');
                });
        };
    });
