angular.module('starter.services', [])

    .factory('$loginService', function ($http, $util) {
        return {
            //注册
            register: function (data) {
                return $util.httpPostRequest($util.getHttpURL().registerUrl, data);
            },
            //登录
            login: function (data,token) {
                return $util.httpPostRequest($util.getHttpURL().loginUrl, data,token);
            }




        };
    })

    .factory('$getInfoService', function ($http, $util) {
        return {
            //获取期号
            getWareIssue: function (data) {
                return $util.httpPostRequest($util.getHttpURL().getWareIssueUrl, data);
            }



        };
    })

    .factory('$bettingService', function ($http, $util) {
        return {
            //投注
            dltadd: function (data) {
                return $util.httpPostRequest($util.getHttpURL().dltaddUrl, data);
            }



        };
    })

    .factory('$getListService', function ($http, $util) {
        return {
            //获取订单投注记录
            getOrderList: function (data) {
                return $util.httpPostRequest($util.getHttpURL().getOrderListUrl, data);
            },

            //获取订单投注详情
            getOrderInfo: function (data) {
                return $util.httpPostRequest($util.getHttpURL().getOrderInfoUrl, data);
            }






        };
    });
