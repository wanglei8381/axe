/**
 * @Author wanglei
 * @Time 2015/8/27
 * @description
 *
 */

var _ = require('../lib/underscore');
var appcan = require('../src/appcan');


var getUIDTest = function(){

  //获取唯一id
  var getUID = function(){
    var maxId = 10;
    var uid = -1;
    return function(){
      uid = (uid+1)%maxId;
      return uid;
    };
  }();

  var count = 20;
  while(count--){
    console.log('getUID : ', getUID());
  }

};

//getUIDTest();

var getUUIDTest = function(){

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

  var count = 20;
  while(count--){
    console.log('getUUID : ', getUUID(count));
  }

};

//getUUIDTest();


var getIsPlainObject = function(){

  //是否是window对象
  var isWindow = function(obj){
    return obj != null && obj == obj.window;
  };

  //是否是纯对象
  var isPlainObject = function (obj) {
    return _.isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
  };

  var obj = {
    a: '',
    b: null,
    c: undefined,
    d: [],
    e: 0,
    f: 123,
    g: '123',
    h: [1,2],
    i: {},
    j: new Object(),
    k: new Date()
  };

  for(var key in obj) {
    console.log('isWindow : ', key ,isPlainObject(obj[key]));
  }
}


//getIsPlainObject();

var tgt = {}
appcan.extend(tgt,{
  min: function(a, b) { return a < b ? a : b; },
  max: function(a, b) { return a > b ? a : b; }
});

/*
console.log(tgt.min(2,4));
console.log(tgt.max(2,4));

  */

/*
appcan.define('math', function(exports,module){
  exports.name = 'math';
  exports.max = function(a, b) { return a > b ? a : b; };
  exports.min = function(a, b) { return a < b ? a : b; };
});

var math = appcan.require('math');
console.log(math.max(1,2));
  */


var fn = _.once(function(){
  var su = '123';
  console.log('忘了吧单');
  return su;
});

console.log(fn());
console.log(fn());
console.log(fn());