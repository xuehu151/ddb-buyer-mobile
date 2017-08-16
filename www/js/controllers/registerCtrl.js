/**
 * Created by admin on 2017/7/25.
 */
//var ipUrl = 'http://192.168.1.109:8080';
var ipUrl = 'http://121.42.253.149:18818';
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
                account : $scope.userInfo.userName,
                password : $scope.userInfo.password,
                shopId : 1
            };
            
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
            } else if ($scope.userInfo.password != $scope.userInfo.rePassword) {
                $cordovaToast.showShortCenter ("两次密码不一致");
                return
            }
            else {
                register();
            }
            //调取注册接口
            function register () {
                $ionicLoading.show ({
                    template: 'Loading...'
                });
                $http ({
                    method : "POST",
                    url : ipUrl + '/buyer/auth/regist',
                    data : data,
                    headers : {
                        "Content-Type" : "application/json;charset=utf-8"
                    }
                })
                // $loginService.register (data)
                    .then (function (response) {
                        $ionicLoading.hide ();
                        console.log (response);
                        
                        $cordovaToast.showShortCenter ("注册成功,请登录!");
                        $state.go ('signin');
//                        $state.go ('verify');
                    }, function (error) {
                        $ionicLoading.hide ();
                        $cordovaToast.showShortCenter ("注册失败,请重试!");
                    });
            }
           
        };
        
        
    });
