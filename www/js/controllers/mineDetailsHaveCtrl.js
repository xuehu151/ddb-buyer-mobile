/**
 * Created by admin on 2017/9/20.
 */
angular.module ('starter.mineDetailsHaveCtrl', [])
//我的
    .controller ('mineDetailsHaveCtrl', function ($scope, $state, $rootScope, $ionicPopover, $ionicModal, $rechargeService, $util) {
        $scope.toggleGroup = function () {//循环渲染出的列表实现折叠和收缩
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
    
        var userInfo = $util.getUserInfo ();
        var token = userInfo.token;
        var data = {
            data :{},
            params :{
                id : $rootScope.billDetailsId
            }
        };
        $rechargeService.getBillInfo (data, token)
            .then (function (response) {
                console.info(response);
                switch (response.data.type ){
                    case 1:
                        switch (response.data.status){
                            case -1:
                                $scope.dealStatus = '审核不通过';
                                break;
                            case 1:
                                $scope.dealStatus = '交易成功';
                                break;
                            default:
                                $scope.dealStatus = '等待审核';
                        }
                        break;
                    case 2://提现
                        switch (response.data.status){
                            case -1:
                                $scope.dealStatus = '审核不通过';
                                break;
                            case 1:
                                $scope.dealStatus = '交易成功';
                                break;
                            default:
                                $scope.dealStatus = '等待审核';
                        }
                        break;
                    case 3://购彩支出
                        $scope.dealStatus = '交易成功';
                        break;
                    default:
                }
                $scope.detailsInfo = {
                    money : response.data.money,
                    createDate : response.data.createDate,
                    ticketID : response.data.ticketID,
                    customerImg :response.data.customerImg,
                    detailType : $rootScope.detailType,
                    plusMinus : $rootScope.plusMinus,
                    dealStatus  : $scope.dealStatus
                };
            },function (error) {
            
            });
        
        
    });
