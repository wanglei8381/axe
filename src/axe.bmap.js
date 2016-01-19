/**
 * 百度地图插件
 * api:
 * bmap.getDistance(a, b)两点之间的距离（单位米）
 * Example:
 * var a = {lng: 116.316304, lat: 39.99754};
 * var b = {lng: 116.328592, lat: 40.002284};
 * bmap.getDistance(a, b);
 */

axe.define('device', function (exports, module, _alias) {

  var bmap = {
    EARTH_RADIUS: 6370996.81,
    getDistance: function (pointA, pointB) {
      if (pointA && pointB) {
        var c = 0,
          c = this.handle(pointA, pointB);
        if (c == null) c = 0;
        return c
      }
    },
    handle: function (pointA, pointB) {
      pointA.lng = this.lng(pointA.lng, -180, 180);
      pointA.lat = this.lat(pointA.lat, -74, 74);
      pointB.lng = this.lng(pointB.lng, -180, 180);
      pointB.lat = this.lat(pointB.lat, -74, 74);
      return this.calculate(this.toRadian(pointA.lng), this.toRadian(pointB.lng), this.toRadian(pointA.lat), this.toRadian(pointB.lat))
    },
    lng: function (a, b, c) {
      for (; a > c;) a -= c - b;
      for (; a < b;) a += c - b;
      return a
    },
    lat: function (a, b, c) {
      b != null && (a = Math.max(a, b));
      c != null && (a = Math.min(a, c));
      return a
    },
    toRadian: function (a) {
      return Math.PI * a / 180;
    },
    calculate: function (a, b, c, d) {
      return this.EARTH_RADIUS * Math.acos(Math.sin(c) * Math.sin(d) + Math.cos(c) * Math.cos(d) * Math.cos(b - a))
    },
    translate: function (x, y) {
      $.get('http://api.map.baidu.com/ag/coord/convert?from=0&to=4&x=' + x + '&y=' + y, function (data) {
        if (data.error == 0) {
          var lng = new Buffer(data.x, 'base64').toString();
          var lat = new Buffer(data.y, 'base64').toString();
        }
      });
    }

  };

  exports.bmap = bmap;
});
