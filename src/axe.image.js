/**
 * @Author wanglei
 * @Time 2015/8/27
 * @description
 * 图片操作
 */

axe.define('image', function(exports,module){

  var each = function (arr, callback) {
    var i;
    var length = arr.length;
    if (typeof length == 'number' && length >= 0) {
      for (i = 0; i < length; i++) {
        callback(arr[i], i, arr);
      }
    }
  };

  var preload = function (urls, callback) {
    var ttlImages = [];
    var newImages = [];
    var errImages = [];
    var done = function () {
      if (newImages.length + errImages.length === ttlImages.length) {
        console.log('全部加载完毕');
        console.log('加载成功：%d, 加载失败：%d', newImages.length, errImages.length);
        callback({
          success: newImages.length,
          error: errImages.length,
          newImages: newImages,
          errImages: errImages.length
        });
      } else {
        console.log('正在加载..');
      }
    }

    if(typeof urls === 'string') {
      urls = [urls];
    }

    each(urls, function (url) {
      ttlImages[ttlImages.length] = new Image();
      ttlImages[ttlImages.length - 1].src = url;
      ttlImages[ttlImages.length - 1].onload = function () {
        newImages.push(this);
        done();
      };
      ttlImages[ttlImages.length - 1].onerror = function () {
        errImages.push(this);
        done();
      }
    });

  }

  //图片预加载
  exports.preload = preload;

});