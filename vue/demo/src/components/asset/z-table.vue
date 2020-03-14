<template>

  <b-card>
    <template v-if="topBtn">
    <div slot="header" ><slot name="topBtn" ></slot></div>
    </template>

    <template v-if="topTableTitle">
      <slot name="topTableTitle" ></slot>
    </template>

    <b-table
      show-empty
      :dark="dark"
      :hover="hover"
      :striped="striped"
      :bordered="bordered"
      :fixed="fixed"
      responsive="sm"
      :items="items"
      :fields="captions"
      :current-page="1"
      :per-page="showPage ? perPage :items.length"
      ref="selectableTable"

      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      >

      <template v-slot:cell(index)="row" >
       {{row.index+1}}
      </template>

      <template v-slot:cell(linkCol)="row" >
        <slot name="detailLink" :itemData="{item:row.item,index:row.index}"></slot>
      </template>


      <template v-if='selectable'  v-slot:cell(selected)="row" >
        <template v-if="selectMode =='multi'">
          <span class="btn-stretch"><input type ="checkbox" :value="row.item" v-model="selectedList" :disabled="checkSelect(row.item)"  /></span>
        </template>
        <template v-else>
          <span class="btn-stretch"><input type ="radio" name="tableRow" :value="row.item" v-model="selectedList" :disabled="checkSelect(row.item)" /></span>
        </template>
      </template>


      <template v-if='stretchtable' v-slot:cell(stretch)="row" >
        <span class="btn-stretch" @click="row.toggleDetails"><i  :class="row.detailsShowing ? 'fa fa-minus' : 'fa fa-plus'" ></i></span>
      </template>

      <template v-slot:cell(actions)="row" >
        <slot name="control" :item="row.item"></slot>
      </template>


      <template v-slot:row-details="row">
        <slot name="rowDetail" :item="row.item"></slot>
      </template>

      <template v-slot:empty="scope">
          <h6 class="no-result">无相关数据</h6>
      </template>

      <template v-slot:custom-foot="data" v-if="items.length!=0">
        <slot name="customFoot" ></slot>

      </template>

    </b-table>

    <b-row v-if="showPage">
      <b-col lg="8">
        <b-pagination class="footer-pagination" v-model="currPage"  :total-rows="totalRows"  :per-page="perPage"  ></b-pagination>
        <span class="table-pageto">跳转到第<input class="form-control page-input" type="number" step="1" min="1" :value="currPage" @change="updateCurrentPage($event)" >页，共{{totalPage}}页</span>
      </b-col>
      <b-col lg="4" class="text-right">
        <span class="table-totalRows">显示第{{listNo}}记录，一共{{totalRows}}条</span><slot name="perPageSetting" ></slot>
      </b-col>
    </b-row>


</b-card>





</template>




<style lang="scss">

.table-selectbox{
  border:1px solid #bbb;
  border-radius:5px;
  width:15px;
  height:15px;
  text-align:center;
  display:inline-block;
  line-height:100%;
  vertical-align:middle;
}

.selected-list{
  line-height:1.2em;
  min-height:2em;
}

.item-selected{
  padding:5px;
  background:#eee;
  margin-right:10px;
  position:relative;
}

.item-selected i{
  position: absolute;
  right: -5px;
  top: -5px;
  color: #f00;
}

.b-table-sticky-header > .table.b-table > thead > tr > .b-table-sticky-column,
.table.b-table > thead > tr > .b-table-sticky-column,
.b-table-sticky-header > .table.b-table > tbody > tr > .b-table-sticky-column,
.table.b-table > tbody > tr > .b-table-sticky-column{
  right: 0;
  min-width:5rem;
}
.table.b-table {
  display: block;
    overflow-y: auto;
}
.table.b-table th,
.table.b-table td{
  min-width: 80px;
}
.table.b-table .btn{
  margin:0 0.5rem 0.5rem 0;
}

.table.b-table .btn:last-child{
  margin-right: 0;
}

.btn-default{
  margin-bottom:1rem;
}

