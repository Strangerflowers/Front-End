<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <b-card>
          <div slot="header">查询条件</div>

          <b-form inline :model="form">
            <b-form-group label="类型：" label-for="unitTypes">
              <el-cascader
                v-model="unitTypes"
                ref="unitTypes"
                :options="unitTypesTree"
                :props="{multiple:true}"
                :show-all-levels="false"
              ></el-cascader>
            </b-form-group>

            <b-form-group label="资产状态：" label-for="assetStatus">
              <b-form-select
                id="assetStatus"
                v-model="form.propertyStatus"
                :plain="true"
                :options="assetStatusArr"
              ></b-form-select>
            </b-form-group>

            <b-form-group label="租用状态：" label-for="assetPostal">
              <b-form-select
                id="assetPostal"
                v-model="form.assetPostal"
                :plain="true"
                :options="assetPostalArr"
              ></b-form-select>
            </b-form-group>

            <b-form-group label="单元：" label-for="assetSimpleName">
              <b-form-input
                id="assetSimpleName"
                type="text"
                v-model="form.assetSimpleName"
                @keyup.enter="submitBtn"
              ></b-form-input>
            </b-form-group>
          </b-form>
          <div slot="footer">
            <b-button @click="submitBtn" type="submit" size="sm" variant="primary">
              <i class="fa fa-dot-circle-o"></i> 查询
            </b-button>
            <b-button @click="resetBtn" type="reset" size="sm" variant="danger">
              <i class="fa fa-ban"></i> 重置
            </b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="2">
        <z-el-tree @currentNode="getTreeNode"></z-el-tree>
      </b-col>
      <b-col lg="10">
        <!--table表格组件-->
        <c-table
          hover
          striped
          bordered
          :topBtn="true"
          :busy.sync="isBusy"
          :table-data="tableData"
          :fields="fields"
          :totalRows="totalRows"
          :perPage="perPage"
          @getSortType="getSortType"
          @updatePage="updatePage"
          @getSelectedRows="getSelectedRows"
        >
          <!--table上方按钮组-->
          <template v-slot:topBtn>
            <b-button @click="addFun" size="sm" variant="primary">
              <i class="fa fa-plus-square-o"></i> 新增
            </b-button>
          </template>
          <!--/table上方按钮组-->

          <!--table表格操作按钮-->
          <template v-slot:control="row">
            <i :id="'popoverButton-'+row.item.id" class="fa fa-ellipsis-h"></i>
            <b-popover
              :target="'popoverButton-'+row.item.id"
              placement="buttom"
              triggers="hover focus"
            >
              <template>
                <b-button
                  variant="primary"
                  size="sm"
                  @click="updateAssetFun(row.item.id)"
                  :disabled="row.item.status== '1'?true:false"
                >编辑</b-button>
                <b-button variant="primary" size="sm" @click="detailAssetFun(row.item.id)">查看</b-button>
                <b-button
                  variant="primary"
                  v-if="row.item.status== '0' "
                  size="sm"
                  @click="enableAssetFun(row.item.id,row.item.status,row.item.assetType)"
                >启用</b-button>
                <b-button
                  variant="primary"
                  v-if="row.item.status== '1' "
                  size="sm"
                  @click="disableAssetFun(row.item.id,row.item.status,row.item.assetType)"
                >停用</b-button>
              </template>
            </b-popover>
          </template>
          <!--/table表格操作按钮-->

          <!--table表格每页显示行数设置-->
          <template v-slot:perPageSetting>
            <b-form inline class="perPage-setting">
              <b-form-group label="每页" label-align-sm="right" label-for="perPageSelect">
                <b-form-select
                  v-model="perPage"
                  id="perPageSelect"
                  size="sm"
                  :options="pageOptions"
                ></b-form-select>行
              </b-form-group>
            </b-form>
          </template>
          <!--/table表格每页显示行数设置-->
        </c-table>
        <!--/table表格组件-->
      </b-col>
    </b-row>

    <!--弹出框组-->

    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      size="lg"
      @hide="resetInfoModal"
      hide-footer
      hide-header-close
    >
      <div slot="modal-title">
        <i class="fa fa-align-justify"></i>查看
      </div>
      <detailForm :modalId="infoModal.id" :targetObj="infoModal.targetObj" @actionTips ="makeToast"></detailForm>
      <pre>{{ infoModal.content }}</pre>
    </b-modal>

    <b-modal
      :id="addOrUpdateModal.id"
      :title="addOrUpdateModal.title"
      size="lg"
      @hide="resetAddOrUpdateModal"
      hide-footer
      hide-header-close
    >
      <div slot="modal-title">
        <i class="fa fa-align-justify"></i>
        {{addOrUpdateModal.modalType == 'edit' ? '更新' : '新增'}}
      </div>
      <addOrUpdateForm  :modalId="addOrUpdateModal.id" :modalType="addOrUpdateModal.modalType" :targetObj="addOrUpdateModal.targetObj" @actionTips ="makeToast"  @refreshTable="refreshTable"></addOrUpdateForm>
    </b-modal>
    <!--/弹出框组-->
  </div>
