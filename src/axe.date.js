/**
 * 判断某天是星期几
 * @param year
 * @param month
 * @param date
 * @returns {number}
 */
var getWeek = function (year, month, date) {
  var d = new Date();
  d.setFullYear(year);
  d.setMonth(month - 1);
  d.setDate(date);
  return d.getDay();
}

/**
 * 获取某个月的总天数
 * @returns {number}
 */
var getDaysInMonth = function(year,month){
  var d = new Date();
  d.setFullYear(year);
  d.setMonth(month);
  d.setDate(0);
  return d.getDate();
};

/**
 * 从今天起以前星期
 * @param year
 * @param month
 * @param date
 */
var getFrontWeek = function (year, month, date) {
  var week = getWeek(year, month, date);
  var weeks = ['天', '一', '二', '三', '四', '五', '六'];
  for (var i = date; i >= 1; i--) {
    console.log(year + '-' + month + '-' + i + ' : ' + weeks[(7 + (week--) % 7) % 7]);
  }

}

/**
 * 从今天起以后星期
 * @param year
 * @param month
 * @param date
 */
var getBackWeek = function (year, month, date) {
  var week = getWeek(year, month, date);
  var weeks = ['天', '一', '二', '三', '四', '五', '六'];
  for (var i = date; i < 30; i++) {
    console.log(year + '-' + month + '-' + i + ' : ' + weeks[(week++) % 7]);
  }

}

