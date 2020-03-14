// import request from '@/common/ajax'
import httpRequest from '@/utils/httpRequest'

export function getQiNiuToken() {
  return this.$http.post('common.upload.getUpToken')
}
import axios from 'axios'

/**
 * 获取七牛图片访问URL
 * @param key     七牛图片key
 * @param width
 * @param height
 * @param watermarkUrl
 * @param gravity
 * @param dissolve
 * @param scale
 * @returns {*|AxiosPromise}
 */
const fetchImageUrlByQiniuKey = function getImageUrlByQiniuKey(key) {
  return httpRequest(
    {
      url: httpRequest.adornUrl('/common/upload/getUrlByKey'),
      method: 'post',
      data: {
        key
      }
    })
}
export const getImageUrlByQiniuKey = fetchImageUrlByQiniuKey

export function getImageUrlByQiniuKeyAdapter(key) {
  return fetchImageUrlByQiniuKey(key)
}

// export function getImageUrlByQiniuKeyTong(key, width, height) {
//   // return httpRequest.post({
//   //   reqMethod: 'common.upload.getUrlByKey',
//   //   async: false,
//   //   params: { key, width, height }
//   // })
//   return httpRequest(
//     {
//       url: httpRequest.abornUrl('common/upload/getUrlByKey'),
//       method: 'post',
//       async: false,
//       params: {
//         key, width, height
//       }
//     }
//   )
// }
