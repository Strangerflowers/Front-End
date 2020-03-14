

const Regex={

  /*字母*/
  charReg(value){
    if(value=='' || value == null){
      return true
    }else{
      let rule = new RegExp( "^[A-Za-z]+$", "gi");
      return rule.test(value)
    }

  },
  /*数字*/
  NumBer(value){
    if(value=='' || value == null){
      return true
    }else{
      let rule
      rule = new RegExp( "^[0-9]+$", "gi")
      return rule.test(value)
    }
  },
  /*字母、数字*/
  charOrNum(value){
    if(value=='' || value == null){
      return true
    }else{
      let rule
      rule = new RegExp( "^[A-Za-z0-9]+$", "gi")
      return rule.test(value)
    }
  },
  /*汉字或字母*/
  chineseOrchar(value){
    if(value=='' || value == null){
      return true
    }else{
      let rule = new RegExp( "^[A-Za-z|\u4E00-\u9FA5]+$", "gi");
      return rule.test(value)
    }

  },
  /*非负的浮点数,num为小数位数*/
  precision(value,num){
    if(value=='' || value == null){
      return true
    }else{
      let rule = new RegExp( "^(\\d+)(.\\d{0,"+num+ "})?$", "gi");
      return rule.test(value)
    }
  },

  /*正整数，num为整数位数，不传则不做限制*/
  integer(value,num){
    if(value=='' || value == null){
      return true
    }else{
      if(num >0){
        let rule = new RegExp( "^[1-9](\\d{0,"+(num-1)+ "})?$", "gi");
        // let rule = new RegExp( "^([1-9]+)(\\d{0,"+(num-1)+ "})?$", "gi");
        return rule.test(value)
      }else{
        let rule = new RegExp( "^[1-9]d*$", "gi");
        return rule.test(value)

      }
    }
  },
  /*汉字*/
  chinese(value){
    if(value=='' || value == null){
      return true
    }else{
      let rule = new RegExp( "^[\u4e00-\u9fa5]+$", "gi");
      return rule.test(value)
    }

  },


  /*汉字、字母、特殊字符*/
  chineseOrcharOrSpecial(value,specialChar){
    if(value=='' || value == null){
      return true
    }else{
      let rule
      if(specialChar){
        rule = new RegExp( "^[\u4E00-\u9FA5A-Za-z"+specialChar+"]+$", "gi")
      }else{
        rule = new RegExp( "^[\u4E00-\u9FA5A-Za-z`%~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]+$", "gi")
      }
      return rule.test(value)
    }

  },

  /*汉字、字母、数字、特殊字符*/
  chineseOrcharOrnumOrSpecial(value,specialChar){
    if(value=='' || value == null){
      return true
    }else{
      let rule
      if(specialChar){
        rule = new RegExp( "^[\u4E00-\u9FA5A-Za-z0-9"+specialChar+"]+$", "gi")
      }else{
        rule = new RegExp( "^[\u4E00-\u9FA5A-Za-z0-9`%~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]+$", "gi")
      }
      return rule.test(value)
    }

  },

  /*汉字、字母、数字*/
  chineseOrcharOrnum(value){
    if(value=='' || value == null){
      return true
    }else{
      let rule

        rule = new RegExp( "^[\u4E00-\u9FA5A-Za-z0-9]+$", "gi")

      return rule.test(value)
    }

  },

  /*字母、数字、特殊字符*/
  charOrnumOrSpecial(value,specialChar){
    if(value=='' || value == null){
      return true
    }else{
      let rule
      if(specialChar){
        rule = new RegExp( "^[A-Za-z0-9"+specialChar+"]+$", "gi")
      }else{
        rule = new RegExp( "^[A-Za-z0-9`%~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]+$", "gi")
      }
      return rule.test(value)
    }

  },



  /*数字、特殊字符*/
  numOrSpecial(value,specialChar){
    if(value=='' || value == null){
      return true
    }else{
      let rule
      if(specialChar){
        rule = new RegExp( "^[0-9"+specialChar+"]+$", "gi")
      }else{
        rule = new RegExp( "^[0-9`%~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]+$", "gi")
      }
      return rule.test(value)
    }

  },
    /*手机号码*/
  mobile(value){
    if(value=='' || value == null){
      return true
    }else{
      let rule = new RegExp( "^((11|12|13|14|15|16|17|18|19)[0-9])\\d{8}$", "gi");
      return rule.test(value)
    }
  },

  /*身份证号*/
  IdentityCard(value){
    if(value=='' || value == null){
      return true
    }else{
      // let rule = new RegExp("^[1-9]\\d{5}(18|19|20|(3\\d))\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$", "gi");
      let rule = new RegExp("(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)", "gi");
      return rule.test(value)
    }
  },


  }

  export default Regex

