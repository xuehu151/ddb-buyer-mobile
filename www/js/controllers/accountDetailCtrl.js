/**
 * Created by admin on 2017/8/3.
 */
angular.module ('starter.accountDetailCtrl', [])
//我的
    .controller ('accountDetailCtrl', function ($scope, $state, $rootScope, $ionicPopover, $ionicModal) {
        //筛选
        $scope.btnArrText = [
            {
                btnText : '全部',
                check : true
            },
            {
                btnText : '临时额度',
                check : false
            },
            {
                btnText : '收入',
                check : false
            },
            {
                btnText : '支出',
                check : false
            }
        ];
        
        $ionicModal.fromTemplateUrl ('templates/filtrate.html', {
            scope : $scope
        })
            .then (function (modal) {
                $scope.filtrModal = modal;
            });
        $scope.openFilterModal = function () {
            $scope.filtrModal.show ();
        };
        $scope.closeFilterModal = function() {
            $scope.filtrModal.hide();
        };
        $scope.makeSureFilter = function () {
            $scope.filtrModal.hide();// 确定按钮     暂时做隐藏处理后期根据情况处理
        };
        //给筛选按钮添加点击事件
        $scope.addClassClick = function (item) {
            for (var i = 0; i < $scope.btnArrText.length; i++) {
                $scope.btnArrText[i].check = false;
            }
            if (item.check != true) {
                item.check = true;
            }
            else {
                item.check = false;
            }
        };
        
        //年月份list 日历图标
        $scope.yearAndMonth = [];
        for(var i=1; i < 6; i++){
            $scope.yearAndMonth.push(i);
        }
        $scope.selectList = function  (YM_listNum) {
            console.info(YM_listNum);
            $scope.popover.hide();
        };
        //.fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl ('templates/datePopOver.html', {
            scope : $scope
        })
            .then (function (popover) {
                $scope.popover = popover;
            });
        $scope.openDatePopover = function ($event) {
            $scope.popover.show ($event);
        };
      
      
    });
