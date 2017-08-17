angular.module('starter.services', [])

    .factory('$loginService', function ($http, $util) {
        return {
            //注册
            register: function (data) {
                return $util.httpPostRequest($util.getHttpURL().registerUrl, data);
            },
            //登录
            login: function (data) {
                return $util.httpPostRequest($util.getHttpURL().loginUrl, data);
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
            //获取期号
            dltadd: function (data) {
                return $util.httpPostRequest($util.getHttpURL().dltaddUrl, data);
            }
            
            
            
        };
    });
