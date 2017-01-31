plugin.init = function () {

  if (window.location.href.indexOf('rumobile=1') > 0) {

    dxSTable.prototype.renameColumn = function (no, name) { }

    dxSTable.prototype.Sort = function (e) { }

    dxSTable.prototype.createRow = function (cols, sId, icon, attr) { }

    dxSTable.prototype.addRow = function (cols, sId, icon, attr) { }

    dxSTable.prototype.addRowById = function (ids, sId, icon, attr) { }

    dxSTable.prototype.getAttr = function (row, attrName) { }

    $.each(thePlugins.list, function (i, v) {
      if (v.name != 'rpc' && v.name != 'httprpc' && v.name != '_getdir' && v.name != 'throttle' && v.name != 'ratio' && v.name != 'erasedata' && v.name != 'seedingtime' && v.name != 'rumobile') {
        v.disable();
      }
    });
    
    var pluginPath = window.location.pathname + this.path;
    $.ajax({
      type: 'GET',
      url: this.path + 'dist/index.html',
      processData: false,
      success: function (data, textStatus) {

        $('link[rel=stylesheet]').remove();
        $('head').append('<meta name="apple-mobile-web-app-capable" content="yes" />');
        
        injectCSS(pluginPath + 'dist/styles.css');
        injectCSS('https://fonts.googleapis.com/icon?family=Material+Icons');

        $('body').html(data);
        $('body').attr('aurelia-app', 'main');

        if (window.location.href.indexOf('black=1') > 0) {
          $('body').attr('class', 'theme-black');
        }
      }
    });
  }
};

plugin.init();
