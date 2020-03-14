
<template>
  <div class="animated fadeIn col-lg-10-paddingleft0">
    <div style="width:100%">
      <template>
        <div class="pageFixed">
          <div class="overflow-auto">
              <b-col style="text-align: right;">
                <div class="inline-flex">
                  <span>
                    每页显示
                    {{page.limit}}
                    条
                  </span>
                </div>
                <b-pagination
                  align="right"
                  class="inline-flex"
                  v-model="page.currentPage"
                  :per-page="page.limit"
                  @change="changeCurrentPage"
                  :total-rows="page.total"
                ></b-pagination>
                <div  class="inline-flex">
                  <span class="table-pageto">跳转到第<input class="form-control page-input" type="number" step="1" min="1"  v-model="page.currentPage"  @change="updateCurrentPage" >页，共{{page.totalPage}}页</span>
                </div>
              </b-col>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import * as personAPI from '@/api/workInfin/personAPI.js'
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
      page:{
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        currPage:1,
        loginAcc:'',

      }
    },

    computed: {

    },
    watch:{

    },
    created(){
      this.loginAcc = JSON.parse(localStorage.getItem("userinfo")).loginAcc;
    },
    methods: {
      // 获取机会
      getMyChance() {
        let obj = {
          page: "1",
          limit: "20",
          params: {
            // employerAcc: this.loginAcc
            employerAcc:18819446446
          },
        };
        this.$loading();
        personAPI.getMyChance(obj)
          .then(res => {
            this.$loading.close();
            console.log('res.data.result.records',res.data.result)
            this.demData.releaseData = res.data.result;
            // this.personnel.total = res.data.result.total;
          })
          .catch(error => {
            this.$loading.close();
            console.log(error);
          });
      },
      // 获取我的发布
      getMyRelease(){
        let obj={
          page: "1",
          limit: "20",
          params: {
            employerAcc: "18819446446"
          }
        }
        personAPI.getMyRelease(obj)
        .then(res=>{
          if(res.data.code == 0){
            this.demData.releaseData = res.data.result.list;
          }else{
            this.demData.releaseData = [];
          }
          console.log('res',res)
        })
      },
      changeCurrentPage(val){

        this.$emit('currentChangeHandle',val)
      },
      updateCurrentPage(val){
        if(this.page.currentPage>this.page.totalPage){
          this.page.currentPage = this.page.totalPage
          return
        }
        this.$emit('updateCurrentPage', this.page.currentPage)
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
  margin:20px 0px;
}
</style>
