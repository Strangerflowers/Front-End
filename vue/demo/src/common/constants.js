export const AUTHORITY_KEY = 'sys:auth:key'
export const USER_TOKEN_KEY = 'sys:user:token'
export const USER_ID_KEY = 'sys:user:id'
export const PERMISSION_BUTTON_KEY = 'sys:permission:key'


export const PAGINATION_PAGENO = 1
export const PAGINATION_PAGESIZE = 50
export const PAGINATION_PAGETOTAL = 0

//
export const INTERFACE_VERSION = '1.0'
export const SESSION_REQUEST = 'account.session.gen'
export const RENEW_SESSION_REQUEST = 'account.session.renew'
export const RENEW_TOKEN_REQUEST = 'account.access.renewToken'

export const RENEW_REQUEST_TIMES = 3

export const QINIU_REQUEST_BASEURL = 'http://ox2m2b48s.bkt.clouddn.com/'
export const QINIU_UPLOAD_HTTP_URL = 'http://upload-z2.qiniu.com'
export const QINIU_UPLOAD_HTTPS_URL = 'https://up-z2.qbox.me/'

// code
export const SESSION_EXPIRE = 99950001           // 会话过期
export const SESSION_RENEW = 99950002            // 会话续约
export const INVALID_SESSION = 99950003          // 无效会话
export const INVALID_SIGN = 99950004             // 签名失败

export const NOT_LOGIN_USER = 99950005           // 未登录用户
export const TOKEN_EXPIRE = 99950006             // 令牌过期
export const TOKEN_RENEW = 99950007              // 令牌续约

export const TOKEN_KEY_VALUE = 'basic PASSTHR'

// 客户端|平台类型
export const CLIENT_TYPES = {
  // 优托邦
  UTOPA: 1,
  // 小Q
  LITTLEQ: 2,
  // liber
  LIBER: 3,
  // 设计师
  DESIGNER: 4,
  // 运营平台
  OPERATION_PLATFORM: 5,
  // 优托邦商家端APP
  UTOPA_MERCHANT: 6,
  // 小Q商家端APP
  XIAOQ_MERCHANT: 7,
  // 优托邦智能楼宇平台
  INTEL_BUILDING_PLATFORM: 8,
  // crm平台
  CRM: 9
}

// 登录类型
export const LOGIN_TYPES = {
  ACCOUNT_PASS: 2,
  LOGINNAME_PASS: 5
}
