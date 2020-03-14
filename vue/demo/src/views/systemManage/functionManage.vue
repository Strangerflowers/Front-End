<template>
  <div class="animated fadeIn">
    <!--头部-->
    <b-row class="search">
      <b-col sm="12" lg="12">
        <b-card no-body>
          <b-card-body>
            <div class="search-body card-body">
              <form class="form-inline">
                <div class="form-group">
                  <label for="exampleInputName2">系统名称：</label>
                  <b-form-select
                    v-model="form.selected"
                    id="exampleInputName2"
                    :options="form.options"
                    :plain="true"
                    class="system-select-width"
                  ></b-form-select>
                  <div class="btn-box mrl15">
                    <button
                      type="button"
                      class="btn btn-primary btn-block func-item func-btn btn-sm"
                      @click="handleQuery"
                    >查询</button>
                  </div>
                </div>
              </form>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <!--列表-->
    <b-row>
      <b-col sm="12" lg="12">
        <b-card>
          <b-card-body>
            <div>
              <b-row>
                <b-col>
                  <template>
                    <el-table
                      :data="tableData1"
                      style="width: 100%"
                      row-key="id"
                      ref="tree"
                      border
                      lazy
                      :cell-style="cellStyle"
                      :header-cell-style="headCellStyle"
                      :load="load"
                      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                    >
                      <el-table-column prop="modName" label="功能列表" align="left" width="260"></el-table-column>
                      <el-table-column prop="modUrl" label="菜单路径" width="300"></el-table-column>
                      <!-- <el-table-column align="center" prop="modCode" label="菜单code" width="240"></el-table-column>-->
                      <el-table-column prop="jsCompName" label="前端组件" width="260"></el-table-column>
                      <el-table-column label="操作">
                        <template slot-scope="scope">
                          <el-button
                            type="text"
                            size="small"
                            style="color: #3399FF"
                            v-show="scope.row.isLeaf===1?true:false"
                            @click="handleDataFun(scope.row)"
                          >定义数据权限</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </b-col>
              </b-row>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <!-- 定义数据权限 -->
    <b-modal
      title="定义数据权限"
      v-model="commonVisble"
      @ok="eaditData"
      @hide="()=>{this.checked = []}"
      cancel-title="关闭"
      ok-title="确定"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrl10">定义数据权限</span>
        </div>
      </template>
      <template>
        <div class="datalist-content">
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="has_data" class="grounp-check">
            <el-checkbox
              class="block"
              v-for="dataitem in datapermission"
              :label="dataitem.id"
              :key="dataitem.id"
              @change="handleCheckedCitiesChange(dataitem)"
            >{{dataitem.permName}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </template>
    </b-modal>
    <!--弹出框-->
    <b-modal title="分配操作" cancel-title="关闭" ok-title="确定">
      <!--<b-form-group style="text-align: left;font-size: 1rem">
        <b-form-checkbox-group
          v-model="checkboxSelected"
          :options="checkboxOption"
          plain
          stacked
        >
        </b-form-checkbox-group>
      </b-form-group>-->
      <div class="datalist-content">
        <b-form-group style="text-align: left">
          <template v-slot:label>
            <b-form-checkbox
              v-model="allSelected"
              :indeterminate="indeterminate"
              @change="toggleAll"
            >全部</b-form-checkbox>
          </template>

          <b-form-checkbox-group id="flavors" v-model="selected" :options="flavours" stacked></b-form-checkbox-group>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import tree from "../../components/tree";

export default {
  name: "functionManage",
  data() {
    return {
      flavours: ["Orange", "Grape", "Apple", "Lime", "Very Berry"],
      selected: [],
      allSelected: false,
      indeterminate: false,
      //顶部系统下拉框
      form: {
        selected: [],
        options: []
      },
      //列表数据
      tableData1: [],
      //保存的id
      parentId: "",

      //弹出框
      commonVisble: false,
      checkboxOption: [],
      checkboxSelected: [],
      isIndeterminate: true,
      datapermission: [],
      has_data: [], //拥有的权限
      checked: [],
      item: {},
      accountId: ""
    };
  },
  watch: {
    selected(newVal, oldVal) {
      if (newVal.length === 0) {
        this.indeterminate = false;
        this.allSelected = false;
      } else if (newVal.length === this.flavours.length) {
        this.indeterminate = false;
        this.allSelected = true;
      } else {
        this.indeterminate = true;
        this.allSelected = false;
      }
    }
  },
  methods: {
    // 单元格的 style 的回调方法
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return `text-align:left;color:#000;`;
      } else {
        return `color:#000;textAlign:center`;
      }
    },
    // 表头行的 style 的回调方法
    headCellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 && rowIndex === 0) {
        return `text-align:left;background:#E4E7EA;color:#5C6873;`;
      } else {
        // {}
        return `background:#E4E7EA;color:#5C6873;textAlign:center`;
      }
    },
    handleCheckedCitiesChange(data) {
      let idx = this.checked.indexOf(data.id);
      if (idx == -1) {
        this.checked.push(data.id);
      } else {
        this.checked.splice(idx, 1);
      }
    },
    toggleAll(checked) {
      // this.selected = checked ? this.flavours.slice() : [];
    },
    //获取首次数据
    getList() {
      this.$loading();
      axios
        .get(
          "/os_kernel_appsysctr/app/appsysModule/queryModuleRootNodeByAppSysId",
          {
            params: {
              appSysId: this.form.selected
              // roleId:'0297c853-d869-11e9-9092-fa163e6c79ee'
              // roleId: "0d9e6702b7354f5f86281ec4aae83069"
            }
          }
        )
        .then(res => {
          this.$loading.close();
          //给列表数值
          this.tableData1 = res.data.result.appSysModuleDtoList;
          //保存父id
          this.tableData1.forEach(item => {
            if (item.appSysModuleDtoList) {
              item["hasChildren"] = true;
            }
          });
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    //查询按钮
    handleQuery() {
      this.getList();
    },
    // 获取拥有的权限
    gethasData(item) {
      this.$loading();
      axios
        .get("/os_kernel_authzctr/app/dataperm/queryDataPermByModId", {
          params: {
            modId: item.id
          }
        })
        .then(res => {
          this.$loading.close();
          this.commonVisble = true;
          this.has_data = res.data.result.map(ele => {
            return ele.id;
          });
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    //tabel操作
    load(tree, treeNode, resolve) {
      console.log("appsysid", this.form.selected);
      this.resolve = resolve;
      this.treeNode = treeNode;
      this.$loading();
      axios
        .get("/os_kernel_appsysctr/app/appsysModule/queryChildNodeByParentId", {
          params: {
            parentId: tree.id,
            appSysId: this.form.selected
            // roleId: "0d9e6702b7354f5f86281ec4aae83069"
          }
        })
        .then(res => {
          this.$loading.close();
          let arr = res.data.result.appSysModuleDtoList;
          arr.forEach(item => {
            //item['hasChildren'] = true;
            if (item.appSysModuleDtoList) {
              item["hasChildren"] = true;
            }
          });
          resolve(arr);
        });
    },
    //定义数据权限按钮
    handleDataFun(item) {
      this.item = item;
      this.gethasData(item);

      // this.parentId = item.id;
      // this.checkboxOption = [
      //   { text: "Orange", value: "orange" },
      //   { text: "Apple", value: "apple" },
      //   { text: "Pineapple", value: "pineapple" },
      //   { text: "Grape", value: "grape" }
      // ];

      /*  axios.get(
                      "/os_kernel_appsysctr/app/appsysModule/queryOpModule",
                      {
                          params: {
                              moduleId: item.id
                          }
                      }
                  )
                      .then(res => {
                          console.log('操作', res.data.result)
                          let o = [];
                          res.data.result.map(item => {

                              let data = {};
                              data['value'] = item.id;
                              data['text'] = item.modName;
                              o.push(data)
                          })
                          this.checkboxOption = o;

                      })
                      .catch(error => {
                          console.log(error);
                      });*/
    },
    //分配操作提交
    submitCommon() {
      //分配操作选定
      console.log("操作", this.checkboxSelected);
      let arr = this.checkboxSelected.map((item, idx) => {
        // console.log(item, idx);
        let o = {};
        o[item] = item;
        return o;
      });
      console.log(arr);
    },
    // 提交编辑数据权限
    eaditData() {
      // console.log('checked',this.checked)
      let arr = [];
      this.checked.map((ite, idx) => {
        const temp = {
          delFlag: 0,
          dataPermId: ite,
          funcPermId: this.item.id,
          // funcPermId:'64d8012e-22bc-4ef4-aefc-9a3963301f60',
          updateTime: Date.now()
        };
        return arr.push(temp);
      });
      // console.log('arr',arr)
      this.$loading();
      axios
        .post("/os_kernel_authzctr/app/funcperm/editFuncDataMapping", arr)
        .then(res => {
          this.$loading.close();
          this.checked = [];
          this.getDatalist();
          if (res.data.success) {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    getDatalist() {
      this.$loading();
      axios
        .get("/os_kernel_authzctr/app/dataperm/list", {
          params: {
            pageSize: 100
          }
        })
        .then(res => {
          this.$loading.close();
          console.log(res);
          this.datapermission = res.data.result.records;
        });
    }
  },
  created() {
    this.getDatalist();
    this.accountId = JSON.parse(localStorage.getItem("userinfo")).userId;
    this.$loading();
    // 获取系统
    axios
      .get("os_kernel_appsysctr/app/appsys/queryByUserId", {
        params: {
          authz_entity_id: this.accountId
        }
      })
      .then(res => {
        this.$loading.close();
        let o = [];
        res.data.result.map(item => {
          // console.log(item);
          let data = {};
          data["value"] = item.id;
          data["text"] = item.appsysName;
          o.push(data);
        });
        this.form.options = o;
        this.form.selected = o[0].value;
        // console.log('系统测试', this.form.selected)
      })
      .then(res => {
        this.getList();
      })
      .catch(err => {
        this.$loading.close();
        console.log(err);
      });
  }
};
</script>

<style scoped>
.grounp-check {
  text-align: left;
  padding-left: 30px;
}
.block {
  display: block;
}
.datalist-content {
  width: 100%;
  text-align: left;
  height: 500px;
  /* // height:338px; */
  overflow: hidden;
  overflow-y: auto;
}
.search {
  padding-top: 20px;
}
.btn-box {
  width: 68px;
  display: inline-block;
  margin: 5px;
}
.mrl15 {
  margin-left: 15px;
}
.mrl10 {
  margin-left: 10px;
}
</style>
