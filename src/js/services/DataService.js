/**
 * 数据服务
 */
(function() {
    var app = angular.module("services");

    app.factory("DataService", ["$log", "$http", DataService]);

    function DataService($log, $http) {
        $log.info("DataService init...");
        var server_url = "";

        var service = {};

        service.setServer = function(server) {
            server_url = server;
        };

        service.send = function(url, postdata, cb) {
            postdata.ajaxtimestamp = new Date().getTime(); // 自动加时间戳
            $http({
                "method": "POST",
                "url": server_url + url,
                "data": postdata
            }).then(function(data, status) {
                $log.debug("DataService.data:", data.data);
                (cb || angular.noop)(null, data.data);
            }, function(data, status) {
                $log.error("DataService.send error:", data);
                (cb || angular.noop)(data, null);
            });
        };

        return service;
    }

})();