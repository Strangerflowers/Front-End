
const Character={
    /**
   * 截取七牛云返回的图片url地址，获取key值
   * @param {*} startIdx 截取开始索引
   * @param {*} value 图片的完整地址
   */
  CaptureImgUrl(startIdx,value){
    let idx = value.indexOf("?")
    return value.slice(startIdx,idx)
  },

   /**
   * 图片回显排序
   * @param {*} prop 要根据排序的字段
   * @param {*} rev true 是升序  false 是降序
   */
  pcompare(prop, rev) {
    // 第二个参数没有传递，默认升序排序
    if (rev === undefined) {
      rev = 1;
    } else {
      rev = rev ? 1 : -1;
    }
    return function(obj1, obj2) {
      // 方括号也是访问对象属性的一种方式，优点是可以通过变量访问。
      // 常规写法是 var val1 = obj1.prop;var val2 = obj2.prop;,但是这种不支持变量写法，所有这里不适用
      var val1 = obj1[prop],
        val2 = obj2[prop];

      // 若是升序排序，此时rev=1,rev*-1=-1,等价于return val1 < val2 ? -1 : 1,，即val1<val2时，val1放在val2前面，否则放后面
      // 若是降序排序，下面句子等价于return val1 < val2 ? 1 : -1，即val1<val2时，val1放在val2后面，否则放在val2前面
      return val1 < val2 ? rev * -1 : rev * 1;
    };
  }
}

export default Character