</template>

<script>
import axios from "axios";
import cTable from "@/components/asset/z-table.vue";
// import cTree from '@/components/tree.vue'
import zElTree from "@/components/asset/tree.vue";
import addOrUpdateForm from '@/views/assetCenter/asset/asset-add-or-update.vue'
// import addOrUpdateForm from '@/views/operationMange/baseMessageManage/asset/asset-coding.vue'
import detailForm from '@/views/assetCenter/asset/asset-info.vue'
// import AssetAPI from '@/api/baseMessageManage/asset.js'

const assetTypeParent = new Map([
  ["project", "hq"],
  ["land", "project"],
  ["building", "land"],
  ["floor", "building"],
  ["unit", "floor"]
]);

export default {
  name: "asset",
  components: {
    cTable,
    // cTree,
    zElTree,
    addOrUpdateForm,
    // detailForm
  },
  data: () => {
    return {
      tableDatas: [],
      form: {
        unitTypes: [],
        propertyStatus: "",
        assetPostal: "",
        assetSimpleName: "",
        assetType: "hq",
        id: ""
      },
      unitTypesTree: [],
      assetStatusArr: [],
      assetPostalArr: [],
      treeData: [],
      assetTreeInfo: {
        treeType: "",
        treeName: "",
        treeId: "",
        treeStatus: ""
      },
      options: {
        // Boolean,是否显示选择框
        checkbox: true,
        // (v2.1新增) Boolean,获取复选项目是否包含目录,默认`true`,如果只获取叶子节点设置为`false`
        idsWithParent: false,
        // (v2.1新增) Number,初始化时展开层级,根节点为0,默认0
        depthOpen: 0
      },
      isBusy: false,
      pageOptions: [5, 10, 15],
      perPage: 10,
      currentPage: 1,
      totalRows: 1,
      fields: [],
      params: [],
      infoModal: {
        id: "info-modal",
        title: "",
        targetObj: {},
        content: ""
      },
      addOrUpdateModal: {
        id: "add-update-modal",
        title: "",
        modalType: "",
        targetObj: {},
        content: ""
      },
      unitTypes: []
    };
  },
  created() {
    //获取表格初始化数据
    this.getTableData("hq");
    //初始化下拉框数据
    this.getSelectDataShow();
    //初始化单元类型树
    // this.getUnitTypeTree();
  },
  computed: {
    tableData() {
      const tableData = this.tableDatas;
      return Array.isArray(tableData) ? tableData : tableData();
    }
  },
  watch: {
    unitTypes() {
      this.form.unitTypes = [];
      let res = this.$refs.unitTypes.getCheckedNodes(true);
      let sels = res.map(item => {
        return item.value;
      });
      this.form.unitTypes = sels;
    }
  },
  methods: {
    // 点击获取资产树的子节点
    getTreeNode(nodeData) {
      // console.log('nodeData',nodeData)
      this.assetTreeInfo.treeType = nodeData.assetType;
      this.assetTreeInfo.treeName = nodeData.assetSimpleName;
      this.assetTreeInfo.treeId = nodeData.id;
      this.assetTreeInfo.treeStatus = nodeData.status;
      this.getTableData(this.assetTreeInfo.treeType);
    },
    //获取表格数据
    getTableData(treeType) {
      this.fields = [];
      this.fields = this.getTableColumnShow(treeType);
      //获取树的资产类型
      this.form.assetType = treeType;
      this.form.id = this.assetTreeInfo.treeId;
      // console.log(this.form)
      // this.params=
      // AssetAPI.getAssetTableData({
      //   page:this.currentPage,
      //   limit:this.perPage,
      //   params:this.form
      //   // params: this.form
      // })
      axios
        .post("/os_kernel_assetctr/app/asset/queryByAssetIdPage", {
          page: this.currentPage,
          limit: this.perPage,
          params: this.form
        })
        .then(res => {
          if (res.data.code === 0) {
            this.tableDatas = res.data.result.list;
            this.totalRows = res.data.result.totalCount;
            this.currentPage = res.data.result.currPage;
          } else {
            this.tableDatas = [];
          }
        });
    },
    //获取列表展示页的下拉框数据
    getSelectDataShow() {
      // AssetAPI.getDropDataAssetList()
      axios.post('/os_kernel_assetctr/app/asset/queryDropDataAssetList')
      .then(res => {
        if (res.data.code == 0 && res.data.result != null) {
          const assetStatusSelect = res.data.result.assetStatusSelect;
          const assetPostalSelect = res.data.result.assetPostalSelect;
          //获取资产状态下拉数据
          this.assetStatusArr = this.getSelectDataFun(assetStatusSelect);
          //获取租赁状态下拉数据
          this.assetPostalArr = this.getSelectDataByCodeFun(assetPostalSelect);
          this.unitTypesTree = res.data.result.assetUnitTree;
        }
      });
    },
    //返回遍历数据，用于下拉框获取数据
    getSelectDataFun(obj) {
      if (obj == undefined && obj == null) {
        return [];
      }
      let showData = obj.map(item => {
        let itemObj = {
          value: item.id,
          text: item.itemName
        };
        return itemObj;
      });
      return showData;
    },
    //返回遍历数据，用于下拉框获取数据
    getSelectDataByCodeFun(obj) {
      if (obj == undefined && obj == null) {
        return [];
      }
      let showData = obj.map(item => {
        let itemObj = {
          value: item.itemCode,
          text: item.itemName
        };
        return itemObj;
      });
      return showData;
    },
    //获取当前表格排序字段
    getSortType(data) {
      console.log(data);
    },
    //清空弹出框信息
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    //清空弹出框信息
    resetAddOrUpdateModal() {
      this.addOrUpdateModal.title = "";
      this.addOrUpdateModal.content = "";
    },
    //新增接口
    addFun() {
      console.log(this.assetTreeInfo);
      let that = this;
      if (
        this.assetTreeInfo.treeId == "" &&
        this.assetTreeInfo.treeType == ""
      ) {
        that.makeToast("请先选择树节点");
        return;
      }
      if (
        this.assetTreeInfo.treeStatus == null ||
        this.assetTreeInfo.treeStatus == 0
      ) {
        that.makeToast("此资产已停用，不能新增下级");
        return;
      }
      this.addOrUpdateModal.targetObj = this.assetTreeInfo;
      this.addOrUpdateModal.title = `新增`;
      this.addOrUpdateModal.modalType = "add";
      this.addOrUpdateModal.content = "新增form";
      this.$root.$emit("bv::show::modal", this.addOrUpdateModal.id);
      // this.getTableData(this.assetTreeInfo.treeType);
    },
    updatePage(data) {
      //获取点击的页码
      this.currentPage = data;
      this.getTableData(this.assetTreeInfo.treeType);
    },
    getSelectedRows(data) {
      //获取表格选中的行对象
      // this.form.selRows = data;
    },
    //更新记录
    updateAssetFun(obj) {
      this.addOrUpdateModal.title = `更新`;
      this.addOrUpdateModal.modalType = "edit";
      this.addOrUpdateModal.targetObj = obj;
      this.addOrUpdateModal.content = "修改";
      this.$root.$emit("bv::show::modal", this.addOrUpdateModal.id);
      // this.getTableData(this.assetTreeInfo.treeType);
    },
    //查看详情
    detailAssetFun(id) {
      this.infoModal.title = `查看`;
      this.infoModal.targetObj = id;
      this.$root.$emit("bv::show::modal", this.infoModal.id);
    },
    //启用资产
    enableAssetFun(assetId, status, assetType) {
      let that = this;
      if (status) {
        that.makeToast("此资产已启用");
      }
      // AssetAPI.updateAssetStatus({
      //   id: assetId,
      //   status: 1
      // })
       axios.post('/os_kernel_assetctr/app/asset/updateAssetStatus',{
        id: assetId,
        status: 1
      })
      .then(res => {
        if (res.data.code === 0) {
          that.makeToast("启用成功");
          if (
            this.assetTreeInfo.treeType == undefined ||
            this.assetTreeInfo.treeType == ""
          ) {
            this.getTableData(assetTypeParent.get(assetType));
          } else {
            this.getTableData(this.assetTreeInfo.treeType);
          }
        } else {
          that.makeToast(res.data.message);
        }
      });
    },
    //禁用资产
    disableAssetFun(assetId, status, assetType) {
      let that = this;
      if (!status) {
        that.makeToast("此资产已停用");
      }
      // AssetAPI.updateAssetStatus({
      //   id: assetId,
      //   status: 0
      // })
       axios.post('/os_kernel_assetctr/app/asset/updateAssetStatus',{
         id: assetId,
        status: 0
      })
      .then(res => {
        if (res.data,code === 0) {
          that.makeToast("停用成功");
          if (
            this.assetTreeInfo.treeType == undefined ||
            this.assetTreeInfo.treeType == ""
          ) {
            this.getTableData(assetTypeParent.get(assetType));
          } else {
            this.getTableData(this.assetTreeInfo.treeType);
          }
        } else {
          that.makeToast(res.data.message);
        }
      });
    },
    resetBtn() {
      this.form.unitTypes = [];
      this.unitTypes = [];
      this.form.propertyStatus = "";
      this.form.assetSimpleName = "";
      this.form.assetPostal = "";
    },
    submitBtn() {
      let that = this;
      if (
        this.assetTreeInfo.treeType == undefined ||
        this.assetTreeInfo.treeType == ""
      ) {
        that.makeToast("请先选择树节点查询");
        return;
      } else {
        this.getTableData(this.assetTreeInfo.treeType);
      }
    },
    //提示框
    makeToast(content) {
      this.$bvToast.toast(content, {
        toastClass: "action-result",
        autoHideDelay: 1000,
        toaster: "b-toaster-top-center",
        variant: "primary",
        appendToast: false,
        static: true
      });
    },
    //刷新表格数据
    refreshTable(type) {
      if (type == "add") {
        this.currentPage = 1; //插入数据显示在第一页
        // this.currentPage = Math.ceil((this.totalRows+1)/this.perPage);  //插入数据显示在最后一页
      }
      this.getTableData(this.assetTreeInfo.treeType);
    },
    //返回表格显示字段
    getTableColumnShow(treeType) {
      console.log("treeType", treeType);
      var columnShow = [];
      switch (treeType) {
        case "hq":
          columnShow = [
            { key: "assetCode", label: "项目编码" },
            { key: "assetSimpleName", label: "项目名称" },
            { key: "projectTypeName", label: "项目类型" },
            { key: "manageTeamName", label: "管理团队" },
            { key: "managementCompanyName", label: "经营公司" },
            { key: "propertyCompanyName", label: "物业公司" },
            { key: "assetCoveredArea", label: "建筑面积㎡" },
            { key: "assetUsableArea", label: "使用面积㎡" },
            { key: "rentalArea", label: "计租面积㎡" },
            { key: "projectAddress", label: "项目地址" },
            { key: "plannedOpeningDate", label: "计划开业日期" },
            { key: "squareMarketValue", label: "平米市值" },
            { key: "matchingArea", label: "配套面积" },
            {
              key: "ifCalculation",
              label: "配套是否计租",
              formatter: value => {
                if (value != undefined && value != null) {
                  return value == 0 ? "否" : "是";
                }
              }
            },
            { key: "rulesInPeriodName", label: "定价基准" },
            { key: "priceBenchmarkName", label: "定价期间规则" },
            { key: "nfmothCalculationFormulaName", label: "不整月计算公式" },
            { key: "decimalPrecision", label: "价格小数位精度" }
          ];
          break;
        case "project":
          columnShow = [
            { key: "assetCode", label: "地块编码" },
            { key: "assetSimpleName", label: "地块名称" },
            { key: "belongProject", label: "所属项目" }
          ];
          break;
        case "land":
          columnShow = [
            { key: "assetCode", label: "建筑物编码" },
            { key: "assetSimpleName", label: "建筑物名称" },
            { key: "belongProject", label: "所属项目" },
            { key: "belongLand", label: "所属地块" },
            { key: "manageTeamName", label: "管理团队" },
            { key: "managementCompanyName", label: "经营公司" },
            { key: "propertyCompanyName", label: "物业公司" },
            { key: "buildingTypeName", label: "建筑物类型" },
            { key: "buildingAddress", label: "建筑物地址" }
          ];
          break;
        case "building":
        case "floor":
          columnShow = [
            { key: "assetPostalName", label: "租用状态" },
            { key: "unitTypeName", label: "资产类型" },
            { key: "assetCode", label: "资产编码" },
            { key: "propertySerialName", label: "资产编码方式" },
            { key: "pointNo", label: "点位编码" },
            { key: "assetSimpleName", label: "资产名称" },
            { key: "belongProject", label: "所属项目" },
            { key: "belongLand", label: "所属地块" },
            { key: "belongBuilding", label: "所属建筑物" },
            { key: "belongFloor", label: "所属楼层" },
            { key: "propertyNatureName", label: "资产性质" },
            { key: "propertyUseName", label: "资产用途" },
            { key: "propertyStatusName", label: "资产状态" },
            { key: "calculateTypeName", label: "计价方式" },
            { key: "assetCoveredArea", label: "建筑面积㎡" },
            { key: "assetUsableArea", label: "使用面积㎡" },
            { key: "calculateRentArea", label: "计租面积㎡" },
            { key: "rightPropertyName", label: "产权属性" },
            {
              key: "industryRegister",
              label: "是否已工商备案",
              formatter: value => {
                if (value != undefined && value != null) {
                  return value == 0 ? "否" : "是";
                }
              }
            },
            { key: "manageTeamName", label: "管理团队" },
            { key: "managementCompanyName", label: "经营公司" },
            { key: "propertyCompanyName", label: "物业公司" },
            { key: "effectiveTime", label: "生效日期" },
            { key: "invalidTime", label: "失效日期" },
            {
              key: "isSupPower",
              label: "是否有供电(招牌)",
              formatter: value => {
                if (value != undefined && value != null) {
                  return value == 0 ? "否" : "是";
                }
              }
            },
            { key: "averageUseEl", label: "平均用电量(招牌)" }
          ];
      }
      let fixed = [
        {
          key: "status",
          label: "状态",
          formatter: value => {
            if (value != undefined && value != null) {
              return value == 0 ? "停用" : "启用";
            }
          }
        },
        { key: "creator", label: "创建人" },
        { key: "createTime", label: "创建时间" },
        { key: "modifier", label: "最后修改人" },
        { key: "modifyTime", label: "最后修改时间" },
        { key: "actions", label: "操作", stickyColumn: true, variant: "light" }
      ];
      return columnShow.concat(fixed);
    }
  }
};
</script>

