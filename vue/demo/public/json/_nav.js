export default {
  items: [
    // {
    //   key: '1',
    //   name: '优托邦商业操作系统',
    //   icon: '',
    // },
    {
      key: '1',
      name: '首页',
      url: '/dashboard',
      icon: 'icon-kaidian iconfont',
      show:false,
      children: [
      //   {
      //     key: '1.1',
      //     name: '网点规划系统',
      //     icon: 'icon-kaidian iconfont',
      //     url: '',
      //     // children: [{ key: '2.1.1', name: 'Option 2.1.1' }]
      //   },
      //   {
      //     key: '1.2',
      //     name: '租赁系统',
      //     icon: 'icon-aixin iconfont',
      //     url: 'http://mip-demo.gtland.cn/web/#/login?isAutoLogin=1'
      //     // children: [{ key: '2.1.1', name: 'Option 2.1.1' }]
      //   }
      ]
    },
    {
      key: '2',
      name: '系统管理',
      icon: 'icon-icon- iconfont',
      show:false,
      children: [
        {
          key: '2.1',
          name: '角色管理',
          url: '/rolemanage',
          icon: 'icon-building_ iconfont',
          // url: 'http://lms-demo.gtland.cn/loginAction!bossLogin.action'
          // children: [{ key: '2.1.1', name: 'Option 2.1.1' }]
        },
        {
          key: '2.2',
          name: '菜单管理',
          url: '/menumanage',
          icon: 'icon-guanggaoguanli iconfont',
          // url: 'http://ams-demo.gtland.cn/#/loginforinside'
        },
        // {
        //   key: '2.4',
        //   name: '报表与大数据平台',
        //   icon: 'icon-yunyingfenxi iconfont',
        //   url: ''
        // }
      ]
    },
    // {
    //   key: '2',
    //   name: '物业管理',
    //   icon: '',
    //   children: [
    //     {
    //       key: '3.1',
    //       name: '工单系统',
    //       icon: 'icon-gerenziliao iconfont',
    //       url: 'http://uts-demo.gtland.cn/uts-server/toIndex.html'
    //       // children: [{ key: '2.1.1', name: 'Option 2.1.1' }]
    //     },
    //     {
    //       key: '3.2',
    //       name: '停车系统',
    //       icon: 'icon-tingchechang iconfont',
    //       url: 'http://prk-demo.gtland.cn/auth/sso.action?token=f932dfiuew9ap02dwe224234fabf23lk'
    //     },
    //     {
    //       key: '3.3',
    //       name: '写字楼参观登记系统',
    //       icon: 'icon-bangonglou iconfont',
    //       url: ''
    //     }
    //   ]
    // },
    // {
    //   key: '3',
    //   name: '集中运营管理',
    //   icon: '',
    //   children: [
    //     {
    //       key: '4.1',
    //       name: '集中运营管理系统',
    //       icon: 'icon-icon- iconfont',
    //       url: 'http://uts-demo.gtland.cn/uts-server/toIndex.html'
    //       // children: [{ key: '2.1.1', name: 'Option 2.1.1' }]
    //     },

    //   ]
    // }
  ],
}
