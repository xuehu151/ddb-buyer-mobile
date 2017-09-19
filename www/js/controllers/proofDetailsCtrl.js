/**
 * Created by admin on 2017/9/19.
 */

angular.module ('starter.proofDetailsCtrl', [])
//订单状态order status
    .controller ('proofDetailsCtrl', function ($scope, $state, $http, $util, $rootScope) {
        var userInfo = $util.getUserInfo ();

        $scope.accountInfo = {
            userHead : userInfo.customer.headImg,
            realName : userInfo.customer.realName,
            cashMoney : $rootScope.money
        };

    });
