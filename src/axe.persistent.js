
require('../src/axe.object');
require('../src/axe.array');

//数据类型
var DataType = {"number":"number","string":"string","boolean":"boolean","array":"array","object":"object"};

//错误返回值
var errMsg = {
  "001" : "The # field does not exist",
  "002" : "The # field is required",
  "003" : "The # field value is not allowed",
  "004" : "The minimum value of the # field is ",
  "005" : "The maximum value of the # field is ",
  "006" : "The minimum length of the # field is ",
  "007" : "The maximum length of the # field is ",
  "008" : "The # field check failed"
};

/**
 * default ：字段默认值
 * type ：数据类型（默认是字符串）
 * min ： 如果数据类型是number，允许的最小值（默认是负无穷大）
 * max ： 如果数据类型是number，允许的最大值（默认是正无穷大）
 * minlength ： 如果数据类型是string，允许的字符串的最小长度（默认是0）
 * maxlength ： 如果数据类型是string，允许的字符串的最大长度（默认是最大数）
 * required ：是否是必须字段（默认false）
 * enum ： 允许出现的值
 * render ：处理后的字段值
 * @type {{default: null, type: string, min: Number, max: *, minlength: number, maxlength: Number, required: boolean, enum: null, render: Function}}
 */
var rules = {
  default : null,
  type : DataType.object,
  min : Number.NEGATIVE_INFINITY,
  max : Number.POSITIVE_INFINITY,
  minlength : 0,
  maxlength : Number.MAX_VALUE,
  required : false,
  enum : null,
  check : null,
  render : null
};


var models =
{
  "target" : {
    "trgtTtl" : {required:true},
    "trgtType" : {required:true,enum:[0,1,2,3]},
    "trgtCnt" : {required:true,type:'string',minlength:5,maxlength:20},
    "fromTime" : {required:true},
    "toTime" : {required:true},
    "trgtSchedule" : {required:true},
    "trgtStat" : {type:DataType.number, required:true, default:0},
    "liable" : {render:function(val){return 'hello:'+val;}},
    "partake" : {},
    "trgtIcon" : {}
  }
}

var extend = function(target, source) {
  var key = null;
  if(target == null) {
    target = {};
  }
  for (key in source){
    if (!target.has(key)) {
      target[key] = source[key];
    }
  }
  return target;
};

/*
 * 将默认规则添加到model中
 */
var ruleHandler = function(model){
  for(var key in model) {
    var rule = model[key];
    extend(rule,rules);
  }
};

/**
 * 添加entity缺少的字段，默认值为null
 * @param model
 * @param entity
 */
var modelHandler = function(model,entity){
  for(var key in model) {
    if(!entity.has(key)) {
      entity[key] = null;
    }
  }
};


/**
 * 验证规则：
 * 1：实体出现的字段是否是表中定义的字段
 * 2：字段为空，使用默认值default代替
 * 3：是否是required字段
 * 4: 使用enum判断值是否允许出现
 * 5：使用type判断字段类型
 * 6：如果字段是数字，判断min和max
 * 7：如果字段是字符串，判断minlength和maxlength
 * 8: 使用check判断是否通过
 * 9：使用render函数做最后处理
 * @param model 数据库表
 * @param entity 要验证的数据实体
 * @param type true:添加，false:修改
 */
var validate = function(model,entity,type){
  ruleHandler(model);
  if(type) {
    modelHandler(model,entity);
  }
  for(var key in entity) {
    var val = entity[key];
    var rule = model[key];
    if(!rule) {
      return errMsg['001'].replace('#',key);
    }
    if(Object.isEmpty(val)) {
      val = rule.default;
    }
    if(rule.required && Object.isEmpty(val)) {
      return errMsg['002'].replace('#',key);
    }
    if(!Object.isEmpty(rule.enum)) {
      var exist = false;
      rule.enum.each(function (item) {
        if(item == val){
          exist = true;
          return true;
        }
      });
      if(!exist) return errMsg['003'].replace('#',key);
    }
    if(rule.type === DataType.number) {
      if(rule.min > val) {
        return errMsg['004'].replace('#',key) + rule.min;
      }
      if(rule.max < val) {
        return errMsg['005'].replace('#',key) + rule.max;
      }
    } else if(rule.type === DataType.string) {
      if(rule.minlength > val.length) {
        return errMsg['006'].replace('#',key) + rule.minlength;
      }
      if(rule.maxlength < val.length) {
        return errMsg['007'].replace('#',key) + rule.maxlength;
      }
    }

    if(Object.isFunction(rule.check)){
      if(!rule.check(val,entity)){
        return errMsg['008'].replace('#',key);
      }
    }

    if(Object.isFunction(rule.render)){
      val = rule.render(val,entity);
    }
    entity[key] = val;
  }

  return "success";
}

/*
console.log(Number.NEGATIVE_INFINITY);
console.log(Number.POSITIVE_INFINITY);
console.log(Number.MAX_VALUE);

*/

/*
ruleHandler(models.target);

console.log(models.target);
*/


var target = {
  "trgtTtl" : "wanglei",
  "trgtType" : 3,
  "trgtCnt" : "Dotssss",
  "fromTime" : "2015-02-22",
  "toTime" : "2015-03-22",
  "trgtSchedule" : "01"
};

var result = validate(models.target,target,true);

console.log(result);
console.log(target);