import {
    requestfun,
    requestfunPost,
    requestfunE
} from '@/api/apifun.js'

//获取资产树表格数据
export function getDmdType() {
    return requestfunPost("get", "/os_kernel_appsysctr/app/dictionary/dictionarytype/getTypesByParentId/535")
}
// // 获取列表展示页的下拉框数据
// export function getRequireSkill(params) {
//     return requestfun("get", "/os_kernel_appsysctr/app/dictionary/dictionaryitem/getDictionaryItemByTypeId" , params)
// }
// 需求列表（分页以及多条件查询）
export function getDemList(params) {
    return requestfun("post", "/os_workinf_admin/app/admin/queryDemandPageListAsAdmin", params)
}

// 编辑回填接口（分页以及多条件查询）
export function getEditItem(params) {
    return requestfun("post", "/os_workinf_admin/app/admin/queryDemandPageListAsAdmin", params)
}

// 编辑
export function updateEdit(params) {
    console.log('这是发送给后端的数据：', params)
    console.log(typeof params)
    return requestfun("post", "/os_workinf_admin/app/admin/editAsAdmin", params)
}

// 编辑回填阶段接口
export function updateEditStage(params) {
    return requestfun("get", "/os_workinf_app/api/project/queryByDmid", params)
}

// 获取所需技能
export function getRequireSkill(params) {
    return requestfun("get", "/os_kernel_appsysctr/app/dictionary/dictionaryitem/getDictionaryItemByTypeId", params)
}

// 新增下拉
export function getDemEdit(params) {
    return requestfun("post", "/os_workinf_admin/app/admin/queryDemandPageListAsAdmin", params)
}
// 根据需求id查询投标人表
export function getReloes(params) {
    return requestfun("post", "/os_workinf_admin/app/admin/queryDemandBidderListByDemandId", params)
}
// 搜索列表接包人
export function getSearchPerson(params) {
    return requestfun("post", "/os_workinf_admin/app/admin/queryDemandBidderList", params)
}

// admin回显需求过程
export function getDemandId(params) {
    return requestfun("post", "/os_workinf_admin/app/admin/queryDemandProcessByDemandId", params)
}


// // 查看页面
// export function showAssetInfoById(params){
//   return requestfun("get","/os_kernel_assetctr/app/asset/showAssetInfoById/"+params)
// }

export function getDistrictName() {
    return requestfunPost("get", "/os_kernel_appsysctr/app/district/getAllCity")
}


export function saveAssetInfo(params) {
    return requestfun("post", "/os_workinf_admin/app/user/queryPageList", params)
}
export function addDemand(params) {
    //return requestfun("post", "/app/demand/addAsAdmin",params)
    return requestfun("post", "/os_workinf_admin/app/admin/addAsAdmin", params)
}
export function showData(params) {
    return requestfun("post", "/os_workinf_admin/app/admin/queryDemandProcessByDemandId", params)
}



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


// export function getRequireSkill() {
//   return requestfunPost("get","/os_kernel_appsysctr/app/dictionary/dictionaryitem/getDictionaryItemByTypeId/?typeId='+val'")
// }
// axios.get("os_kernel_appsysctr/app/dictionary/dictionaryitem/getDictionaryItemByTypeId/?typeId=" + val)
//查询待办
export function getTodolist(params) {
    return requestfun("post", "/os_workinf_app/app/flowable/getUserTaskListByAcc", params)
}
//查需求列表
export function getDemlist(params) {
    return requestfun("post", "/os_workinf_app/app/demand/queryDemandListByDmdIds", params)
}
//通过或驳回
export function passOrReject(params) {
    return requestfun("post", "/os_workinf_admin/app/admin/adminExamineDemand", params)
}
//获取需求列表的接包人
export function getReceiver(params) {
    return requestfun("post", "/os_workinf_admin/app/admin/queryDemandBidderList", params)
  }

  // 导出需求接口
  export function exportXls(params){
    return requestfun("post","/os_workinf_admin/app/admin/export/DmdExcel",params)
  }
