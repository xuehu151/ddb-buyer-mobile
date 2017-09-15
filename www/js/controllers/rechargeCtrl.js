/**
 * Created by admin on 2017/7/28.
 */
angular.module ('starter.rechargeCtrl', [])
//充值
    .controller ('rechargeCtrl', function ($scope, $state, $rootScope, $cordovaImagePicker, $rechargeService, $util, $ionicLoading, $cordovaToast, $ionicPopup, $interval, $ionicActionSheet, $cordovaCamera, $cordovaFileTransfer, $timeout) {
        $scope.rechargeMoney = {
            money : ''
        };
        $scope.Recharge = true; //控制提现提交按钮disable
        $scope.RechargeOK = function () {
            if ($scope.rechargeMoney.money > 0) {
                $scope.Recharge = false;
            }
            else {
                $scope.Recharge = true;
            }
        };
        
        //充值确定按钮
        $rootScope.describe = '';//文字提示
        $rootScope.signIconStatus = false;//标识图标
        
        $scope.toggleGroup = function () {
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
        
        //拍照
        $scope.picture = function () {
            $ionicActionSheet.show ({
                buttons : [
                    { text : '相机' },
                    { text : '从相册选择' }
                ],
                cancelText : '关闭',
                cancel : function () {
                    return true;
                },
                buttonClicked : function (index) {
                    switch ( index ) {
                        case 0:
                            takePhoto ();//相机
                            break;
                        case 1:
                            pickImage ();//从相册选择
                            break;
                        default:
                            break;
                    }
                    return true;
                }
            });
        };
        //image picker
        $scope.images_list = [];
        var pickImage = function () {//从相册选择
            var options = {
                maximumImagesCount : 3,
                width : 100,
                height : 100,
                quality : 80
            };
            /*从相册获取照片*/
            $cordovaImagePicker.getPictures (options)
                .then (function (results) {
    
                    for (var i = 0; i < results.length; i++) {
                        $scope.images_list.push (results[i]);
                        $scope.imageSrc = results[i];
                        upImage (results[i]);
                    }
                    $scope.imgDelete = function (index) {
                        $scope.images_list.splice(index,1);
                    }
                }, function (error) {
                    // error getting photos
                });
            
        };
        var takePhoto = function () {//相机
            var options = {
                //这些参数可能要配合着使用，比如选择了source type是0，destinationtype要相应的设置
                quality : 100,                                            //相片质量0-100
                destinationType : Camera.DestinationType.FILE_URI,  //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI
                sourceType : Camera.PictureSourceType.CAMERA,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
                allowEdit : true,                                        //在选择之前允许修改截图
                encodingType : Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
                targetWidth : 100,                                        //照片宽度
                targetHeight : 100,                                       //照片高度
                mediaType : 0, //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
                cameraDirection : 0,                                       //前后摄像头类型：Back= 0,Front-facing = 1
                popoverOptions : CameraPopoverOptions,
                saveToPhotoAlbum : true                                   //保存进手机相册
            };
            $cordovaCamera.getPicture (options)
                .then (function (imageData) {
//                    var image = document.getElementById ('myImage');
//                    image.src = imageData;
                    $scope.images_list.push (imageData);
                    $scope.imageSrc = imageData;
                    $scope.imgDelete = function (index) {
                        $scope.images_list.splice(index,1);
                    };
                    //image.src = "data:image/jpeg;base64," + imageData;
                    upImage (imageData);
                }, function (err) {
                    // error
                });
        };
        
        //图片上传upImage（图片路径）
        //http://ngcordova.com/docs/plugins/fileTransfer/  资料地址
        var upImage = function (imageUrl) {
            document.addEventListener ('deviceready', function () {
                var url = "http://192.168.1.248/api/UserInfo/PostUserHead";//服务器地址
                var options = {};
                /*$cordovaFileTransfer.upload (url, imageUrl, options)
                    .then (function (result) {
                        alert (JSON.stringify (result.response+"********"));
                        alert ("success");
                        alert (result.message+'lfnlsdfnfdfs');
                    }, function (err) {
                        alert (JSON.stringify (err)+'0000000000000000');
                        alert (err.message+'-----------------------');
                        alert ("fail");
                    }, function (progress) {
                        // constant progress updates
                    });*/
                
            }, false);
            
        };
        //确认提交
        $scope.recharge = {
            remarks : ""
        };
        $scope.RechargeSure = function () {
//            $cordovaToast.showShortBottom ('充值申请已提交')
            var alertPopup = $ionicPopup.alert ({
                template : '<div style="text-align:center">充值申请已提交</div>',
                title : '<i class="icon ion-ios-checkmark-outline" style="font-size:26px"></i>'
            })
                .then (function (success) {
                    $ionicLoading.show ();
                    var userInfo = $util.getUserInfo ();
                    var token = userInfo.token;
                    var data = {
                        data : {},
                        params : {
                            money : $scope.rechargeMoney.money,
                            customerRemark : $scope.recharge.remarks,
                            filedata : ''
                        }
                    };
                    console.info(data);
                    $rechargeService.recharge (data, token)
                        .then (function (response) {
                            $ionicLoading.hide ();
                            console.info (response);
                        
                            if (response.error == '0') {
                                $rootScope.describe = '恭喜您，充值成功';
                                $rootScope.signIconStatus = true;
                                $cordovaToast.showShortBottom ('充值成功');
                                /*  测试浏览器*/
                                $state.go ('rechargeSuccess');
                            }
                            else {
                                $rootScope.describe = '充值申请已提交成功，等待店主审核';
                                $rootScope.signIconStatus = false;
                                $cordovaToast.showShortBottom (response.info);
                                /*  测试浏览器*/
                                $state.go ('rechargeSuccess');
                            }
                        
                        }, function (error) {
                            //....
                        })
                }, function (error) {
                    //.....
                });
        };
        
        
    });
