/**
 * @Author wanglei
 * @Time 2015/8/27
 * @description
 * 设备操作
 */

axe.define('device', function (exports, module, _alias) {

  //手机震动（单位毫秒）
  var vibrate = function (time) {
    try {

      if (!Object.isArray(time)) {
        time = [time];
      }
      time.each(function (item, i) {
        item = parseInt(item, 10);
        item = isNaN(item) ? 0 : item;
        time[i] = item;
      });

      navigator.vibrate = navigator.vibrate ||
        navigator.webkitVibrate ||
        navigator.mozVibrate ||
        navigator.msVibrate;

      if (navigator.vibrate) {
        navigator.vibrate(time);
        return true;
      } else {//苹果不支持

      }
      return false;
    } catch (e) {
      return false;
    }

  };

  //取消震动
  var cancalVibrate = function () {
    return vibrate(0);
  };

  //摇晃事件
  var motion = function (options, callback) {

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
      alert('本设备不支持devicemotion事件');
    }

    var SHAKE_THRESHOLD = 600, DIFF_TIME = 300;
    if (Object.isPlainObject(options)) {
      var speed = +options.speed;
      if (speed) {
        SHAKE_THRESHOLD = speed;
      }
      var diff = +options.diff;
      if (diff) {
        DIFF_TIME = diff;
      }
    }
    if (arguments.length == 1) {
      callback = options;
    }
    var x = y = z = lastX = lastY = lastZ = 0;
    var last_update = 0;

    function deviceMotionHandler(event) {
      var curTime = new Date().getTime();
      var diffTime = curTime - last_update;
      if (diffTime > DIFF_TIME) {
        last_update = curTime;
        var acceleration = event.accelerationIncludingGravity;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;
        if (speed > SHAKE_THRESHOLD) {
          if (Object.isFunction(callback)) {
            callback();
          }
          document.body.style.backgroundColor = color[Math.round(Math.random() * 10) % 6];
          document.getElementById("status").innerHTML = "x:" + x + "<br />y:" + y + "<br />z:" + z;
        }
        lastX = x;
        lastY = y;
        lastZ = z;

      }

    }

  };

  exports.vibrate = vibrate;
  exports.cancalVibrate = cancalVibrate;
});