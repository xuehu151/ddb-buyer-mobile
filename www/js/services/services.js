angular.module ('starter.services', [])
    
    .factory ('locals', ['$window', function ($window) {
        return {
            //存储单个属性
            set : function (key, value) {
                $window.localStorage[key] = value;
            },
            //读取单个属性
            get : function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            //存储对象，以JSON格式存储
            setObject : function (key, value) {
                $window.localStorage[key] = JSON.stringify (value);
            },
            //读取对象
            getObject : function (key) {
                return JSON.parse ($window.localStorage[key] || '{}');
            }
        }
    }])
    
    .factory ('$loginService', function ($http, $util) {
        return {
            //注册
            register : function (data, token) {
                return $util.httpPostRequest ($util.getHttpURL ().registerUrl, data, token);
            },
            //登录
            login : function (user, token) {
                return $util.httpPostRequest ($util.getHttpURL ().loginUrl, user, token);
            }
            //手机验证
            
            //忘记密码
            
            
            
        };
    })
    //订单相关
    .factory ('$getInfoService', function ($http, $util) {
        return {
            //获取期号
            getWareIssue : function (data, token) {
                return $util.httpPostRequest ($util.getHttpURL ().getWareIssueUrl, data, token);
            },
            
            //获取投注记录
            getList : function (data, token) {
                return $util.httpPostRequest ($util.getHttpURL ().getListUrl, data, token);
            },
            
            //获取投注详情
            getInfo : function (data, token) {
                return $util.httpPostRequest ($util.getHttpURL ().getInfoUrl, data, token);
            },
    
            //获取订单记录
            getOrderList : function (data, token) {
                return $util.httpPostRequest ($util.getHttpURL ().getOrderListUrl, data, token);
            },
            
            //获取订单详情
            getOrderInfo : function (data, token) {
                return $util.httpPostRequest ($util.getHttpURL ().getOrderInfoUrl, data, token);
            },
    
            //获取历史开奖记录
            getHistoryList : function (data, token) {
                return $util.httpPostRequest ($util.getHttpURL ().getHistoryListUrl, data, token);
            }
            
            
        };
    })
    
    .factory ('$bettingService', function ($http, $util) {
        return {
            //投注
            dltadd : function (data, token) {
                return $util.httpPostRequest ($util.getHttpURL ().dltaddUrl, data, token);
            }
            
            
            
        };
    })
    
    .factory ('$paymentService', function ($http, $util) {
        return {
            //大乐透待付款点击立即付款
            waitPay : function (data, token) {
                return $util.httpPostRequest ($util.getHttpURL ().waitPayUrl, data, token);
            },
            
          
            
            
            
            
        };
    })
    
    .factory ('$rechargeService', function ($http, $util) {
        return {
            //充值申请
            recharge : function (data, token) {
                return $util.httpPostRequest ($util.getHttpURL ().rechargeUrl, data, token);
            },
            
            //提现申请
            withdraw : function (data, token) {
                return $util.httpPostRequest ($util.getHttpURL ().withdrawUrl, data, token);
            },
            
            //获取记录详情
            getBillInfo : function (data, token) {
                return $util.httpPostRequest ($util.getHttpURL ().getBillInfoUrl, data, token);
            },
            
            //获取记录列表
            getBillList : function (data, token) {
                return $util.httpPostRequest ($util.getHttpURL ().getBillListUrl, data, token);
            }
            
        };
    });
