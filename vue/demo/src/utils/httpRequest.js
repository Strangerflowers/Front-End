import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'
import { clearLoginInfo,clearLoginAllInfo } from '@/utils'
import {TOKEN_KEY_VALUE} from "@/common/constants"

const http = axios.create({
  timeout: 1000 * 15,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  config.headers['source'] = window.SITE_CONFIG['source']
  config.headers['amsversion'] = window.SITE_CONFIG.appinfo//请求套客户端版本信息
  config.headers['amstoken'] = Vue.cookie.get('amstoken') // 请求头带上token
  config.headers['TGC'] = Vue.cookie.get('TGC') // 请求头带上token
  config.headers['Authorization'] = TOKEN_KEY_VALUE

  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  if(response.status==202){
    return Promise.reject(response)
  }
  if (response.data && response.data.code === 401) { // 401, token失效,删除token
    clearLoginInfo()
    router.push({ name: 'loginforinside' })
  }else if(response.data && response.data.code === 403){//403,用户没有被授权
    clearLoginInfo()
    router.push({ name: 'notauth' })
  }else if(response.data && (response.data.code === 406 || response.data.code === 423)){//406用户生成token出错，重新登录  423用户被禁用，需要返回登录页
    clearLoginAllInfo()
    router.push({ name: 'loginforinside' })
    // window.location.href = 'http://ams.example.org:8001/#/loginforinside'
  }
  return response
}, error => {
  return Promise.reject(error)
})
//自定义请求
http.url
/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl) + actionName
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
