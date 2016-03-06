require('../src/axe.object.js');

function getResponseStr(status, message, info, total) {
  var ret = {
    dispose : {
      "status" : status,
      "msg" : message
    }
  };
  if(info) {
    ret.info = info;
  }
  if(total){
    ret.total = total;
  }
  return JSON.stringify(ret);
}

//返回成功信息
function getSuccessInfo(message,info,total){
  if(!Object.isString(message)){
    total = info;
    info = message;
    message = 'success';
  }
  return getResponseStr('000',message,info,total);
}

//console.log(getSuccessInfo('wanglei',{}));

//扩展对象
var extend = function(target, source, deep) {
  var key = null;
  for (key in source){
    if (deep && (Object.isPlainObject(source[key]) || Object.isArray(source[key]))) {
      if (Object.isPlainObject(source[key]) && !Object.isPlainObject(target[key])){
        target[key] = {};
      }
      if (Object.isArray(source[key]) && !Object.isArray(target[key])){
        target[key] = [];
      }
      extend(target[key], source[key], deep);
    } else if (target[key] === undefined || !Object.isEmpty(source[key])) {
      target[key] = source[key];
    }
  }
  return target;
};


var target = {
  age:12,
  entity:{
    city:[1,2,3]
  }
};

var source = {
  name:'wanglei2',
  type:'01',
  entity:{
    Stability:'',
    Synopsis:'today',
    city:['beijing','sahnghai']
  }
}

target = extend(target,source,true);
console.log(JSON.stringify(target));

console.error('wwwww');

delete source.zjzjzjz;

var arr = [{name:'wanglei'},{name:'wanglei'},{name:'wanglei'},{name:'wanglei'}];
arr.forEach(function(item){
  item.name = 'lisi';
  item.age = 23;
});

console.log(arr);