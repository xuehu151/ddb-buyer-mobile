/**
 * Created by admin on 2017/8/3.
 */
angular.module ('starter.accountDetailCtrl', [])
//我的
    .controller ('accountDetailCtrl', function ($scope, $state, $rootScope, $ionicPopover, $ionicModal, $rechargeService, $util, $cordovaToast) {
        //明细列表
        var imgClass = ['../img/disburse.png', '../img/income.png', '../img/temporary.png'];
        var userInfo = $util.getUserInfo ();
        var token = userInfo.token;
        var pageSize = 8;
        var pageNumber = 1;
        
        filtrateRecordList(0);
        function filtrateRecordList (typeCount) {
            $scope.hasMore = true;
            $scope.detailListItem = [];
            $scope.loadMore = function () {
                data = {
                    data : {},
                    params : {
                        type : typeCount,
                        pageSize : pageSize,
                        pageNumber : pageNumber,
                        startDate : '',
                        endDate : ''
                    }
                };
                loadajax ();
            };
            function loadajax () {
                var reques = {};
                $rechargeService.getBillList (data, token)
                    .then (function (response) {
                        console.info (response);
                        reques = response.data;
                        //$scope.detailListItem = reques;
                        if (response.data.length >= pageSize && response.error == '0' ) {
                            $scope.detailListItem = $scope.detailListItem.concat (response.data);
                            for (var i = 0; i < $scope.detailListItem.length; i++) {
                                var hourAndMinute, getDay, yearAndMonth;
        
                                $scope.createDate = $scope.detailListItem[i].createDate;
                                $scope.filtrateType = $scope.detailListItem[i].type;
                                $scope.money = $scope.detailListItem[i].money;   //金额 提现 充值等
                                
                                yearAndMonth = $scope.detailListItem[i].createDate.split (' ')[0];
                                hourAndMinute = $scope.detailListItem[i].createDate.split (' ')[1];
                                if (hourAndMinute) {
                                    $scope.detailListItem[i].createDate = hourAndMinute.substr (0, 5);
                                }
                                //$scope.detailListItem[i].createDate = yearAndMonth;
                                
                                //计算周几
                                getDay = $util.getWeekByDay ($scope.createDate);//判断周几
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
                                $scope.goToMineDetails = function (billDetailsId, detailType, plusMinus) {
                                    $rootScope.billDetailsId = billDetailsId;
                                    $rootScope.detailType = detailType;
                                    $rootScope.plusMinus = plusMinus;
                                    $state.go ('mineDetailsHave');
                                };
                                //recordDetails ($scope.detailListItem[i].id);
                            }
                            pageNumber++;
                        }
                        else {
                            $scope.hasMore = false;
                            $cordovaToast.showShortBottom ("暂无更多");
                        }
                        $scope.$broadcast ('scroll.refreshComplete');
                        $scope.$broadcast ('scroll.infiniteScrollComplete');
    
                        //年月份list 日历图标
                        $scope.yearAndMonthDate = [];
                        if(yearAndMonth){
                            for (var i = 1; i < yearAndMonth.length; i++) {
                                $scope.yearAndMonthDate[i] = i;
                            }
                        }
                        //日历点击事件
                        $scope.selectList = function (YM_listNum) {
                            $scope.popover.hide ();
                            $scope.YM_list = YM_listNum;
                
//                            if($scope.YM_list){
//                                startDate = yearAndMonth;
//                                filtrateRecordList (0, startDate)
//                            }
                            console.info($scope.YM_list);
                        };
            
                    }, function (error) {
                        //...
                    });
            }
        }
    
        $scope.doRefresh = function () {
            pageNumber = 1;
            $scope.detailListItem = [];
            $scope.loadMore ();
        };
    
    
       /* function recordDetails (orderId) {
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
        }*/
        
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
        
        //给筛选模态框添加点击事件
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
                        $scope.doRefresh();
                        break;
                    case 2:
                        filtrateRecordList(1);
                        $scope.doRefresh();
                        break;
                    case 3:
                        filtrateRecordList(3);
//                        filtrateRecordList(2);
                        $scope.doRefresh();
                        break;
                    default:
                        filtrateRecordList(0);
                        $scope.doRefresh();
                }
            };
     
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
        $scope.makeSureFilter = function () {// 确定按钮 当按钮不被点击时点击确定 隐藏
            $scope.filtrModal.hide ();
        }
        
    });
