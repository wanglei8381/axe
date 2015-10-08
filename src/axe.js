/**
 * @Author wanglei
 * @Time 2015/8/27
 * @description
 * axe基础类,
 * 主要针对于移动端的应用
 * 强依赖underscore，backbone和zepto或jQuery
 */

require('./axe.array');
require('./axe.object');

(function(){

  //在浏览器中是window，在node中是exports
  var root = this;
  var _alias = {};
  _alias.version = '0.0.1';

  var isUexReady = false;
  var readyQueue = [];

  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  //添加到exports或window中
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _alias;
    }
    exports.axe = _alias;
  } else {
    root.axe = _alias;
  }

  //获取唯一id
  var getUID = function(){

    var maxId = 215088;
    var uid = 0;
    return function(){
      uid = (uid+1)%maxId;
      return uid;
    };
  }();

  //获取随机的唯一id，随机不重复，长度固定
  var getUUID = function(len){
    len = len || 6;
    len = parseInt(len,10);
    len = isNaN(len)?6:len;
    var seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ';
    var seedLen = seed.length - 1;
    var uuid = '';
    while(len--){
      uuid += seed[Math.round(Math.random()*seedLen)]
    }
    return uuid;
  }

  //是否是纯对象
  var isPlainObject = Object.isPlainObject;
  //是否是数组
  var isArray = Array.isArray;

  //扩展对象
  var extend = function(target, source, deep) {
    var key = null;
    for (key in source){
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key])){
          target[key] = {};
        }
        if (isArray(source[key]) && !isArray(target[key])){
          target[key] = [];
        }
        extend(target[key], source[key], deep);
      }
      else if (source[key] != null) {
        target[key] = source[key];
      }
    }
    return target;
  };

  var errorInfo = {
    moduleName : 'The name of the module must be a string !',
    moduleFactory : 'Module structure object must be a function !'
  };

  //定义一个模块，或者插件
  _alias.define = function(name,factory){
    if(Object.isFunction(name)){
      factory = name;
      name = '';
    }
    if(!name || !Object.isString(name)){
      throw new Error(errorInfo.moduleName);
    }
    if(!Object.isFunction(factory)){
      throw new Error(errorInfo.moduleFactory);
    }
    var module = {exports:{}};
    var exports = module.exports;
    var response = factory.call(this, exports, module, _alias);
    //模块已经存在,新的模块替代旧的模块
    _alias[name] = module.exports;
    /*
    if(name in axe){
      _alias[name] = [_alias.name];
      _alias[name].push(exports);
    }else{
      _alias[name] = exports;
    }*/
    return exports;
  };

  //加载依赖的文件
  _alias.require = function(name){
    if(!name){
      throw new Error(errorInfo.moduleName);
    }
    if(!Object.isString(name)){
      return name;
    }
    var res = _alias[name];
    /*
    if(Object.isArray(res) && res.length == 1){
      return res[0];
    }
    */
    return res || null;
  };

  /*
   对模块进行扩展
   @param String name 要扩展的对象
   @param Function factory 扩展函数
   */
  _alias.extend = function(target){
    var deep, length = arguments.length, args = slice.call(arguments, 1);
    if (typeof target == 'boolean') {
      deep = target;
      target = args.shift();
    }
    if(length === 1) {
      args[0] = target;
      target = _alias;
    }
    args.forEach(function(arg){ extend(target, arg, deep); })
    return target;
  };

  var encode = function(str) {
    return str ? encodeURIComponent(str) : '';
  };

  var decode = function(str) {
    return str ? decodeURIComponent(str) : '';
  };

  _alias.extend({
    getUID:getUID,
    getUUID:getUUID,
    encode:encode,
    decode:decode
  });

})();