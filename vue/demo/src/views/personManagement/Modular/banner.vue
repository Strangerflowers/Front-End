<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="(item,idx) in resumeArr" :key="idx">
      <!-- <h3>{{ item }}</h3> -->
      <img :src="item" alt="" style="width:50%;height:80%">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default{
  name:'banner',
  props:{
    // targetObj:{
    //   type: [String, Object],
    //   default: () => []
    // },
    resumeArr:{
      type: Array,
      default: () => []
    }
  },
  data(){
    return {

    }
  },
  created(){
    // console.log('resumeArr',this.resumeArr)
  }
}
</script>
<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
