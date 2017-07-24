
angular.module ('starter.controllers', [])
    //首页
    .controller ('HomeCtrl', function ($scope) {
    
    });

/*function combin(n,m) {
    if (n < 0 || m < 0) {
        return 0;
    }
    var t = n - m;
    var factN = 1;
    var factM = 1;
    
    if (m > n) {
        return 0;
    }
    
    if (n == m) {
        return 1;
    }
    
    if (t < m) {
        m = t;
    }
    for (var i = 1; i <= m; n--, m--) {
        factN = factN * n;
        factM = factM * m;
    }
    return (factN / factM);
}*/

//获得大乐透注数

/*function dltZs(frontAreaNum,backfrontAreaNum) {
    return combin(frontAreaNum, 5) * combin(backfrontAreaNum, 2);
}*/


//获得大乐透金额  前区，后区，追加，倍数

/*function dltAmount(frontAreaNum, backfrontAreaNum, isAppend, timesCount) {
    var amount = 0;
    //如果追加3块，不追加2块
    if (isAppend) {
        amount = (dltZs(frontAreaNum, backfrontAreaNum)) * 3 * timesCount;
    } else {
        amount = (dltZs(frontAreaNum, backfrontAreaNum)) * 2 * timesCount;
    }
    return amount;
}*/
