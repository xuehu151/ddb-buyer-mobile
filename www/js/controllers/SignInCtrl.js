/**
 * Created by admin on 2017/7/24.
 */
//var ipUrl = 'http://192.168.1.109:8080';
var ipUrl = 'http://121.42.253.149:18818';

angular.module ('starter.SignInCtrl', [])
//登录
    .controller ('SignInCtrl', function ($scope, $state, $ionicPopup, $ionicLoading, $http, $cordovaToast, $util, $loginService) {

        $scope.users = {
            userName : "liqiang",
            password : "000000"
        };

        $scope.signIn = function (user) {

            var data = {
               data:{
                   account : $scope.users.userName,
                   password : $scope.users.password
               },
                params:{
                   //.......
                }
            };
            
            console.info(typeof $scope.users.userName);
            if ($scope.users.userName == '' || $scope.users.userName == undefined) {
                $cordovaToast.showShortCenter ("请输入账号");
                return
            }
            else if($scope.users.password == '' || $scope.users.password == undefined){
                $cordovaToast.showShortCenter ("请输入密码");
                return
            }

            $ionicLoading.show ({
                template: 'Loading...'
            });

            $loginService.login (data)
                .then (function (response) {
                    console.info(response);
                    $ionicLoading.hide ();
                    var setUserInfo = $util.setUserInfo (response.data);
                    var userInfo = $util.getUserInfo ();
                    console.info (userInfo);
                    if(response.error == '0'){
                        $state.go ('tab.home');
                        $cordovaToast.showShortBottom ("登陆成功");
                    }else {
                        $cordovaToast.showShortCenter (response.info);
                    }
                }, function (error) {
                    $cordovaToast.showShortCenter ("登陆失败，请重试!");
                    $ionicLoading.hide ();
                });
        };
    });
