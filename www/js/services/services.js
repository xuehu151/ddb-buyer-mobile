angular.module('starter.services', [])

    .factory('$loginService', function ($http, $util) {
        return {
            //注册
            register: function (data, token) {
                return $util.httpPostRequest($util.getHttpURL().registerUrl, data, token);
            },
            //登录
            login: function (user, token) {
                return $util.httpPostRequest($util.getHttpURL().loginUrl, user, token);
            }




        };
    })

    .factory('$getInfoService', function ($http, $util) {
        return {
            //获取期号
            getWareIssue: function (data, token) {
                return $util.httpPostRequest($util.getHttpURL().getWareIssueUrl, data, token);
            },

            //获取投注记录
            getOrderList: function (data, token) {
                return $util.httpPostRequest($util.getHttpURL().getOrderListUrl, data, token);
            },

            //获取投注详情
            getOrderInfo: function (data, token) {
                return $util.httpPostRequest($util.getHttpURL().getOrderInfoUrl, data, token);
            }


        };
    })

    .factory('$bettingService', function ($http, $util) {
        return {
            //投注
            dltadd: function (data, token) {
                return $util.httpPostRequest($util.getHttpURL().dltaddUrl, data, token);
            }



        };
    })

    .factory('$getListService', function ($http, $util) {
        return {
            //获取订单投注记录
            getOrderList: function (data, token) {
                return $util.httpPostRequest($util.getHttpURL().getOrderListUrl, data, token);
            },

            //获取订单投注详情
            getOrderInfo: function (data, token) {
                return $util.httpPostRequest($util.getHttpURL().getOrderInfoUrl, data, token);
            }






        };
    });
