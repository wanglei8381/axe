require('../src/axe.object');
function getResponseStr(status, message) {
  var dispose = {
    "status" : status,
    "msg" : {}
  };
  if(Object.isString(message)) {
    dispose.msg.message = message;
  } else {
    dispose.msg = message;
  }
  return JSON.stringify(dispose);
}

//返回成功信息
function getSuccessInfo(message){
  if(!message){
    message = 'success';
  }
  return getResponseStr('000',message);
}

//返回失败信息
function getFailInfo(message,status){
  if(!message){
    message = 'fail';
  }
  if(!status){
    status = '001';
  }
  return getResponseStr(status,message);
}

console.log(getFailInfo());
console.log(getFailInfo('userId is null'));
console.log(getFailInfo('no login','002'));
console.log(getSuccessInfo());
console.log(getSuccessInfo('ok'));
console.log(getSuccessInfo({"item" : {name:'李小龙'}}));
console.log(getSuccessInfo({"total" : 22,"list" : [{},{}]}));