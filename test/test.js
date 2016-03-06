var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var Builder = xml2js.Builder;
var xml = '<xml><URL><![CDATA[http://www.fengimage.com/wx/gateway]]></URL><ToUserName><![CDATA[wanglei10160302]]></ToUserName><FromUserName><![CDATA[wanglei10160302]]></FromUserName><CreateTime>1454236047184</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[测试000000]]></Content><MsgId>1234567890123456</MsgId></xml>';

parseString(xml, function (err, result) {
  console.dir(result);
});

/*
 var obj = {xml: {FromUserName: "Super", CreateTime: "Man", MsgId: 23}};

 var builder = new Builder();

 xml = builder.buildObject(obj);

 console.log(typeof xml);
 */

