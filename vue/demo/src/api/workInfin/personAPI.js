import { requestfun, requestfunPost,requestfunE } from '@/api/apifun.js'

// workinf调用用户中心_分页列表查询
export function getPersonData(params) {
  return requestfun("post", "/os_workinf_admin/app/user/queryPageList", params)
}
// workinf调用用户中心_添加用户
export function addPersonUser(params) {
  return requestfun("post", "/os_workinf_admin/app/user/add",params)
}
// 函数查重函数
export function checka(params){
  return requestfun("post","/os_kernel_userorgctr/app/user/verifyAdd",params)
}
// 启用禁用
export function enablePolice(params){
  return requestfun("get","/os_workinf_admin/app/user/updateStatus",params)
}
// workinf调用用户中心_根据ID查询
export function getEditUser(params){
  return requestfun("get","/os_workinf_admin/app/user/queryByUserId",params)
}
//workinf调用用户中心_编辑用户
export function editUser(params){
  return requestfun("post","/os_workinf_admin/app/user/edit",params)
}
//workinf调用用户中心_查询我的机会
export function getMyChance(params){
  // return requestfun("post","/os_workinf_admin/app/admin/myAcceptDemandList",params)
  return requestfun("post","/os_workinf_admin/app/admin/queryPageMyAccept",params)
}
//workinf调用用户中心_查询我的需求
export function getMyRelease(params){
  return requestfun("post","/os_workinf_admin/app/admin/list",params)
}
// workinf-导出excel
export function exportXls(params){
  return requestfun("post","/os_workinf_admin/app/user/exportXls",params)
}
// workinf调用用户中心_查询机会和需求
export function getQueryDemandAndChance(params){
  return requestfun("get","/os_workinf_admin/app/admin/queryDemandAndChance",params)
}
// workinf查询所有城市
export function getCity(){
  return requestfunPost("get","/os_kernel_appsysctr/app/district/getAllCity")
}
// workinf调用用户中心_查看用户简历
export function getQueryUserResumePicList(params){
  return requestfun("post","/os_workinf_admin/app/user/queryUserResumePicList",params)
}

//后台 用户【通过认证】接口
export function updateAuditStatus(params){
  return requestfun("post","/os_workinf_admin/app/user/permit",params)
}


