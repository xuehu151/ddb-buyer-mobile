/*
 * 创建人：
 * 类描述：服务器地址访问类
 */
angular.module ('starter.util', [])
    .factory ('$util', function ($http, $q, $ionicLoading, $cordovaToast) {
        var ipUrl = 'http://121.42.253.149:18818';       //服务器ip地址或者域名
//         var ipUrl = 'http://192.168.1.109:8080';      //本地ip地址或者域名
        /* 接口地址  */
        var httpURL = {
            registerUrl : ipUrl + '/buyer/auth/regist',   //注册
            loginUrl : ipUrl + '/buyer/auth/login',   //登录
            getWareIssueUrl : ipUrl + '/buyer/order/getWareIssue',   //获取期号
            dltaddUrl : ipUrl + '/buyer/order/dltadd',   //大乐透投注
            getInfoUrl : ipUrl + '/buyer/order/getInfo',   //获取投注详情
            getListUrl : ipUrl + '/buyer/order/getList',   //获取投注记录
            getOrderInfoUrl : ipUrl + '/buyer/order/getOrderInfo',   //获取订单详情
            getOrderListUrl : ipUrl + '/buyer/order/getOrderList',   //获取订单记录
            getHistoryListUrl : ipUrl + '/buyer/order/getHistoryList',   //获取历史开奖记录
            waitPayUrl : ipUrl + '/buyer/order/waitPay',   //大乐透待付款点击立即付款
            getOrderDataStatisticsUrl : ipUrl + '/buyer/order/getOrderDataStatistics',   //查询账户余额
            rechargeUrl : ipUrl + '/buyer/bill/recharge',   //充值申请
            withdrawUrl : ipUrl + '/buyer/bill/cash',   //提现申请
            accountMoneyUrl : ipUrl + '/buyer/bill/accountMoney',   //查询账户余额
            getBillInfoUrl : ipUrl + '/buyer/bill/getInfo',   //获取记录详情
            getBillListUrl : ipUrl + '/buyer/bill/getList',   //获取记录列表
        };
        return {
            /* 返回httpURL  */
            getHttpURL : function () {
                return httpURL;
            },
            
            /* 保存用户信息  */
            setUserInfo : function (userInfo) {
                window.localStorage.setItem ("userInfo", JSON.stringify (userInfo));
            },
            
            /* 获取用户信息  */
            getUserInfo : function () {
                var localUserInfo = window.localStorage.getItem ("userInfo");
                try {
                    userInfo = JSON.parse (localUserInfo);
                } catch ( error ) {
                    userInfo = null;
                }
                return userInfo;
            },
            
            /* 格式化日期  */
            formatDate : function (date) {
                var y = date.getFullYear ();
                var M = date.getMonth () + 1;
                M = M < 10 ? '0' + M : M;
                var d = date.getDate ();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours ();
                h = h < 10 ? ('0' + h) : h;
                var m = date.getMinutes ();
                m = m < 10 ? ('0' + m) : m;
                var s = date.getSeconds ();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
            },
            
            /*根据日期 得到是周几*/
            getWeekByDay : function (time) { //dayValue=“2014-01-01”
                var day = new Date (Date.parse (time)); //将日期值格式化
                var today = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]; //创建周数组
                return today[day.getDay ()];  //返一个周中的某一天，其中0为周日
            },
            /*根据指定时间判定是前天、昨天、今天........*/
            getDateStr : function (AddDayCount) {
                var someDay = new Date ();
                someDay.setDate (someDay.getDate () + AddDayCount);//获取AddDayCount天后的日期
                var y = someDay.getFullYear ();
                var M = someDay.getMonth () + 1;//获取当前月份的日期
                M = M < 10 ? '0' + M : M;
                var d = someDay.getDate ();
                d = d < 10 ? ('0' + d) : d;
                return y + "-" + M + "-" + d;
            },
            /*距离某一时间还有多少长时间*/
            countTime : function (setTime) {
                var date = new Date ();//获取当前时间
                var now = date.getTime ();
                
                var endDate = new Date (setTime); //设置截止时间
                var end = endDate.getTime ();
                
                var leftTime = end - now;//计算时间差
                var d, h, m, s;
                if (leftTime >= 0) {//定义变量 d,h,m,s保存倒计时的时间
                    d = Math.floor (leftTime / 1000 / 60 / 60 / 24);
                    h = Math.floor (leftTime / 1000 / 60 / 60 % 24);
                    m = Math.floor (leftTime / 1000 / 60 % 60);
                    s = Math.floor (leftTime / 1000 % 60);
                    return {
                        /*hours:checkTime (d*24 + h),
                         minute:checkTime (m),
                         second:checkTime (s)*/
                        hours : (d * 24 + h),
                        minute : m,
                        second : s
                    }
                }else {
                    return '0'
                }
//                var days = checkTime (d);
//                var hours = checkTime (d*24 + h);
//                var minute = checkTime (m);
//                var second = checkTime (s);
                
                function checkTime (i) { //将0-9的数字前面加上0，例1变为01
                    if (i < 10) {
                        i = "0" + i;
                    }
                    return i;
                }
    
                
                //return hours, minute, second;
            },
            /*验证密码*/
            /* 密码由数字 字母 特殊字符的其中两种组成 6到24位*/
            checkPassword : function (text) {
                var myreg = /((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[.#@!~%^&*])|(?=.*\d)(?=.*[.#@!~%^&*]))[a-z\d.#@!~%^&*]{6,24}/i;
                return myreg.test (text);
            },
            
            /*验证手机号*/
            checkPhone : function (text) {
                var myreg = /^1[3578]\d{9}$/;
                return myreg.test (text);
            },
            
            /* HTTP请求  */
            httpPostRequest : function (url, data, token) {
                $ionicLoading.show ();
                var deferred = $q.defer ();
                var promise = deferred.promise;
                $http ({
                    method : 'POST',
                    url : url,
                    data : data.data,
                    params : data.params,
                    headers : {
                        "content-type" : "application/json;charset=UTF-8",
                        "Auth-Token" : token
                    },
                    timeout : 1000 * 10
                    /*transformRequest: function (obj) {
                     var str = [];
                     for (var s in obj) {
                     str.push (encodeURIComponent (s) + "=" + encodeURIComponent (obj[s]));
                     }
                     return str.join ("&");
                     },
                     timeout: 3000*/
                }).success (function (response) {
                    //return success
                    $ionicLoading.hide ();
                    deferred.resolve (response);
                }).error (function (response) {
                    //return error
                    $ionicLoading.hide ();
                    deferred.reject (response);
                    $cordovaToast.showLongBottom ('网络访问超时');
                });
                return promise;
            }
        };
    });
