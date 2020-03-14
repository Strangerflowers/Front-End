<template>
  <div class="animated fadeIn">
    <b-row class="search">
      <b-col sm="12" lg="12">
        <b-card no-body>
          <b-card-body>
            <div class="search-body card-body">
              <b-row>
                <form class="form-inline">
                  <div class="form-group">
                    <label for="exampleInputName2">数据权限：</label>
                    <b-form-select
                      v-model="form.selected"
                      id="exampleInputName2"
                      :plain="true"
                      class="system-select-width"
                    >
                      <option
                        v-for="opt in form.options"
                        :value="opt.id"
                        :key="opt.id"
                      >{{opt.permName}}</option>
                    </b-form-select>
                  </div>
                </form>
                <b-col>
                  <div class="btn-box">
                    <button
                      type="button"
                      class="btn btn-primary btn-block func-item func-btn btn-sm"
                      @click="handleSearch"
                    >查询</button>
                  </div>

                  <div class="btn-box mrl10" v-if="!showTbn">
                    <button
                      type="button"
                      class="btn btn-primary btn-block func-item func-btn btn-sm"
                      @click="add"
                    >新增</button>
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
                  <b-row>
                    <b-col>
                      <div class="account">
                        <b-row>
                          <b-col sm="6" lg="6">
                            <div class="search-title">用户查询</div>
                          </b-col>
                          <b-col sm="6" lg="6">
                            <div class="right">
                              <div class="btn-box">
                                <button
                                  type="button"
                                  class="btn btn-primary btn-block func-item func-btn btn-sm"
                                  @click="roleSearch"
                                >查询</button>
                              </div>
                            </div>
                          </b-col>
                        </b-row>
                      </div>
                      <b-row>
                        <b-col sm="6" lg="4">
                          <div class="input-group">
                            <label for="basicName" class="col-form-label">元素名称：</label>
                            <input
                              ref="name"
                              id="basicName"
                              type="text"
                              v-model="search.permElemName"
                              placeholder="请输入元素名称查询"
                              class="form-control auth-form-control border-3r"
                            />
                            <i
                              v-show="search.permElemName"
                              @click="emitEmpty('permElemName')"
                              class="cui-circle-x icons clearIcon"
                            ></i>
                          </div>
                        </b-col>
                        <b-col sm="6" lg="4">
                          <div class="input-group">
                            <label for="basicName5" class="col-form-label">元素编码：</label>
                            <input
                              ref="code"
                              v-model="search.permElemCode"
                              id="basicName5"
                              type="text"
                              placeholder="请输入元素编码查询"
                              class="form-control auth-form-control border-3r"
                            />
                            <i
                              v-show="search.permElemCode"
                              @click="emitEmpty('permElemCode')"
                              class="cui-circle-x icons clearIcon"
                            ></i>
                          </div>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                  <div class="datalist-tab mrt20">
                    <template>
                      <el-table
                        :data="tableAccout"
                        ref="table"
                        style="width: 100%"
                        :cell-style="{color:'#000',textAlign:'center'}"
                        :header-cell-style="{background:'#E4E7EA',color:'#5C6873',textAlign:'center'}"
                        @select="selectAccount"
                        @select-all="selectAllAccount"
                      >
                        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                        <el-table-column type="index" :index="indexMethod" label="序号" width="120"></el-table-column>
                        <el-table-column prop="permElemName" label="元素名称"></el-table-column>
                        <el-table-column
                          prop="permElemCode"
                          label="权限元素编码"
                          :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                          prop="originDataId"
                          label="源ID"
                          :show-overflow-tooltip="true"
                        ></el-table-column>
                        <!-- <el-table-column
                          prop="dataPermId"
                          label="数据权限"
                          width="180"
                          :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                          prop="updateTime"
                          label="更新时间"
                          width="180"
                          :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                          prop="createTime"
                          label="状态"
                          :show-overflow-tooltip="true"
                        ></el-table-column>-->
                        <el-table-column
                          prop="description"
                          width="180"
                          label="备注"
                          :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                          v-if="!showTbn"
                          fixed="right"
                          label="操作"
                          width="180"
                          :show-overflow-tooltip="true"
                        >
                          <template slot-scope="scope">
                            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </template>
                  </div>
                  <template>
                    <div class="pageFixed">
                      <div class="overflow-auto">
                        <b-pagination
                          align="right"
                          :per-page="10"
                          v-model="currentPage"
                          @change="changeCurrentPage"
                          :total-rows="total"
                        ></b-pagination>
                      </div>
                    </div>
                  </template>
                </b-col>
              </b-row>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="pageFixed">
      <b-col></b-col>
    </b-row>
    <!-- 新增弹框 -->
    <b-modal
      :title="modal.title"
      v-model="addVisible"
      @ok="submit"
      @hidden="resetAddModal"
      cancel-title="关闭"
      ok-title="确定"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrl10">{{modal.title}}</span>
        </div>
      </template>
      <div v-if="modal.title === '添加子项'" class="input-group mr25">
        <label for="basicName" class="col-form-label label-width">
          <span></span>上级元素：
        </label>
        <span class="col-form-label">hgdfdfgf</span>
      </div>
      <div class="input-group mr25">
        <label for="basicName1" class="col-form-label label-width">
          <span class="must">*</span>元素名称：
        </label>
        <input
          v-model="newedit.permElemName"
          id="basicName1"
          @blur="checkRules('permElemName',newedit.permElemName)"
          type="text"
          ref="newName"
          placeholder="请输入元素名称"
          class="form-control auth-form-control relative border-3r"
          :class="[addText.permElemNameText?'errorColor':'']"
        />
        <i
          v-show="newedit.permElemName"
          @click="emitEmpty('newName')"
          class="cui-circle-x icons clearIcon"
        ></i>
        <div class="error-box">
          <template>
            <span class="error-text" style>{{addText.permElemNameText}}</span>
          </template>
        </div>
      </div>
      <div class="input-group mr25">
        <label for="basicName2" class="col-form-label label-width">
          <span class="must">*</span>元素Code：
        </label>
        <input
          id="basicName2"
          v-model="newedit.permElemCode"
          @blur="checkRules('permElemCode',newedit.permElemCode)"
          type="text"
          ref="newCode"
          placeholder="请输入元素Code"
          :disabled="disabledEdit"
          class="form-control auth-form-control relative border-3r"
          :class="[addText.permElemCodeText?'errorColor':'']"
        />
        <i
          v-if="!disabledEdit"
          v-show="newedit.permElemCode"
          @click="emitEmpty('newCode')"
          class="cui-circle-x icons clearIcon"
        ></i>
        <div class="error-box">
          <template>
            <span class="error-text" style>{{addText.permElemCodeText}}</span>
          </template>
        </div>
      </div>
      <div class="input-group mr25">
        <label for="basicName3" class="col-form-label label-width">
          <span class="must">*</span>源ID：
        </label>
        <input
          id="basicName3"
          v-model="newedit.originDataId"
          @blur="checkRules('originDataId',newedit.originDataId)"
          type="text"
          ref="newOrigin"
          placeholder="请输入源ID"
          :disabled="disabledEdit"
          class="form-control auth-form-control relative border-3r"
          :class="[addText.originDataIdText?'errorColor':'']"
        />
        <i
          v-if="!disabledEdit"
          v-show="newedit.originDataId"
          @click="emitEmpty('newOrigin')"
          class="cui-circle-x icons clearIcon"
        ></i>
        <div class="error-box">
          <template>
            <span class="error-text" style>{{addText.originDataIdText}}</span>
          </template>
        </div>
      </div>
      <div class="input-group mr25">
        <label for="basicName" class="col-form-label label-width">
          <span class="must">*</span>数据权限：
        </label>
        <form class="form-inline">
          <div class="form-group">
            <!-- <multiselect
              v-model="form.selected"
              :options="form.options"
              :multiple="true"
              label="permName"
              track-by="permName"
            ></multiselect>-->
            <b-form-select
              :disabled="true"
              v-model="diolgform.selected"
              id="exampleInputName2"
              :plain="true"
            >
              <option
                v-for="opt in diolgform.options"
                :value="opt.id"
                :key="opt.id"
              >{{opt.permName}}</option>
            </b-form-select>
          </div>
        </form>
      </div>
      <div class="input-group mr25">
        <label for="basicName4" class="col-form-label label-width">描述：</label>
        <input
          id="basicName4"
          type="textarea"
          ref="newDesc"
          v-model="newedit.description"
          @blur="checkRules('description',newedit.description)"
          placeholder="请输入角色相关描述"
          class="form-control auth-form-control relative border-3r"
        />
        <i
          v-show="newedit.description"
          @click="emitEmpty('newDesc')"
          class="cui-circle-x icons clearIcon"
        ></i>
      </div>
    </b-modal>
    <!-- 二次确认框 -->
    <b-modal v-model="confirmVisible" @ok="delElement" cancel-title="关闭" ok-title="确定">
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrr10" style="margin-right:20px;">删除确认</span>
        </div>
      </template>
      <div style=" margin-bottom: 10px;">确定删除该元素？</div>
    </b-modal>
  </div>
