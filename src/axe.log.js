/**
 * @Author wanglei
 * @Time 2015/8/27
 * @description
 * 日志操作
 */

axe.define('log', function(exports,module,_alias){

  var log = function(msg){
    console.log(msg);
  };

  exports.log = log;
  _alias.extend({log:log});
});