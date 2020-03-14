import axios from "axios";
import router from "@/router/index"
import UTOCookie from "@/utils/UTOCookie";
import VueCookies from 'vue-cookies'
import vue from 'vue';
import merge from 'lodash/merge'
// 拼接url
// hostObj = window.location.host.split(".")
//  domain = hostObj[1]+'.'+hostObj[2]
// console.log(hostObj)
// url = 'http://'+ hostObj[0]+'.'+hostObj[1]+'.'+ hostObj[2] + '/dashboard/analysis'

const http = axios.create({
  timeout: 1000 * 25,
  withCredentials: true,
  headers: {
    // 'Content-Type': 'application/json; charset=utf-8'
  }
})

function setCookie(key,val,expires){
  var d = new Date();
  d.setDate(d.getDate()+expires);
  document.cookie = key+"="+val+";path=/;expires="+d;
}
function removeCookie(key,val){
  setCookie(key,val,-1)
}
function getCookie(key){
  var cookie = document.cookie;
  var arr = cookie.split("; ");
  for(var i=0;i<arr.length;i++){
      var newArr = arr[i].split("=");
      if(key == newArr[0]){
          return newArr[1];
      }
  }
}
function isIE() {
  //ie?
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    return true;
  } else {
    return false;
  }
}

let hostObj = {}
hostObj = window.location.host.split(".")
let domain = hostObj[1]+'.'+hostObj[2]

// http请求拦截器
http.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/json"

    config.headers.Authorization = "basic PASSTHR";
    // config.headers['X-OS-KERNEL-APPSYSID'] ='65b49810-d395-11e9-9092-fa163e6c79ee'
    config.headers['appSysId'] = 'ddcbdcf4f799fc42e540dd127b8d5ba0'
    //  在发送请求之前做一些事情
    if (config.url === '/os_workinf_admin/app/user/exportXls' || config.url === '/os_workinf_admin/app/admin/export/DmdExcel') {
      config.responseType = 'blob'
    } else {
      config.responseType = 'json'
    }

    if($cookies.get("TGC")){
      let token = $cookies.get('token')
      if (token) {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers["X-OS-KERNEL-TOKEN"] = token
      }
    }else{
      // 高保真
      if(document.location.host=='wi-dev.gtland.cn'){
        window.location.replace(`http://authcctr-dev.gtland.cn/?service=${encodeURIComponent('http://wi-dev.gtland.cn/mgr/')}`)
      }else if(document.location.host=='wi-pre.myutopa.com'){
          window.location.replace(`http://authcctr-pre.myutopa.com/?service=${encodeURIComponent('http://wi-pre.myutopa.com/mgr/')}`)
      }else if(document.location.host=='wi-local.gtland.cn:8000'){
          window.location.replace(`https://authcctr-dev.gtland.cn/?service=${encodeURIComponent('http://portal-local.gtland.cn:8000')}`)
      }else if(document.location.host=='wi.myutopa.com'){
        window.location.href ='http://authcctr.myutopa.com/?service=' + encodeURIComponent('http://wi.myutopa.com/mgr/')
      }else if(document.location.host=='wi-test.gtland.cn'){
        window.location.href ='http://authcctr-test.gtland.cn/?service=' + encodeURIComponent('http://wi-test.gtland.cn/mgr/')
      }
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// http响应拦截器
http.interceptors.response.use(
  response => {
    if(response.data.code == 13001019){
      $cookies.remove('token')
    }
    if(response.data.code == 13001021 || response.data.code == 11001020 ||response.data.code == 13001022){
      $cookies.remove('TGC','/',domain)
      $cookies.remove('token')
      localStorage.removeItem("userinfo")
      if($cookies.get('TGC')){

      }else{
        if(document.location.host=='wi-dev.gtland.cn'){
          window.location.replace(`http://authcctr-dev.gtland.cn/?service=${encodeURIComponent('http://wi-dev.gtland.cn/mgr/')}`)
        }else if(document.location.host=='wi-pre.myutopa.com'){
            window.location.replace(`http://authcctr-pre.myutopa.com/?service=${encodeURIComponent('http://wi-pre.myutopa.com/mgr/')}`)
        }else if(document.location.host=='portal-local.gtland.cn:8000'){
            window.location.replace(`https://authcctr-dev.gtland.cn/?service=${encodeURIComponent('http://portal-local.gtland.cn:8000')}`)
        }else if(document.location.host=='wi.myutopa.com'){
          window.location.href ='http://authcctr.myutopa.com/?service=' + encodeURIComponent('http://wi.myutopa.com/mgr/')
        }
      }
    }
    //  用响应数据做一些事情
    return response;
  },
  error => {
    console.log('status',error)
    if (error.response.status) {
      switch (error.response.data.code) {
          // tgc过期需要清除之前保存的cookie，以及localStorag里面的值，跳转到登录页面
          case 11001020:console.log('401',error.response.data.message)
          // vue.prototype.$message(error.response.data.message)
            $cookies.remove('TGC','/',domain)
            $cookies.remove('token')
            localStorage.removeItem("userinfo")
              // router.replace({
              //     path: '/login',
              //     query: {
              //         redirect: router.currentRoute.fullPath
              //     }
              // });
              break;

          //
          case 13001021:
              $cookies.remove('TGC','/',domain)
              $cookies.remove('token')
              localStorage.removeItem("userinfo")
              //  Toast({
              //     message: '登录过期，请重新登录',
              //     duration: 1000,
              //     forbidClick: true
              // });
              // // 清除token
              // localStorage.removeItem('token');
              // store.commit('loginSuccess', null);
              // // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
              // setTimeout(() => {
              //     router.replace({
              //         path: '/login',
              //         query: {
              //             redirect: router.currentRoute.fullPath
              //         }
              //     });
              // }, 1000);
              break;

          // 404请求不存在
          case 13001022:
              $cookies.remove('TGC','/',domain)
              $cookies.remove('token')
              localStorage.removeItem("userinfo")
              // Toast({
              //     message: '网络请求不存在',
              //     duration: 1500,
              //     forbidClick: true
              // });
              break;
          case 13001019:$cookies.remove('token')
            break;
          case 13001011:$cookies.remove('token')
            setTimeout(() => {
              router.push({
                  path: '/transfer',
              });
            }, 500);
            break;

          // 其他错误，直接抛出错误提示
          default:
              // vue.prototype.$message(error.response.data.message)
              // console.log('其他',error.response.data.message)
              // Toast({
              //     message: error.response.data.message,
              //     duration: 1500,
              //     forbidClick: true
              // });
      }
      return Promise.reject(error.response);
    }
  }
);

//自定义请求
http.url
/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  // return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.Utopa.BASE_API) + actionName
  return  actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    't': new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http

