/**
 * Created by admin on 2017/7/24.
 */
angular.module ('starter.SignInCtrl', [])
//登录
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
    });
