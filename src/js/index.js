var Project = (function () {

  var nano = function (data) {
    var elm = $('.nano');
    var index = 0;
    render(data[0]);
    elm.nanoScroller({
      scroll: 'top',
      alwaysVisible: true
    });
    elm.bind('scrollend', function (e) {
      if (data.length < index) {
        return;
      }
      if (data.length == index + 1) {
        $('#no-data').show();
      }
      index++;
      var singleData = data[index];
      render(singleData);
    });
    $('.mini-more_msg').on('click', function () {
      var elmH = $('.section').height();
      var len = $('#news-list').children().length;
      elm.nanoScroller({ scrollTop: elmH });
      if (len == 12) {
        index++;
        var singleData = data[index];
        render(singleData);
      }
    });
  };
  var render = function (res) {
    var data = res || [];
    var html = '';
    $.each(data, function (i, item) {
      html += '<li class="flip_ad">' +
        '  <a href="' + item.url + '" target="_blank" title="" class="pic_img" pdata="' + item.pdata + '">' +
        '    <img src="' + item.minipic43[0] + '" >' +
        '    <p class="pic_txt">' + item.title + '</p>' +
        '  </a>' +
        '</li>';
    });
    $('#news-list').append(html);
  };
  var group = function (array, subGroupLength) {
    var index = 0;
    var newArray = [];
    while (index < array.length) {
      newArray.push(array.slice(index, index += subGroupLength));
    }
    return newArray;
  };
  var getData = function () {
    var url = '//auto.mop.com/json/mini/ludashi/hotnews.json';
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'jsonp',
      jsonpCallback: 'qiche',
      timeout: 6000,
      success: function (data) {
        if (!data) {
          return false;
        }
        var res = data.data;
        $.each(res, function (index, item) {
          var pdataArr = [item.url, 0, 'qiche', index + 1, 'pic'];
          switch ((index + 1) % 4) {
            case 0:
              pdataArr.push('right');
              break;
            case 1:
              pdataArr.push('left');
              break;
            default:
              pdataArr.push('center');
          }
          item['pdata'] = pdataArr.join('|');
        });
        var arr = group(res, 12);
        nano(arr);
      },
      error: function (err) {

      },
      complete: function () {
        $('.flipLoading').hide();
      }
    });
  };
  // 公用的
  var common = {
    setCookie: function (name, value) {
      var Days = 365; // 天
      var exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie = name + '=' + encodeURI(value) + ';expires=' + exp.toUTCString() + ';path=/;';
    },
    getCookie: function (name) {
      var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
      if (arr = document.cookie.match(reg)) {
        return decodeURI(arr[2]);
      } else {
        return null;
      }
    },
    explorerType: function () {
      var agent = navigator.userAgent.toLowerCase();
      var browser_type = '';
      if (agent.indexOf('msie') > 0) {
        browser_type = 'IE';
      }
      if (agent.indexOf('firefox') > 0) {
        browser_type = 'firefox';
      }
      if (agent.indexOf('chrome') > 0 && agent.indexOf('mb2345browser') < 0 && agent.indexOf('360 aphone browser') < 0) {
        browser_type = 'chrome';
      }
      if (agent.indexOf('360 aphone browser') > 0 || agent.indexOf('qhbrowser') > 0) {
        browser_type = '360';
      }
      if (agent.indexOf('ucbrowser') > 0) {
        browser_type = 'UC';
      }
      if (agent.indexOf('micromessenger') > 0) {
        browser_type = 'WeChat';
      }
      if ((agent.indexOf('mqqbrowser') > 0 || agent.indexOf('qq') > 0) && agent.indexOf('micromessenger') < 0) {
        browser_type = 'QQ';
      }
      if (agent.indexOf('miuibrowser') > 0) {
        browser_type = 'MIUI';
      }
      if (agent.indexOf('mb2345browser') > 0) {
        browser_type = '2345';
      }
      if (agent.indexOf('sogoumobilebrowser') > 0) {
        browser_type = 'sogou';
      }
      if (agent.indexOf('liebaofast') > 0) {
        browser_type = 'liebao';
      }
      if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0 && agent.indexOf('ucbrowser') < 0 && agent.indexOf('micromessenger') < 0 && agent.indexOf('mqqbrowser') < 0 && agent.indexOf('miuibrowser') < 0 && agent.indexOf('mb2345browser') < 0 && agent.indexOf('sogoumobilebrowser') < 0 && agent.indexOf('liebaofast') < 0 && agent.indexOf('qhbrowser') < 0) {
        browser_type = 'safari';
      }
      return browser_type;
    },
    getUserId: function () {
      return (+new Date()) + Math.random().toString(10).substring(2, 6);
    },
    detectOS: function () {
      var sUserAgent = navigator.userAgent;
      var isWin = (navigator.platform === 'Win32') || (navigator.platform === 'Windows');
      var isMac = (navigator.platform === 'Mac68K') || (navigator.platform === 'MacPPC') || (navigator.platform === 'Macintosh') || (navigator.platform === 'MacIntel');
      var bIsIpad = sUserAgent.match(/ipad/i) === 'ipad';
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) === 'iphone os';
      var isUnix = (navigator.platform === 'X11') && !isWin && !isMac;
      var isLinux = (String(navigator.platform).indexOf('Linux') > -1);
      var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) === 'android';
      var bIsCE = sUserAgent.match(/windows ce/i) === 'windows ce';
      var bIsWM = sUserAgent.match(/windows mobile/i) === 'windows mobile';
      if (isMac) return 'Mac';
      if (isUnix) return 'Unix';
      if (isLinux) {
        if (bIsAndroid) {
          return 'Android';
        } else {
          return 'Linux';
        }
      }
      if (bIsCE || bIsWM) {
        return 'wm';
      }
      if (isWin) {
        var isWin2K = sUserAgent.indexOf('Windows NT 5.0') > -1 || sUserAgent.indexOf('Windows 2000') > -1;
        if (isWin2K) return 'Win2000';
        var isWinXP = sUserAgent.indexOf('Windows NT 5.1') > -1 || sUserAgent.indexOf('Windows XP') > -1;
        if (isWinXP) return 'WinXP';
        var isWin2003 = sUserAgent.indexOf('Windows NT 5.2') > -1 || sUserAgent.indexOf('Windows 2003') > -1;
        if (isWin2003) return 'Win2003';
        var isWinVista = sUserAgent.indexOf('Windows NT 6.0') > -1 || sUserAgent.indexOf('Windows Vista') > -1;
        if (isWinVista) return 'WinVista';
        var isWin7 = sUserAgent.indexOf('Windows NT 6.1') > -1 || sUserAgent.indexOf('Windows 7') > -1;
        if (isWin7) return 'Win7';
        var isWin8 = sUserAgent.indexOf('Windows NT 6.2') > -1 || sUserAgent.indexOf('Windows 8') > -1;
        if (isWin8) return 'Win8';
      }
      return 'other';
    },
    GetQueryString: function (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  };
  // 统计代码
  var pdata = {
    getData_url: 'http://pcminitj.dftoutiao.com/MiniPage/miniopen', // 请求传递数据接口修改地址01月17日
    global_uid: '',
    vuid: '',
    clickData_url: 'http://pcminitj.dftoutiao.com/MiniPage/miniclick',
    soft_type: 'MINI',
    soft_name: 'DFTT',
    OSType: common.detectOS(),
    browserType: common.explorerType(),
    _vbb: '0.5.1',
    ishot: 0,
    wayPath: global_qid,
    position: '0',
    urlfrom: 'http://' + window.location.host + window.location.pathname, // 当前url
    Mycookie: function (uid) {
      $.cookie('mini_guid', uid, { expires: 365, path: '/' });
    },
    uidCookie: function (uid) {
      $.cookie('mini_vuid', uid, { expires: 365, path: '/' });
    },
    click_fn: function (urlto, newstype, linkType, idx, btype, subtype, vuid) {
      var that = this;
      var param = this.wayPath + '\t' + this.global_uid + '\t' + this.soft_type + '\t' + this.soft_name + '\t' + newstype + '\t' + this.urlfrom + '\t' + urlto + '\t' + btype + '\t' + subtype + '\t' + idx + '\t' + this.ishot +
        '\t' + this._vbb + '\t' + this.OSType + '\t' + this.browserType + '\t' + this.position + '\t' + linkType + '\t' + this.vuid;
      $.ajax({
        type: 'get',
        url: that.clickData_url + '?param=' + encodeURI(param),
        dataType: 'jsonp',
        jsonp: 'jsonpcallback',
        timeout: 6000,
        success: function (data) {}
      });
    },
    getData_ajax: function (url) {
      var param = this.wayPath + '\t' + this.global_uid + '\t' + this.soft_type + '\t' + this.soft_name + '\t' + this._vbb + '\t' + this.OSType + '\t' + this.browserType + '\t' + this.position;
      $.ajax({
        type: 'get',
        url: url + '?param=' + encodeURI(param),
        dataType: 'jsonp',
        jsonp: 'jsonpcallback',
        timeout: 6000,
        success: function (data) {}
      });
    },
    oneUpdata: function () {
      this.getData_ajax(this.getData_url);
    },
    init: function () {
      var that = this;
      if ($.cookie('mini_vuid') == undefined || $.cookie('mini_vuid') == 'null') {
        that.vuid = common.GetQueryString('vuid');
        that.uidCookie(that.vuid);
      } else {
        that.vuid = ($.cookie('mini_vuid'));
      }
      if (!$.cookie('mini_guid')) {
        that.global_uid = common.getUserId();
        that.Mycookie(that.global_uid);
      } else {
        that.global_uid = ($.cookie('mini_guid'));
      }
      // that.getData_ajax(that.getData_url);
      $(function () {
        $('body').off('click', 'a');
        $('body').on('click', 'a', function () {
          if ($(this).attr('pdata')) {
            var ret = $(this).attr('pdata').split('|');
            var urlto = ret[0],
              linkType = ret[1],
              newstype = ret[2],
              idx = ret[3],
              btype = ret[4],
              subtype = ret[5] || '';
            if (linkType == 0) {
              linkType = 1;
            } else {
              linkType = 0;
            }
            that.click_fn(urlto, newstype, linkType, idx, btype, subtype);
          }
        });
      });
    }
  };
  var init = function () {

    getData();
    pdata.init();

  };

  return {
    init: init
  };


})();

Project.init();
/**
 *
 * 　　　┏┓　　　┏┓
 * 　　┏┛┻━━━┛┻┓
 * 　　┃　　　　　　　┃
 * 　　┃　　　━　　　┃
 * 　　┃　┳┛　┗┳　┃
 * 　　┃　　　　　　　┃
 * 　　┃　　　┻　　　┃
 * 　　┃　　　　　　　┃
 * 　　┗━┓　　　┏━┛Code is far away from bug with the animal protecting
 * 　　　　┃　　　┃    神兽保佑,代码无bug
 * 　　　　┃　　　┃
 * 　　　　┃　　　┗━━━┓
 * 　　　　┃　　　　　 ┣┓
 * 　　　　┃　　　　 ┏┛
 * 　　　　┗┓┓┏━┳┓┏┛
 * 　　　　　┃┫┫　┃┫┫
 * 　　　　　┗┻┛　┗┻┛
 *
 */