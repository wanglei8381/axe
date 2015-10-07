/**
 * 扩展数组的方法
 */


var ArrayProto = Array.prototype;

/**********************
 * 数组的操作
 *********************/

/**
 *判断是否是数组
 */
if(Array.isArray === undefined) {

  Array.isArray = function(arr){
    return Object.prototype.toString.call(arr) === '[object Array]';
  };
}

/**
 * 栈:后进先出
 * 数组的栈操作push和pop
 */

/**
 * 队列:先进先出
 * 数组的队列操作push和shift
 * 新增的方法offer和poll
 */
ArrayProto.offer = ArrayProto.push;

ArrayProto.poll = ArrayProto.shift;

/**
 * 向数组的头部添加元素
 */
ArrayProto.offerFirst = ArrayProto.unshift;

/**
 * first获取数组第一个元素,不删除
 */
ArrayProto.first = function(){
  return this[0];
};

/**
 * last获取数组最后一个元素,不删除
 */
ArrayProto.last = function(){
  return this[this.length - 1];
};

/**
 * 数组是否为空
 */
ArrayProto.isEmpty = function(){
  return this.length === 0;
};

/**
 * 复制一个新数组
 */
ArrayProto.clone = function(){
  return this.concat();
};

/**
 * 功能类似于push,不同之处在于，重复的数据将覆盖旧的数据
 */
ArrayProto.add = function(){
  var _this = this;
  arguments.forEach(function(item){
    var index = _this.indexOf(item);
    if(index === -1) {
      _this[_this.length] = item;
    } else {
      _this[index] = item;
    }
  });
  return this.splice(i,1)[0];
};

/**
 * 删除指定下标的的元素，并返回这个元素
 */
ArrayProto.remove = function(i){
  return this.splice(i,1)[0];
};


/**********************
 * 数组的遍历
 *********************/

/**
 * 数组遍历
 * @param callback回调函数，传入三个参数分别是：值，下表，该数组
 * 当callback返回true时停止遍历
 */
ArrayProto.each = function(callback){
  var i = 0, length = this.length;
  var stop = false;
  for (; i < length; i++) {
    stop = callback(this[i], i, this);
    if(stop === true) {
      break;
    }
  }
};

if(!('forEach' in ArrayProto)) {
  ArrayProto.forEach = ArrayProto.each;
}

/**
 * 对数组的每一项进行给定的函数，每一项都返回true，才返回true
 */
if(!('every' in ArrayProto)) {
  ArrayProto.every = function(callback){
    var i = 0, length = this.length;
    var stop = true;
    for (; i < length; i++) {
      stop = callback(this[i], i, this);
      if(stop === false) {
        break;
      }
    }
    return stop;
  };

}

/**
 * 对数组的每一项进行给定的函数，任何一项返回true，就返回true
 */
if(!('some' in ArrayProto)) {
  ArrayProto.some = function(callback){
    var i = 0, length = this.length;
    var stop = false;
    for (; i < length; i++) {
      stop = callback(this[i], i, this);
      if(stop === true) {
        break;
      }
    }
    return stop;
  };

}

/**
 * 对数组的每一项进行给定的函数, 返回返回值为true组成的数组
 */
if(!('filter' in ArrayProto)) {
  ArrayProto.filter = function(callback){
    var results = [];
    var i = 0, length = this.length;
    this.forEach(function(value, index, list){
      if (callback(value, index, list) === true) results.push(value);
    });
    return results;
  };

}

/**
 * 对数组的每一项进行给定的函数, 返回返回值为true组成的数组
 */
if(!('map' in ArrayProto)) {
  ArrayProto.map = function(callback){
    var results = [];
    var i = 0, length = this.length;
    this.forEach(function(value, index, list){
      results[index] = callback(value, index, list);
    });
    return results;
  };

}

/**********************
 * 数组的位置
 *********************/

/**
 *
 * @param dir 1:indexOf, -1:lastIndexOf
 * @param arr 数组
 * @param item 查找的元素
 * @returns {*}
 */
var handlerIndex = function(dir, arr, item,pos) {
  var i = parseInt(pos,10) || 0, length = arr.length;
  var j = dir > 0 ? i : length;
  for(;j >= 0 && j < length; j += dir) {
    if(arr[j] === item) return j;
  }
  return -1;
};

if(!('indexOf' in ArrayProto)) {
  ArrayProto.indexOf = function(item,pos){
    return handlerIndex(1,this,item,pos);
  };

}

if(!('lastIndexOf' in ArrayProto)) {
  ArrayProto.lastIndexOf = function(item,pos){
    return handlerIndex(-1,this,item,pos);
  };

}