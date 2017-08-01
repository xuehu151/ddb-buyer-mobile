/**
 * Created by admin on 2017/7/28.
 */
angular.module ('starter.rechargeCtrl', [])
    //充值
    .controller ('rechargeCtrl', function ($scope, $state, $rootScope, $cordovaCamera) {
        $scope.RechargeMoney = {money:''};
        $scope.Recharge = true; //控制提现提交按钮disable
    
        $scope.RechargeOK = function () {
            if ($scope.RechargeMoney.money > 0 ) {
                $scope.Recharge = false;
            }else {
                $scope.Recharge = true;
            }
        };
        //拍照
        /*$scope.pickImage = function () {
            console.log("haha");
            var options = {
                maximumImagesCount: 9,
                width: 800,
                height: 800,
                quality: 80
            };
            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                    console.log(results);
                    
                    for (var i = 0; i < results.length; i++) {
                        console.log('Image URI: ' + results[i]);
                    }
                    
                    $scope.imgSrc = results[0];
                }, function (error) {
                    // error getting photos
                });
        };*/
        $scope.pickImage = function () {
            document.addEventListener ("deviceready", function () {
                var options = {
                    quality : 50,
                    destinationType : Camera.DestinationType.DATA_URL,
                    sourceType : Camera.PictureSourceType.CAMERA,
                    allowEdit : true,
                    encodingType : Camera.EncodingType.JPEG,
                    targetWidth : 100,
                    targetHeight : 100,
                    popoverOptions : CameraPopoverOptions,
                    saveToPhotoAlbum : false,
                    correctOrientation : true
                };
        
                $cordovaCamera.getPicture (options)
                    .then (function (imageData) {
                        alert (22131);
                        var image = document.getElementById ('myImage');
                        image.src = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // error
                    });
        
            }, false);
        };
        //充值确定按钮
        $scope.RechargeSure = function () {
        
        };
        
        $scope.groups = [];//将来作为失败的多个凭证数组
        for (var i = 0; i < 1; i++) {//循环列表
            $scope.groups[i] = {
                items : []
            };
        }
        $scope.toggleGroup = function (group) {//循环渲染出的列表实现折叠和收缩效果
            if ($scope.isGroupShown (group)) {
                $scope.shownGroup = null;
            }
            else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };
    

        
        
        
        
        
        
        
        
        
        
        
        
        
    });
