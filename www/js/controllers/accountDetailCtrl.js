/**
 * Created by admin on 2017/8/3.
 */
angular.module ('starter.accountDetailCtrl', [])
//我的
    .controller ('accountDetailCtrl', function ($scope, $state, $rootScope, $ionicPopover, $ionicModal, $rechargeService, $util) {
        //明细列表
        var imgClass = ['../img/disburse.png', '../img/income.png', '../img/temporary.png'];
        var userInfo = $util.getUserInfo ();
        var token = userInfo.token;
    
        filtrateRecordList(0);
        function filtrateRecordList (typeCount) {
            var data = {
                data : {},
                params : {
                    type : typeCount
                }
            };
            var reques = {};
            $rechargeService.recordList (data, token)
                .then (function (response) {
                    console.info (response);
                    reques = response.data;
                    $scope.detailListItem = reques;
                    for (var i = 0; i < $scope.detailListItem.length; i++) {
                        var hourAndMinute, getDay, yearAndMonth;
                        
                        $rootScope.createDate = $scope.detailListItem[i].createDate;
                        $scope.filtrateType = $scope.detailListItem[i].type;
                        //console.info ($scope.filtrateType);
                        
                        $scope.money = $scope.detailListItem[i].money;   //金额 提现 充值等
                        yearAndMonth = $rootScope.createDate.split (' ')[0];
                        hourAndMinute = $rootScope.createDate.split (' ')[1];
                        $scope.detailListItem[i].createDate = hourAndMinute.slice (0, 5);
                        //计算周几
                        getDay = $util.getWeekByDay ($rootScope.createDate);//判断周几
                        if ($util.getDateStr (0) == yearAndMonth) {
                            $scope.detailListItem[i].getDayDate = '今天';
                        }
                        else if ($util.getDateStr (-1) == yearAndMonth) {
                            $scope.detailListItem[i].getDayDate = '昨天';
                        }
                        else if ($util.getDateStr (-2) == yearAndMonth) {
                            $scope.detailListItem[i].getDayDate = '前天';
                        }
                        else {
                            $scope.detailListItem[i].getDayDate = getDay;
                        }
                        //console.info(yearAndMonth);
                        switch ( $scope.detailListItem[i].type ) { //0全部 1充值 2提现 3投注 4出票失败退款
                            case 1:
                                $scope.detailListItem[i].detailType = '充值';
                                $scope.detailListItem[i].imgClass = imgClass[1];
                                $scope.detailListItem[i].plusMinus = '+';
                                break;
                            case 2:
                                $scope.detailListItem[i].detailType = '提现';
                                $scope.detailListItem[i].imgClass = imgClass[2];
                                $scope.detailListItem[i].plusMinus = '-';
                                break;
                            case 3:
                                $scope.detailListItem[i].detailType = '购彩支出';
                                $scope.detailListItem[i].imgClass = imgClass[0];
                                $scope.detailListItem[i].plusMinus = '-';
                                break;
                            case 4:
                                $scope.detailListItem[i].detailType = '临时额度';
                                $scope.detailListItem[i].imgClass = imgClass[2];
                                $scope.detailListItem[i].plusMinus = '+';
                                break;
                            default:
                        }
                        //进入详情页面
                        $scope.goToMineDetails = function (index) {
                            console.info (index);
                            $state.go ('mineDetails');
                        };
//                    recordDetails ($scope.detailListItem[i].id);
                    }
    
                    //年月份list 日历图标
                    $scope.yearAndMonth = [];
                    for (var i = 1; i < 12; i++) {
                        $scope.yearAndMonth.push (i);
                    }
                }, function (error) {
                    //...
                });
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
                    console.info (response);
                }, function (error) {
                    //....
                })
        }
        
        //筛选
        $scope.btnArrText = [
            {
                btnText : '全部',
                count : 0,
                check : true
            },
            {
                btnText : '临时额度',
                count : 1,
                check : false
            },
            {
                btnText : '收入',
                count : 2,
                check : false
            },
            {
                btnText : '支出',
                count : 3,
                check : false
            }
        ];
        
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
            
            $scope.makeSureFilter = function () {// 确定按钮
                $scope.filtrModal.hide ();
                switch ( item.count ) {//0全部 1临时额度(退款4) 2收入(充值1)  3支出(提现2、彩金支出3)
                    case 1:
                        filtrateRecordList(4);
                        break;
                    case 2:
                        filtrateRecordList(1);
                        break;
                    case 3:
                        filtrateRecordList(3);
                        break;
                    default:
                        filtrateRecordList(0);
                }
            };
        };
        //日历点击事件
        $scope.selectList = function (YM_listNum) {
            console.info (YM_listNum);
            $scope.popover.hide ();
            
            console.info($scope.detailListItem[i].createDate);
           
        };
        
        //年月份模态框
        $ionicPopover.fromTemplateUrl ('templates/datePopOver.html', {
            scope : $scope
        })
            .then (function (popover) {
                $scope.popover = popover;
            });
        $scope.openDatePopover = function ($event) {
            $scope.popover.show ($event);
        };
        
        //筛选模态框
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
        $scope.makeSureFilter = function () {// 确定按钮 当按钮不被点击时点击确定 隐藏就好
            $scope.filtrModal.hide ();
        }
        
    });
