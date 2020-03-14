import axios from "axios";
import UTOCookie from "@/utils/UTOCookie";
import VueCookies from 'vue-cookies';
import vue from 'vue';
// 拼接url
// hostObj = window.location.host.split(".")
//  domain = hostObj[1]+'.'+hostObj[2]
// console.log(hostObj)
// url = 'http://'+ hostObj[0]+'.'+hostObj[1]+'.'+ hostObj[2] + '/dashboard/analysis'
function setCookie(key, val, expires) {
    var d = new Date();
    d.setDate(d.getDate() + expires);
    document.cookie = key + "=" + val + ";path=/;expires=" + d;
}

function removeCookie(key, val) {
    setCookie(key, val, -1)
}

function getCookie(key) {
    var cookie = document.cookie;
    var arr = cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var newArr = arr[i].split("=");
        if (key == newArr[0]) {
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

// http请求拦截器
axios.interceptors.request.use(
    config => {
        config.headers.Authorization = "basic PASSTHR";
        // console.log('http请求')
        //  在发送请求之前做一些事情
        if (UTOCookie.get("TGC")) {

            let token = isIE() ? $cookies.get('token') : UTOCookie.get("token");
            config.headers["X-OS-KERNEL-TOKEN"] = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwdGVzdCIsInVzZXJfbmFtZSI6InB0ZXN0IiwiX3VzZXJfbmFtZSI6InB0ZXN0566h55CG5ZGYIiwiZXhwIjoxNTc4NTc2NDI4LCJ1c2VySWQiOiIwZTA4ZTE1M2IwNGExMWU5YjMxYmIwNmViZjE0YTQ3NiJ9.WEvLz0PNLzBSYe2kwFtQn5kr1S3_rdOMuw5u0DyE-Xw';
            // if (token) {
            //   // console.log('token',token)
            //   // 判断是否存在token，如果存在的话，则每个http header都加上token
            //   config.headers["X-OS-KERNEL-TOKEN"] = token;
            // }
        } else {
            // 高保真
            if (document.location.host == 'userorgctr-dev.gtland.cn') {
                window.location.replace(`http://authcctr-dev.gtland.cn/?service=${encodeURIComponent('http://userorgctr-dev.gtland.cn/userorgctr/user/list')}`)
            } else if (document.location.host == 'userorgctr-pre.myutopa.com') {
                window.location.replace(`http://authcctr-pre.myutopa.com/?service=${encodeURIComponent('http://userorgctr-pre.myutopa.com/userorgctr/user/list')}`)
            } else if (document.location.host == 'userorgctr-local.gtland.cn:8000') {
                window.location.replace(`https://authcctr-dev.gtland.cn/?service=${encodeURIComponent('http://www.gtland.cn:8000/userorgctr/user/list')}`)
            } else if (document.location.host == 'userorgctr.myutopa.com') {
                window.location.replace(`http://authcctr.myutopa.com/?service=${encodeURIComponent('http://userorgctr.myutopa.com/userorgctr/user/list')}`)
            }
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
// http响应拦截器
axios.interceptors.response.use(
    response => {

        if (response.data.code == 13001021) {

            let hostObj = {}
            hostObj = window.location.host.split(".")
            let domain = hostObj[1] + '.' + hostObj[2]
                // this.$cookies.remove('TGC','/',domain)
            vue.cookies.remove('TGC', '/', domain)
            UTOCookie.clear('token')
            localStorage.removeItem("userinfo")
            if (UTOCookie.get('TGC')) {

            } else {
                if (document.location.host == 'userorgctr-dev.gtland.cn') {
                    window.location.replace(`http://authcctr-dev.gtland.cn/?service=${encodeURIComponent('http://userorgctr-dev.gtland.cn/userorgctr/user/list')}`)
                } else if (document.location.host == 'userorgctr-pre.myutopa.com') {
                    window.location.replace(`http://authcctr-pre.myutopa.com/?service=${encodeURIComponent('http://userorgctr-pre.myutopa.com/userorgctr/user/list')}`)
                } else if (document.location.host == 'userorgctr-local.gtland.cn:8000') {
                    window.location.replace(`http://authcctr-dev.gtland.cn/?service=${encodeURIComponent('http://www.gtland.cn:8000/userorgctr/user/list')}`)
                } else if (document.location.host == 'userorgctr.myutopa.com') {
                    window.location.replace(`http://authcctr.myutopa.com/?service=${encodeURIComponent('http://userorgctr.myutopa.com/userorgctr/user/list')}`)
                }
            }
        }
        // Indicator.close(); //关闭loading
        //  用响应数据做一些事情
        return response;
    },
    err => {
        return Promise.reject(err);
    }
);