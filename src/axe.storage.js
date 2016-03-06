/**
 * @Author wanglei
 * @Time 2015/8/27
 * @description
 * 树的创建
 */

axe.define('storage', function (exports, module, _alias) {

  var mark = '%3C%3Ct%40t%3E%3E';
  var encode = _alias.encode;
  var decode = _alias.decode;
  var log = _alias.log;

  var storage = function (key, val, time) {

    var handlerStorage = localStorage;
    var type = false;
    if (typeof time === 'boolean') {
      type = true;
      handlerStorage = sessionStorage;
    }

    var len = arguments.length;
    switch (len) {
      case 1:
        var val = handlerStorage.getItem(key);
        if (val) {
          val = decode(val);
          if (!type) {
            var index = val.lastIndexOf(decode(mark));
            var timestamp = +val.substring(index);
            val = val.substring(0, index);
            if (timestamp && !isNaN(timestamp)) {
              if (timestamp < new Date().getTime()) { //已经过期
                handlerStorage.removeItem(key);
                return null;
              }
            }
          }
          return JSON.parse(val);
        }
        return null;
        break;

      case 2:
        if (typeof val === 'object') {
          val = JSON.stringify(val);
        }
        handlerStorage.setItem(key, encode(val));
        break;

      case 3:
        if (typeof val === 'object') {
          val = JSON.stringify(val);
        }
        if (!type) {
          time = +time;
          time = new Date().getTime() + time * 60 * 1000;
          val += decode(mark) + time;
        }
        handlerStorage.setItem(key, encode(val));
        break;

      default:
        log('操作失败');
        break;
    }
  };

  var removeStorage = function (key, type) {
    var handlerStorage = localStorage;
    if (typeof type === 'boolean' || typeof key === 'boolean') {
      handlerStorage = sessionStorage;
    }
    var len = arguments.length;
    switch (len) {
      case 0:
        handlerStorage.clear();
        break;

      case 1:
        if (typeof key === 'boolean') {
          handlerStorage.clear();
        } else {
          handlerStorage.removeItem(key);
        }
        break;

      case 2:
        handlerStorage.removeItem(key);
        break;

      default:
        log('操作失败');
        break;
    }
  };

  exports.add = storage;
  exports.get = storage;
  exports.remove = removeStorage;

});