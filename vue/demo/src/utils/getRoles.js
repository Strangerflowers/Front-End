import axios from "axios";
import VueCookies from "vue-cookies";
import vue from 'vue'

var getRoles = function(id) {
  axios
    .get("/os_kernel_userorgctr/app/user/queryRoleByUserId", {
      params: {
        user_id: id
      }
    })
    .then(res => {
      console.log("role", res);
      let adminArr = ["PORTAL_ADMIN", "APPSYS_ADMIN"];
      let rolesArr = [];
      let showlist = null
      res.data.result.forEach(element => {
        rolesArr.push(element.roleCode);
      });
      sessionStorage.setItem("rolesArr", rolesArr);
      console.log('保存数组',sessionStorage.getItem("rolesArr", rolesArr))
      if (
        rolesArr.includes("PORTAL_ADMIN") ||
        rolesArr.includes("APPSYS_ADMIN")
      ) {
        showlist = true;
      } else {
        showlist = false;
      }
      sessionStorage.setItem("showPage", showlist);
      // this.getTokenResult = $cookies.get("token");


      // console.log('vue',vue.prototype)
      // if (!showlist) {
      //   vue.prototype.$router.push({
      //     //核心语句
      //     name: "personal"
      //   });
      // }

      // resolve(res); //成功回调
    })
    .catch(err => {
      // reject(err); //失败回调
    });
};
export default getRoles;
