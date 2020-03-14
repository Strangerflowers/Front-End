function getlocalhostUlr() {
  let url = window.location.href
  console.log(url.indexOf('localhost:'))
  return url.indexOf('localhost:') != -1
}

/*开发环境 */
const gateWaydev = {
  "lmsRent":"/os_lms_rent",
  "lmsContract":"/os_lms_contract",
  "kernelAppsysctr":"/os_kernel_appsysctr",
  "kernelDatactr":"/os_kernel_datactr",
  "kernelClientctr":"/os_kernel_clientctr",
  "kernelAssetctr":"/os_kernel_assetctr",
  "kernelMsgctr":"/os_kernel_msgctr"
}

/*本地*/
const gateWayloc = {
  lmsRent: '',
  lmsContract: '',
  kernelAppsysctr: '',
  kernelDatactr: '',
  kernelClientctr: '',
  kernelAssetctr: '',
  kernelMsgctr:''
}

const gateWay = getlocalhostUlr() ? gateWayloc : gateWaydev

export default gateWaydev
