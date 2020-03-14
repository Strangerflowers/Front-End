<template>
  <div>
    <b-row>
      <b-col>
        <b-card>
          <div>
            <el-table :data="tableData"
                      ref="table"
                      :cell-style="{color:'#000',textAlign:'center'}"
                      :header-cell-style="{background:'#E4E7EA',color:'#5C6873',textAlign:'center'}"
                      style="width: 100%"
                      border>
              <el-table-column prop="id"
                               label="需求id"
                               width="300"
                               :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="dmdTitle"
                               label="需求名称"
                               :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="employerAcc"
                               width="300"
                               label="用户"
                               :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="city"
                               width="200"
                               label="城市"
                               :show-overflow-tooltip="true"></el-table-column>
              <el-table-column fixed="right"
                               label="操作"
                               width="500">
                <template slot-scope="scope">
                  <el-button type="text"
                             size="small"
                             @click="enablePolice1(scope.row)">
                    <span>通过</span>
                  </el-button>
                  <el-button type="text"
                             size="small"
                             @click="enablePolice2(scope.row)">
                    <span>驳回</span>
                  </el-button>
                  <el-button type="text"
                             size="small"
                             @click="see(scope.row)">
                    <span>查看</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div>
            <el-pagination :page-size="limit"
                           :pager-count="11"
                           :total="totalCount"
                           :current-page="currentPage"
                           background
                           @current-change="changeCurrentPage"
                           layout="prev, pager, next">
            </el-pagination>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <!-- <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <span>确认通过或驳回？</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
    <b-modal id="confirmClass"
             class="confirmClass"
             :title="confirmTitle"
             v-model="confirmVisble"
             @ok="submitConfirm"
             cancel-title="关闭"
             ok-title="确定">
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrl10">{{confirmTitle}}</span>
        </div>
      </template>
      <p style=" margin-bottom: 10px;">{{confirmText}}</p>
    </b-modal>
    <b-modal id="confirmClass1"
             class="confirmClass1"
             :title="confirmTitle"
             size="lg"
             v-model="confirmVisble1"
             cancel-title="关闭"
             ok-title="确定"
             hide-footer
             no-close-on-backdrop>
      <seeDemand :targetObj="targetObj"></seeDemand>
      <!-- <p style=" margin-bottom: 10px;">{{confirmText}}</p> -->
    </b-modal>
  </div>
