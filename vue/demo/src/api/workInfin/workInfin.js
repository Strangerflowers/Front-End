import { requestfun, requestfunPost,requestfunE } from '@/api/apifun.js'

//1.查询进行中的需求
export function getHaving(params) {
  return requestfun("post", "/os_workinf_admin/app/admin/queryUnderwayDemandList", params)
}
// 2.查询已完成的需求
export function getCompleted(params) {
  return requestfun("post", "/os_workinf_admin/app/admin/queryCompletedDemandList",params)
}
// 3.查询已延时的需求
export function getDelayedDemandList(params){
  return requestfun("post","/os_workinf_admin/app/admin/queryDelayedDemandList",params)
}
//4.查询需求状态统计
export function queryDemandStatus(){
  return requestfunPost("post","/os_workinf_admin/app/admin/queryDemandStatus")
}
// 查看编辑查询
export function getEditList(params){
  return requestfun("get","/os_workinf_app/api/project/queryByDmid",params)
}
// // 测试
// export function saveAssetInfo(params){
//   return requestfun("post","/os_workinf_admin/app/user/queryPageList",params)
// }
// // 更新
// export function updateAssetInfo(params){
//   return requestfun("post","/os_kernel_assetctr/app/asset/updateAssetInfo",params)
// }

// // 查看页面
// export function showAssetInfoById(params){
//   return requestfun("get","/os_kernel_assetctr/app/asset/showAssetInfoById/"+params)
// }

// export function getUnitContract(params){
//   return requestfun("post","/os_lms_contract/app/contract/contract/getContractListByAssId",params)
// }
// // 获取省份
// export function getProvinces(){
//   return requestfunPost("get","/os_kernel_appsysctr/app/district/loadDistrictByParentId")
// }

// // 获取City
// export function getCity(params){
//   return requestfun("get","/os_kernel_appsysctr/app/district/loadDistrictByParentId?parentId="+params)
// }

// // 资产树省份数据
// export function getRegionTreeData(params){
//   return requestfun("get","/os_kernel_appsysctr/app/district/loadDistrictByParentId?parentId="+params)
// }
