import axios from "axios";
import getRoles from './getRoles'
import VueCookies from "vue-cookies";
var getToken = (function() {
  $cookies.set("localTGC", $cookies.get("TGC"));
  console.log('测试是否进行获取token操作')
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
      console.log('获取token')
      // this.userinfo = res.data.result;
      // this.userId = res.data.result.userId;
      // getRoles(res.data.result.userId)
      localStorage.setItem("userinfo", JSON.stringify(res.data.result));
      $cookies.set("token", res.data.result.token);
      // this.getroles();
    })
    .catch(error => {
      console.log(error);

    });
})
export default getToken;
