
<template>
  <div class="animated fadeIn col-lg-10-paddingleft0">
    <div class="table-header">
      <h1>{{title}}</h1>
    </div>
    <div style="width:100%">
      <template>
        <el-table
          :data="demData.releaseData"
          ref="table"
          :cell-style="{color:'#000',textAlign:'center'}"
          :header-cell-style="{background:'#E4E7EA',color:'#5C6873',textAlign:'center'}"
          style="width: 100%"
          border>
          <el-table-column
            prop="wbsTaskOrder"
            label="阶段"
          >
          <template slot-scope="scope">
            第{{scope.row.wbsTaskOrder*1+1}}阶段
          </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="内容"
          ></el-table-column>
            <el-table-column
            prop="planStartDatetime"
            label="计划开始时间"
          ></el-table-column>
            <el-table-column
            prop="planEndDatetime"
            label="计划结束时间"
          ></el-table-column>
          <el-table-column
            width="300"
            label="实际完成时间">
            <template slot-scope="scope">
              <span v-if="scope.row.actualEndDatetime">{{scope.row.actualEndDatetime}}</span>
              <div v-else>
                <!-- <b-form-group  label-align="center" label-cols-sm="5" label-class="require-input" id="manageTeamGroup"    label-for="manageTeam"> -->
                  <!-- <div v-show="scope.row.status ===10">
                    <el-date-picker
                      :disabled="true"
                      :clearable="false"
                      style="margin-bottom:20px"
                      v-model="scope.row.actualEndDatetime"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div> -->
                  <b-form-select :disabled="true"   style="margin: 0px 18px;width: 88%;" id="manageTeam" v-model="scope.row.status" :plain="true" :options="manageTeamSelect"  >
                  </b-form-select>
                <!-- </b-form-group> -->
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import * as workAPI from "@/api/workInfin/workInfin.js";
export default {
  name: "asset-add-update",
  components: {},
  props: {
    title: String,
    modalType: {
      type: String,
      default: "oppo"
    },
    targetObj: {
      type: [String, Object],
      default: () => []
    }
  },
  data() {
    return {
      value1: "",
      currPage: 1,
      loginAcc: "",
      demData: {
        releaseData: [],
        currentPage: 1,
        limit: 10,
        total: null,
        totalPage: null
      },
      time: "",
      //  1.未开始 5:进行中  10: 已完成  11:已挂起 12 已终止
      manageTeamSelect: [
        { value: 1, text: "未开始" },
        { value: 3, text: "延迟" },
        { value: 5, text: "进行中" },
        { value: 10, text: "已完成" },
        { value: 11, text: "已挂起" },
        { value: 12, text: "已终止" }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loginAcc = JSON.parse(localStorage.getItem("userinfo")).loginAcc;
    console.log("modalType-1=1-2", this.targetObj);
    // if(this.modalType=="oppo"){
    //   this.getMyChance()
    // }else{
    //   this.getMyRelease()
    // }
    this.getEditList();
  },
  methods: {
    // list
    getEditList() {
      this.$loading();
      workAPI
        .getEditList({
          // dmdId:'aeb58e50124d11eaa551fa163e6c79ee'
          dmdId: this.targetObj.id
        })
        .then(res => {
          this.$loading.close();
          console.log("res111", res.data.result[0].projectWbsTaskList);
          this.demData.releaseData = res.data.result[0].projectWbsTaskList;
          // this.demData.totalPage = res.data.result.totalPage;
          // this.demData.total = res.data.result.totalCount;
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    // // 获取我的发布
    // getMyRelease(){
    //   let obj={
    //     page:this.demData.currentPage,
    //     limit: this.demData.limit,
    //     params: {
    //       employerAcc: "18819446446"
    //     }
    //   }
    //   personAPI.getMyRelease(obj)
    //   .then(res=>{
    //     if(res.data.code == 0){
    //       this.demData.releaseData = res.data.result.list;
    //       this.demData.totalPage = res.data.result.totalPage;
    //       this.demData.total = res.data.result.totalCount;
    //     }else{
    //       this.demData.releaseData = [];
    //     }
    //     console.log('res',res)
    //   })
    // },
    changeCurrentPage(num) {
      this.currPage = num;
      this.demData.currentPage = num;
      // if(this.modalType=="oppo"){
      //   this.getMyChance()
      // }else{
      //   this.getMyRelease()
      // }
    },
    updateCurrentPage() {
      if (this.currPage > 0) {
        if (this.currPage > this.demData.totalPage) {
          this.currPage = this.demData.totalPage;
        }
        this.demData.currentPage = this.currPage;
        // if(this.modalType=="oppo"){
        //   this.getMyChance()
        // }else{
        //   this.getMyRelease()
        // }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.inline-flex {
  display: inline-flex;
  padding: 0 10px;
}
.pageFixed {
  margin-top: 20px;
}
</style>
