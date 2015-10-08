require('./baseTest');
require('../src/axe.array.js');
require('../src/axe.object.js');

/*
var obj = {'name':'wangli'};
console.log(obj.has('name'));
  */

var log = function(){};

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

console.log(Object.keys(obj));