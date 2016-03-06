
//随机回去数组中的值
var randomItem = function(items){
  var seed = Math.random();
  return items[Math.floor(seed * items.length)];
}

var items = [12, 548 , 'a' , 2 , 5478 , 'foo' , 8852, 'Doe' , 2145 , 119];
console.log(randomItem(items));

//随机获取最大值和最小值之间的数
var randomMinMax = function(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(randomMinMax(1,10));


var generateArray_from_0_to_max = function(max){
  var numbersArray = [];
  for( var i=1; numbersArray.push(i++) < max;);  // numbers = [1,2,3 ... 100]
}
generateArray_from_0_to_max(100);

//随机生成字符串
function generateRandomAlphaNum(len) {
  //toString()方法可以传递一个参数，表示数值的基数。
  //默认情况下 参数是10。要说明的是对于非数值类型（boolean，string等）设置toString()的参数是无效的，
  //基数从2到36封顶
  var rdmString = "";
  for( ; rdmString.length < len; rdmString  += Math.random().toString(36).substr(2));
  return  rdmString.substr(0, len);

}

/**
 * 洗牌，将数组混乱
 */
function shuffleArray (){
  var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
  numbers = numbers.sort(function(){ return Math.random() - 0.5});
}

//清空字符串两边的空格
String.prototype.trim = function(){return this.replace(/^s+|s+$/g, "");};
String.prototype.ltrim = function(){return this.replace(/^s+/g, "");};
String.prototype.rtrim = function(){return this.replace(/s+$/g, "");};

//arr1追加arr2
var arr1 = [1,2,3];
var arr2 = [3,4,5,6];
Array.prototype.push.apply(arr1, arr2);
console.log(arr1);

//Transform the arguments object into an array
function argumentsToArray(){
  var argArray = Array.prototype.slice.call(arguments);
}

function isNumber(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isArray(obj){
  return Object.prototype.toString.call(obj) === '[object Array]' ;
}

//var  numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
//得到数字数组中的最大值
function getMaxByArray(numbers){
  return Math.max.apply(Math, numbers);
}
//得到数字数组中的最小值
function getMinByArray(numbers){
  return Math.min.apply(Math, numbers);
}

//清空数组
var myArray = [12 , 222 , 1000 ];
myArray.length = 0; // myArray will be equal to [].