<style lang="scss">
a {
  cursor: pointer;
}
.form-inline .form-group,
.btn {
  margin-right: 1rem;
}
.form-inline .form-group {
  margin-bottom: 0.5rem;
}

.fa {
  margin-right: 0.5rem;
}
.input-group-append .fa,
.input-group-append .btn {
  margin-right: 0;
}
.dateRange .form-control {
  min-width: 200px;
}

.table.b-table {
  border: none;
}

.table.b-table td {
  vertical-align: middle;
}

.modal-body .card {
  border: none;
}

a:not([href]):not([tabindex]) {
  color: #20a8d8;
  text-decoration: underline;
}

.perPage-setting {
  float: right;
}

.perPage-setting .custom-select {
  margin: 0 0.5rem;
}

.form-inline label {
  justify-content: flex-end;
}
.form-inline .form-group-lg label {
  flex: 21%;
  max-width: 21%;
}

.inline-form-col-6 .custom-select,
.inline-form-col-6 .form-control,
.popover-container .form-group {
  width: 100%;
}
.popover-container .form-control,
.input-group .form-control {
  width: 1%;
}

.input-group > .input-group-append:not(:last-child) > .input-group-text,
.input-group > .input-group-append:not(:last-child) > .btn {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

.col-lg-2 {
  padding-right: 0;
}
.btn.disabled {
  cursor: auto;
}
</style>
