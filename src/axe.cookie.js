/**
 * @Author wanglei
 * @Time 2015/8/27
 * @description
 * cookie操作
 */

axe.define('cookie', function (exports, module, _alias) {

  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
    try {
      // Replace server-side written pluses with spaces.
      // If we can't decode the cookie, ignore it, it's unusable.
      s = decodeURIComponent(s.replace(pluses, ' '));
    } catch (e) {
      return;
    }
    try {
      // If we can't parse the cookie, ignore it, it's unusable.
      return config.json ? JSON.parse(s) : s;
    } catch (e) {
    }
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return _.isFunction(converter) ? converter(value) : value;
  }

  var config = function (key, value, options) {
    if (value !== undefined && !_.isFunction(value)) {
      options = _alias.extend({}, config.defaults, options);
      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setDate(t.getDate() + days);
      }
      return (document.cookie = [
        encode(key), '=', stringifyCookieValue(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path ? '; path=' + options.path : '',
        options.domain ? '; domain=' + options.domain : '',
        options.secure ? '; secure' : ''
      ].join(''));
    }
    var result = key ? undefined : {};
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = parts.join('=');
      if (key && key === name) {
        result = read(cookie, value);
        break;
      }
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }
    return result;
  };
  config.defaults = {};
  exports.add = config;
  exports.get = config;
  exports.remove = function (key, options) {
    if (config(key) !== undefined) {
      config(key, '', _alias.extend({}, options, {expires: -1}));
      return true;
    }
    return false;
  };

});