</template>

<script>
import { Callout } from "@coreui/vue";
import axios from "axios";
import tree from "../../components/tree";
import vSelect from "vue-select";
import Multiselect from "vue-multiselect";
export default {
  name: "dashboard",
  components: { vSelect, Multiselect },
  data: function() {
    return {
      showTbn: false,
      disabledEdit: false,
      confirmVisible: false,
      delItem: {},
      currentPage: 1,
      total: 0,
      modal: {
        title: ""
      },
      diolgform: {
        //下拉选项
        selected: [],
        options: []
      },
      form: {
        //下拉选项
        selected: [],
        options: []
      },
      addVisible: false,
      // 错误信息提示
      addText: {
        permElemNameText: "",
        permElemCodeText: "",
        roleTypeText: "",
        originDataIdText: "",
        descText: ""
      },
      search: {
        permElemCode: "",
        permElemName: "",
        pageNo: 1,
        pageSize: 10
      },
      newedit: {
        // options:[],
        selected: ""
      },
      newselect: {
        options: [],
        selected: []
      },
      tableAccout: []
    };
  },
  created() {
    this.getdatalist();
  },
  methods: {
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
    indexMethod(index) {
      return index + 1 * 1;
    },
    // 获取元素列表
    getdatapermlist() {
      let obj = {
        permElemCode: this.search.permElemCode
          ? "*" + this.search.permElemCode + "*"
          : undefined,
        permElemName: this.search.permElemName
          ? "*" + this.search.permElemName + "*"
          : undefined,
        pageNo: this.currentPage,
        pageSize: 10,
        dataPermId: this.form.selected,
        t: Date.now()
      };
      axios
        .get("/os_kernel_authzctr/app/datapermelem/list", {
          params: obj
        })
        .then(res => {
          console.log(1111, res);
          this.tableAccout = res.data.result.records;
          this.total = res.data.result.total;
          console.log("el-pagination__totalal", this.total);
        })
        .catch(error => {
          console.log(error);
        });
    },
    add() {
      this.newedit = {};
      this.modal.title = "新增";
      this.addVisible = true;
      this.disabledEdit = false;
      this.diolgform.selected = this.form.selected;
    },
    // 搜索列表查询条件
    roleSearch() {
      this.currentPage = 1;
      this.getdatapermlist();
    },
    // 失去焦点判断
    checkRules(id, value) {
      console.log("id", value);
      if (id === "permElemName") {
        if (!value) {
          this.addText.permElemNameText = "不能为空";
        } else {
          if (value.length > 0 && value.length < 21) {
            if (!/^[0-9a-zA-Z-_\u4e00-\u9fa5]+$/.test(value)) {
              this.addText.permElemNameText =
                "可以输入0-20个中文、数字、字母、下滑线、横杠等";
            } else {
              this.addText.permElemNameText = "";
            }
          } else {
            this.addText.permElemNameText =
              "可以输入0-20个中文、数字、字母、下滑线、横杠等";
          }
        }
      } else if (id === "permElemCode") {
        if (!value) {
          this.addText.permElemCodeText = "不能为空";
        } else {
          if (value.length > 0 && value.length < 51) {
            if (!/^[0-9a-zA-Z-_]+$/.test(value)) {
              this.addText.permElemCodeText =
                "可以输入0-50个数字、字母、下滑线、横杠等";
            } else {
              this.addText.permElemCodeText = "";
            }
          } else {
            this.addText.permElemCodeText =
              "可以输入0-50个数字、字母、下滑线、横杠等";
          }
        }
      } else if (id === "originDataId") {
        if (!value) {
          this.addText.originDataIdText = "不能为空";
        } else {
          if (value.length > 0 && value.length < 51) {
            if (!/^[0-9a-zA-Z-_]+$/.test(value)) {
              this.addText.originDataIdText =
                "可以输入0-50个数字、字母、下滑线、横杠等";
            } else {
              this.addText.originDataIdText = "";
            }
          } else {
            this.addText.originDataIdText =
              "可以输入0-50个数字、字母、下滑线、横杠等";
          }
          // this.addText.originDataIdText = "";
        }
      } else if (id === "description") {
        if (!value) {
          this.addText.descText = "";
        } else {
          if (value.length > 0 && value.length < 201) {
            // if (!/^[0-9a-zA-Z-_\u4e00-\u9fa5]+$/.test(value)) {
            //    this.addText.permElemNameText =
            //     "可以输入0-200个中文、数字、字母、下滑线、横杠等";
            // } else {
            this.addText.descText = "";
            // }
          } else {
            this.addText.descText =
              "可以输入0-200个中文、数字、字母、下滑线、横杠等";
          }
          // this.addText.descText = "";s
        }
      }
    },
    // 获取数据权限列表
    getdatalist() {
      axios
        .get("/os_kernel_authzctr/app/dataperm/list")
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.form.options = res.data.result.records;
            this.form.selected = res.data.result.records[0].id;
            this.diolgform.options = res.data.result.records;
            this.diolgform.selected = this.form.selected;
            if (this.form.selected == "250a4f656853405f92e08bc837cfc9d1") {
              this.showTbn = true;
            } else {
              this.showTbn = false;
            }
            this.getdatapermlist();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 分页
    changeCurrentPage(num) {
      this.currentPage = num;
      this.getdatapermlist();
    },
    selectAccount() {},
    selectAllAccount() {},
    edit(item) {
      this.newedit = {};
      this.modal.title = "编辑";
      this.disabledEdit = true;
      axios
        .get("/os_kernel_authzctr/app/datapermelem/queryById", {
          params: { id: item.id }
        })
        .then(res => {
          this.addVisible = true;
          this.newedit = res.data.result;
          this.diolgform.selected = res.data.result.dataPermId;
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // // 添加子项
    // addChild() {
    //   this.newedit = {};
    //   this.modal.title = "添加子项";
    //   this.addVisible = true;
    // },
    del(item) {
      this.confirmVisible = true;
      this.delItem = item;
    },
    delElement() {
      axios
        .post(
          "/os_kernel_authzctr/app/datapermelem/delete?id=" + this.delItem.id
          // ,{
          //   id:item.id
          // }
        )
        .then(res => {
          if (res.data.code == 0) {
            this.getdatapermlist();
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 编辑提交操作
    submitEdit(bvModalEvt) {
      bvModalEvt.preventDefault();

      if (!this.newedit.permElemName) {
        this.addText.permElemNameText = "不能为空";
      } else {
        this.addText.permElemNameText;
        if (
          this.newedit.permElemName.length > 0 &&
          this.newedit.permElemName.length < 21
        ) {
          if (
            !/^[0-9a-zA-Z-_\u4e00-\u9fa5]+$/.test(this.newedit.permElemName)
          ) {
            this.addText.permElemNameText =
              "可以输入0-20个中文、数字、字母、下滑线、横杠等";
          } else {
            this.addText.permElemNameText = "";
          }
        } else {
          this.addText.permElemNameText =
            "可以输入0-20个中文、数字、字母、下滑线、横杠等";
        }
      }
      if (!this.newedit.permElemCode) {
        this.addText.permElemCodeText = "不能为空";
      } else {
        if (
          this.newedit.permElemCode.length > 0 &&
          this.newedit.permElemCode.length < 51
        ) {
          if (!/^[0-9a-zA-Z-_]+$/.test(this.newedit.permElemCode)) {
            this.addText.permElemCodeText =
              "可以输入0-50个数字、字母、下滑线、横杠等";
          } else {
            this.addText.permElemCodeText = "";
          }
        } else {
          this.addText.permElemCodeText =
            "可以输入0-50个数字、字母、下滑线、横杠等";
        }
      }
      if (!this.newedit.originDataId) {
        this.addText.originDataIdText = "不能为空";
      } else {
        if (
          this.newedit.originDataId.length > 0 &&
          this.newedit.originDataId.length < 51
        ) {
          if (!/^[0-9a-zA-Z-_]+$/.test(this.newedit.originDataId)) {
            this.addText.originDataIdText =
              "可以输入0-50个数字、字母、下滑线、横杠等";
          } else {
            this.addText.originDataIdText = "";
          }
        } else {
          this.addText.originDataIdText =
            "可以输入0-50个数字、字母、下滑线、横杠等";
        }
      }
      if (!this.newedit.description) {
        this.addText.descText = "";
      } else {
        if (
          this.newedit.description.length > 0 &&
          this.newedit.description.length < 201
        ) {
          this.addText.descText = "";
          // }
        } else {
          this.addText.descText =
            "可以输入0-200个中文、数字、字母、下滑线、横杠等";
        }
      }
      if (
        this.addText.permElemNameText ||
        this.addText.permElemCodeText ||
        this.addText.originDataIdText ||
        this.addText.descText
      ) {
        return false;
      }
      this.newedit.dataPermId = this.diolgform.selected;
      axios
        .post("/os_kernel_authzctr/app/datapermelem/edit", this.newedit)
        .then(res => {
          if (res.data.code == 0) {
            this.addVisible = false;
            this.$message.success(res.data.message);
            this.getdatapermlist();
          } else {
            this.$message.error(res.data.message);
          }
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // input框删除操作
    emitEmpty(type) {
      const Picker = {
        permElemCode: () => {
          this.$refs.code.focus();
          this.search.permElemCode = "";
        },
        permElemName: () => {
          this.$refs.name.focus();
          this.search.permElemName = "";
        },
        newName: () => {
          this.$refs.newName.focus();
          this.newedit.permElemName = "";
        },
        newCode: () => {
          this.$refs.newCode.focus();
          this.newedit.permElemCode = "";
        },
        newOrigin: () => {
          this.$refs.newOrigin.focus();
          this.newedit.originDataId = "";
        },
        newDesc: () => {
          this.$refs.newDesc.focus();
          this.newedit.description = "";
        }
      }[type]();
    },
    // 新增菜单提交操作
    submitAdd(bvModalEvt) {
      bvModalEvt.preventDefault();

      if (!this.newedit.permElemName) {
        this.addText.permElemNameText = "不能为空";
      } else {
        this.addText.permElemNameText;
        if (
          this.newedit.permElemName.length > 0 &&
          this.newedit.permElemName.length < 21
        ) {
          if (
            !/^[0-9a-zA-Z-_\u4e00-\u9fa5]+$/.test(this.newedit.permElemName)
          ) {
            this.addText.permElemNameText =
              "可以输入0-20个中文、数字、字母、下滑线、横杠等";
          } else {
            this.addText.permElemNameText = "";
          }
        } else {
          this.addText.permElemNameText =
            "可以输入0-20个中文、数字、字母、下滑线、横杠等";
        }
      }
      if (!this.newedit.permElemCode) {
        this.addText.permElemCodeText = "不能为空";
      } else {
        if (
          this.newedit.permElemCode.length > 0 &&
          this.newedit.permElemCode.length < 51
        ) {
          if (!/^[0-9a-zA-Z-_]+$/.test(this.newedit.permElemCode)) {
            this.addText.permElemCodeText =
              "可以输入0-50个数字、字母、下滑线、横杠等";
          } else {
            this.addText.permElemCodeText = "";
          }
        } else {
          this.addText.permElemCodeText =
            "可以输入0-50个数字、字母、下滑线、横杠等";
        }
      }
      if (!this.newedit.originDataId) {
        this.addText.originDataIdText = "不能为空";
      } else {
        if (
          this.newedit.originDataId.length > 0 &&
          this.newedit.originDataId.length < 51
        ) {
          if (!/^[0-9a-zA-Z-_]+$/.test(this.newedit.originDataId)) {
            this.addText.originDataIdText =
              "可以输入0-50个数字、字母、下滑线、横杠等";
          } else {
            this.addText.originDataIdText = "";
          }
        } else {
          this.addText.originDataIdText =
            "可以输入0-50个数字、字母、下滑线、横杠等";
        }
      }
      if (!this.newedit.description) {
        this.addText.descText = "";
      } else {
        if (
          this.newedit.description.length > 0 &&
          this.newedit.description.length < 201
        ) {
          this.addText.descText = "";
          // }
        } else {
          this.addText.descText =
            "可以输入0-200个中文、数字、字母、下滑线、横杠等";
        }
      }
      if (
        this.addText.permElemNameText ||
        this.addText.permElemCodeText ||
        this.addText.originDataIdText ||
        this.addText.descText
      ) {
        return false;
      }
      this.newedit.dataPermId = this.diolgform.selected;
      this.$loading();
      // console.log('newedit',this.newedit)
      axios
        .post("/os_kernel_authzctr/app/datapermelem/add", this.newedit)
        .then(res => {
          console.log(res);
          this.$loading.close();
          if (res.data.code == 0) {
            this.$message.success(res.data.message);
            this.addVisible = false;
            this.getdatapermlist();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    submit(bvModalEvt) {
      if (this.modal.title === "新增") {
        this.submitAdd(bvModalEvt);
      } else {
        this.submitEdit(bvModalEvt);
      }
    },
    handleSearch() {
      if (this.form.selected == "250a4f656853405f92e08bc837cfc9d1") {
        this.showTbn = true;
      } else {
        this.showTbn = false;
      }
      this.currentPage = 1;
      this.getdatapermlist();
    },
    resetAddModal() {
      this.newedit.permElemName = "";
      this.newedit.permElemCode = "";
      this.newedit.originDataId = "";
      this.newedit.description = "";

      this.addText.permElemNameText = "";
      this.addText.permElemCodeText = "";
      this.addText.originDataIdText = "";
      this.addText.descText = "";
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}

.search {
  padding-top: 20px;
}
.btn-box {
  width: 68px;
  display: inline-block;
  margin: 5px;
}
.mrl10 {
  margin-left: 10px;
}
.pageFixed {
  margin-top: 30px;
}
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
  position: relative;
}
.inline {
  display: inline-block;
}
.must {
  color: #f00;
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
.mr25 {
  margin: 25px 0px;
}
.label-width {
  width: 95px;
  text-align: right;
  padding-right: 10px;
}
.inline {
  display: inline-block;
}
.clearIcon {
  position: absolute;
  right: 10px;
  top: 12px;
  color: #ccc;
  z-index: 100;
}
.mrt20 {
  margin-top: 20px;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
