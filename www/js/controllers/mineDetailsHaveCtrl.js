/**
 * Created by admin on 2017/9/20.
 */
angular.module ('starter.mineDetailsHaveCtrl', [])
//我的
    .controller ('mineDetailsHaveCtrl', function ($scope, $state, $rootScope, $ionicPopover, $ionicModal, $rechargeService, $util) {
        $scope.toggleGroup = function () {//循环渲染出的列表实现折叠和收缩
            if ($scope.isGroupShown ()) {
                $scope.shownGroup = null;
            }
            else {
                $scope.shownGroup = '';
            }
        };
        $scope.isGroupShown = function () {
            return $scope.shownGroup === '';
        };
    
        var userInfo = $util.getUserInfo ();
        var token = userInfo.token;
        var data = {
            data :{},
            params :{
                id : $rootScope.billDetailsId
            }
        };
        $rechargeService.getBillInfo (data, token)
            .then (function (response) {
                console.info(response);
            },function (error) {
            
            });
        
        
    });
