<template>
  <div>
    <div class="fs">请稍后...</div>
    <!-- 退出确认框 -->
    <b-modal
      id="logoutStyle"
      :ok-only='true'
      v-model="ishidden"
      @ok="logout"
      ok-title="确定"
      class="modal-exit-class"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrr10" style="margin-right:20px;">退出确认框</span>
        </div>
      </template>
      <div style=" margin-bottom: 10px;height:100px;">登录失败，重新登录！</div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import  * as httpRequest from '@/api/common/commonApi.js'
export default {
  name: "transfer",
  data: () => {
    return {
      ishidden:false,
    };
  },
  created() {
    this.getToken();
    console.log(123456)
  },
  methods: {
    // 获取token请求
    getToken() {
      let hostObj = {};
      hostObj = window.location.host.split(".");
      let domain = hostObj[1] + "." + hostObj[2];
      // axios
      //   .get("/os_kernel_authcctr/app/authc/token/get", {
      //     params: {
      //       serviceUrl: "http://www.example.org",
      //       tgt: $cookies.get("TGC"),
      //       t: Date.now()
      //     },
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded"
      //     }
      //   })
      httpRequest.getToken( {
            serviceUrl: "http://www.example.org",
            tgt: $cookies.get("TGC"),
            t: Date.now()
          })
        .then(res => {
          if (res.data.code == 0) {
            this.userinfo = res.data.result;
            this.userId = res.data.result.userId;
            localStorage.setItem("userinfo", JSON.stringify(res.data.result));
            $cookies.set("token", res.data.result.token);
            this.getroles();
          } else {
            this.ishidden = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getroles() {
      return new Promise((resolve, reject) => {
        $cookies.set("localTGC", $cookies.get("TGC"));
        // axios
        //   .get("/os_kernel_userorgctr/app/user/queryRoleByUserId", {
        //     params: {
        //       user_id: this.userId
        //     }
        //   })
        httpRequest.getRoles({user_id: this.userId})
          .then(res => {
            console.log("role", res);
            let adminArr = ["PORTAL_ADMIN", "APPSYS_ADMIN"];
            let rolesArr = [];
            res.data.result.forEach(element => {
              rolesArr.push(element.roleCode);
            });
            sessionStorage.setItem("rolesArr", JSON.stringify(rolesArr));

            if (
              rolesArr.includes("PORTAL_ADMIN") ||
              rolesArr.includes("APPSYS_ADMIN")
            ) {
              this.showlist = true;
            } else {
              this.showlist = false;
            }
            sessionStorage.setItem("showPage", this.showlist);
            this.getTokenResult = $cookies.get("token");
            console.log("getTokenResult", this.getTokenResult);
            // console.log("sessionStorage.setItem('rolesArr',rolesArr)",sessionStorage.getItem('rolesArr').includes('PORTAL_ADMIN'))
            // if (!this.showlist) {
            //   this.$router.push({
            //     //核心语句
            //     name: "personal"
            //   });
            // } else {
              this.$router.push({
                //核心语句
                path: "/dashboard"
              });
            // }
            console.log("app");
            resolve(res); //成功回调
          })
          .catch(err => {
            reject(err); //失败回调
          });
      });
    },
    logout() {
      let hostObj = {}
      hostObj = window.location.host.split(".")
      let domain = hostObj[1]+'.'+hostObj[2]
      $cookies.remove('TGC','/',domain)
      $cookies.remove('token')
      localStorage.removeItem("userinfo")
      window.location.reload()
    },
  }
};
</script>
<style lang="scss" scoped>
.fs {
  font-size: 200px;
  text-align: center;
}


</style>
