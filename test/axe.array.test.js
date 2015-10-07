/**
 * Created by wanglei on 2015/10/7.
 * 测试axe.array.js
 */

require('../src/axe.array.js');

var arr = [];

//console.log(arr.isEmpty());

arr.push(1,4,3,5);

//arr.reverse();

/*
var arr2 = arr.clone();
arr2[0] = 100;
console.log(arr2);
console.log(arr);
  */

/*
arr.each(function(item,i,obj){
  console.log(item+','+i+' : '+obj);
  if(i == 2){
    return true;
  }
});

  */

/*
var ArrayProto = Array.prototype;

console.log(!('forEach' in ArrayProto));
*/