</template>
<script>
import axios from "axios";
// import "@/request/request";
import * as demAPI from '@/api/workInfin/demAPI.js'
import seeDemand from './seeDemand'
export default {
  components: {
    seeDemand
  },
  data () {
    return {
      targetObj: {},
      tableData: [],
      id: [],
      businessKey: "",
      loginAcc: "",
      arr: [],
      list: {},
      status: '',
      appr: '',
      currentPage: 1,
      confirmTitle: '',
      confirmText: '',
      confirmVisble: false,
      dialogVisible: false,
      confirmVisble1: false,
      limit: 10,
      totalCount: 0,
      loading: true
    };
  },
  methods: {
    submitConfirm (item) {
      console.log('item', item)
      demAPI.passOrReject(this.list)
        .then(data1 => {
          console.log(data1);
          this.loadData()
          this.$message(data1.data.message);
        });
    },
    // 启用禁用弹框
    enablePolice1 (item) {
      // this.confirmTitle = item.status === 1 ? "通过确定" : "驳回确定";
      this.confirmTitle = "通过确定";
      this.confirmVisble = true;
      this.confirmText = "确定通过该需求？";
      this.status = 2
      this.appr = '1'
      this.list.id = item.id
      this.list.employerAcc = 'ptest'
      this.list.status = this.status
      this.list.taskDto = {
        appr: this.appr,
        waitBiddingDuration: "PT3S"
      };
      console.log(this.list);
      // this.ids = item.id;
      // this.status = item.status;
    },
    enablePolice2 (item) {
      // this.confirmTitle = item.status === 1 ? "通过确定" : "驳回确定";
      // this.confirmVisble = true;
      // this.confirmText =item.status === 1 ? "确定通过该需求？" : "确定驳回该需求？";
      // this.ids = item.id;
      // this.status = item.status;
      this.confirmTitle = "驳回确定";
      this.confirmVisble = true;
      this.confirmText = "确定驳回该需求？";
      this.status = 3
      this.appr = '0'
      this.list.id = item.id
      this.list.employerAcc = 'ptest'
      this.list.status = this.status
      this.list.taskDto = {
        appr: this.appr,
        waitBiddingDuration: "PT3S"
      };
      console.log(this.list);
    },
    loadData () {
      this.loginAcc = JSON.parse(localStorage.getItem('userinfo')).loginAcc
      // axios
      //   .post("/os_workinf_app/app/flowable/getUserTaskListByAcc", {
      //     loginAcc: "ptest"
      //   })
      this.$loading('正在加载中...')
      demAPI.getTodolist({ loginAcc: this.loginAcc })
        .then(res => {
          // console.log(res.data);
          // this.tableData = res.data.result
          res.data.result.map(item => {
            return this.id.push(item.id);
          });
          // this.businessKey = res.data.result.businessKey
          // this.loginAcc = res.data.result.loginAcc
          res.data.result.map(val => {
            return this.arr.push(val.businessKey);
          });

          // console.log(this.arr);
          // console.log(this.id);
          // console.log(this.id[0]);

          // axios.post('/os_workinf_admin/app/admin/adminExamineDemand', {
          //   id: this.arr[0],
          //   employerAcc: "chenli1003",
          //   status: 2          }).then(data2 => {
          //   console.log(data2)
          // })
          // axios
          //   .post(
          //     "/os_workinf_app/app/demand/queryDemandListByDmdIds", {
          //       "page": 1,
          //       "limit": 100,
          //       "demandIds":
          //         this.arr
          //     }
          //   )
          demAPI.getDemlist({
            "page": this.currentPage,
            "limit": this.limit,
            "demandIds":
              this.arr
          })
            .then(data => {
              // console.log(data);
              this.tableData = data.data.result.list;
              this.totalCount = data.data.result.totalCount
              console.log(this.totalCount)
              // data.data.result.map(_item=>{
              //   return this.loginAcc.push(_item.employerAcc)
              // })
              this.$loading.close()
            });
        });
      console.log(1234567)
    },
    see (item) {
      this.confirmTitle = "查看"
      this.confirmVisble1 = true
      this.targetObj = item
      console.log(item)
    },
    judge (item) {
      console.log('item', item.id)
      this.list.id = item.id;
      this.list.employerAcc = 'ptest'
      this.list.status = this.status
      this.list.taskDto = {
        appr: this.appr,
        waitBiddingDuration: "PT3S"
      };
      console.log(this.list);
      // axios
      //   .post("/os_workinf_admin/app/admin/adminExamineDemand", this.list)
      demAPI.passOrReject(this.list)
        .then(data1 => {
          console.log(data1);

        });
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.loadData();
        })
        .catch(_ => { });
    },
    pass (item) {
      this.dialogVisible = true
      console.log(item)
      this.status = 2
      this.appr = '1'
      this.judge(item);
      this.loadData()
    },
    reject (item) {
      this.dialogVisible = true
      this.status = 1
      this.appr = '0'
      this.judge(item);
    },
    changeCurrentPage (num) {
      // this.$loading('正在加载中...')
      console.log(this.totalCount)
      this.currentPage = num
      this.loadData()
      // this.$loading.close()
    }
  },
  created () {
    this.loadData();
  }
};
</script>

<style lang="scss" scoped>
#confirmClass1 .modal-body {
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 2rem;
  text-align: center;
  margin-bottom: 30px;
  height: 500px;
  overflow: hidden;
  overflow-y: auto;
}
</style>
