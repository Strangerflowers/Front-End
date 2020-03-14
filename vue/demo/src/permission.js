import Vue from "vue";
import router from "./router";
// import getToken from "./utils/getToken";

var cookies = document.cookie;
cookies = cookies.split("; ");
const cobj = {};
cookies.forEach(item => {
  // 拆分name,value
  var i = item.indexOf("=");
  cobj[item.slice(0, i)] = item.slice(i + 1);
});

// /*获取当前域名 */
let hostObj = {};
hostObj = window.location.host.split(".");
let domain = hostObj[1] + "." + hostObj[2];



// 全局路由守卫
router.beforeEach((to, from, next) => {

  if (to.meta.requireAuth) {
    if ($cookies.get("TGC")) {
      if ($cookies.get("localTGC") == $cookies.get("TGC")) {
        if ($cookies.get("token")) {
          next();
        } else {
          next({ name:'Transfer' })
        }
      } else {
        next({ name:'Transfer' })
      }
      // NProgress.done()
    } else {
      if (document.location.host == "wi-test.gtland.cn") {
        window.location.href =
          "http://authcctr-test.gtland.cn/?service=" +
          encodeURIComponent("http://wi-test.gtland.cn/mgr/");
      } else if (document.location.host == "wi-dev.gtland.cn") {
        window.location.href =
          "http://authcctr-dev.gtland.cn/?service=" +
          encodeURIComponent("http://wi-dev.gtland.cn/mgr/");
      } else if (document.location.host == "wi-pre.myutopa.com") {
        window.location.href =
          "http://authcctr-pre.myutopa.com/?service=" +
          encodeURIComponent("http://wi-pre.myutopa.com/mgr/");
      } else if (document.location.host == "portal-local.gtland.cn:8000") {
        window.location.href =
          "http://authcctr-dev.gtland.cn/?service=" +
          encodeURIComponent("http://portal-local.gtland.cn:8000/#/dashboard");
      } else if (document.location.host == "wi.myutopa.com") {
        window.location.href =
          "http://authcctr.myutopa.com/?service=" +
          encodeURIComponent("http://wi.myutopa.com/mgr/");
      }
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  // NProgress.done() // finish progress bar
});
