/**
 * Created by admin on 2017/8/3.
 */
angular.module ('starter.accountDetailCtrl', [])
//我的
    .controller ('accountDetailCtrl', function ($scope, $state, $rootScope, $ionicPopover, $ionicModal, $rechargeService, $util) {
        //筛选
        $scope.btnArrText = [
            {
                btnText : '全部',
                check : true
            },
            {
                btnText : '临时额度',
                check : false
            },
            {
                btnText : '收入',
                check : false
            },
            {
                btnText : '支出',
                check : false
            }
        ];
        
        $ionicModal.fromTemplateUrl ('templates/filtrate.html', {
            scope : $scope
        })
            .then (function (modal) {
                $scope.filtrModal = modal;
            });
        
        $scope.openFilterModal = function () {
            $scope.filtrModal.show ();
        };
        $scope.closeFilterModal = function () {
            $scope.filtrModal.hide ();
        };
        $scope.makeSureFilter = function () {
            $scope.filtrModal.hide ();// 确定按钮     暂时做隐藏处理后期根据情况处理
        };
        
        //给筛选按钮添加点击事件
        $scope.addClassClick = function (item) {
            for (var i = 0; i < $scope.btnArrText.length; i++) {
                $scope.btnArrText[i].check = false;
            }
            if (item.check != true) {
                item.check = true;
            }
            else {
                item.check = false;
            }
        };
        
        //年月份list 日历图标
        $scope.yearAndMonth = [];
        for (var i = 1; i < 6; i++) {
            $scope.yearAndMonth.push (i);
        }
        $scope.selectList = function (YM_listNum) {
            console.info (YM_listNum);
            $scope.popover.hide ();
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
        //明细列表
        var imgClass = ['../img/disburse.png', '../img/income.png', '../img/temporary.png'];
        var userInfo = $util.getUserInfo ();
        var token = userInfo.token;
        var data = {
            data : {},
            params : {
                type : 0
            }
        };
        
        var reques = {};
        $rechargeService.recordList (data, token)
            .then (function (response) {
                reques = response.data;
                $scope.detailListItem = reques;
                var now = new Date();
                var nowDateDay = now.getTime();//当前时间的毫秒
                //var format = $util.formatDate(now);
                for (var i = 0; i < reques.length; i++) {
                    var createDate,hourAndMinute, getDay, oneDay, getCreateDate, gain, leftTime;
                    createDate = reques[i].createDate;
                    
                    $scope.money = reques[i].money;//金额 提现 充值等
                    hourAndMinute = createDate.split (' ')[1];
                    reques[i].createDate = hourAndMinute.slice (0, 5);
                   
                    //计算周几
                    getDay = getWeekByDay (createDate);//判断周几
                    gain = new Date(createDate);
                    getCreateDate = gain.getTime();//获得的时间的毫秒
                    oneDay = 1000 * 60 * 60 * 24;   //保存常量一天
                    leftTime = nowDateDay - getCreateDate;//计算时间差
                    if (nowDateDay - getCreateDate <= oneDay) {
                        reques[i].getDayDate = '今天';
                    }
                    else if (nowDateDay - oneDay <= getCreateDate) {
                        reques[i].getDayDate = '昨天';
                    }
                    else if (nowDateDay - oneDay * 2 <= getCreateDate) {
                        reques[i].getDayDate = '前天';
                    }
                    else {
                        reques[i].getDayDate = getDay;
                    }
                    console.info(createDate);
                    
                    switch ( reques[i].type ) { //0全部 1充值 2提现 3投注 4出票失败退款
                        case 1:
                            reques[i].detailType = '充值';
                            reques[i].imgClass = imgClass[1];
                            reques[i].plusMinus = '+';
                            break;
                        case 2:
                            reques[i].detailType = '提现';
                            reques[i].imgClass = imgClass[2];
                            reques[i].plusMinus = '-';
                            break;
                        case 3:
                            reques[i].detailType = '购彩支出';
                            reques[i].imgClass = imgClass[0];
                            reques[i].plusMinus = '-';
                            break;
                        case 4:
                            reques[i].detailType = '临时额度';
                            reques[i].imgClass = imgClass[2];
                            reques[i].plusMinus = '+';
                            break;
                        default:
                        
                    }
                    
                    recordDetails (reques[i].id);
                }
            }, function (error) {
                //...
            });
        //根据日期 得到是周几
        function getWeekByDay (hourAndMinute) { //dayValue=“2014-01-01”
            var day = new Date (Date.parse (hourAndMinute)); //将日期值格式化
            var today = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]; //创建周数组
            return today[day.getDay ()];  //返一个周中的某一天，其中0为周日
        }
        
        function recordDetails (orderId) {
            var data = {
                data : {},
                params : {
                    id : orderId
                }
            };
            $rechargeService.recordDetails (data, token)
                .then (function (response) {
                    //console.info(response);
                }, function (error) {
                    //....
                })
        }
        
        
        
        
    });
