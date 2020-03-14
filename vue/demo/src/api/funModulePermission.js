let funModPerm = {}
//自定义权限列表,value值均为真实字段 如果后端修改 在这里修改就行了
funModPerm = {
  //停车场收入模块折线
  pfiline:"datactr_rpt_prk_finance_line00001",
  //停车场收入模块柱状
  pfibar:'datactr_rpt_prk_finance_bar00001',
  //停车场收入模块圆环
  pfipie:'datactr_rpt_prk_finance_pie00001',
  //停车场流量模块折线
  pflline:"datactr_rpt_prk_flow_line00001",
  //停车场流量模块柱状
  pflbar:'datactr_rpt_prk_flow_bar00001',
  //停车场流量模块圆环
  pflpie:'datactr_rpt_prk_flow_pie00001',
  //工单统计模块柱状
  ustbar:'datactr_rpt_uts_stats_bar00001',
  //租赁铺位统计模块圆环
  mstpie:'datactr_rpt_mip_stats_pie00001',
  //广告资源模块圆环
  asrpie:'datactr_rpt_ads_src_pie00001',
  //广告收入模块柱状
  arebar:'datactr_rpt_ads_revenue_bar00001',
  //租务资源模块柱状
  lrebar:'datactr_rpt_lmsys_revenue_bar00001'

 /* datactr: {
    permCode: "datactr",
    //报表模块
    report: {
      permCode: "datactr_rpt",
      //停车场
      prk: {
        permCode: "datactr_rpt_prk",
        //收入模块
        finance: {
          permCode: "datactr_rpt_prk_finance",
          //折线图
          line0001: {
            permCode: "datactr_rpt_prk_finance_line00001"
          },
          //柱状图
          bar00001: {
            permCode: 'datactr_rpt_prk_finance_bar00001'
          },
          //饼状图
          pie00001: {
            permCode: 'datactr_rpt_prk_finance_pie00001'
          }
        },
        //流量模块
        flow: {
          permCode: "datactr_rpt_prk_flow",
          //折线图
          line0001: {
            permCode: "datactr_rpt_prk_flow_line00001"
          },
          //柱状图
          bar00001: {
            permCode: 'datactr_rpt_prk_flow_bar00001'
          },
          //饼状图
          pie00001: {
            permCode: 'datactr_rpt_prk_flow_pie00001'
          }
        }
      },
      //工单模块
      uts: {
        permCode: 'datactr_rpt_uts',
        //统计模块
        stats: {
          permCode: "datactr_rpt_uts_stats",
          bar00001: {
            permCode: 'datactr_rpt_uts_stats_bar00001'
          }
        }
      },
      //租赁铺位模块
      mip: {
        permCode: 'datactr_rpt_mip',
        //统计模块
        stats: {
          permCode: 'datactr_rpt_mip_stats',
          pie00001: {
            permCode: 'datactr_rpt_mip_stats_pie00001'
          }
        }
      },
      //广告模块
      ads: {
        permCode: 'datactr_rpt_ads',
        //资源模块
        src: {
          permCode: 'datactr_rpt_ads_src',
          //饼状图
          pie00001: {
            permCode: 'datactr_rpt_ads_src_pie00001'
          }
        },
        //收入模块
        revenue: {
          permCode: 'datactr_rpt_ads_revenue',
          bar00001: {
            permCode: 'datactr_rpt_ads_revenue_bar00001'
          }
        }
      },
      //租务模块
      lmsys: {
        permCode: 'datactr_rpt_lmsys',
        //收费模块
        revenue: {
          permCode: 'datactr_rpt_lmsys_revenue',
          bar00001: {
            permCode: 'datactr_rpt_lmsys_revenue_bar00001'
          }
        }
      }
    }
  }*/
};

export default funModPerm
