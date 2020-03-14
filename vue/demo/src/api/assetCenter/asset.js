import { requestfun, requestfunPost,requestfunE } from '@/api/apifun.js'

//获取资产树表格数据
export function getAssetTableData(params) {
  return requestfun("post", "/os_kernel_assetctr/app/asset/queryByAssetIdPage", params)
}
//获取列表展示页的下拉框数据
export function getDropDataAssetList() {
  return requestfunPost("post", "/os_kernel_assetctr/app/asset/queryDropDataAssetList")
}
// 启用禁用
export function updateAssetStatus(params){
  return requestfun("post","/os_kernel_assetctr/app/asset/updateAssetStatus",params)
}

// 新增编辑资产树
export function getAssetInfoById(params){
  return requestfun("get","/os_kernel_assetctr/app/asset/getAssetInfoById/" + params)
}

// 新增下拉
export function getAddOrUpdateDropDataAssetList(){
  return requestfunPost("post","/os_kernel_assetctr/app/asset/addOrUpdateDropDataAssetList")
}
// 保存
export function saveAssetInfo(params){
  return requestfun("post","/os_kernel_assetctr/app/asset/saveAssetInfo",params)
}
// 更新
export function updateAssetInfo(params){
  return requestfun("post","/os_kernel_assetctr/app/asset/updateAssetInfo",params)
}

// 查看页面
export function showAssetInfoById(params){
  return requestfun("get","/os_kernel_assetctr/app/asset/showAssetInfoById/"+params)
}

export function getUnitContract(params){
  return requestfun("post","/os_lms_contract/app/contract/contract/getContractListByAssId",params)
}
// 获取省份
export function getProvinces(){
  return requestfunPost("get","/os_kernel_appsysctr/app/district/loadDistrictByParentId")
}

// 获取City
export function getCity(params){
  return requestfun("get","/os_kernel_appsysctr/app/district/loadDistrictByParentId?parentId="+params)
}

// 资产树省份数据
export function getRegionTreeData(params){
  return requestfun("get","/os_kernel_appsysctr/app/district/loadDistrictByParentId?parentId="+params)
}
