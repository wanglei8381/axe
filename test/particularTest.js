/**
 * @Author wanglei
 * @Time 2015/8/27
 * @description
 *
 */

var fn = function(){
  if(typeof su === 'undefined') {
    var su = '123';
    console.log('@#$== : ' + su);
  }
  return su;
}


console.log(fn());
console.log(fn());
console.log(fn());