(function() {
    var ctrls = angular.module("controllers");
    ctrls.controller("IndexCtrl", ["$scope", "$log", "$timeout", "DialogService", "DataService", IndexCtrl]);

    function IndexCtrl($scope, $log, $timeout, DialogService, DataService) {
        $log.debug("IndexCtrl init...");

        // 处理scope销毁
        $scope.$on("$destroy", function() {
            $log.debug("IndexCtrl destroy...");
        });

        DialogService.showConfirmDialog("是否测试获取服务器数据，需要开启后台项目", function() {
            DialogService.showWaitDialog("等待处理完毕...");
            DataService.setServer("http://127.0.0.1:10000");
            DataService.send("/demo/echo", {
                test: {
                    tid: 100
                }
            }, function(err, data) {
                DialogService.hideWaitDialog();
                $log.debug(err, data);
            });
            DataService.send("/html/index", {
                test: {
                    tid: 100,
                    tinfo: "哈哈哈"
                }
            }, function(err, data) {
                DialogService.hideWaitDialog();
                $log.debug(err, data);
            });
        }, function() {
            DialogService.showAlertDialog("没有获取后台数据");
        });
    }
})();