/*
 * @Author: kevin
 * @Date:   2015-11-13 11:46:23
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-23 16:32:09
 */

var Project = (function () {

   var test = function () {
    $('.nano').nanoScroller({
        scroll: 'top',
        alwaysVisible: true
      });
      $('.mini-more_msg').on('click', function () {
        var elm = $('.nano');
        var elmH = elm.nanoScroller({ scrollTop: elmH });
      });
   };

    var init = function () {

        test();

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
