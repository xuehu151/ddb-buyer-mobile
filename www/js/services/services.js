angular.module('starter.services', [])

    .factory('$loginService', function ($http, $util) {
        return {
            //注册
            register: function (data) {
                return $util.httpPostRequest($util.getHttpURL().registerUrl, data);
            },
            //登录
            login: function (data) {
                return $util.httpPostRequest($util.getHttpURL().registerUrl, data);
            }
        
            
            
            
            
            
            
            
            
            
            
        };
    });
