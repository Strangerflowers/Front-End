
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
          border
        >
          <el-table-column
            prop="id"
            label="需求id"
            :show-overflow-tooltip="true"
          ></el-table-column>

          <el-table-column
            prop="dmdTitle"
            label="需求名称"
            :show-overflow-tooltip="true"
          ></el-table-column>

          <!-- <el-table-column
            prop="mobile"
            width="100"
            label="状态"
            :show-overflow-tooltip="true"
          ></el-table-column> -->
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showEdit(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
        <template>
          <div class="pageFixed">
            <div class="overflow-auto">
                <b-col style="text-align: right;">
                  <div class="inline-flex">
                    <span>
                      每页显示
                      {{demData.limit}}
                      条
                    </span>
                  </div>
                  <b-pagination
                    align="right"
                    class="inline-flex"
                    v-model="demData.currentPage"
                    :per-page="demData.limit"
                    @change="changeCurrentPage"
                    :total-rows="demData.total"
                  ></b-pagination>
                  <div  class="inline-flex">
                    <span class="table-pageto">跳转到第<input class="form-control page-input" type="number" step="1" min="1"  v-model="currPage"  @change="updateCurrentPage($event)" >页，共{{demData.totalPage}}页</span>
                  </div>
                </b-col>
            </div>
          </div>
        </template>
    </div>
    <!-- 弹框组 -->
    <b-modal :id="modifyModal.id" :title="modifyModal.title"  size="lg" @hide="resetmodifyModal"  hide-footer no-close-on-backdrop  >
      <div slot="modal-title"><i class="fa fa-align-justify"></i>
        {{modifyModal.modalType == 'edit' ? '查看' : '查看'}}
      </div>
      <Detail  :modalId="modifyModal.id" :modalType="modifyModal.modalType" :targetObj="modifyModal.targetObj" ></Detail>
    </b-modal>
  </div>
</template>

<script>
  import * as personAPI from '@/api/workInfin/personAPI.js'
  // import demandProcess from "@/views/demandManagement/Modular/demandProcess.vue";
  import Detail from "@/views/demandManagement/Modular/detail.vue";
  export default {
    name: "asset-add-update",
    components: {
      // demandProcess
      Detail
    },
    props:{
      title:String,
      modalType:{
        type: String,
        default: 'oppo'
      },
      targetObj:{
        type: [String, Object],
        default: () => []
      }
    },
    data() {
      return {
        currPage:1,
        loginAcc:'',
        modifyModal: {
          id: "modify-modal",
          title: "",
          modalType: "",
          targetObj: {},
          content: ""
        },
        demData:{
          releaseData:[],
          currentPage:1,
          limit:10,
          total:null,
          totalPage:null
        },
      }
    },

    computed: {

    },
    watch:{

    },
    created(){
      this.loginAcc = JSON.parse(localStorage.getItem("userinfo")).loginAcc;
      console.log('modalType',this.targetObj.loginAcc)
      if(this.modalType=="oppo"){
        this.getMyChance()
      }else{
        this.getMyRelease()
      }
    },
    methods: {
      // 数据权限元素编辑
      showEdit(item) {
        // console.log("编辑的参数", item);
        //if(item.bidderName!==null||item.bidderName!==undefined){
          this.modifyModal.title = `查看`;
          this.modifyModal.modalType = "edit";
          this.modifyModal.targetObj = item;
          this.modifyModal.content = "查看";
          this.$root.$emit("bv::show::modal", this.modifyModal.id);
        //}
      },
      resetmodifyModal() {
        this.modifyModal.title = "";
        this.modifyModal.content = "";
      },
      // 获取机会
      getMyChance() {
        let obj = {
          page: this.demData.currentPage,
          limit:this.demData.limit,
          params: {
            employerAcc: this.targetObj.loginAcc
            // employerAcc:"ptest"
          },
        };
        this.$loading();
        personAPI.getMyChance(obj)
          .then(res => {
            this.$loading.close();
            console.log('res.data.',res.data)
            if(res.data.code == 0){
              this.demData.releaseData = res.data.result.list;
              this.demData.totalPage = res.data.result.totalPage;
              this.demData.total = res.data.result.totalCount;
            }else{
              this.demData.releaseData = [];
            }
          })
          .catch(error => {
            this.$loading.close();
            console.log(error);
          });
      },
      // 获取我的发布
      getMyRelease(){

        let obj={
          page:this.demData.currentPage,
          limit: this.demData.limit,
          params: {
            employerAcc: this.targetObj.loginAcc
          }
        }
        personAPI.getMyRelease(obj)
        .then(res=>{
          console.log('res.d',res.data)
          if(res.data.code == 0){
            this.demData.releaseData = res.data.result.list;
            this.demData.totalPage = res.data.result.totalPage;
            this.demData.total = res.data.result.totalCount;
          }else{
            this.demData.releaseData = [];
          }
        })
      },
      changeCurrentPage(num){
        this.currPage = num
        this.demData.currentPage = num
        if(this.modalType=="oppo"){
          this.getMyChance()
        }else{
          this.getMyRelease()
        }
      },
      updateCurrentPage(){
        if(this.currPage > 0){
          console.log('this.demData.totalPage',this.currPage,this.demData.totalPage)
          if(this.currPage > this.demData.totalPage){
            this.currPage = this.demData.totalPage
          }
          this.demData.currentPage = this.currPage
          if(this.modalType=="oppo"){
            this.getMyChance()
          }else{
            this.getMyRelease()
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.inline-flex{
  display:inline-flex;
  padding: 0 10px;
}
.pageFixed{
  margin-top:20px;
}
</style>
