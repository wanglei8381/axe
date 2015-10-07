axe.define('util', function(exports,module){

  /**
   * ����������ʽ��ȡ��ַ������
   * @param name
   * @returns {null}
   */
  function getParamter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  /**
   * ����Ƿ�֧��touch�¼�
   * @returns {boolean|*}
   */
  function isSupportTouch() {
    return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
  }

//�ж��Ƿ�֧��css3d
  var supports3d = function() {
    var div = document.createElement('div'),
      ret = false,
      properties = ['perspectiveProperty', 'WebkitPerspective'];
    for (var i = properties.length - 1; i >= 0; i--){
      ret = ret ? ret : div.style[properties[i]] !== undefined;
    }

    //���webkit 3d transforms������,��Ȼ�﷨�ϼ��û���⣬���ǻ��ǲ�֧��
    if (ret){
      var st = document.createElement('style');
      // webkit allows this media query to succeed only if the feature is enabled.
      // "@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d),(modernizr){#modernizr{height:3px}}"
      st.textContent = '@media (-webkit-transform-3d){#test3d{height:3px}}';
      document.getElementsByTagName('head')[0].appendChild(st);
      div.id = 'test3d';
      document.documentElement.appendChild(div);
      ret = (div.offsetHeight === 3);
      st.parentNode.removeChild(st);
      div.parentNode.removeChild(div);
    }
    return ret;
  };

  /**
   * �����δ���
   */
  var isSupports3d = (function(){
    var supports = null;
    if(!supports){
      supports = supports3d();
    }
    return function(){
      return supports;
    };
  })();

  exports.getParamter = getParamter;
  exports.isSupports3d = isSupports3d;
});