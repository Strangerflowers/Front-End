import { requestfun, requestfunPost,requestfunE } from '@/api/apifun.js'
// 获取token
export function getToken(params){
  return requestfun("get","/os_kernel_authcctr/app/authc/token/get", params)
}
// 获取角色
export function getRoles(params){
  return requestfun("get","/os_kernel_userorgctr/app/user/queryRoleByUserId", params)
}
// 获取账号信息
export function getUserDetail(params){
  return requestfun("get","/os_kernel_userorgctr/app/user/queryByUserId", params)
}
// 验证旧密码是否正确
export function VerifyOldPassword(params){
  return requestfun("post","/os_kernel_userorgctr/app/user/verifyPwd", params)
}
// 修改密码
export function changePassword(params){
  return requestfun("post","/os_kernel_userorgctr/app/user/editPwd", params)
}
// 获取拥有系统
export function getSytemItem(params){
  return requestfun("get","/os_kernel_appsysctr/app/appsys/queryByUserId", params)
}


