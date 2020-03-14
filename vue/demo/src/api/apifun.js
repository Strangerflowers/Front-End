import httpRequest from '@/utils/http'
//全参数请求
export function requestfun(method, url, params) {
  return httpRequest({
    method: method,
    url: httpRequest.adornUrl(url),
    params: method === "get" ? httpRequest.adornParams(params) : null,
    data: method === "post" ? httpRequest.adornData(params) : null
  })

}
//不带参数请求
export function requestfunPost(method, url) {
  return httpRequest({
    method: method,
    url: httpRequest.adornUrl(url),
    params: method === "get" ? httpRequest.adornParams() : null,
    data: method === "post" ? httpRequest.adornData() : null
  })
}
//删除专有api
export function requestfunDelete(method, url, params,headers) {
  return httpRequest({
    method: method,
    url: httpRequest.adornUrl(url),
    params: method === "get" ? httpRequest.adornParams(params) : null,
    data: method === "post" ? httpRequest.adornData(params, false) : null,
    headers:headers?headers:{}
  })

}
//导出
export function requestfunE(method, url, params, responseType, headers) {
  return httpRequest({
    method: method,
    url: httpRequest.adornUrl(url),
    params: method === "get" ? httpRequest.adornParams(params) : null,
    data: method === "post" ? httpRequest.adornData(params) : null,
    responseType: responseType,
    headers: headers
  })

}
