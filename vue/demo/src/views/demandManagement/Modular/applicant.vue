
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
            prop="bidderName"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="bidderAcc"
            label="账号"
          ></el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            :formatter="formatter"
          ></el-table-column>
            <el-table-column
            prop="memo"
            label="备注"
          ></el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
  import * as demAPI from '@/api/workInfin/demAPI.js'
  export default {
    name: "asset-add-update",
    components: {

    },
    props:{
      title:String,
      modalType:{
        type: String,
        default: 'oppo'
      },
      targetObj:{
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        value1:'',
        currPage:1,
        loginAcc:'',
        demData:{
          releaseData:[],
          currentPage:1,
          limit:10,
          total:null,
          totalPage:null
        },
        time:'',
        manageTeamSelect:[{value:10,text:'完成'},{value:5,text:'进行中'},{value:3,text:'延迟'}]
      }
    },
    computed: {

    },
    watch:{

    },
    created(){
      this.loginAcc = JSON.parse(localStorage.getItem("userinfo")).loginAcc;
      console.log('modalType-1=1-2',this.targetObj)
      // if(this.modalType=="oppo"){
      //   this.getMyChance()
      // }else{
      //   this.getMyRelease()
      // }
      this.getList()
    },
    methods: {
      formatter(row){
        console.log('row',row.status)
        if(row.status==1){
          return '已投标'
        }else if(row.status==2){
           return '已中标'
        }else if(row.status==3){
           return '已淘汰'
        }
      },
      // list
      getList() {
        this.$loading();
        demAPI.getReloes({
          id:this.targetObj.id
          })
        .then(res => {
          this.$loading.close();
          console.log('res111', )
          this.demData.releaseData = res.data.result
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
      },
      changeCurrentPage(num){
        this.currPage = num
        this.demData.currentPage = num
        // if(this.modalType=="oppo"){
        //   this.getMyChance()
        // }else{
        //   this.getMyRelease()
        // }
      },
      updateCurrentPage(){
        if(this.currPage > 0){
          if(this.currPage > this.demData.totalPage){
            this.currPage = this.demData.totalPage
          }
          this.demData.currentPage = this.currPage

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
