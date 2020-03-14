require('./js-cookie');
var UTOCookie = (function () {
    if (!(document.cookie || navigator.cookieEnabled)) {
      // alert('请打开cookie，否则可能导致部分功能无法使用!');
    } else {
      return {
        set: function (key, val, day, path) {
          Cookies.set(key, val, { expires: day || 1, path: path || '' })
        },
        clear: function (key) {
          Cookies.remove(key, { path: '' });
        },
        get: function (key) {
          return Cookies.get(key) || ""
        }
      }
    }
  })();
  export default UTOCookie;