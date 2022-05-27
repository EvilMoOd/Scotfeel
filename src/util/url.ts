/**
 * 获取指定的URL参数值
 * URL:http://www.quwan.com/index?name=tyler
 * 参数：paramName URL参数
 * 调用方法:getParam("name")
 * 返回值:tyler
 */
export function getParam(key: string): string {
  const r = new RegExp('(\\?|#|&)' + key + '=([^&#]*)(&|#|$)');
  const m = location.href.match(r);
  return decodeURI(m == null ? '' : m[2]);
}
// getCookie: function (name) {
//   var RE = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
//   var arr = document.cookie.match(RE);
//   if (arr) {
//     return decodeURI(arr[2]);
//   }
//   return '';
// },
// setCookie: function (key, value, options) {
//   if (arguments.length > 1 && !$.isFunction(value)) {
//     options = $.extend({}, options);

//     if (typeof options.expires === 'number') {
//       var days = options.expires, t = options.expires = new Date();
//       t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
//     }

//     return (document.cookie = [
//       encodeURIComponent(key), '=', encodeURIComponent(value),
//       options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
//       options.path    ? '; path=' + options.path : '',
//       options.domain  ? '; domain=' + options.domain : '',
//       options.secure  ? '; secure' : ''
//     ].join(''));
//   }
// }
