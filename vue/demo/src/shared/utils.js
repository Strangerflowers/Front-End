export function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(H)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18
export function formatDate(date, fmt)
{ //author: meizz
  let o = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(let k in o)
    if(new RegExp("("+ k +")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  return fmt;
}

export const floatCompute={
    floatAdd(arg1,arg2){
      let r1,r2,m;
      try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
      try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
      m=Math.pow(10,Math.max(r1,r2));
      return (arg1*m+arg2*m)/m;
    } ,
    floatSub(arg1,arg2){
      let r1,r2,m,n;
      try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
      try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
      m=Math.pow(10,Math.max(r1,r2));
      n=(r1>=r2)?r1:r2;
      return ((arg1*m-arg2*m)/m).toFixed(n);
    } ,
    floatMul(arg1,arg2) {
      let m=0,s1=arg1.toString(),s2=arg2.toString();
      try{m+=s1.split(".")[1].length}catch(e){}
      try{m+=s2.split(".")[1].length}catch(e){}
      return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
    } ,
    floatDiv(arg1,arg2){
      let t1=0,t2=0,r1,r2;
      try{t1=arg1.toString().split(".")[1].length}catch(e){}
      try{t2=arg2.toString().split(".")[1].length}catch(e){}

      r1=Number(arg1.toString().replace(".",""));

      r2=Number(arg2.toString().replace(".",""));
      return (r1/r2)*Math.pow(10,t2-t1);
    }
  }


//将字符串转换为日期 - by cld
export function str2Date (str) {
  if(str == null) {
    return null
  }
  let pattern = str.replace("yyyy", "(\\~1{4})").replace("yy", "(\\~1{2})")
    .replace("MM", "(\\~1{2})").replace("M", "(\\~1{1,2})")
    .replace("dd", "(\\~1{2})").replace("d", "(\\~1{1,2})").replace(/~1/g, "d");

  let returnDate;
  if (new RegExp(pattern).test(this)) {
    let yPos = str.indexOf("yyyy");
    let mPos = str.indexOf("MM");
    let dPos = str.indexOf("dd");
    if (mPos == -1) mPos = str.indexOf("M");
    if (yPos == -1) yPos = str.indexOf("yy");
    if (dPos == -1) dPos = str.indexOf("d");
    let pos = new Array(yPos + "y", mPos + "m", dPos + "d").sort();
    let data = { y: 0, m: 0, d: 0 };
    let m = this.match(pattern);
    for (let i = 1; i < m.length; i++) {

      if (i == 0) return;
      let flag = pos[i - 1].split('')[1];
      data[flag] = m[i];
    };

    if (data.y.toString().length == 2) {
      data.y = parseInt("20" + data.y);
    }
    data.m = data.m - 1;
    returnDate = new Date(data.y, data.m, data.d);
  }
  if (returnDate == null || isNaN(returnDate)) returnDate = new Date();
  return returnDate;
}
