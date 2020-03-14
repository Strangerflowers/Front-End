
const func={
    /**
   * 获取当前域名
   * @param {*} startIdx 截取开始索引
   * @param {*} value 图片的完整地址
   */
    stringToUpper(str){
        return str.toUpperCase()
    },
  
   /**
   * 跳转地址
   * @param {*}
   * @param {*}
   */
    getUrl() {
        var hostStr = window.location.host.split('.')[0]
        if(document.location.host.indexOf('test') !=-1){
  
            window.location.replace(`http://${hostStr}.authcctr-test.gtland.cn/?service=${encodeURIComponent(`http://${hostStr}.userorgctr-test.gtland.cn/userorgctr/user/list`)}`)
  
        }else if(document.location.host.indexOf('dev') !=-1){
  
            window.location.replace(`http://${hostStr}.authcctr-dev.gtland.cn/?service=${encodeURIComponent(`http://${hostStr}.userorgctr-dev.gtland.cn/userorgctr/user/list`)}`)
  
        }else if(document.location.host.indexOf('poc') !=-1){
  
            window.location.replace(`http://${hostStr}.authcctr-poc.utopaos.cn/?service=${encodeURIComponent(`http://${hostStr}.userorgctr-poc.utopaos.cn/userorgctr/user/list`)}`)
  
        }else if(document.location.host.indexOf('local') !=-1){
  
            window.location.replace(`http://${hostStr}.authcctr-dev.gtland.cn/?service=${encodeURIComponent(`http://${hostStr}.userorgctr-local.gtland.cn:8000/userorgctr/user/list`)}`)
  
        }else if(document.location.host.indexOf('utopaos') !=-1){
  
            window.location.replace(`http://${hostStr}.authcctr.utopaos.cn/?service=${encodeURIComponent(`http://${hostStr}.userorgctr.utopaos.cn/userorgctr/user/list`)}`)
        }
  
    }
  
  
  }
  
  export default func
  
  