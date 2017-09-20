/**
 * Created by admin on 2017/7/25.
 */

angular.module ('starter.registerCtrl', [])
//注册
    .controller ('registerCtrl', function ($scope, $state, $http, $ionicLoading, $util, $cordovaToast, $loginService) {
        $scope.userInfo = {
            userName : "",
            password : "",
            rePassword : ""
        };
        
        $scope.sureNextStep = function () {
            
            var data = {
                data : {
                    account : $scope.userInfo.userName,
                    password : $scope.userInfo.password,
                    shopId : 1
                },
                params : {}
            };
            console.info (data);
            
            if ($scope.userInfo.userName == '' || $scope.userInfo.userName.length < 6) {
                $cordovaToast.showShortCenter ("请输入账号");
                return
            }
            else if ($scope.userInfo.password == '') {
                $cordovaToast.showShortCenter ("请输入密码");
                return
            }
            else if ($scope.userInfo.rePassword == '') {
                $cordovaToast.showShortCenter ("请再次输入密码");
                return
            }
            else if ($scope.userInfo.password != $scope.userInfo.rePassword) {
                $cordovaToast.showShortCenter ("两次密码不一致");
                return
            }
            else {
                register ();
            }
            //调取注册接口
            function register () {
                $loginService.register (data)
                    .then (function (response) {
                        $cordovaToast.showShortCenter ("注册成功,请登录!");
                        $state.go ('signin');
//                        $state.go ('verify');
                    }, function (error) {
                        $cordovaToast.showShortCenter ("注册失败,请重试!");
                    });
            }
            
        };
        
        
    });
