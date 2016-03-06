/**
 * ajax输出的数据格式
 */

function getResponseStr(status, message, info) {
  var ret = {
    dispose : {
      "status" : status,
      "msg" : message
    }
  };
  if(info) {
    ret.info = info;
  }
  return JSON.stringify(ret);
}

//返回成功信息
function getSuccessInfo(message,info){
  if(!Object.isString(message)){
    info = message;
    message = 'success';
  }
  return getResponseStr('000',message,info);
}

//返回失败信息
function getFailInfo(message,status){
  if(!message){
    message = 'fail';
  }
  if(!status){
    status = '002';
  }
  return getResponseStr(status,message);
}