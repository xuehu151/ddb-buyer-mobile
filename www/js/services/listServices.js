/**
 * Created by admin on 2017/9/20.
 */
angular.module ('starter.getListServices', [])

    .factory ('$getListServices', ['$window', '$rootScope', function ($window, $rootScope) {
        var data = {};
    }])
    .service ('PicMethods', ['$rootScope', '$cordovaCamera', '$cordovaImagePicker', '$cordovaFileTransfer', '$ionicLoading', function ($rootScope, $cordovaCamera, $cordovaImagePicker, $cordovaFileTransfer, $ionicLoading, $cordovaToast) {
        //上传照片
        function upImage (imageUrl, token, afterUploadDo) {
            var fileName = imageUrl.substr (imageUrl.lastIndexOf ('/') + 1);
            var url = ipUrl + "/buyer/bill/uploadImg";//服务器地址
            var options = {
                fileKey : 'filedata',
                fileName : fileName,
                mimeType : 'image/jpeg',
                headers : {
                    'Auth-Token' : token
                }
            };

            $ionicLoading.show ({
                template : '<p class="spinner-icon"><ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner><span>上传中...'
            });
            $cordovaFileTransfer.upload (url, imageUrl, options)
                .then (function (result) {
                    var response = JSON.parse (result.response);
                    afterUploadDo (response, imageUrl);
                }, function (error) {
                    $cordovaToast.showShortBottom ('部分图片上传失败' + error);
                    $cordovaToast.showShortBottom (error);
                    $ionicLoading.hide ();
                }, function (progress) {

                });
        }

        //相机
        this.takePhoto = function (token, afterUploadDo) {
            var options = {
                //这些参数可能要配合着使用，比如选择了source type是0，destinationtype要相应的设置
                quality : 100, //相片质量0-100
                destinationType : Camera.DestinationType.FILE_URI, //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI
                sourceType : Camera.PictureSourceType.CAMERA, //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
                allowEdit : true, //在选择之前允许修改截图
                encodingType : Camera.EncodingType.JPEG, //保存的图片格式： JPEG = 0, PNG = 1
                /*targetWidth : 100,                                        //照片宽度
                 targetHeight : 100,  */ //照片高度
                mediaType : 0, //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
                cameraDirection : 0, //前后摄像头类型：Back= 0,Front-facing = 1
                popoverOptions : CameraPopoverOptions,
                saveToPhotoAlbum : true //保存进手机相册
            };
            $cordovaCamera.getPicture (options)
                .then (function (imageData) {
                    upImage (imageData, token, afterUploadDo);
                    $cordovaToast.showShortBottom ('tokephoto');
                }, function (error) {
                    $cordovaToast.showShortBottom (error);
                });
        };
        //选择照片
        this.pickImage = function (token, afterUploadDo) {
            //从相册选择
            var options = {
                maximumImagesCount : 3,
                width : 100,
                height : 100,
                quality : 100
            };
            // 从相册获取照片
            $cordovaImagePicker.getPictures (options)
                .then (function (results) {
                    for (var photo = 0; photo < results.length;photo++) {
                        upImage( results[photo],token,afterUploadDo);
                    }
                }, function (error) {
                    alert (error);
                });
        };
       /* this.downloadFile = function (downloadUrl, downloadSucceed) {
            var filename = downloadUrl.split ('/').pop (); //文件名
            var targetPath = cordova.file.externalRootDirectory + filename; //下载后的文件路劲
            var trustHosts = true; //安全校验,无
            var options = {};
            console.log (downloadUrl);
            $cordovaFileTransfer.download (downloadUrl, targetPath, options, trustHosts).then (function (result) {
                $rootScope.$broadcast (downloadSucceed, result.nativeURL);
            }, function (error) {
                // console.log(error);
                // console.log(JSON.stringify(error));
                // console.log(JSON.parse(error));
                alert ('获取彩店图片失败,请重试' + error);
            }, function (progress) {
                //进度条
                //   $timeout(function () {
                //   $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                // })
            });
        };*/
    }]);
