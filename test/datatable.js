function DataTable(options) {

  //初始化表格数据
  var initDefault = function (options) {

    options.$table = $(options['id']);
    options.paging = !!options.paging;
    options['pageSize'] = parseInt(options['pageSize'], 10) || 10;

    //数据源必须存在一个
    if (!options.list && !options.ajax) {
      throw new Error('Data source does not exist');
    }

    //假分页
    if (!options.paging) {
      options.dataSrc = options.list;
      options.total = options.list.length;
    }

    var columns = options['columns'];
    var titles = [];
    var fields = [];
    var classs = [];
    var tips = [];
    var widths = [];
    var styles = [];
    for (var i = 0; i < columns.length; i++) {
      titles.push(columns[i].title);
      fields.push(columns[i].data);
      classs.push(columns[i]['class']);
      tips.push(columns[i].tip);
      widths.push(columns[i].width);
      styles.push(columns[i].style);
    }

    var columnDefs = options['columnDefs'];
    var fieldDefs = [];
    fieldDefs.length = columns.length;
    for (var i = 0; i < columnDefs.length; i++) {
      var target = columnDefs[i].target || columnDefs[i].targets;
      fieldDefs[parseInt(target,10)] = columnDefs[i].render;
    }

    options.titles = titles;
    options.fields = fields;
    options.classs = classs;
    options.fieldDefs = fieldDefs;

    return options;
  };

  //创建表头
  var createHead = (function(){
    var once = false;
    return function () {
      if(!once){
        once = true;
        var titles = this.titles;
        var ths = ['<thead><tr>'];
        for (var i = 0; i < titles.length; i++) {
          ths.push('<th>' + titles[i] + '</th>');
        }
        ths.push('</thead></tr><tbody></tbody>');
        this.$table.html(ths.join(''));
        this.$table.parent().append('<div class="dataTables_info" role="status" aria-live="polite">共 ' + this.total + ' 条数据</div><nav class="pagination-pos"></nav>');
      }

      return this;
    };
  })();

  //创建表内容
  var createBody = function (pageNo) {
    var fields = this.fields;
    var fieldDefs = this.fieldDefs;
    var begin = (pageNo-1) * pageSize;
    var end = pageNo * pageSize;
    var dataSrc = this.dataSrc;
    end = end > dataSrc.length ? dataSrc.length : end;
    var tds = [];
    for(var i = begin; i < end; i++){
      var obj = dataSrc[i];
      tds.push('<tr>');
      for(var j = 0, length = fields.length; j < length; j++) {
        var data = obj[fields[j]] || ' ';
        var fieldDef = fieldDefs[j];
        if(fieldDef) {
          data = fieldDef(i,j,obj);
        }
        var attrs = '';
        var cls = this.classs[j];
        if(cls){
          attrs += ' class=' + cls;
        }
        var tip = !!this.tips[j];
        if(tip){
          attrs += ' title=' + data;
        }
        var width = this.widths[j];
        if(width){
          attrs += ' width=' + width;
        }
        var style = styles[j];
        if(style){
          attrs += ' style=' + style;
        }
        tds.push('<td '+attrs+'>'+data+'</td>');

      }
    }
    $table.find('tbody').html(tds.join(''));
    return this;
  }

  //请求数据
  var ajax = function(pageNo,callback) {
    var _this = this;
    if(this.paging) {
      $('body').prepend($loading);
      $.ajax({
        url : urlIp + options.ajax.url,
        data : options.ajax.data,
        beforeSend : function(xhr, obj){
          if(obj.data) {
            obj.data += "&pageNo="+pageNo+"&pageSize="+_this.pageSize;
          } else {
            obj.data += "pageNo="+pageNo+"&pageSize="+_this.pageSize;
          }

        },
        type : "POST",
        timeout : "30000",
        dataType : "json",
        success : function(data) {
          try {
            if (data.status == "000") {
              callback.call(_this,data);
            }else if(data.status == "002"){
              window.location = 'login.html';
            } else {
              $.danger(data.msg.message);
            }
          } catch(e) {
            $.danger('数据解析出错');
          }
          $loading.remove();
        },
        error : function(error) {
          $loading.remove();
          $.danger('网络出错');
        }
      });


    } else {
      callback.call(_this);
    }
  }

  //请求数据与分页交互
  var request = function (pageNo) {

    ajax.call(options,function(data){

      if(data) {
        this.dataSrc = data.msg.list || [];
        //总记录数
        this.total = data.msg.total;
        //总页数
        page.defalut.total = data.msg.count;
      }

      //创建表格
      createBody.call(createHead.call(this),pageNo);
      //渲染分页
      page.redner();

    },pageNo);

  };

  //第一次执行
  initDefault(options);

  //初始化分页
  var cnt = Math.ceil(_this.total/_this.pageSize);
  var page =  new Pagination({total:cnt,wrapper:'.pagination-pos', callback:request});
  page.go(1);
}

