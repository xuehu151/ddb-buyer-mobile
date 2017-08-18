/**
 * Created by admin on 2017/8/17.
 */
angular.module ('starter.orderStatusCtrl', [])
    //订单状态order status
    .controller ('orderStatusCtrl', function ($scope, $http, $util) {
        $scope.statusList = [];
        $scope.makeSuerBtn = false;
        //$scope.iconClass = ['icon-photos','icon-Winning','icon-TicketCheck','icon-toDraw','icon-putIn];
    
        var userInfo = $util.getUserInfo ();
        var data = {
        
        };
        $http ({
            method : "POST",
            url : ipUrl + '/buyer/order/getList',
            data : data,
            headers : {
                "Content-Type" : "application/json",
                "Auth-Token": userInfo.data.token
            }
        })
            .then (function (response) {
                var reques = response.data;
                $scope.orderStatus = reques.data;
                console.info ($scope.orderStatus);
                for (var i = 0; i < reques.data.length; i++) {
                    $scope.createDate = reques.data[i].createDate;
                    var status = reques.data[i].status;
                    var statusIcon = reques.data[i];
                    switch(status){
                        case 1:
                            reques.data[i].status = '出票中';
                            statusIcon.iconClass = 'icon-toDraw';
                            statusIcon.statusText = '';
                            break;
                        case 2:
                            reques.data[i].status = '彩店已出票';
                            statusIcon.iconClass = 'icon-TicketCheck';
                            statusIcon.statusText = '请耐心等待店主上传照片';
                            break;
                        case 3:
                            reques.data[i].status = '未中奖';
                            statusIcon.iconClass = '';
                            statusIcon.statusText = '等待派奖';
                            break;
                        case 4:
                            reques.data[i].status = '订单已中奖';
                            statusIcon.iconClass = 'icon-Winning';
                            statusIcon.statusText = '等待派奖';
                            break;
                        default:
                            reques.data[i].status = '已撤单';
                    }
                    
                    /*if(reques.error == '0'){
                        reques.data[i].status = '订单已提交';
                        statusIcon.iconClass = 'icon-putIn';
                        statusIcon.statusText = '请耐心等待投注站出票';
                    }*/
                    
                }
                
                
                
                
            },function (error) {
            
            })
        
        
        
    });
