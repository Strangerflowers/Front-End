<template>
<div>
   <router-view ></router-view>
   <!-- v-if="getTokenResult" -->
  <!-- <router-view name="Transfer" ></router-view> -->
</div>

</template>
<script>
import VueCookies from "vue-cookies";

import "core-js/fn/object/assign";
import "core-js/fn/promise";
import "core-js/fn/object/entries";
import "babel-polyfill";
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      getTokenResult: "",
      userId: "",
      showlist: null,
      userinfo: []
    };
  },
  created() {
    if(JSON.parse(sessionStorage.getItem("rolesArr"))==null){
      this.$router.push({
        path: "/transfer"
      });
    }
    this.getTokenResult = $cookies.get("token");
    // this.userId = JSON.parse(localStorage.getItem('userinfo')).userId;
    // console.log("showpage", sessionStorage.getItem("showPage"));
    // if (sessionStorage.getItem("showPage") != null) {
    //   this.getTokenResult = $cookies.get("token");
    // }
  },
  mounted() {},

  methods: {
    // 获取token请求
    getToken() {
      axios
        .get("/os_kernel_authcctr/app/authc/token/get", {
          params: {
            serviceUrl: "http://www.example.org",
            tgt: $cookies.get("TGC"),
            t: Date.now()
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          this.userinfo = res.data.result;
          this.userId = res.data.result.userId;

          localStorage.setItem("userinfo", JSON.stringify(res.data.result));
          $cookies.set("token", res.data.result.token);
          this.getroles();
        })
        .catch(error => {
          console.log(error);
          // this.getTokenResult = error;
        });
    },
    getroles() {
      // console.log(22)
      return new Promise((resolve, reject) => {
        axios
          .get("/os_kernel_userorgctr/app/user/queryRoleByUserId", {
            params: {
              user_id: this.userId
            }
          })
          .then(res => {
            console.log("role", res);
            let adminArr = ["PORTAL_ADMIN", "APPSYS_ADMIN"];
            let rolesArr = [];
            res.data.result.forEach(element => {
              rolesArr.push(element.roleCode);
            });
            // sessionStorage.setItem("rolesArr", rolesArr);

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
            if (!this.showlist) {
              this.$router.push({
                //核心语句
                name: "personal"
              });
            }
            console.log("app");
            resolve(res); //成功回调
          })
          .catch(err => {
            reject(err); //失败回调
          });
      });
    }
  }
};
</script>

<style lang="scss">
// CoreUI Icons Set
@import "~@coreui/icons/css/coreui-icons.min.css";
/* Import Font Awesome Icons Set */
$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome.scss";
/* Import Simple Line Icons Set */
$simple-line-font-path: "~simple-line-icons/fonts/";
@import "~simple-line-icons/scss/simple-line-icons.scss";
/* Import Flag Icons Set */
@import "~flag-icon-css/css/flag-icon.min.css";
/* Import Bootstrap Vue Styles */
@import "~bootstrap-vue/dist/bootstrap-vue.css";
// Import Main styles for this application
@import "assets/scss/style";
@import "assets/styles/index";
@import "assets/styles/auth";
</style>
