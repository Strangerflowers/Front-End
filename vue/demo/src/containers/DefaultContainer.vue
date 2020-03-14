<template>
  <div class="app" style="position:relative">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="@/assets/img/logo.png" width="89" height="25" alt="CoreUI Logo">
        <img class="navbar-brand-minimized" src="@/assets/img/logo2.png" width="30" height="30" alt="CoreUI Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen=true />
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="d-md-down-none">
          <i class="icon-bell" aria-hidden="true"></i>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-list"></i>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-envelope-letter"></i>
        </b-nav-item>
        <span  class="mr">
          <router-link :to="{ name: 'personal' }">
            <img style="height:30px;"
                  src="img/avatars/6.jpg"
                  class="img-avatar"
                  alt="admin@bootstrapmaster.com" />
            <span class="user-name" style="">{{userName}}</span>
          </router-link>
        </span>
        <b-nav-item class="d-md-down-none" @click="exit">
          <img class="navbar-brand-minimized" src="@/assets/img/exit.svg" width="20" height="20"  alt="CoreUI Logo">
        </b-nav-item>
      </b-navbar-nav>
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <!-- <SidebarNav :navItems="nav"></SidebarNav> -->
        <Sidebar :show="showPage"></Sidebar>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <!-- <Sidebar :nav="items"></Sidebar> -->
      <main class="main">
      <Breadcrumb v-if="showPage=='true'" :list="list"/>
        <div class="container-fluid" style="background:#fff">
          <router-view :show="showPage"></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <!-- <TheFooter>

      <div>
        <a href="https://coreui.io">CoreUI</a>
        <span class="ml-1">&copy; 2018 creativeLabs.</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="https://coreui.io">CoreUI for Vue</a>
      </div>
    </TheFooter> -->
     <template v-if="ishidden" >
      <div class="box">
          <div :class="[ishidden ? '':'modal fade ']" class="positionFixed"  id="exampleModalCenter" tabindex="-1" role="dialog"  aria-labelledby="exampleModalCenterTitle"            aria-hidden="false">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">确认提示</h5>
                  <span class="btn-close " data-dismiss="modal" aria-label="Close" @click="close" >
                    <span aria-hidden="true">&times;</span>
                  </span>
                </div>
                <div class="modal-body" style="height: 100px;">
                 确定要退出?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn  btn-width close-color" data-dismiss="modal" @click="close">取消</button>
                  <button type="button" class="btn btn-primary btn-width" @click="logout" >确认</button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import nav from '../json/_nav'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import axios from 'axios'
