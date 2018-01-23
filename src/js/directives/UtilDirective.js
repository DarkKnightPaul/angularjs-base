/*UtilDirective.js*/
(function() {

  var app = angular.module("directives");

  app.directive("formatDate", ["$log", "UtilService", function($log, UtilService) {
    $log.debug("format-date init...");

    return {
      scope: {
        formatDate: "@"
      },
      link: function($scope, element, attr) {
        $log.debug("format-date date:", $scope.formatDate);
        var watch = $scope.$watch("formatDate", function(nv, ov) {
          $log.debug("format-date watch:", nv);
          ts = parseInt(nv.replace("/^\D/g", ""));
          element.html(UtilService.formatDate(ts, 'y-M-d h:m:s w'));
        });

        $scope.$on("$destroy", function() {
          $log.debug("format-date destroy...");
          watch();
        });
      }
    };

  }]);

})();