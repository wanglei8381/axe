//require('./baseTest');
require('../src/axe.array.js');
require('../src/axe.object.js');

/*
var obj = {'name':'wangli'};
console.log(obj.has('name'));
  */

var obj = {
  fn : function(){},
  arr : [],
  str : '',
  num : 12,
  date : new Date(),
  reg : new RegExp(),
  err : new Error(),
  obj : {}
};

//console.log(Object.keys(obj));

console.log(Object.isNumber('1'));

