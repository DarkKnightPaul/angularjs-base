(function() {
    var ctrls = angular.module("controllers");
    ctrls.controller("IndexCtrl", ["$scope", "$log", "$timeout", "DialogService", IndexCtrl]);

    function IndexCtrl($scope, $log, $timeout, DialogService) {
        $log.debug("IndexCtrl init...");

        // 处理scope销毁
        $scope.$on("$destroy", function() {
            $log.debug("IndexCtrl destroy...");
        });

        DialogService.showConfirmDialog("是否显示确定对话框", function() {
            DialogService.showAlertDialog("确定对话框");
        }, function() {
            DialogService.showWaitDialog("等待处理完毕...");
            $timeout(function() {
                DialogService.hideWaitDialog();
            }, 2000);
        });
    }
})();