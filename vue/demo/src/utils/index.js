import Vue from 'vue'
import router from '@/router'
// import store from '@/store'
import moment from 'moment';

//是否为整月
export function computeWholeMonth(start,end){
    let wholeMonthDiff = ((end.year() - start.year()) * 12) + (end.month() - start.month()),
    // b is in (anchor - 1 month, anchor + 1 month)
    // diffDay = start.date() - end.date();
    anchor = start.clone().add(wholeMonthDiff, 'months');
    let isWholeMonth = false;
    //是否同月
    if(wholeMonthDiff == 0){
      let startDay = start.clone().date();
      if(startDay == 1){
        let anchor2 = moment(start.clone().endOf('month').format("YYYY-MM-DD"),"YYYY-MM-DD HH:mm:ss");
        let flag = anchor2.isSame(end)
        isWholeMonth = flag
        if(flag){
          wholeMonthDiff = 1;
        }
      }
    }else{
      let startDay = start.clone().date();
      let temp = false;
      if(end-anchor > 0){
        anchor = start.clone().add(wholeMonthDiff+1, 'months');
        temp = true;
      }
      let startDayAnchor = anchor.date();
      //判断天数是否相等
      if(startDay == startDayAnchor){
        isWholeMonth = anchor.subtract(1, 'days').isSame(end);
      }else{
        isWholeMonth = anchor.isSame(end);
      }
      if(isWholeMonth && temp){
        wholeMonthDiff = wholeMonthDiff+1;
      }
    }
    //是否为整月
    if(isWholeMonth){
      return {flag:true,months:wholeMonthDiff};
    }else{
      let days = Math.abs(start.diff(end,'days'))+1;
      return {flag:false,days:days};
    }
}


//去除换行
export function ClearBr(key) {
  key = key.replace(/<\/?.+?>/g,"");
  key = key.replace(/[\r\n]/g, "");
  return key;
}

//去除字符串两端的空格
export function ClearBlank(key) {
  if(key){
    key = key.replace(/^\s*|\s*$/g,"");
  }
  return key;
}

/**
 * 获取uuid
 */
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth (key) {
  return JSON.parse(sessionStorage.getItem('amspermissions') || '[]').indexOf(key) !== -1 || false
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate (data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * 清除广告登录信息
 */
// export function clearLoginInfo () {
//   Vue.cookie.delete('amstoken')
//   Vue.cookie.delete('amsTGC')
//   Vue.cookie.delete('amsfirstRoute')
//   store.commit('resetStore')
//   router.options.isAddDynamicMenuRoutes = false
// }

// export function clearLoginAllInfo () {
//   Vue.cookie.delete('amstoken')
//   Vue.cookie.delete('amsTGC')
//   Vue.cookie.delete('amsfirstRoute')
//   Vue.cookie.delete('TGC', { domain: window.SITE_CONFIG['TGCDomain'] });
//   store.commit('resetStore')
//   router.options.isAddDynamicMenuRoutes = false
// }
