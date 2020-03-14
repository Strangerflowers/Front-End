<template>
  <div class="detail" style="position:relative">
    <!-- class="modal fade" -->
    <div class="detail-header">
      用户详细资料查看
      <div class="header-right">
        <button class="btn1 btn btn-primary btn-block" type="primary"  @click="returnDetail" v-if="isShow">返回</button>
        <button class="btn1 btn btn-primary btn-block" type="primary" @click="returnhome"  v-else>返回</button>
      </div>
    </div>
    <b-row class="detail-content">
      <b-col lg="3" sm="3">
        <div class="username-detail-container-left">
          <div class="user-detail-left-img" style>
            <img src="~@/assets/img/user.png" alt class="user-pic" style />
            <div class="usrname-name">{{user.userName}}</div>
          </div>
        </div>
      </b-col>
      <b-col lg="9" sm="9">
        <div class="detail-container-right" v-show="!isShow">
          <div class="container-box">
            <b-row>
              <b-col lg="6" sm="6">
                <div class="detail-left" style>
                  <div>
                    <div class="personal-data-left">
                      <div class="detail-item">
                        <div class="detail-title">
                          <span>工号:</span>
                        </div>
                        <div class="detail-value">{{user.workNum}}</div>
                      </div>
                      <div class="detail-item">
                        <div class="detail-title">
                          <span>用户姓名:</span>
                        </div>
                        <div class="detail-value">{{user.userName}}</div>
                      </div>
                      <div class="detail-item">
                        <div style="display:inline-block;">
                          <div class="detail-title">
                            <span>密码:</span>
                            <button class="change-psw btn-height  btn btn-outline-primary " size="small" @click="showChange">修改密码</button>
                          </div>
                        </div>

                      </div>
                      <div class="detail-item">
                        <div class="detail-title">
                          <span>性别:</span>
                        </div>
                        <div class="detail-value">
                          <span v-show = "user.gender==1">
                            男
                          </span>
                          <span v-show = "user.gender==2">
                            女
                          </span>

                        </div>
                      </div>
                      <div class="detail-item">
                        <div class="detail-title">
                          <span>生日:</span>
                        </div>
                        <div class="detail-value">{{user.birthday}}</div>
                      </div>
                      <div class="detail-item">
                        <div class="detail-title">
                          <span>隶属公司:</span>
                        </div>
                        <div class="detail-value"></div>
                      </div>
                      <div class="detail-item">
                        <div class="detail-title">
                          <span>隶属部门:</span>
                        </div>
                        <div class="detail-value"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-col>
              <b-col lg="6" sm="6">
                <div class="detail-right">
                  <div class="detail-item">
                    <div class="detail-title">
                      <span>用户账号:</span>
                    </div>
                    <div class="detail-value">{{user.loginAcc}}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-title">
                      <span>岗位:</span>
                    </div>
                    <div class="detail-value"></div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-title">
                      <span>可访问系统:</span>
                    </div>
                    <div class="detail-value">
                      <span v-for="(item,idx) in options" :key="idx">{{item.appsysName}}&nbsp;&nbsp;</span>
                    </div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-title">
                      <span>手机号码:</span>
                    </div>
                    <div class="detail-value">{{user.mobile}}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-title">
                      <span>邮箱:</span>
                    </div>
                    <div class="detail-value">{{ user.email}}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-title">
                      <span>状态:</span>
                    </div>
                    <div class="detail-value">
                      <span v-show="user.status == 1">启用</span>
                      <span v-show="user.status == 2">禁用</span>
                    </div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-title">
                      <span>备注:</span>
                    </div>
                    <div class="detail-value">{{user.description}}</div>
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>

        <div class="model" v-show="isShow">
          <div class="password-box">
            <div class="steps">
              <div class="steps-title-1">
                <img class="step-img" :src="require(`@/assets/step/${stu1}.png`)" alt />
                <p>验证身份</p>
              </div>
              <div class="steps-title-line">
                <img class="step-img" :src="require(`@/assets/step/${ste1}.png`)" alt />
              </div>
              <div class="steps-title-1">
                <img class="step-img" :src="require(`@/assets/step/${stu2}.png`)" alt />
                <p style="position: absolute;left: 10px">修改登录密码</p>
              </div>
              <div class="steps-title-line">
                <img class="step-img" :src="require(`@/assets/step/${ste2}.png`)" alt />
              </div>
              <div class="steps-title-1">
                <img class="step-img" :src="require(`@/assets/step/${stu3}.png`)" alt />
                <p>完成</p>
              </div>

            </div>
            <div class="modifyPasswords">
              <div class="form-list">
                <span>当前登录密码</span>
                <div class="form-list-value">
                  <!-- <a-input
                    type="password"
                    v-model.trim="oldpassword"
                    :class="oldpasswordText? 'nullValueWarn' : ''"
                    @blur="handleblur(oldpassword,'oldpassword')"
                  /> -->
                  <b-navbar type="light" variant="light">
                    <b-nav-form>
                      <b-input-group left="@">
                        <b-form-input class="mr-sm-2"
                         type="password"
                          v-model.trim="oldpassword"
                          :class="oldpasswordText? 'nullValueWarn' : ''"
                          @blur="handleblur(oldpassword,'oldpassword')"
                         placeholder=""></b-form-input>
                      </b-input-group>
                    </b-nav-form>
                  </b-navbar>
                  <div class="Error_message_prompt">
                    <template>
                      <span class="error-content" style>{{oldpasswordText}}</span>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <div class="modifyPasswords">
              <div class="form-list">
                <span>新密码</span>
                <div class="form-list-value">
                  <!-- <a-input
                    type="password"
                    v-model.trim="newpassword"
                    :class="newpasswordText? 'nullValueWarn' : ''"
                    @blur="handleblur(newpassword,'newpassword')"
                    @focus="handleCheck(newpassword,'newpassword')"
                    :disabled="disa"
                  /> -->
                  <b-navbar type="light" variant="light">
                    <b-nav-form>
                      <b-input-group left="@">
                        <b-form-input class="mr-sm-2"
                        type="password"
                        v-model.trim="newpassword"
                        :class="newpasswordText? 'nullValueWarn' : ''"
                        @blur="handleblur(newpassword,'newpassword')"
                        @focus="handleCheck(newpassword,'newpassword')"
                        :disabled="disa"
                         placeholder=""></b-form-input>
                      </b-input-group>
                    </b-nav-form>
                  </b-navbar>
                  <div class="Error_message_prompt">
                    <template>
                      <span class="error-content" style>{{newpasswordText}}</span>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <div class="modifyPasswords">
              <div class="form-list">
                <span>确认登录密码</span>
                <div class="form-list-value">
                  <!-- <a-input
                    type="password"
                    :disabled="comdisa"
                    v-model.trim="confirmpassword"
                    :class="confirmText? 'nullValueWarn' : ''"
                    @blur="handleblur(confirmpassword,'confirmpassword')"
                    @focus="handleCheck(confirmpassword,'confirmpassword')"
                  /> -->
                  <b-navbar type="light" variant="light">
                    <b-nav-form>
                      <b-input-group left="@">
                        <b-form-input class="mr-sm-2"
                          type="password"
                          :disabled="comdisa"
                          v-model.trim="confirmpassword"
                          :class="confirmText? 'nullValueWarn' : ''"
                          @blur="handleblur(confirmpassword,'confirmpassword')"
                          @focus="handleCheck(confirmpassword,'confirmpassword')"
                         placeholder=""></b-form-input>
                      </b-input-group>
                    </b-nav-form>
                  </b-navbar>
                  <div class="Error_message_prompt">
                    <template>
                      <span class="error-content" style>{{confirmText}}</span>
                    </template>
                  </div>
                  <div class="form-group">
                    <label class="form-name"></label>
                    <button class="form-control btn1" @click="submit">确定</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <template  >
      <!-- <div >
          <div :class="[ishidden ? '':'modal fade ']" class="positionFixed"  id="exampleModalCenter" tabindex="-1" role="dialog"  aria-labelledby="exampleModalCenterTitle" aria-hidden="false">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">确认提示</h5>
                  <span  class=" btn-close" data-dismiss="modal" aria-label="Close"  @click="close">
                    <span aria-hidden="true">&times;</span>
                  </span>
                </div>
                <div class="modal-body">
                  {{ModalText}}
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary btn-width" @click="handleOk" >确认</button>
                </div>
              </div>
            </div>
        </div>
      </div> -->
    </template>

  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

