// Ionic Starter App
var jsonWrap = [];//存放所有的注数
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'starter.getListServices', 'starter.util', 'starter.SignInCtrl', 'starter.RaceColorFootballCtrl', 'starter.BigLottoCtrl', 'starter.bettingDetailCtrl', 'starter.RecommendCtrl', 'starter.InformationCtrl', 'starter.SuperLottoCtrl', 'starter.BiddingFootballCtrl', 'starter.MineCtrl', 'starter.registerCtrl', 'starter.verifyCtrl', 'starter.forgetPasswordCtrl', 'starter.allOrdersCtrl', 'starter.withdrawCtrl', 'starter.withDrawStatusCtrl', 'starter.rechargeCtrl', 'starter.accountDetailCtrl', 'starter.mineDetailsCtrl', 'starter.orderStatusCtrl', 'starter.HistoryLotteryCtrl', 'starter.HistoryLotteryDetailsCtrl', 'starter.allOrderdetailCtrl', 'starter.rechargeSuccessCtrl', 'starter.proofDetailsCtrl', 'starter.mineDetailsHaveCtrl'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
        //解决tabs在Android下局域顶部的方法
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');
        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');
        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
    
        //添加http请求头文件
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';
        $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
    
        //隐藏ion-nav-back-button的文字
        $ionicConfigProvider.backButton.text("");
        $ionicConfigProvider.backButton.previousTitleText(false);
    
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.when('','/sign-in');
        
        $stateProvider
            //注册
            .state('register', {
                url: '/register',
                cache: 'false',
                prefetchTemplate:false,
                templateUrl: 'templates/register.html',
                controller: 'registerCtrl'
            })
            //手机验证
            .state('verify', {
                url: '/verify',
                cache: 'false',
                prefetchTemplate:false,
                templateUrl: 'templates/verify.html',
                controller: 'verifyCtrl'
            })
            //忘记密码
            .state('forgetPassword', {
                url: '/forgetPassword',
                cache: 'false',
                prefetchTemplate:false,
                templateUrl: 'templates/forgetPassword.html',
                controller: 'forgetPasswordCtrl'
            })
            //登录tabs  ivew
            .state('signin', {
                url: '/sign-in',
                cache: 'false',
                prefetchTemplate:false,
                templateUrl: 'templates/sign-in.html',
                controller: 'SignInCtrl'
            })
            //tabs导航路由
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            //首页
            .state('tab.home', {
                url: '/home',
                cache:'false',
                prefetchTemplate:false,
                views: {
                    'tab-home': {
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })

            //  ***首页  竞彩足球下单详情
            .state('RaceColorFootball', {
                url: '/RaceColorFootball',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/RaceColorFootball.html',
                controller: 'RaceColorFootballCtrl'
            })

            //  ***首页  大乐透下单详情
            .state('BigLotto', {
                url: '/BigLotto',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/BigLotto.html',
                controller: 'BigLottoCtrl'
            })

            //***首页   大乐透 投注详情 保存成功

            .state('bettingDetail',{
                url:'/bettingDetail',
                cache:'false',
                prefetchTemplate:false,
                templateUrl:'templates/bettingDetail.html',
                controller:'bettingDetailCtrl'
            })

            //***首页   大乐透 提交成功到订单状态
            .state('orderStatus',{
                url:'/orderStatus',
                cache:'false',
                prefetchTemplate:false,
                templateUrl:'templates/orderStatus.html',
                controller: 'orderStatusCtrl'
            })

            //***首页   大乐透 历史开奖
            .state('HistoryLottery',{
                url:'/HistoryLottery',
                cache:'false',
                prefetchTemplate:false,
                templateUrl:'templates/HistoryLottery.html',
                controller: 'HistoryLotteryCtrl'
            })

            //***首页   大乐透 历史开奖详情订单列表页面
            .state('HistoryLotteryDetails',{
                url:'/HistoryLotteryDetails',
                cache:'false',
                prefetchTemplate:false,
                templateUrl:'templates/HistoryLotteryDetails.html',
                controller: 'HistoryLotteryDetailsCtrl'
            })

            //推荐
            .state('tab.recommend', {
                url: '/recommend',
                cache: 'false',
                prefetchTemplate:false,
                views: {
                    'tab-recommend': {
                        templateUrl: 'templates/recommend.html',
                        controller: 'RecommendCtrl'
                    }
                }
            })

            //资讯
            .state('tab.information', {
                url: '/information',
                cache: 'false',
                prefetchTemplate:false,
                views: {
                    'tab-information': {
                        templateUrl: 'templates/information.html',
                        controller: 'InformationCtrl'
                    }
                }
            })

            //资讯   竞彩足球
            .state('tab.information.BiddingFootball', {
                url: '/BiddingFootball',
                cache: 'false',
                prefetchTemplate:false,
                templateUrl: 'templates/BiddingFootball.html',
                controller: 'BiddingFootballCtrl'
            })

            //资讯   大乐透
            .state('tab.information.SuperLotto', {
                url: '/SuperLotto',
                cache: 'false',
                prefetchTemplate:false,
                templateUrl: 'templates/SuperLotto.html',
                controller: 'SuperLottoCtrl'
            })

            //竞彩足球 大乐透资讯详情
            .state('tab.information.articleDetails', {
                url: '/articleDetails',
                cache: 'false',
                prefetchTemplate:false,
                templateUrl: 'templates/articleDetails.html'
            })

            //我的
            .state('tab.mine', {
                url: '/mine',
                cache: 'false',
                prefetchTemplate:false,
                views: {
                    'tab-mine': {
                        templateUrl: 'templates/mine.html',
                        controller: 'MineCtrl'
                    }
                }
            })

            //全部订单
            .state('allOrders', {
                url: '/allOrders',
                cache: 'false',
                prefetchTemplate:false,
                templateUrl: 'templates/allOrders.html',
                controller: 'allOrdersCtrl'
            })
            //全部订单详情页面
            .state('allOrderdetail', {
                url: '/allOrderdetail',
                cache: 'false',
                prefetchTemplate:false,
                templateUrl: 'templates/allOrderdetail.html',
                controller: 'allOrderdetailCtrl'
            })
            //提现
            .state('withdraw', {
                url: '/withdraw',
                cache: 'false',
                prefetchTemplate:false,
                templateUrl: 'templates/withdraw.html',
                controller: 'withdrawCtrl'
            })
            //提现凭证详情
            .state('proofDetails', {
                url: '/proofDetails',
                cache: 'false',
                prefetchTemplate:false,
                templateUrl: 'templates/proofDetails.html',
                controller: 'proofDetailsCtrl'
            })
            //提现失败成功
            .state('withDrawStatus', {
                url: '/withDrawStatus',
                cache: 'false',
                prefetchTemplate:false,
                templateUrl: 'templates/withDrawStatus.html',
                controller: 'withDrawStatusCtrl'
            })
    
            //充值accountDetail
            .state('recharge', {
                url: '/recharge',
                cache: 'false',
                prefetchTemplate:false,
                templateUrl: 'templates/recharge.html',
                controller: 'rechargeCtrl'
            })

            //充值成功
            .state('rechargeSuccess', {
                url: '/rechargeSuccess',
                cache: 'false',
                prefetchTemplate:false,
                templateUrl: 'templates/rechargeSuccess.html',
                controller: 'rechargeSuccessCtrl'
            })
            
            //账户明细
            .state('accountDetail', {
                url: '/accountDetail',
                cache: 'false',
                prefetchTemplate:false,
                templateUrl: 'templates/accountDetail.html',
                controller: 'accountDetailCtrl'
            })
            //明细详情无凭证
            .state('mineDetails', {
                url: '/mineDetails',
                cache: 'false',
                prefetchTemplate:false,
                templateUrl: 'templates/mineDetails.html',
                controller: 'mineDetailsCtrl'
            })
            //明细详情有凭证
            .state('mineDetailsHave', {
                url: '/mineDetailsHave',
                cache: 'false',
                prefetchTemplate:false,
                templateUrl: 'templates/mineDetailsHave.html',
                controller: 'mineDetailsHaveCtrl'
            });
    });











