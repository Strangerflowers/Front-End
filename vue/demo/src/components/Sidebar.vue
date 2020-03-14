<template>
  <div>
    <div class="sidebar" >
      <div class="nav-top">
        <span class="fs-14">Work Infinity</span>
      </div>
      <nav class="sidebar-nav">
        <ul class="nav">
          <template v-for="(item,i) in items">
            <li
              class="nav-item nav-dropdown"
              :key="i"
              @click.stop.prevent="SlideUp(item,i)"
              :class="{ 'open': item.show === true}"
            >
              <a
                class="nav-link"
                href="#"
                :class="[item.children.length>0 ? 'nav-dropdown-toggle' : '']"
              >
                <span class="fs-12">{{item.name}}</span>
              </a>
              <template>
                <ul class="nav-dropdown-items">
                  <template v-for="(subitem,idx) in item.children">
                    <li class="nav-item" :key="idx" @click.stop="gotopage(subitem)">
                      <router-link class="nav-link" :to="{path:subitem.url}">
                        <!-- <a class="nav-link" href="#"> -->
                        <i class="nav-icon cui-puzzle"></i>
                        <span class="subitem-fs">{{subitem.name}}</span>
                        <!-- </a> -->
                      </router-link>
                    </li>
                  </template>
                </ul>
              </template>
            </li>
          </template>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
import vue from "vue";
import axios from "axios";
const today = new Date();
export default {
  name: "Sidebar",
  components: {},
  props: {
    nav: {
      type: Array,
      default: function() {
        return [];
      }
    },
    show: String
  },
  data() {
    return {
      activeIndex: 0,
      user: false,
      usercenter: {},
      items: [
          {
          key: "2",
          name: "运营后台",
          icon: "icon-icon- iconfont",
          show: true,
          children: [
             {
              key: "2.3",
              name: "dashboard",
              url: "/dashboard",
              icon: "icon-yunyingfenxi iconfont"
              // url: 'http://ams-demo.gtland.cn/#/loginforinside'
            },
            {
              key: "2.1",
              name: "人员管理",
              url: "/personList",
              icon: "icon-guanggaoguanli iconfont"
              // url: 'http://ams-demo.gtland.cn/#/loginforinside'
            },
            {
              key: "2.2",
              name: "需求管理",
              url: "/demandList",
              icon: "icon-building_ iconfont"
              // url: 'http://lms-demo.gtland.cn/loginAction!bossLogin.action'
              // children: [{ key: '2.1.1', name: 'Option 2.1.1' }]
            },
            {
              key: "2.4",
              name: "待办事项",
              url: "/todolist",
              icon: "icon-building_ iconfont"
              // url: 'http://lms-demo.gtland.cn/loginAction!bossLogin.action'
              // children: [{ key: '2.1.1', name: 'Option 2.1.1' }]
            },
            // {
            //   key: "2.3",
            //   name: "功能权限管理",
            //   url: "/functionManage",
            //   icon: "icon-yunyingfenxi iconfont"
            //   // url: 'http://ams-demo.gtland.cn/#/loginforinside'
            // },
            // {
            //   key: "2.4",
            //   name: "数据权限管理",
            //   icon: "icon-yunyingfenxi iconfont",
            //   url: "/datapermission"
            // },
            // {
            //   key: "2.4",
            //   name: "数据元素授权管理",
            //   icon: "icon-yunyingfenxi iconfont",
            //   url: "/dataelement"
            // },
            // {
            //   key: "2.5",
            //   name: "数据权限元素管理",
            //   icon: "icon-yunyingfenxi iconfont",
            //   url: "/dataPermissionElement"
            // },

          ]
        }
      ]
    };
  },
  created() {
    // let showPage = null
    // showPage = sessionStorage.getItem('showPage')
    // console.log('sessionStorage',showPage)
    // if(!showPage){
    //   console.log('11232343',!showPage)
    //   this.items = []
    // }
    // this.getSidebar()
    // .then(() => {
    //   //成功传入的方法
    //   //操作
    //   // this.getPath();
    // })
    // .catch(err => {
    //   //失败捕获
    //   console.log(err);
    // });
  },
  mounted() {
    // console.log('dfsdfs',this.nav)
  },
  methods: {
    // 跳转页面
    gotopage(item) {
      // this.$router.push({
      //   //核心语句
      //   path: item.url
      // });
    },
    SlideUp(item) {
      if (item.children.length > 0) {
        item.show = !item.show;
      } else {
        this.$router.push({
          //核心语句
          path: item.url
        });
      }
    },

    handleSlideUp(item, i) {
      //  if(item.show){
      //     this.items.map((v,idx)=>{
      //       if(idx===i){
      //         v.show=false;
      //       }
      //     })
      //   }
      item.show = !item.show;
    },
    // 获取侧边栏
    //定义方法
    getSidebar() {
      let id = JSON.parse(localStorage.getItem("userinfo")).userId;
      return new Promise((resolve, reject) => {
        axios
          .get("/os_kernel_appsysctr/app/appsys/queryByUserId", {
            params: { authz_entity_id: id, t: new Date().getTime() }
          })
          .then(res => {
            this.navList = res.data.result;
            let result = res.data.result;
            let Investment = ["停车场系统", "工单系统"];
            let operation = ["广告系统", "租赁运营系统", "租赁前端系统"];
            let property = ["租务系统"];
            let userc = ["用户中心"];
            for (let key in result) {
              if (operation.includes(result[key].appsysName)) {
                this.items[2].children.push(result[key]);
              } else if (property.includes(result[key].appsysName)) {
                this.items[1].children.push(result[key]);
              } else if (Investment.includes(result[key].appsysName)) {
                this.items[0].children.push(result[key]);
              } else if (userc.includes(result[key].appsysName)) {
                this.items[3].children.push(result[key]);
              }
            }
            resolve(); //成功回调
          })
          .catch(err => {
            reject(); //失败回调
          });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.nav-top {
  display: block;
  padding: 0.75rem 1rem;
  color: #fff;
  text-decoration: none;
  background: rgba(0, 0, 0, 0);
}
.menu-icon {
  width: 15px;
  height: 13px;
  margin-right: 5px;
}
.subitem-fs {
  font-size: 15px;
}
.fs-12 {
  font-size: 12px;
}
.fs-14 {
  font-size: 14px;
}
</style>

