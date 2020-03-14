<template>
  <div class="treeTmp">
    <el-tree
      ref="tree"
      :props="lableKey"
      :load="loadNode"
      lazy
      :show-checkbox="showCheckbox"
      @check-change="handleCheckChange"
      @current-change="chang"
      node-key="id"
    >
    </el-tree>
  </div>
</template>


<script>
  // import system from "@/api/system.js"
  import * as AssetAPI from '@/api/assetCenter/asset.js'
  import axios from 'axios'
  export default {
    name: "regionTree",
    props: {
      // 是否复选框
      showCheckbox: {
        type: Boolean,
        default: false
      },
      // 请求数据接口
      fetchData: {
        type: Function,
        default: AssetAPI.getRegionTreeData
      },
      // 对应名称
      lableKey: {
        type: Object,
        default: () => {
          return {
            label: "districtName",
            children: "zones"
          }
        }
      },
      // 首层tree
      firstTree: {
        type: Array,
        default: () => [
          { districtName: "中国行政区域信息", id: "",districtCode:"" }
        ]
      }
    },
    data() {
      return {
        props: {
          label: "districtName",
          children: "zones"
        },
        count: 1,
        treeData: [],
        resolve:null
      }
    },
    mounted() {
      // this.fetchTreeData()
    },
    methods: {
      fetchTreeData(id,resolve) {
        const parmasId = id || ''
        this.fetchData(parmasId)
        // axios.get('/os_kernel_appsysctr/app/district/loadDistrictByParentId?parentId='+parmasId)
        .then(res => {
          console.log('region',res)
          if (res.code === 0) {
            this.treeData = res.data.result || []
          } else {
            this.treeData = []
          }
          this.props = res
          this.props = []
          resolve(res.data.result)
        })
      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate)
        const nodes = this.$refs.tree.getCheckedNodes()
        const checkIds = this.$refs.tree.getCheckedKeys()
        this.$emit("getCheckedNodes", nodes)
        this.$emit("getCheckedKeys", checkIds)
      },
      handleNodeClick(data) {
        console.log(data)
      },
      chang(data) {
        this.$emit("currentNode", data)
      },
      loadNode(node, resolve) {
        this.resolve = resolve
        if (node.level === 0) {
          // this.fetchTreeData(null,resolve)
          return resolve(this.firstTree)
        }
        if (node.level > 0) {
          this.fetchTreeData(node.data.id,resolve)
        }
        // setTimeout(() => {
        //   resolve(this.treeData)
        // }, 600)
      }
    }
  }
</script>
<style lang="scss">
  .treeTmp {
    .el-tree {
      min-height: 20rem;
    }
  }
  .el-tree-node:focus>.el-tree-node__content{
    background: #ccc;
  }
</style>