import axios from "axios";
import  * as httpRequest from '@/api/common/commonApi.js'

export default {
  components: {},
  props:{
    show:String
  },
  data() {
    return {
      ishidden:false,
      loading: false,
      imageUrl: "",
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
      isShow: false,
      user: {},
      password: "",
      confirmText: "",
      oldpasswordText: "",
      newpasswordText: "",
      flag: false,
      // 弹框
      ModalText: "",
      visible: false,
      confirmLoading: false,
      ste1: "001",
      ste2: "001",
      disa: true,
      comdisa: true,
      stu1: "1", //图片开始状态
      stu2: "2",
      stu3: "3",
      options: [],
      appid:'',
      system:''
    };
  },
  created() {
    this.getuser();
    //
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.goBack, false);
    }
  },
  destroyed(){
    window.removeEventListener('popstate', this.goBack, false);
  },
  methods: {
    hidden(){
      this.ishidden = true
    },
    close(){
       this.ishidden = false
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJPG && isLt2M;
    },
    showChange() {
      this.isShow = true;
    },
    getuser() {
      let id = JSON.parse(localStorage.getItem("userinfo")).userId;
      this.$loading();
      httpRequest.getUserDetail({
            id: id,
            t:new Date().getTime()
        })
        .then(res => {
          console.log('返回信息')
          this.$loading.close();
          (this.user = res.data.result),
            (this.password = this.user.userPwd);
            this.getSytemItem(this.user.id)

        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    handleblur(val, id) {
      if (!val) {
        if (!val && id === "oldpassword") {
          this.oldpasswordText = "不能为空";
          this.stu1 = "1";
          this.ste1 = "001";
          this.newpassword = "";
           this.confirmpassword = "";
          this.comdisa = true;
          this.newpasswordText = "";
          this.confirmText = "";
          this.disa = true;
          this.stu3 = "3";
          this.ste2 = "001";
          this.stu2 = "2";
        } else if (!val && id === "newpassword") {
          this.newpasswordText = "不能为空";
          this.ste2 = "001";
          this.stu2 = "2";
          this.confirmpassword = "";
          this.comdisa = true;
          this.confirmText = "";
          this.stu3 = "3";
        } else if (!val && id === "confirmpassword") {
          this.confirmText = "不能为空";
          this.stu3 = "3";
        }
      } else {
        if (id === "oldpassword") {
          this.$loading();
          httpRequest.VerifyOldPassword({
              userId : this.user.id,
              oldPwd : this.oldpassword,
              t:new Date().getTime()
            })
            .then(res => {
              this.$loading.close();
              if (res.data.success) {
                this.oldpasswordText = "";
                this.ste1 = "002";
                this.stu1 = "01";
                this.disa = false;
              } else {
                this.oldpasswordText = res.data.message;
                this.newpassword = "";
                this.comdisa = true;
                this.newpasswordText = "";
                this.confirmText = "";
                this.disa = true;
                this.stu1 = "1";
                this.ste1 = "001";
                this.stu3 = "3";
                this.ste2 = "001";
                this.stu2 = "2";
              }
            })
            .catch(error => {
              this.$loading.close();
              console.log(error);
            });
        } else if (id === "newpassword") {
          if (!/^(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/.test( this.newpassword)) {
            this.newpasswordText = "支持8~18位数字、大小写字母组合";
            this.confirmpassword = "";
            this.comdisa = true;
            this.confirmText = "";
            this.ste2 = "001";
            this.stu2 = "2";
            this.stu3 = "3";
          } else {
            //  可以在这里判断新密码与旧密码是否相同
            this.newpasswordText = "";
            this.ste2 = "003";
            this.stu2 = "02";
            this.comdisa = false;
          }
        } else if (id === "confirmpassword") {
          if (this.confirmpassword != this.newpassword) {
            this.confirmText = "两次密码输入不一致";
            this.stu3 = "3";
          } else {
            this.confirmText = "";
            this.stu3 = "03";
          }
        }
      }
    },
    // 判断前面的输入框是否已经填写正确
    handleCheck(val, id) {

    },
    // 提交修改密码
    submit() {
      if (!this.oldpassword && !this.newpassword && !this.confirmpassword) {
        this.oldpasswordText = "不能为空";
        this.newpasswordText = "不能为空";
        this.confirmText = "不能为空";

        return;
      }
      if (!this.oldpassword && !this.newpassword) {
        this.oldpasswordText = "不能为空";
        this.newpasswordText = "不能为空";

        return;
      }
      if (!this.newpassword && !this.confirmpassword) {
        this.newpasswordText = "不能为空";
        this.confirmText = "不能为空";

        return;
      }
      if (!this.oldpassword && !this.confirmpassword) {
        this.oldpasswordText = "不能为空";
        this.confirmText = "不能为空";

        return;
      }
      if (!this.oldpassword) {
        this.oldpasswordText = "不能为空";
        return;
      }
      // 验证新密码格式是否正确
      if (
        !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/.test(this.newpassword)
      ) {
        if (!this.newpassword) {
          this.newpasswordText = "不能为空";
          return;
        }
        this.newpasswordText = "支持8~18位数字、字母组合";
        return;
      }
      // 确认密码的判断
      if (this.confirmpassword != this.newpassword) {
        if (!this.confirmpassword) {
          this.confirmText = "不能为空";
          return;
        }
        this.confirmText = "两次密码输入不一致";
        return;
      }
      let condition = {};
      this.user.userPwd = this.newpassword;
      // 发起修改密码的请求
      condition.id = this.user.id;
      condition.oldPwd = this.oldpassword;
      condition.newPwd = this.newpassword;
      this.$loading();
      httpRequest.changePassword({
          userId:this.user.id,
          oldPwd:this.oldpassword,
          newPwd:this.newpassword,
          t:new Date().getTime()
        })
        .then(res => {
          this.$loading.close();
          if(res.data.success){
             this.visible = true;
             this.$message.success("修改成功")
            //  this.ModalText = "修改成功";
             this.ishidden = true;


          }else{
            this.ishidden = true;
            // this.ModalText = "修改失败"
             this.$message.success(res.data.message)
            // this.ModalText = res.data.message
          }
          this.handleOk()
          // if (res.data.success) {
          // this.oldpasswordText = ''
          // this.newpasswordText = ''
          // this.confirmText = ''
          // this.oldpassword = ''
          // this.newpassword = ''
          // this.confirmpassword = ''

          // }else{

          // }
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    handleOk(e) {
      this.oldpasswordText = "";
      this.newpasswordText = "";
      this.confirmText = "";
      this.oldpassword = "";
      this.newpassword = "";
      this.confirmpassword = "";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.ishidden = false
        this.confirmLoading = false;
        this.isShow = false;
        this.ste1 = "001";
        this.ste2 = "001";
        this.stu1 = "1";
        this.stu2 = "2";
        this.stu3 = "3";
        window.reload()
      }, 500);
    },
    getSytemItem(id){
      this.$loading();
      httpRequest.getSytemItem({
        authz_entity_id: id,
        t: new Date().getTime()
        })
      .then(res=>{
        this.$loading.close();
        if(res.data.success){
          this.options = []
          this.options=res.data.result

          // this.system = res.data.result.appsysName
        }else{
           this.options={id:'1',appsysName:''}
        }

      })
      .catch(error=>{
        this.$loading.close();
        console.log(error)
      })
    },
    returnDetail(){
      this.isShow = false;
      this.oldpasswordText = "";
      this.newpasswordText = "";
      this.confirmText = "";
      this.oldpassword = "";
      this.newpassword = "";
      this.confirmpassword = "";
      this.ste1 = "001";
      this.ste2 = "001";
      this.stu1 = "1";
      this.stu2 = "2";
      this.stu3 = "3";
    },
    returnhome(){
      this.$router.push({name:'Dashboard'})
    },
    goBack(){
      window.history.forward(1)
    },
    // 失去焦点判断是否正确
    handleStep() {}
  }
};
</script>

<style lang="scss" scoped>
.detail-content{
  overflow-x: scroll;
}
.model {
  min-width:600px;
}
.modifyPasswords {
  text-align: center;
  .form-list {
    position: relative;
    margin-left: 6rem;
    margin: 2rem;
    .form-list-value {
      position: relative;
      display: inline-block;
      input {
        width: 13rem;
        // margin-left: 20px;
        display: inline-block;
        vertical-align: baseline;
      }
    }
    span {
      // position: absolute;
      display: inline-block;
      height: 100%;
      text-align: center;
      line-height: 100%;
      color: #595959;
      // width: 162px;
      width: 8.1rem;
      text-align: right;
      font-size: 0.9rem;
    }
  }
  .Error_message_prompt {
    position: absolute;
    // font-size: 0.6rem;
    left: 24px;
    // margin-left: 14.5rem;
    // height: 1.2rem;
    .error-content {
      color: #f00;
      display: inline-block;
      width: 13rem;
      text-align: left;
      font-size: 0.6rem;
    }
  }
}
.user-pic {
  width: 4.75rem;
  height: 4.75rem;
  display: inline;
  display: block;
  border-radius: 50%;
  overflow: hidden;
}
.usrname-name {
  font-size: 0.9rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
}
.username-position {
  text-align: center;
  span {
    color: #fff;
    font-size: 0.7rem;
  }
  .user-compony {
  }
}
.detail {
  background: #fff;
  margin: 12px;
  .detail-header {
    width: 100%;
    height: 60px;
    font-size: 0.8rem;
    // color: #0091FF;
    // color:#63c2de;
    color:#000;
    line-height: 60px;
    border-bottom: 1px solid #eee;
    padding-left: 1.5rem;
    // font-weight: bold;
    font-size:14px;
  }
  .username-detail-container-left {
    background: #63c2de;
    // height: 40.6rem;
    height:80vh;
    position: relative;
    .user-detail-left-img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #63c2de;
    }
  }
  .detail-container-right {
    // height: 40.6rem;
    height:80vh;
    min-width:600px;
    overflow-x: scroll;
  }
  .nullValueWarn {
    border: 1px solid red;
  }
  .footer {
    background: #f6f6f6;
    height: 70px;
    text-align: right;
    .footer-content {
      // width:5rem;
      line-height: 70px;
      text-align: right;
      float: right;
      .return-detail {
        margin-left: 30px;
        margin-right: 30px;
      }
    }
  }
}

.detail-item {
  margin-bottom: 1.5rem;
}
.detail-title {
  display: inline-block;
  font-size: 0.9rem;
  color: #999999;
  line-height: 1.5rem;
}
.detail-value {

    display: inline-block;
    font-size: 0.9rem;
    color: #555555;
    line-height: 1.5rem;
    margin-left: 1rem;
    width: 60%;
    /* display: inline-block; */
    overflow: hidden;
    // white-space: nowrap;
    // text-overflow: ellipsis;
    word-break: break-word;
    word-break: break-word;
    vertical-align: top;

}
.change-password {
  display: inline-block;
  .change-password-b {
    width: 5.25rem;
    height: 2rem;
    border: 1px solid #eee;
    border-radius: 1rem;
    font-size: 0.6rem;
    padding: 6px 9px;
    color: #b3b3b3;
  }
}
.personal-data-left,
.detail-right {
  margin-left: 5rem;
}
.personal-data-left {
  border-right: 1px solid #eee;
}
.container-box {
  padding-top: 9rem;
}
.form-control {
  width: 13rem;
  height:30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}
input[type="text"]:focus,
input[type="password"]:focus {
  border: 1px solid #20bbef;
  box-shadow: 0px 0px 0.5px 0.5px #20bbef;
}
.form-name {
  text-align: right;
  // width: 172px;
  width: 8.1rem;
  height: 1.5rem;
  display: inline-block;
  margin-right: 1rem;
  font-size: 0.9rem;
  color: #555;
}
.form-group {
  position: absolute;
  top: 30px;
  left: 21px;
  // position: relative;
  // height: 2rem;
  // line-height: 2rem;
  // text-align: center;
}
.password-box {
  // width: 80%;
  margin: 10rem auto;
}
.changepassword {
  margin-top: 4rem;
  text-align: center;
}
.btn1 {
  // background:#63c2de;
  background:#20a8d8;
  border-radius: 1rem;
  // line-height: 1.25rem;
  color: #fff;
  font-size: 0.9rem;
  height: 2rem;
  border: none;
  outline: none;
  margin-top: 18px;
}
.change-psw {
  font-size: 0.7rem;
  margin-left:20px;
}
.title-icon {
  float: right;
  line-height: 60px;
  margin-right: 1.5rem;
  color: #8c8c8c;
}
.ant-modal-body {
  p {
    margin-top: 1rem;
  }
}
.steps {
  text-align: center;
  margin-bottom: 5rem;
}
.steps-title-1 {
  display: inline-block;
  width: 7rem;
  // vertical-align: top;
  text-align: center;
  position: relative;
  p {
    font-size: 0.9rem;
    position: absolute;
    left: 1.9rem;
  }
}
.steps-title-line {
  display: inline-block;
  // vertical-align: middle;
  text-align: center;
  img {
    width: 8.8rem;
    height: 4px;
    border-radius: 5px;
    // vertical-align: middle;
  }
}
.step-img {
  width: 2.2rem;
}
.header-right{
  float:right;
  padding-right:1.75rem;
  .btn1{
    border-radius:2px;
    height:1.75rem;
    // border:1px solid #0091FF;
    // background:#0091FF;
    font-size: 0.7rem;
    margin-left:10px;
    font-family: PingFangSC-Medium;
  }
  .color{
    color: #595959;
  }
}
.btn-height{
  height:1.75rem;
}
.positionFixed{
  z-index:5000;
  background-color: rgba(0,0,0,.65);
  position:fixed;
  top:0px;
  left:0px;
  right:0px;
  bottom:0px;
}
.btn-width{
  // padding: 5px 20px;
}
.btn-close {
  float: right;
  font-size: 1.3125rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: .5;
  cursor:pointer;
}
// @import "~@/styles/antd.css";
</style>
