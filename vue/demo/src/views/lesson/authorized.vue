<template>
  <div class="animated fadeIn">
    <!-- <b-row class="mrt">
      <b-col sm="12" lg="12">
        <b-card no-body>
          <b-card-body>
            <div class="search-body">
              <b-row>
                <form class="form-inline">
                  <div class="form-group">
                    <label for="exampleInputName2">系统名称：</label>
                    <b-form-select
                      class="system-select-width"
                      v-model="form.selected"
                      id="exampleInputName2"
                      :options="form.options"
                      :plain="true"
                    ></b-form-select>
                  </div>
                </form>
                <b-col>
                  <div class="btn-box">
                    <button
                      type="button"
                      class="btn btn-primary btn-block func-item func-btn btn-sm"
                    >查询</button>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row> -->
    <b-row class="mrt">
      <b-col sm="12" lg="12">
        <b-card>
          <b-card-body class="content-tree">
            <div>
              <b-row>
                <b-col>
                  <div class="datalist-tab">
                    <div class="datalist-content">
                      <span class="data-check-title">所拥有的数据权限元素:</span>
                      <div class="data-check-item">
                        <el-tree
                          :data="dataperminssion"
                          :default-checked-keys="hasdataper"
                          show-checkbox
                          node-key="id"
                          @check="checkDataPermission"
                          :props="dataProps"
                        ></el-tree>
                      </div>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <div class="content-footer" >
                <div class="btn-box">
                  <button
                    type="button"
                    class="btn btn-primary btn-block func-item func-btn btn-sm"
                  >取消</button>
                </div>
                <div class="btn-box">
                  <button
                  @click="editDataPermission"
                    type="button"
                    class="btn btn-primary btn-block func-item func-btn btn-sm"
                  >确定</button>
                </div>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { Callout } from "@coreui/vue";
import axios from "axios";
import tree from "../../components/tree";

export default {
  name: "dashboard",
  components: { tree },
  data: function() {
    return {
      // form: {
      //   //下拉选项
      //   selected: [],
      //   options: []
      // },
      haspermission: [], //拥有的功能
      hasdataper: [], //拥有的数据元素
      dataperminssion: [],
      dataCheck: [],
      dataProps: {
        label: "permElemName"
      },
      routers: {}
    };
  },
  created() {
    // this.id = this.$route.query;
    this.routers = this.$route.query;
    console.log(222, this.routers.id);
    // this.getSystem();
    this.getdatalist();
    this.gethasDataPermission();
  },
  mounted() {

  },
  methods: {
    checkDataPermission(data, checked) {
      let idx = this.dataCheck.indexOf(data.id);
      if (idx == -1) {
        this.dataCheck.push(data.id);
      } else {
        this.dataCheck.splice(idx, 1);
      }
    },
    // 编辑数据权限元素
    editDataPermission() {
      let arr = [];
      this.dataCheck.map((item, idx) => {
        const temp = {
          authzEntityId: this.routers.id, //角色id
          authzEntityType: 4,
          authzResId: item, //数据元素id
          authzResType: 3,
          updateTime: Date.now(),
          delFlag: 0,
          isExternalRes: 0,
          appSysId: this.routers.appsysid
        };
        return arr.push(temp);
      });
      axios
        .post("/os_kernel_authzctr/app/userResourceAuthz/update", arr)
        .then(res => {
          console.log(res);
          this.dataCheck = [];
          this.hasdataper = [];
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取数据权限列表
    getdatalist() {
      axios
        .get("/os_kernel_authzctr/app/datapermelem/list?pageSize=100")
        .then(res => {
          console.log("数据权限列表", res);
          this.dataperminssion = res.data.result.records;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取拥有的数据权限
    gethasDataPermission() {
      axios
        .get(
          "/os_kernel_authzctr/app/userResourceAuthz/list?authzEntityId=" +
            this.routers.id +
            "&authzEntityType=4&authzResType=3&pageSize=100"
        )
        .then(res => {
          this.hasdataper = res.data.result.records.map(item => {
            return item.authzResId;
          });
          // this.getdatalist();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
};
</script>

<style lang="scss" scoped>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}

.search {
  padding: 20px 0;
}

.btn-box {
  width: 68px;
  display: inline-block;
  margin: 5px;
}

// .pageFixed{
//   position:fixed;
//   bottom:0px;
// }
.page {
  background: #fff;
  text-align: right;
}

.account {
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  .search-title {
    height: 100%;
    vertical-align: middle;
    line-height: 57px;
    font-weight: blod;
    font-weight: bold;
    text-align: left;
  }
  .right {
    text-align: right;
    line-height: 57px;
  }
}
.input-group {
  margin: 10px 0px;
}
.inline {
  display: inline-block;
}
.content-tree{
  width:100%;
  height: 66vh;
  display: inline-block;
  overflow-y: auto;
}
.mrt{
  margin-top:20px;
}
.content-footer{
  text-align: right;
    position: absolute;
    bottom: 0px;
    right: 56px;
}
</style>