import DefaultHeaderDropdown from './DefaultHeaderDropdown'
import DefaultHeaderDropdownNotif from './DefaultHeaderDropdownNotif'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import DefaultHeaderDropdownMssgs from './DefaultHeaderDropdownMssgs'
import DefaultHeaderDropdownTasks from './DefaultHeaderDropdownTasks'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdown,
    DefaultHeaderDropdownMssgs,
    DefaultHeaderDropdownNotif,
    DefaultHeaderDropdownTasks,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    Sidebar
  },
  data () {
    return {
      nav: nav.items,
      ishidden:false,
      flag:false,
      ModalText:"",
      userName:'',
      navList:[],
      showPage:false,
      // items:[
      //   {
      //     key: '1',
      //     appsysName: '优托邦商业操作系统',
      //     icon: '',
      //     url: '',
      //     children: [
      //     ]
      //   },
      //   {
      //     key: '1',
      //     appsysName: '招商管理',
      //     // icon: 'icon-speedometer',
      //     children: [
      //     ]
      //   },
      //   {
      //     key: '2',
      //     appsysName: '运营管理',
      //     icon: '',
      //     children: [

      //     ]
      //   },
      //   {
      //     key: '2',
      //     appsysName: '物业管理',
      //     icon: '',
      //     children: [

      //     ]
      //   },
      //   {
      //     key: '3',
      //     appsysName: '集中运营管理',
      //     icon: '',
      //     children: [

      //     ]
      //   }
      // ]
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  },
  watch:{

  },
  beforeCreate(){


  },
  created(){

    this.showPage = sessionStorage.getItem('showPage')

    console.log('layout',this.showPage,sessionStorage.getItem('showPage') )

    // console.log('获取local Storage',localStorage.getItem('userinfo').loginAcc)
  //  this.getSidebar()
  //     .then(() => {
  //       //成功传入的方法
  //       //操作
  //       // this.getPath();
  //     })
  //     .catch(err => {
  //       //失败捕获
  //       console.log(err);
  //     });
  },
  mounted(){
    this.userName = JSON.parse(localStorage.getItem('userinfo')).loginAcc
  },
  methods: {
    // 取消退出
    close(){
      this.ishidden = false;
    },
    // 退出登录，弹出提示框
    exit(){
      this.ishidden = true;
    },
    handleJump(ele, view = true) {
      document.querySelector(`#${ele}`).scrollIntoView(true);

    },
    // 获取侧边栏
    getSidebar() {
      let id = JSON.parse(localStorage.getItem("userinfo")).userId;
      return new Promise((resolve, reject) => {
      axios.get("/os_kernel_appsysctr/app/appsys/queryByUserId",{params:{authz_entity_id:id}})
          .then(res => {
            this.navList = res.data.result;
            let result =  res.data.result;
            if(res.data.result){
              this.flag =true;
            }
            let Investment = []
            let operation = ["广告系统","租务系统",]
            let property = ["工单系统","用户中心"]
            for(let key in result){
              if(operation.includes(result[key].appsysName)){
                this.items[1].children.push(result[key])
              }else if(property.includes(result[key].appsysName)){
                 this.items[2].children.push(result[key])
              }else if(Investment.includes(result[key].appsysName)){
                this.items[3].children.push(result[key])
              }
            }
            resolve(); //成功回调
          })
          .catch(err => {
            reject(); //失败回调
          });
      });
    },
    logout() {
      const that = this
      let hostObj = {}
      hostObj = window.location.host.split(".")
      let domain = hostObj[1]+'.'+hostObj[2]
      // console.log('domain',domain)
      $cookies.remove('TGC','/',domain)
      $cookies.remove('token')
      localStorage.removeItem("userinfo")
      // 本地删除TGC
      // $cookies.remove('TGC','/','gtland.cn')
      // $cookies.remove('token')

      window.location.reload()
    },


  }
}
</script>
<style >
.container-fluid{
  position:relative;
}
/* //IE下 */
/* a{blr:expression(this.onFocus=this.blur())} */
/* //FF下 */
/* a:focus{outline:none;}

a.hidefocus{outline:none} */
  a{
    text-decoration:none;
    color:#333;
  }
  .main{
    /* background:#fff; */
  }
  .breadcrumb {
    position: relative;
    border-radius: 0;
    border-bottom: 0px solid #c8ced3;
}
.user-name{
  color:#555;
}
.btns{
  padding:0 5px;
}
.active1{
    /* background: #20a8d8; */
    background:#C8CED3;
    color: #fff;
    border:1px solid #C8CED3;
}
.active1:hover{
    /* background: #20a8d8; */
    background:#C8CED3;
    color: #fff;
}

.box{
  position:fixed;
  top:0px;
  left:0px;
  bottom:0px;
  right:0px;
  Z-index:5000;
  background-color: rgba(0,0,0,.65);
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
.btn-width{
  /* padding: 5px 20px; */

}
.close-color{
  background:#fff;
  border:1px solid #ccc;
}
.close-color:hover{
  background:#fff;
  border:1px solid #1890ff;
  color:#1890ff;
}
.close-color:active{
  background:#fff;
  border:1px solid #1890ff;
  color:#1890ff;
}
.close-color:focus{
  background:#fff;
  border:1px solid #1890ff;
  color:#1890ff;
}

/* .mark{
  z-index:5000;
    /* position: fixed;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    z-index: 5000; */
/* } */
</style>
