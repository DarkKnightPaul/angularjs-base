/* /services/UtilService.js */
(function() {
  var app = angular.module("services");
  app.factory("UtilService", ["$log", UtilService]);

  function UtilService($log) {
    var service = {};

    //将时间戳格式化成format指定的数据格式
    //周名称
    var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    service.formatDate = function(timestamp, format) {
      //创建日期对象
      var date = new Date();
      if (timestamp) { //如果存在时间戳参数就赋值
        date.setTime(timestamp);
      }
      if (!format) { //如果没有格式化参数就给个默认的
        format = "y-M-d h:m:s";
      }
      //获取时间相关信息
      var year = date.getFullYear();
      var month = date.getMonth() + 1; //月会差一
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      var week = date.getDay();
      //处理数据
      month = month < 10 ? "0" + month : "" + month; //前导补零
      day = day < 10 ? "0" + day : "" + day;
      hour = hour < 10 ? "0" + hour : "" + hour;
      minute = minute < 10 ? "0" + minute : "" + minute;
      second = second < 10 ? "0" + second : "" + second;
      week = weeks[week]; //获取week的中文显示
      //格式化日期字符
      var result = format.replace("y", year);
      result = result.replace("M", month);
      result = result.replace("d", day);
      result = result.replace("h", hour);
      result = result.replace("m", minute);
      result = result.replace("s", second);
      result = result.replace("w", week);
      return result;
    };

    return service;
  }

})();