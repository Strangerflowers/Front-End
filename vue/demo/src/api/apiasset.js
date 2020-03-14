import { requestfun, requestfunPost,requestfunE } from '@/api/apifun.js'

//图片回显
export function showPicture(params) {
  return requestfun("post", "/generator/pointposition/photo", params)
}
// 获取数据列表
export function getDataList(params) {
  return requestfun("get", "/generator/pointposition/list", params)
}
//点击禁用
export function stoppoint(params) {
  return requestfun("get", "/generator/pointposition/disable", params)
}
//点击禁用
export function getbackpoint(params) {
  return requestfun("get", "/generator/pointposition/enable", params)
}
//获取资源分级
export function getResourceCtf() {
  return requestfunPost("get", "/generator/amsresourcetype/point_type")
}
//获取资源类型
export function getResourceIds(params) {
  return requestfun("get", "/os_kernel_assetctr/app/assetAdvert/resourceType/all", params)
}
//获取资源应用对象
export function getResourceAppIds() {
  return requestfunPost("get", "/os_kernel_assetctr/app/assetAdvert/type/resource_application_object")
}
//获取媒体分类
export function getMediaCfts() {
  return requestfunPost("get", "/generator/sysdict/media_type")
}
//获取所属项目
export function getProjects() {
  return requestfunPost("get", "/generator/project/all")
}
//获取所属地块
export function getMassifs(params) {
  return requestfun("get", "/generator/project/linkage", params)
}
//获取所属建筑物
export function getBuildings(params) {

  return requestfun("get", "/generator/project/linkage", params)
}
//获取所属楼层
export function getFloors(params) {
  return requestfun("get", "/generator/estateattr/floorList", params)
}
//获取点位位置
export function getPointPositions() {
  return requestfunPost("get", "/generator/sysdict/point_position")
}
//获取投放状态
export function getServingStatuses() {
  return requestfunPost("get", "/generator/sysdict/serving_status")
}
//导出
export function exportExcel(params) {
  return requestfunE("get", "/generator/pointposition/export", params, "arraybuffer", { filename: "utf-8" })
}
//新增点位表单提交
export function dataFormSubmit(data) {
  return requestfun("post", "/generator/pointposition/save", data)
}
//新增点位项目下拉
export function getProject() {
  return requestfunPost("get", "/generator/project/notDel")
}
//获取时间单位
export function getUnits() {
  return requestfunPost("get", "/generator/sysdict/time_unit")
}
//编辑点位获取项目数组
export function getProjectss(projectId) {
  return requestfunPost("get", "/generator/project/info/" + projectId)
}
//编辑点位获得地块数组
export function getMassifss(massifId) {
  return requestfunPost("get", "/generator/projectinfo/info/" + massifId)
}
//编辑点位获得建筑物数组
export function getBuild(buildingId) {
  return requestfunPost("get", "/generator/projectinfo/info/" + buildingId)
}
//编辑点位点击保存
export function pointupdatecomplete(params) {
  return requestfun("post", "/generator/pointposition/update", params)
}
//编辑点位初始化
export function updataifo(id) {
  return requestfunPost("get", "/generator/pointposition/info/" + id)
}
//点位投放记录
export function getlist(params) {
  return requestfun("get", "/generator/schedule/query/allrecord", params)
}
//多选下拉框联动
export function multipleSelect(data) {
  return requestfun("post", "/generator/project/multiple", data)
}
//获取该项目下所有建筑物
export function getAllBuildings(data) {
  return requestfun("post", "/generator/project/allBuilding", data)
}
//点位详情

export function pointifo(data) {
  return requestfun("get", "/generator/externalUser/pointInfo", data)
}

//获取该点位同类型的资源类型
export function getThisPointResourceIds(params) {
  return requestfun("get", "/generator/resourcetype/point", params)
}
