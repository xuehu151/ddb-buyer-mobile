/**
 * Created by admin on 2017/7/25.
 */
//var ipUrl = 'http://192.168.1.109:8889';
var ipUrl = 'http://121.42.253.149:18818';
angular.module ('starter.registerCtrl', [])
//注册
    .controller ('registerCtrl', function ($scope, $state, $http, $ionicLoading, $util, $cordovaToast) {
        
        $scope.userInfo = {
            userName : "",
            password : "",
            rePassword : ""
        };
        $scope.sureNextStep = function () {
            $ionicLoading.show ();
            var data = {
                account : $scope.userInfo.userName,
                password : $scope.userInfo.password,
                shopId : 1
            };
            $http ({
                method : "POST",
                url : ipUrl + '/buyer/auth/regist',
                data : data,
                headers : {
                    "Content-Type" : "application/json"
                }
            })
            //            $loginService.register (data)
                .then (function (response) {
                    $ionicLoading.hide ();
                    $cordovaToast.showLongBottom ("登录成功");
                    console.log (response);
                    var users = $util.setUserInfo (response.data);
                    var userInfo = $util.getUserInfo ();
                    console.info (userInfo);
                    
                    if ($scope.userInfo.userName == '' || $scope.userInfo.userName.length < 6) {
                        $cordovaToast.showShortCenter ("请输入账号");
                        return
                    }
                    else if ($scope.userInfo.password == '') {
                        $cordovaToast.showShortCenter ("请输入密码");
                        return
                    }
                    else if ($scope.userInfo.rePassword == '') {
                        $cordovaToast.showShortCenter ("请输入密码");
                        return
                    } else if ($scope.userInfo.password != $scope.userInfo.rePassword) {
                        $cordovaToast.showShortCenter ("两次密码不一致");
                        return
                    }
                    else {
                        $state.go ('verify');
                    }
                    
                    
                    
                }, function (error) {
                    $cordovaToast.showShortCenter ("数据加载失败");
                    $ionicLoading.hide ();
                });
    
            /*$http.get (url + "?action=register", {
                withCredentials : true,
                params : {
                    "useraccount" : $scope.userInfo.userName,
                    "userpassword" : $scope.userInfo.password
                }
            })
                .success (function (data) {
                    $ionicLoading.hide ();
                    console.log (data);
                    if (true == data.type) {
                        //alert("注册成功，请登录")
                        var alertPopup = $ionicPopup.alert ({
                            template : '注册成功，请登录',
                            okText : "确定"
                        });
                        $state.go ('signin');
                    }
                    else {
                        var alertPopup = $ionicPopup.alert ({
                            template : data.msg,
                            okText : "确定"
                        });
                    }
                })
                .error (function (data) {
                    $ionicLoading.hide ();
                    alert ("error");
                });*/
        };
        
        
    });
