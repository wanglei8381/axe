/**
 * 扩展Object的对象
 */

;
(function () {

  var ObjectProto = Object.prototype;
  var toString = ObjectProto.toString;
  //数组最大的下标
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

  //IE < 9存在bug，不能for..in遍历对象
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
    'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (Object.isFunction(constructor) && constructor.prototype) || ObjectProto;
    var prop = 'constructor';
    if (obj.has(prop) && !keys.contains(prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !keys.contains(prop)) {
        keys.push(prop);
      }
    }
  }

  /**
   * 在Object原型上添加属性
   * @param name 属性名
   * @param value 值
   */
  var definePropertyHandler = function (name, value) {
    Object.defineProperty(ObjectProto, name, {value: value, enumerable: false});
  };


  //是否是Object对象
  Object.isObject = function (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  //是否是window对象
  Object.isWindow = function (obj) {
    return obj != null && obj == obj.window;
  };

  //是否是纯对象
  Object.isPlainObject = function (obj) {
    return Object.isObject(obj) && !Object.isWindow(obj) && Object.getPrototypeOf(obj) == ObjectProto;
  };

  /**
   * 添加类型判断，分别是：参数，函数，字符串，数字，日期，正则表达式，错误，布尔，数组
   */
  ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Boolean', 'Array'].forEach(function (name) {
    Object['is' + name] = function (obj) {
      return toString.call(obj) === '[object ' + name + ']';
    }
  });

  Object.isArrayLike = function (collection) {
    var length = collection.length;
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  Object.isNull = function (obj) {
    return obj === null;
  };

  /**
   * 对象是否为空
   * 数组，类数组，字符串或对象
   * @param obj
   * @returns {boolean}
   */
  Object.isEmpty = function (obj) {
    if (obj == null) return true;
    if (Object.isArrayLike(obj) && (Object.isArray(obj) || Object.isString(obj) || Object.isArguments(obj))) return obj.length === 0;
    if (Object.isObject(obj)) return Object.keys(obj).length === 0;
    return false;
  };

  Object.isNaN = function(obj) {
    return Object.isNumber(obj) && obj !== +obj;
  };

  //获取obj对象的属性的名称,type为false时，检索obj拥有的和继承的所有属性的名称。
  var getKeys = function (obj, type) {
    if (!Object.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) {
      if (type) {
        if (obj.has(key)) keys.push(key);
      } else {
        keys.push(key);
      }
    }

    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  //获取obj对象的属性的名称
  if (Object.keys === undefined) {
    Object.keys = function (obj) {
      return getKeys(obj, true);
    };
  }

  //检索obj拥有的和继承的所有属性的名称。
  Object.allKeys = function (obj) {
    return getKeys(obj, false);
  };

  //hasOwnProperty的简写
  definePropertyHandler('has', function (key) {
    return this != null && this.hasOwnProperty(key);
  });

  //是否有属性hasOwnProperty的简写
  definePropertyHandler('each', function (callback) {
    for (var key in this) {
      callback(this[key], key, this);
    }
  });

})();