<template>
  <div class="animated fadeIn">
    <!--头部新增栏-->
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
                  <div class="btn-box" style="margin-left: 15px">
                    <button
                      type="button"
                      class="btn btn-primary btn-block func-item func-btn btn-sm"
                      @click="handleQuery"
                    >查询</button>
                  </div>
                  <div class="btn-box-100 mrl-10">
                    <button
                      type="button"
                      class="btn btn-success btn-block func-item func-btn btn-sm"
                      @click="handleAddF"
                    >新增一级菜单</button>
                  </div>
                </div>
              </form>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <!--列表栏-->
    <b-row>
      <b-col sm="12" lg="12">
        <b-card>
          <b-card-body>
            <div>
              <b-row>
                <b-col>
                  <template v-if="form.selected.length>0">
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
                      <el-table-column prop="modName" label="菜单名称" align="left"></el-table-column>
                      <el-table-column align="center" prop="modCode" label="菜单code" width="240"></el-table-column>
                      <el-table-column align="center" prop="jsCompName" label="前端组件" width="160"></el-table-column>
                      <el-table-column align="center" prop="status" label="状态" width="160">
                        <template slot-scope="scope">
                          <span v-show="scope.row.status===1">启用</span>
                          <span v-show="scope.row.status===2">禁用</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" align="center" min-width="200">
                        <template slot-scope="scope">
                          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                          <el-button type="text" size="small" @click="handleAddS(scope.row)">添加子菜单</el-button>
                          <el-button type="text" size="small" @click="handleStop(scope.row)">
                            <span v-show="scope.row.status===2">启用</span>
                            <span v-show="scope.row.status===1" style="color:#f00;">禁用</span>
                          </el-button>
                          <el-button type="text" size="small" @click="handleDelect(scope.row)">删除</el-button>
                          <el-button
                            type="text"
                            size="small"
                            v-show="scope.row.isLeaf===1?true:false"
                            @click="handleDistribution(scope.row)"
                          >分配操作</el-button>
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
    <!-- 新增,编辑弹出层 -->
    <b-modal
      :title="dialogTitle"
      v-model="dialogVisible"
      @ok="submitForm"
      @hidden="resetBtn"
      cancel-title="关闭"
      ok-title="确定"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrl10">{{dialogTitle}}</span>
        </div>
      </template>
      <div class="input-group mr25" v-show="isShow">
        <label for="basicName" class="col-form-label label-width">上级菜单：</label>
        <div
          style="text-align: center;display: flex;justify-content: center;align-items: center"
        >{{lastName}}</div>
      </div>
      <div class="input-group mr25 mrt0">
        <label for="basicName" class="col-form-label label-width">
          <span class="must">*</span>菜单名称：
        </label>
        <input
          v-model.trim="newdata.menuName"
          id="basicName"
          @blur="checkRules('menuName',newdata.menuName)"
          type="text"
          ref="menuName"
          placeholder="请输入菜单名称"
          class="form-control auth-form-control relative border-3r"
          :class="[menuNameText?'errorColor':'']"
        />
        <i
          v-show="newdata.menuName"
          @click="emitEmpty('menuName')"
          class="cui-circle-x icons clearIcon"
        ></i>
        <div class="error-box">
          <template>
            <span class="error-text" style>{{menuNameText}}</span>
          </template>
        </div>
      </div>
      <div class="input-group mr25">
        <label for="basicName" class="col-form-label label-width">
          <span class="must">*</span>菜单Code：
        </label>
        <input
          :disabled="this.editable"
          id="basicName"
          v-model.trim="newdata.menuCode"
          @blur="checkRules('menuCode',newdata.menuCode)"
          type="text"
          ref="menuCode"
          placeholder="请输入菜单code"
          class="form-control auth-form-control relative border-3r"
          :class="[menuCodeText?'errorColor':'']"
        />
        <i
          v-if="!this.editable"
          v-show="newdata.menuCode"
          @click="emitEmpty('menuCode')"
          class="cui-circle-x icons clearIcon"
        ></i>
        <div class="error-box">
          <template>
            <span class="error-text" style>{{menuCodeText}}</span>
          </template>
        </div>
      </div>
      <!--<div class="input-group mr25">
        <label for="basicName" class="col-form-label label-width">
          <span class="must">*</span>菜单路径：
        </label>
        <input
          id="basicName"
          type="text"
          v-model="newdata.menuPath"
          @blur="checkRules('menuPath',newdata.menuPath)"
          placeholder="请输入菜单路径"
          class="form-control auth-form-control relative "
        />
        <div class="error-box">
          <template>
            <span class="error-text" style>{{menuPathText}}</span>
          </template>
        </div>
      </div>-->
      <div class="input-group mr25">
        <label for="basicName" class="col-form-label label-width">前端组件：</label>
        <input
          id="basicName"
          type="text"
          v-model="newdata.jsCompName"
          @blur="checkRules('jsCompName',newdata.jsCompName)"
          placeholder="请输入前端组件"
          ref="jsCompName"
          class="form-control auth-form-control relative border-3r"
          :class="[jsCompNameText?'errorColor':'']"
        />
        <i
          v-show="newdata.jsCompName"
          @click="emitEmpty('jsCompName')"
          class="cui-circle-x icons clearIcon"
        ></i>
        <div class="error-box">
          <template>
            <span class="error-text" style>{{jsCompNameText}}</span>
          </template>
        </div>
      </div>
      <div class="input-group">
        <label for="basicName" class="col-form-label label-width">
          <span class="must">*</span>叶子节点：
        </label>
        <template>
          <el-radio-group v-model="newdata.isLeaf" style="padding-top: 10px;">
            <el-radio :label="0" style="margin-right:10px">否</el-radio>
            <el-radio :label="1" style="margin-right:10px">是</el-radio>
          </el-radio-group>
        </template>
      </div>
    </b-modal>
    <!--分配操作弹框-->
    <b-modal
      title="分配操作"
      v-model="commonVisble"
      @ok="editOperation"
      cancel-title="关闭"
      ok-title="确定"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrl10">分配操作</span>
        </div>
      </template>
      <template>
        <div class="datalist-content" style="padding-left:20%">
          <div style="margin: 15px 0;">分配通用操作：</div>
          <el-checkbox-group v-model="has_data" class="grounp-check">
            <el-checkbox
              class="block"
              v-for="dataitem in datapermission"
              :label="dataitem.id"
              :key="dataitem.id"
              @change="operation(dataitem)"
            >{{dataitem.modName}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </template>
      <!-- <b-form-group style="text-align: left;font-size: 1rem">
          <b-form-checkbox-group
            v-model="checkboxSelected"
            :options="checkboxOption"
            plain
            stacked
          >
          </b-form-checkbox-group>
      </b-form-group>-->
    </b-modal>
    <!--停用启用操作弹框-->
    <b-modal
      :title="confirmTitle"
      v-model="confirmVisble"
      @ok="submitConfirm"
      cancel-title="关闭"
      ok-title="确定"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrl10">{{confirmTitle}}</span>
        </div>
      </template>
      <p style=" margin-bottom: 10px;">{{confirmText}}</p>
    </b-modal>
    <!--删除操作弹框-->
    <b-modal title="删除确认" v-model="delectVisble" @ok="submitDelect" cancel-title="关闭" ok-title="确定">
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrl10">删除确认</span>
        </div>
      </template>
      <p style=" margin-bottom: 10px;">确定删除该菜单</p>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import tree from "../../components/tree";

export default {
  name: "dashboard",
  components: { tree },
  data: function() {
    return {
      //可编辑
      editable: false,

      //顶部系统下拉框
      form: {
        selected: [],
        options: []
      },
      //新增/编辑
      newdata: {
        menuName: "",
        menuCode: "",
        menuPath: "",
        jsCompName: "",
        isLeaf: 1
      },
      //规则信息文本
      menuPathText: "",
      menuCodeText: "",
      jsCompNameText: "",
      menuNameText: "",
      //停用启用按钮标题
      confirmTitle: "",
      //停用启用按钮可见性
      confirmVisble: false,
      //停用启用内容
      confirmText: "",
      //停用启用状态
      status: 1,
      //删除按钮可见性
      delectVisble: false,
      //二级菜单显示
      isShow: false,
      //二级菜单名
      lastName: "",
      //拼接pathName pathCode
      pathName: "",
      pathCode: "",

      //弹出框名称
      dialogTitle: null,

      //保存起来的id
      parentId: "e33d06cd-ca24-11e9-b6a6-40b076401f67",
      //层级
      level: 1,
      //tree
      tableData1: [],
      //刷新使用
      refresh: { id: "" },
      resolve: null,
      treeNode: null,

      //分配操作可见性
      commonVisble: false,
      //分配操作多选
      checkboxOption: [],
      //分配操作选定
      checkboxSelected: [],

      //新增/编辑按钮可见性
      dialogVisible: false,
      datapermission: [], //分配操作列表
      has_data: [], //已勾选数组
      checked: [], //分配操作勾选
      accountId: ""
    };
  },
  created() {
    this.accountId = JSON.parse(localStorage.getItem("userinfo")).userId;
    this.$loading();
    //获取系统信息
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
  },
  watch: {},
  methods: {
    handleFullScreen() {
          if (!_t.isFullScreen) {
            // 全屏
            let docElm = _t.$refs['HighLight']
            if (docElm.requestFullscreen) {
              docElm.requestFullscreen()
            } else if (docElm.mozRequestFullScreen) {
              docElm.mozRequestFullScreen()
            } else if (docElm.webkitRequestFullScreen) {
              docElm.webkitRequestFullScreen()
            } else if (docElm.msRequestFullscreen) {
              docElm.msRequestFullscreen()
            }
          } else {
            // 退出全屏
            if (document.exitFullscreen) {
              document.exitFullscreen()
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen()
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen()
            }
          }
          _t.isFullScreen = !_t.isFullScreen
        },
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
    //重置
    resetBtn() {
      this.newdata.menuName = "";
      this.newdata.menuCode = "";
      this.newdata.menuPath = "";
      this.newdata.jsCompName = "";
      this.newdata.isLeaf = 0;
      this.menuPathText = "";
      this.menuCodeText = "";
      this.jsCompNameText = "";
      this.menuNameText = "";
      this.editable = false;
      //二级菜单显示
      this.isShow = false;
      //二级菜单名
      this.lastName = "";
      this.level = 1;
    },
    //查询按钮
    handleQuery() {
      this.getList();
    },
    //获取首次数据
    getList() {
      this.$loading();
      axios
        .get(
          "/os_kernel_appsysctr/app/appsysModule/queryModuleRootNodeByAppSysId",
          {
            params: {
              appSysId: this.form.selected,
              t: Date.now()
            }
          }
        )
        .then(res => {
          this.$loading.close();
          console.log("res", res);
          //给列表数值
          this.tableData1 = res.data.result.appSysModuleDtoList;
          //保存父id
          this.tableData1.forEach(item => {
            this.parentId = item.parentId;
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
    //tabel操作
    load(tree, treeNode, resolve) {
      this.resolve = resolve;
      this.treeNode = treeNode;
      this.$loading();
      axios
        .get("/os_kernel_appsysctr/app/appsysModule/queryChildNodeByParentId", {
          params: {
            parentId: tree.id,
            appSysId: this.form.selected
          }
        })
        .then(res => {
          this.$loading.close();
          // let arr = res.data.result.appSysModuleDtoList;
          // res.data.result.appSysModuleDtoList.forEach(value => {
          //   if (!value.appSysModuleDtoList) {
          //     value.leaf = true; //为叶子节点
          //   } else {
          //     value.leaf = false; //不为叶子节点
          //   }
          // });
          let arr = res.data.result.appSysModuleDtoList;
          arr.forEach(item => {
            if (item.appSysModuleDtoList) {
              item["hasChildren"] = true;
            }
          });
          resolve(arr);
        });
    },
    //编辑按钮事件
    handleEdit(item) {
      this.newdata.menuName = item.modName;
      this.newdata.menuCode = item.modCode;
      this.newdata.menuPath = item.modUri;
      this.newdata.jsCompName = item.jsCompName;
      this.newdata.isLeaf = item.isLeaf;
      this.parentId = item.id;
      this.editable = true;
      this.dialogTitle = "编辑";
      this.dialogVisible = true;
      console.log("编辑", item.id);
    },
    // input框删除操作
    emitEmpty(type) {
      const Picker = {
        menuName: () => {
          this.$refs.menuName.focus();
          this.newdata.menuName = "";
        },
        menuCode: () => {
          this.$refs.menuCode.focus();
          this.newdata.menuCode = "";
        },
        jsCompName: () => {
          this.$refs.jsCompName.focus();
          this.newdata.jsCompName = "";
        }
      }[type]();
    },
    //新增一级菜单
    handleAddF() {
      this.resetBtn();
      this.dialogTitle = "新增一级菜单";
      this.dialogVisible = true;
    },
    //新增二级菜单
    handleAddS(item) {
      this.resetBtn();
      if (item.isLeaf == 1) {
        this.$message({
          showClose: true,
          message: "请在编辑按钮修改非叶子节点!",
          type: "warning"
        });
        return;
      }

      this.isShow = !this.isShow;
      this.lastName = item.modName;
      this.pathName = item.pathName;
      this.pathCode = item.pathCode;
      this.parentId = item.id;
      this.refresh.id = item.id;
      this.level = Number(item.level) + 1;
      this.dialogTitle = "新增子菜单";
      this.dialogVisible = true;
    },
    //新增/编辑提交
    submitForm(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (!this.newdata.menuName) {
        this.menuNameText = "不能为空";
      } else {
        // this.menuNameText = "";
        if (
          this.newdata.menuName.length > 0 &&
          this.newdata.menuName.length < 21
        ) {
          if (!/^[0-9a-zA-Z-_\u4e00-\u9fa5]+$/.test(this.newdata.menuName)) {
            this.menuNameText = "请输入0-20个中文、数字、字母、下滑线、横杠等";
          } else {
            this.menuNameText = "";
          }
        } else {
          this.menuNameText = "可以输入0-20个中文、数字、字母、下滑线、横杠等";
        }
      }
      if (!this.newdata.menuCode) {
        this.menuCodeText = "不能为空";
      } else {
        // this.menuCodeText = "";
        if (
          this.newdata.menuCode.length > 0 &&
          this.newdata.menuCode.length < 51
        ) {
          if (!/^[0-9a-zA-Z-_]+$/.test(this.newdata.menuCode)) {
            this.menuCodeText = "请输入0-50个数字、字母、下滑线、横杠等";
          } else {
            this.menuCodeText = "";
          }
        } else {
          this.menuCodeText = "可以输入0-50个数字、字母、下滑线、横杠等";
        }
      }
      if (this.menuCodeText || this.menuNameText) {
        return false;
      }
      if (this.dialogTitle == "编辑") {
        this.$loading();
        axios
          .post(
            "/os_kernel_appsysctr/app/appsysModule/editModuleWithFuncPermission",
            {
              id: this.parentId,
              modCode: this.newdata.menuCode,
              modName: this.newdata.menuName,
              pathCode: this.newdata.menuCode,
              pathName: this.newdata.menuName,
              jsCompName: this.newdata.jsCompName,
              isLeaf: this.newdata.isLeaf
            },
            {
              headers: {
                Authorization: "basic PASSTHR",
                "X-OS-KERNEL-APPSYSID": "65b49810-d395-11e9-9092-fa163e6c79ee",
                "Content-Type": "application/json",
                "X-OS-KERNEL-TOKEN":
                  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwdGVzdCIsInVzZXJfbmFtZSI6InB0ZXN0IiwiZXhwIjoxNTY5ODQzNjAyLCJ1c2VySWQiOiIwZTA4ZTE1My1iMDRhLTExZTktYjMxYi1iMDZlYmYxNGE0NzYifQ.ClrIikHYInMYaWfGCkwHR8Kd3YzmTnm5bK_yN85ZBGc"
              }
            }
          )
          .then(res => {
            this.$loading.close();
            // console.log("编辑的回调信息", res);

            if (res.data.code == 0) {
              this.$message({
                message: "编辑成功!",
                type: "success"
              });
              this.tableData1 = [];
              this.getList();
              // this.reflashPage()
              // this.$router.push("/emptyPage");
            } else {
              this.$message({
                message: "编辑失败!",
                type: "error"
              });
            }
            this.dialogVisible = false;
          })
          .catch(err => {
            this.$loading.close();
            console.log(err);
          });
      } else if (this.dialogTitle == "新增一级菜单") {
        this.$loading();
        axios
          .post(
            "/os_kernel_appsysctr/app/appsysModule/addModule",
            {
              appSysId: this.form.selected,
              level: Number(this.level),
              sort_no: 1,
              modCode: this.newdata.menuCode,
              modName: this.newdata.menuName,
              pathCode: this.newdata.menuCode,
              pathName: this.newdata.menuName,
              isLeaf: Number(this.newdata.isLeaf),
              jsCompName: this.newdata.jsCompName,
              status: 1,
              delFlag: 0,
              parentId: this.form.selected,
              modType: 0,
              t: Date.now()
            },
            {
              headers: {
                Authorization: "basic PASSTHR",
                "X-OS-KERNEL-APPSYSID": "65b49810-d395-11e9-9092-fa163e6c79ee",
                "Content-Type": "application/json",
                "X-OS-KERNEL-TOKEN":
                  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwdGVzdCIsInVzZXJfbmFtZSI6InB0ZXN0IiwiZXhwIjoxNTY5ODQzNjAyLCJ1c2VySWQiOiIwZTA4ZTE1My1iMDRhLTExZTktYjMxYi1iMDZlYmYxNGE0NzYifQ.ClrIikHYInMYaWfGCkwHR8Kd3YzmTnm5bK_yN85ZBGc"
              }
            }
          )
          .then(res => {
            this.$loading.close();
            // console.log("新增一级的回调信息", res);
            if (res.data.code == 0) {
              this.getList();
              this.$message({
                message: "新增一级菜单成功!",
                type: "success"
              });
              console.log("成功");
            } else {
              this.$message({
                message: "新增一级菜单失败!",
                type: "error"
              });
            }
            this.dialogVisible = false;
          })
          .catch(err => {
            this.$loading.close();
            console.log(err);
          });
      } else if (this.dialogTitle == "新增子菜单") {
        this.$loading();
        axios
          .post(
            "/os_kernel_appsysctr/app/appsysModule/addModule",
            {
              appSysId: this.form.selected,
              level: Number(this.level),
              modCode: this.newdata.menuCode,
              modName: this.newdata.menuName,
              pathCode: this.pathCode + "/" + this.newdata.menuCode,
              pathName: this.pathName + "/" + this.newdata.menuName,
              isLeaf: Number(this.newdata.isLeaf),
              status: 1,
              delFlag: 0,
              parentId: this.parentId,
              modType: 0
            },
            {
              headers: {
                Authorization: "basic PASSTHR",
                "X-OS-KERNEL-APPSYSID": "65b49810-d395-11e9-9092-fa163e6c79ee",
                "Content-Type": "application/json",
                "X-OS-KERNEL-TOKEN":
                  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwdGVzdCIsInVzZXJfbmFtZSI6InB0ZXN0IiwiZXhwIjoxNTY5ODQzNjAyLCJ1c2VySWQiOiIwZTA4ZTE1My1iMDRhLTExZTktYjMxYi1iMDZlYmYxNGE0NzYifQ.ClrIikHYInMYaWfGCkwHR8Kd3YzmTnm5bK_yN85ZBGc"
              }
            }
          )
          .then(res => {
            this.$loading.close();
            // console.log("新增的回调信息", res);
            if (res.data.code == 0) {
              this.dialogVisible = false;
              this.$message({
                message: "新增子菜单成功!",
                type: "success"
              });
              this.getList();

              // let keys = this.$refs.tree.getCheckedKeys() //取得当前选择的node-key
              // this.$refs.tree.updateKeyChildren(keys,this.tableData1)//更新node-key的子节点
              this.load(this.refresh, this.treeNode, this.resolve);
            } else {
              this.$message({
                message: "新增菜单失败，菜单Code已存在!",
                //  message:res.data.message,
                type: "error"
              });
            }
          })
          .catch(err => {
            this.$loading.close();
            console.log(err);
          });
      }
    },
    // 页面刷新
    reflashPage() {
      console.log("dsfsdffsd");
      let NewPage = "_empty" + "?time=" + new Date().getTime() / 500;
      this.$router.push(NewPage);
      this.$router.go(-1);
    },
    //停用启用按钮
    handleStop(item) {
      this.confirmTitle = item.status === 1 ? "停用确定" : "启用确定";
      this.confirmVisble = true;
      this.confirmText =
        item.status === 1 ? "确定停用该菜单？" : "确定启用该菜单？";
      this.parentId = item.id;
      this.status = item.status;
    },
    //停用启用提交
    submitConfirm() {
      this.$loading();
      axios
        .post(
          "/os_kernel_appsysctr/app/appsysModule/updateAppSysModuleStatus",
          {
            id: this.parentId,
            status: this.status === 1 ? 2 : 1
          }
        )
        .then(res => {
          this.$loading.close();
          // console.log('启用的回调信息', res)
          if (res.data.code == 0) {
            this.$message({
              message: "修改成功!",
              type: "success"
            });
            this.tableData1 = [];
            this.getList();
            //  this.reflashPage()
            // this.$router.push("/emptyPage");
          } else {
            this.$message({
              message: "修改失败!",
              type: "error"
            });
          }
        })
        .catch(err => {
          this.$loading.close();
          console.log(err);
        });
    },
    //删除按钮
    handleDelect(item) {
      this.delectVisble = true;
      this.parentId = item.id;
    },
    //删除按钮提交
    submitDelect() {
      this.$loading();
      axios
        .post(
          "/os_kernel_appsysctr/app/appsysModule/delBatchModuleMainWithFuncPermissionMain",
          {
            id: this.parentId
          }
        )
        .then(res => {
          this.$loading.close();
          console.log("删除", res);
          if (res.data.code == 0) {
            this.$message({
              message: "删除成功!",
              type: "success"
            });
            this.tableData1 = [];
            this.getList();
            // console.log('成功')
            //  this.reflashPage()
            // this.$router.push("/emptyPage");
          } else {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {
          this.$loading.close();
          console.log(err);
        });
    },
    //判断规则
    checkRules(id, value) {
      if (id === "menuName") {
        if (!value) {
          this.menuNameText = "不能为空";
        } else {
          // this.menuNameText = "";
          if (value.length > 0 && value.length < 21) {
            if (!/^[0-9a-zA-Z-_\u4e00-\u9fa5]+$/.test(value)) {
              this.menuNameText =
                "请输入0-20个中文、数字、字母、下滑线、横杠等";
            } else {
              this.menuNameText = "";
            }
          } else {
            this.menuNameText =
              "可以输入0-20个中文、数字、字母、下滑线、横杠等";
          }
        }
      } else if (id === "menuPath") {
        if (!value) {
          this.menuPathText = "不能为空";
        } else {
          // this.menuPathText = "";
          if (value.length > 0 && value.length < 51) {
            if (!/^[0-9a-zA-Z-_]+$/.test(value)) {
              this.menuPathText = "请输入0-50个数字、字母、下滑线、横杠等";
            } else {
              this.menuPathText = "";
            }
          } else {
            this.menuPathText = "可以输入0-50个数字、字母、下滑线、横杠等";
          }
        }
      } else if (id === "menuCode") {
        if (!value) {
          this.menuCodeText = "不能为空";
        } else {
          // this.menuCodeText = "";
          if (value.length > 0 && value.length < 51) {
            if (!/^[0-9a-zA-Z-_]+$/.test(value)) {
              this.menuCodeText = "请输入0-50个数字、字母、下滑线、横杠等";
            } else {
              this.menuCodeText = "";
            }
          } else {
            this.menuCodeText = "可以输入0-50个数字、字母、下滑线、横杠等";
          }
        }
      }
    },
    //分配操作 --获取分配操作列表
    handleDistribution(item) {
      this.operationItem = item;
      this.commonVisble = true;
      this.parentId = item.id;
      // this.gethas(item);
      // 获取分配操作列表
      this.$loading();
      axios
        .get("/os_kernel_appsysctr/app/appsysModule/queryOpAndDefinition", {
          params: {
            id: item.id
          }
        })
        .then(res => {
          this.has_data = [];
          // console.log("通用操作", res);
          this.$loading.close();
          this.datapermission = res.data.result;
          res.data.result.forEach(value => {
            if (value.funcPermStatus == 2) {
              this.has_data.push(value.id);
            }
          });
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    // // 分配操作 --获取分配操作已拥有的
    // gethas(item) {
    //    this.$loading();
    //   axios
    //     .get(
    //       "/os_kernel_appsysctr/app/appsysModule/queryAllOpByAppSysModuleId",
    //       {
    //         params: { id: item.id }
    //       }
    //     )
    //     .then(res => {
    //        this.$loading.close();
    //       console.log(res);
    //       this.has_data = res.data.result.map(item => {
    //         return item.id;
    //       });
    //     })
    //     .catch(error => {
    //        this.$loading.close();
    //       console.log(error);
    //     });
    // },
    //分配操作---- 编辑通用操作
    editOperation() {
      let condition = {};
      condition.id = this.operationItem.id;
      let arr = [];
      this.checked.map(item => {
        const temp = {
          id: item
        };
        return arr.push(temp);
      });
      condition.appSysModuleList = arr;
      console.log("condition", condition);
      this.$loading();
      axios
        .post(
          "/os_kernel_appsysctr/app/appsysModule/updateOpDefinition",
          condition
        )
        .then(res => {
          this.$loading.close();
          this.checked = [];
          console.log(res);
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    // 分配操作勾选
    operation(data) {
      let idx = this.checked.indexOf(data.id);
      if (idx == -1) {
        this.checked.push(data.id);
      } else {
        this.checked.splice(idx, 1);
      }
      console.log("checked", this.checked);
    },
    //分配操作提交
    submitCommon() {
      // //分配操作选定
      // console.log("分配操作", this.checkboxSelected);
      // let arr = this.checkboxSelected.map((item, idx) => {
      //   // console.log(item,idx);
      //   let o = {};
      //   o[item] = item;
      //   return o;
      // });
      // console.log(arr);
      // //这里发网络请求 把上面的数组传给后端 格式再找啊浩对一下
    }
  },
  mounted() {
    // console.log('测试', this.selected)
  }
};
</script>

<style lang="scss" scoped>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}
.datalist-content {
  width: 100%;
  text-align: left;
  height: 500px;
  // height:338px;
  overflow: hidden;
  overflow-y: auto;
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

//更多
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
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
.grounp-check {
  text-align: left;
  padding-left: 30px;
}
.block {
  display: block;
}
.errorColor {
  border: 1px solid #f00;
}
.card {
  margin-bottom: 0px;
}
.btn-box-100 {
  width: 100px;
}
.mrl-10 {
  margin-left: 10px;
}
.mrt0 {
  margin-top: 0px;
}
.mrl10 {
  margin-left: 10px;
}
</style>
