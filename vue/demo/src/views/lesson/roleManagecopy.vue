<template>
  <div class="animated fadeIn">
    <b-row class="search">
      <b-col sm="12" lg="12">
        <b-card no-body>
          <b-card-body>
            <div class="search-body">
              <b-row>
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
                  </div>
                </form>
                <b-col>
                  <div class="btn-box">
                    <button
                      type="button"
                      class="btn btn-primary btn-block func-item func-btn btn-sm"
                    >查询</button>
                  </div>
                  <div class="btn-box">
                    <button
                      type="button"
                      class="btn btn-primary btn-block func-item func-btn btn-sm"
                      @click="add"
                    >新增</button>
                    <!-- @click="dialogVisible = true" -->
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" lg="12">
        <b-card>
          <b-card-body>
            <div>
              <b-row>
                <b-col>
                  <template>
                    <el-table :data="datalist" style="width: 100%">
                      <el-table-column type="selection" width="55"></el-table-column>
                      <el-table-column prop="permName" label="地产项目" width="180"></el-table-column>
                      <el-table-column prop="permCode" label="编码" width="180"></el-table-column>
                      <el-table-column prop="description" label="备注"></el-table-column>
                      <el-table-column prop="permType" label="类型"></el-table-column>
                      <el-table-column prop="priority" label="优先级"></el-table-column>
                      <el-table-column fixed="right" label="操作" width="120">
                        <template slot-scope="scope">
                           <el-button type="text" size="small" @click="edit(scope.row)">数据权限元素</el-button>
                          <!-- <span id="popover-target-1" @click="handleShowAction(scope.row)">...</span> -->
                          <!-- <div class="operation">
                            <el-popover
                              trigger="click"
                              :ref="`popover-${scope.$index}`"
                              placement="top"
                              width="100"
                            >
                              <p class="el-icon-warning">确定删除</p>
                              <div style="text-align: right; margin: 0">
                                <el-button
                                  size="mini"
                                  type="text"
                                  @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                                >取消</el-button>
                                <el-button
                                  type="primary"
                                  size="mini"
                                  @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                                >确定</el-button>
                              </div>
                              <span slot="reference">...</span>
                            </el-popover>
                          </div> -->
                          <!-- <div>
                            <el-popover trigger="click" placement="left" width="160">
                              <div style="text-align: right; margin: 0">
                                <div style="display:flex">
                                  <el-button type="text" size="small" @click="edit(scope.row)">编辑1</el-button>
                                  <el-button type="text" size="small">授权</el-button>
                                  <el-button type="text" size="small">数据权限元素</el-button>
                                  <el-button type="text" size="small" @click="delrole(scope.row)">删除</el-button>
                                </div>
                              </div>
                              <span slot="reference">...</span>
                            </el-popover>
                          </div>
                          <div v-show="flag">
                            <el-button type="text" size="small" @click="edit(scope.row)">编辑1</el-button>
                            <el-button type="text" size="small">授权</el-button>
                            <el-button type="text" size="small">数据权限元素</el-button>
                            <el-button type="text" size="small" @click="delrole(scope.row)">删除</el-button>
                          </div>-->

                          <!-- <template>
                            <div class="d-flex flex-column text-md-center">
                              <div class="p-2">
                                <b-button
                                 @click="onOpen"
                                  id="popover-button-event"
                                  variant="primary"
                                >I have a popover</b-button>
                              </div>

                              <div class="p-2">
                                <b-button class="px-1" @click="onOpen">Open</b-button>
                                <b-button class="px-1" @click="onClose">Close</b-button>
                              </div>

                              <b-popover
                                ref="popover"
                                target="popover-button-event"
                                title="Popover"
                              >
                                Hello
                                <strong>World!</strong>
                              </b-popover>
                            </div>
                          </template>-->


                          <!-- <b-button
                            :id="'popover-manual-'+scope.$index"
                            variant="primary"
                            ref="button"
                            @click="visible2 = !visible2"
                          >...{{scope.$index}}</b-button>

                          <div class="text-center">
                            <b-popover
                              :target="'popover-manual-'+scope.$index"
                              :show.sync="visible2"
                              triggers="click"
                            >
                              <el-button type="text" size="small" @click="edit(scope.row)">编辑1</el-button>
                              <el-button type="text" size="small">授权</el-button>
                              <el-button type="text" size="small">数据权限元素</el-button>
                              <el-button type="text" size="small" @click="delrole(scope.row)">删除</el-button>
                            </b-popover>
                          </div> -->
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
    <b-row class="pageFixed">
      <b-col>
        <!-- <el-pagination background class="page" layout="prev, pager, next" :total="datalist.total"></!-->
      </b-col>
    </b-row>
    <!-- 新增弹框 -->
    <b-modal
      title="新增"
      v-model="addVisible"
      @ok="submitAdd"
      @hide="resetAddModal"
      cancel-title="关闭"
      ok-title="确定"
    >
    <tree></tree>
    </b-modal>
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
      visible2: false,
      form: {
        //下拉选项
        selected: [],
        options: []
      },
      // 错误信息提示
      addText: {
        roleNameText: "",
        roleCodeText: "",
        roleTypeText: "",
        descText: ""
      },
      newdata: {
        roleName: "",
        roleType: "",
        description: "",
        status: ""
      },
      datalist: [],
      addVisible: false,
      flag: false
    };
  },
  created() {
    this.getSystem();
    this.getDataList();
  },
  mounted() {},
  methods: {
    popToggle() {
      this.visible2 = !this.visible2;
      // this.pop2 = !this.pop2
    },
    // 显示操作
    handleShowAction() {
      this.flag = !this.flag;
    },
    // 获取各个系统
    getSystem() {
      axios
        .get("os_kernel_appsysctr/app/appsys/queryByUserId", {
          params: {
            authz_entity_id: "0e08e153-b04a-11e9-b31b-b06ebf14a476"
          }
        })
        .then(res => {
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
          this.ruleForm.system = o;
        })
        .then(res => {
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取数据权限管理列表
    getDataList() {
      axios
        .get("/os_kernel_authzctr/app/dataperm/list")
        .then(res => {
          console.log(111, res);
          this.datalist = res.data.result.records;
        })
        .catch(error => {
          console.log(error);
        });
    },
    add() {},
    submitAdd() {},
    resetAddModal() {},
    edit(item) {
      this.addVisible = true;
      console.log(12323, item);
    },
    delrole() {}
  }
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
.must {
  color: #f00;
}
.label-width {
  width: 95px;
  text-align: right;
  padding-right: 10px;
}
.input-group {
  margin: 10px 0px;
}
#basicName {
  border-radius: 3px;
}
.relative {
  position: relative;
}
.mr25 {
  margin: 25px 0px;
}
.errorColor {
  border: 1px solid #f00;
}
.error-box {
  display: block;
  position: absolute;
  top: 36px;
  left: 123px;
  .error-text {
    color: #f00;
    font-size: 12px;
  }
}
.datalist-content {
  width: 100%;
  text-align: left;
  height: 500px;
  // height:338px;
  overflow: hidden;
  overflow-y: auto;
}
.datalist-tab {
  width: 100%;
  text-align: left;
  height: 338px;
  overflow: hidden;
  overflow-y: auto;
}
.data-check-title {
  padding-left: 10%;
}
.data-check-item {
  padding-left: 20%;
}
.block {
  display: block;
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
.modal-content {
  height: 80vh;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
}
</style>
