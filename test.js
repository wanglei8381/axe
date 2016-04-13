var arr = [1, 8, 6, 9, 5, 4, 3, 1, 2, 3, 100, 555, 555];

arr.sort(function (a, b) {
  return b - a;
});

var tmpVal = arr[arr.length - 1];
for (var i = arr.length - 2; i >= 0; i--) {
  if (arr[i] === tmpVal) {
    arr.splice(i + 1, 1);
  } else {
    tmpVal = arr[i];
  }
}

console.log(arr);

function F() {
  var i = 0;
  return function () {
    i++;
    return i;
  }

}
var a = F();
a();// 输出2
a(); //输出3
a(); //输出4


console.log('=========================');

var add = function add(val) {
  console.log(val);
  return add;
};

add(1)(2)(3)(4);

var obj = {name: 'dddd'};
function foo(a, b, c, d) {
  console.log(a, b, c, d, this.name);
}

foo.bind(obj, 3, 4)(1, 2);