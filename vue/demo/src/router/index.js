import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')
// Views
const Dashboard = () => import('@/views/Dashboard')
const Test = () => import('@/views/test')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

const Personal = () => import('@/views/personal/personaldata')
const Rolemanage = () => import('@/views/systemManage/roleManage')
const Menumanage = () => import('@/views/systemManage/menuManage')
const FunctionManage = () => import('@/views/systemManage/functionManage')
const Datapermission = () => import('@/views/systemManage/dataPermissions')
const Dataelement = () => import('@/views/systemManage/dataElement')
const Authorized = ()=> import('@/views/systemManage/authorized')
const dataPermissionElement = ()=> import('@/views/systemManage/dataPermissionElement')
const emptyPage = ()=> import('@/views/systemManage/emptyPage')
const Transfer = ()=> import('@/views/transfer')
// 资产
const Asset = ()=>import('@/views/assetCenter/asset/asset')
// 联合办公后台
const PersonList = ()=>import ('@/views/personManagement/personList')
const DemandList = ()=>import('@/views/demandManagement/demandList')
const Todolist = ()=>import('@/views/todolist/Todolist')
const Form =()=>import('@/views/test/form')

Vue.use(Router)

export default new Router({
  mode: 'hash', /// https://router.vuejs.org/api/#mode
  // mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  base:'/mgr/',
  routes: [
    {path:'/',redirect:{name:'Dashboard'}},
    {
      path: '/',
      redirect: '/dashboard',
      name: '运营后台',
      component: DefaultContainer,
      children: [
        {
          path: '/asset',
          name: 'Asset',
          component: Asset,
          meta:{
            requireAuth:true,
            label:'资产中心'
          }
        },
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/test',
          name: 'Test',
          component: Test,

        },
        {
          path: '/emptyPage',
          name: 'emptyPage',
          component: emptyPage,
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/personal',
          name: 'personal',
          component: Personal,
          meta:{
            requireAuth:true,
            label:'用户资料详情'
          }
        },
        {
          path: '/rolemanage',
          name: 'Rolemanage',
          component: Rolemanage,
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/menumanage',
          name: 'Menumanage',
          component: Menumanage,
          meta:{
            requireAuth:true
          }
        }, {
          path: '/datapermission',
          name: 'Datapermission',
          component: Datapermission,
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/functionManage',
          name: 'FunctionManage',
          component: FunctionManage,
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/dataelement',
          name: 'Dataelement',
          component: Dataelement,
          meta:{
            requireAuth:true
          }
        },{
          path: '/authorized',
          name: 'Authorized',
          component: Authorized,
          meta:{
            requireAuth:true
          }
        },{
          path: '/dataPermissionElement',
          name: 'dataPermissionElement',
          component: dataPermissionElement,
          meta:{
            requireAuth:true
          }
        },{
          path: '/personList',
          name: 'PersonList',
          component: PersonList,
          meta:{
            requireAuth:true,
            label:'人员管理'
          }
        },{
          path: '/demandList',
          name: 'DemandList',
          component: DemandList,
          meta:{
            requireAuth:true,
            label:'需求管理'
          },
        }, {
          path: '/todolist',
          name: 'Todolist',
          component: Todolist,
          meta: {
            requireAuth: true,
            label: '待办事项'
          }
        }
      ]
    },
    {
      path: "/transfer",
      name: "Transfer",
      component: Transfer
    }, {
      path: '/form',
      name: 'Form',
      component: Form
    },{
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
})
