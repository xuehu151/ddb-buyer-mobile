/**
 * Created by admin on 2017/8/17.
 */
angular.module ('starter.orderStatusCtrl', [])
    //订单状态order status
    .controller ('orderStatusCtrl', function ($scope, $http, $util, $getInfoService) {
        $scope.statusList = [];
        $scope.makeSuerBtn = false;
        //$scope.iconClass = ['icon-photos','icon-Winning','icon-TicketCheck','icon-toDraw','icon-putIn];

        var userInfo = $util.getUserInfo ();
        var token = userInfo.token;
        var data = {
            data:{},
            params:{}

        };
        /*$http ({
            method : "POST",
            url : ipUrl + '/buyer/order/getList',
            data : data,
            headers : {
                "Content-Type" : "application/json",
                "Auth-Token": userInfo.data.token
            }
        })*/
        $getInfoService.getOrderList(data, token)
            .then (function (response) {
                var reques = response.data;
                $scope.orderStatus = reques;
                // console.info($scope.orderStatus);
                for (var i = 0; i < reques.length; i++) {
                    $scope.createDate = reques.createDate;
                    var status = reques[i].status;
                    var statusIcon = reques[i];
                    // console.info(status);
                    // console.info(statusIcon);
                    switch (status) {
                        case 1:
                            reques[i].status = '出票中';
                            statusIcon.iconClass = 'icon-toDraw';
                            statusIcon.statusText = '';
                            break;
                        case 2:
                            reques[i].status = '彩店已出票';
                            statusIcon.iconClass = 'icon-TicketCheck';
                            statusIcon.statusText = '请耐心等待店主上传照片';
                            break;
                        case 3:
                            reques[i].status = '未中奖';
                            statusIcon.iconClass = '';
                            statusIcon.statusText = '等待派奖';
                            break;
                        case 4:
                            reques[i].status = '订单已中奖';
                            statusIcon.iconClass = 'icon-Winning';
                            statusIcon.statusText = '等待派奖';
                            break;
                        default:
                            reques[i].status = '已撤单';
                    }

                }

            },function (error) {

            })



    });
