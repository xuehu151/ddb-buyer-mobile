/**
 * Created by admin on 2017/8/3.
 */
angular.module ('starter.accountDetailCtrl', [])
//我的
    .controller ('accountDetailCtrl', function ($scope, $state, $rootScope, $ionicPopover, $ionicModal) {
        //筛选
        $scope.btnArrText = ['全部','临时额度','收入','支出'];
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
    
        $scope.sureFilter = function () {
            $scope.filtrModal.hide();//暂时做隐藏处理
        };
        
        //年月份list
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