.btn-stretch{
  cursor: pointer;
  color:#20a8d8;
  text-align: center;
  width: 100%;
  display: inline-block;
}

.table thead th{
  white-space: nowrap;
}

.hoverPoint{
  &:hover{
    cursor: pointer;
  }
}

.dialog-table .card-body{
  padding:0;
}
.table.b-table > thead > tr > .b-table-sticky-column ,.table.b-table > tbody > tr > .b-table-sticky-column {
  min-width:50px;
}

.table.b-table  .fa-ellipsis-h{
  cursor: pointer;
  width: 100%;
  margin:0;
}
.no-result{
  text-align:center;
}
.footer-pagination{
  display: inline-flex;
    float: left;
}

.table-pageto{
  float: left;
  line-height: 36px;
  margin-left:10px;
}
.table-totalRows{
  line-height: 30px;
  margin-right:10px;
}
.page-input{
  display:inline;
  max-width:75px;
  margin: 0 10px;
}
.text-right{
  text-align: right;
}
</style>
<style lang="scss" >
@import "@/assets/common/tableListStyle.scss";

</style>

<script>

export default {
  name: 'c-table',
  inheritAttrs: false,
  props: {
    topBtn: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    busy: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: [Array, Function],
      default: () => []
    },
    fields: {
      type: [Array, Object],
      default: () => []
    },
    perPage: {
      type: Number,
      default: 10
    },

    totalRows: {
      type: Number,
      default: 0
    },
    dark: {
      type: Boolean,
      default: false
    },
    selectable:{
      type: Boolean,
      default: false
    },
    selectMode:{
      type: String,
      default: 'multi'
    },
    stretchtable:{
      type: Boolean,
      default: false
    },
    stickyHeader:{
      type: Boolean,
      default: false
    },
    topTableTitle:{
      type: Boolean,
      default: false
    },
    showPage:{
      type: Boolean,
      default: true
    },
    selectLimits: {
      type: [Array, Object],
      default: () => []
    },
    isSelectLimit:{
      type: Boolean,
      default: false
    },
    currentPage: {
      type: Number,
      default: 1
    },
     currentSelList: {
      type: [Array, Object],
      default: () => []
    }
  },

  data: () => {
    return {
      currPage:1,
      sortBy:'',
      sortDesc:false,
      selectedList:[]
    }
  },
  computed: {
    items() {
      const items =  this.tableData
      return Array.isArray(items) ? items : items()
    },
    captions() { return this.fields },
    listNo(){
      return ((this.currPage-1)*this.perPage+1) + '-'+ this.currPage*this.perPage
    },
    totalPage(){
      return Math.ceil(this.totalRows /this.perPage)
    }
  },
  watch: {
    selectedList() {
      this.$emit('getSelectedRows',this.selectedList)
    },
    currentPage(){
      this.currPage = this.currentPage;
    },
    sortBy(){
      this.getCurrentSort()
    },
    sortDesc(){
      this.getCurrentSort()
    },
    tableData(){
      this.selectedList=[]
    },
    currPage(){
      this.$emit('updatePage',this.currPage)
    },
    currentSelList(){
      this.selectedList = this.currentSelList
    },
    fields(){
      // console.log(this.fields)
    }

  },
created(){
  // console.log(this.fields)
},
  methods: {
    getCurrentSort(){
      let sortObj = {
        sortBy:this.sortBy,
        sortType: this.sortDesc ? 'desc' : 'asc'
      }
      this.$emit('getSortType',sortObj)
    },
    checkSelect(obj){

      let result = false;
      let valList = [];

      if(this.isSelectLimit){
        for(let i in this.selectLimits){
           valList =  this.selectLimits[i]
          for(let j in valList){
            if(obj[i] == valList[j]){
              result = true
              break;
            }
          }
        }
      }
      return result;
    },
    updateCurrentPage(eventObj){
      if(eventObj.target.value >0){
        if(eventObj.target.value > this.totalPage){
          eventObj.target.value = this.totalPage
        }
        this.currPage = eventObj.target.value
      }

    }


  }
}
</script>

