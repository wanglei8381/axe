/**
 * Created by wanglei on 2015/10/7.
 * 测试axe.array.js
 */

require('../src/axe.array.js');

var arr = [];

//console.log(arr.isEmpty());

arr.add();
console.log(arr);
arr.add(5);
console.log(arr);
arr.add(1,4,3,3,5);
console.log(arr);

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
//0,1,2,3,4
//1,4,3,3,5
var handlerIndex = function(dir, arr, item,pos) {
  var i = parseInt(pos,10) || 0, length = arr.length;
  if(i < 0) {
    i = i + length;
  }
  if(i < 0) {
    i = 0;
  }
  i = i >= length ? length - 1 : i;
  for(;i >= 0 && i < length; i += dir) {
    if(arr[i] === item) return i;
  }
  return -1;
};

/*
console.log(handlerIndex(-1,arr,3,-4));
console.log(arr.lastIndexOf(3,-4));
*/

/*
console.log(handlerIndex(1,arr,3,-4));
console.log(arr.indexOf(3,-4));
*/


