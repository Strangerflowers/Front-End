<template>
  <div>
    <el-tree
      :props="defaultProps"
      :load="loadNode"
      node-key="id"
      ref="tree"
      show-checkbox
      highlight-current
      lazy
      :default-checked-keys="haspermission"
      @check="check"
      :check-strictly="cunrrentStrictly"
      @check-change="checkChange"
    >
      <!-- :render-content="renderContent" -->
      <!-- <span class="custom-tree-node" slot-scope="{node,data}">
        <span style="padding-left: 4px;">{{node.label}}</span>
        <i
          @click="showGrantdata(data)"
          style="color:#f00;padding:0 10px;"
          v-show="data.icon"
          :class="data.icon"
        >数据权限配置</i>
        <i
          @click="showOperation(data)"
          style="color:blue;padding:0 10px;"
          v-show="data.icon1"
          :class="data.icon1"
        >通用操作配置</i>
      </span>-->
    </el-tree>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "Tree",
  props: {
    // defaultProps: {
    //   type: Object,
    //   default: function() {
    //     return {};
    //   }
    // },
    loadNode: {},
    appSysId: String,
    editRole: {
      type: Object,
      default: function() {
        return {};
      }
    },
    strictly: Boolean,
    haspermission: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  watch: {
      strictly(val) {
        // console.log('watch',val)
        this.cunrrentStrictly = val
        // this.$emit("filter", {
        //   dom: this.$refs[this.tree][0],
        //   val
        // });
      },
    },
  data() {
    return {
      defaultProps: {
        label: "assetSimpleName", //这里是树结构中需显示的数据（即接口返回的需展示在页面上的参数）
        children: [],
        isLeaf: "leaf"
      },
      cunrrentStrictly:this.strictly,
      // haspermission: [], //拥有的功能
      hasCheckedData: []
    };
  },
  mounted() {},
  methods: {
    check(data, checked) {
      this.$emit("check", {
        data,
        checked
      });
    },
    checkChange(data, checked, checknodes) {
      this.cunrrentStrictly = false;
      // console.log('strictly',this.cunrrentStrictly)
      this.$emit("checkChange", {
        data,
        checked
      });
    }
    // // 异步树叶子节点懒加载逻辑
    // loadNode(node, resolve) {
    //   // console.log("editRole1", this.editRole);
    //   // 一级节点处理
    //   if (node.level === 0) {
    //     this.requestTree(node, resolve);
    //     console.log(11);
    //   }
    //   // 其余节点处理
    //   if (node.level >= 1) {
    //     // 注意！把resolve传到你自己的异步中去
    //     this.getIndex(node, resolve);
    //   }
    // },
    // // 异步加载叶子节点数据函数
    // getIndex(node, resolve) {
    //   console.log("node", node.data);
    //   this.$loading();
    //   axios
    //     .get("/os_kernel_authzctr/app/funcperm/queryAssetTreeById", {
    //       params: {
    //         id: node.data.id,
    //         appSysId: this.appSysId,
    //         userId: this.editRole.id
    //       },
    //       headers: {
    //         "metadata-version": "1.1"
    //       }
    //     })
    //     .then(res => {
    //       this.$loading.close();
    //       console.log("异步加载资产树", res);
    //       // 此处需要后台传过来一个值来判断每个节点有无子节点,实际项目中必须加上（如isRealLeaf），不传都默认为叶子节点
    //       res.data.result.forEach(value => {
    //         if (value.childAssetTree.length <= 0) {
    //           value.leaf = true; //不为叶子节点
    //         } else {
    //           value.leaf = false; //为叶子节点
    //         }
    //       });
    //       let data = res.data.result;
    //       res.data.result.forEach(val => {
    //         if (val.isChecked == 2) {
    //           return this.hasCheckedData.push(val.id);
    //         }
    //       });
    //       console.log("hasCheckedData", this.hasCheckedData);
    //       resolve(data);
    //       // 保证父节点勾选状态不改变
    //       if (node.data.isChecked === 1) {
    //         node.indeterminate = true;
    //       }
    //       if (node.data.isChecked === 2) {
    //         node.checked = true;
    //       }
    //       node.childNodes.forEach(ele => {
    //         if (ele.data.isChecked == 1) {
    //           ele.indeterminate = true;
    //         } else if (ele.data.isChecked == 2) {
    //           ele.checked = true;
    //         }
    //       });
    //     })
    //     // .then(res1 => {
    //     //   // node.indeterminate = true
    //     //   // node.childNodes[1].indeterminate = true;
    //     //   // let status = document.getElementsByClassName("half")
    //     //   // for(let i=0;i<status.length;i++){
    //     //   //   status[i].parentNode.previousElementSibling.firstChild.classList.add("is-indeterminate");
    //     //   // }
    //     // })
    //     .catch(error => {
    //       this.$loading.close();
    //     });
    // },
    // // 首次加载一级节点数据函数
    // requestTree(node, resolve, indeterminate) {
    //   console.log("item", this.editRole);
    //   this.$loading();
    //   // "/os_kernel_authzctr/app/funcperm/queryAssetTreeById?id=0bd285d0e00611e99de100155d1b3d06&userId=d7e70a9d-b8d8-11e9-9092-fa163e6c79ee&appSysId=f37f59b0-ced8-11e9-b4e4-b06ebf14a476"
    //   axios
    //     .get("/os_kernel_authzctr/app/funcperm/queryAssetTreeById", {
    //       params: {
    //         id: "0bd285d0e00611e99de100155d1b3d06",
    //         userId: this.editRole.id,
    //         appSysId: this.appSysId
    //       },
    //       headers: {
    //         "metadata-version": "1.1"
    //       }
    //     })
    //     .then(res => {
    //       this.$loading.close();
    //       // 此处需要后台传过来一个值来判断每个节点有无子节点,
    //       res.data.result.forEach(value => {
    //         if (value.childAssetTree.length <= 0) {
    //           value.leaf = true; //不为叶子节点
    //         } else {
    //           value.leaf = false; //为叶子节点
    //         }
    //       });
    //       let data = res.data.result;
    //       res.data.result.forEach(val => {
    //         if (val.isChecked == 2) {
    //           return this.hasCheckedData.push(val.id);
    //         }
    //       });
    //       resolve(data);
    //       node.childNodes.forEach(ele => {
    //         if (ele.data.isChecked == 1) {
    //           ele.indeterminate = true;
    //         } else if (ele.data.isChecked == 2) {
    //           ele.checked = true;
    //         }
    //       });
    //     })
    //     // .then(res1 => {
    //     //   let status = document.getElementsByClassName("half");
    //     //   for (let i = 0; i < status.length; i++) {
    //     //     status[
    //     //       i
    //     //     ].parentNode.previousElementSibling.firstChild.classList.add(
    //     //       "is-indeterminate"
    //     //     );
    //     //   }
    //     //   // cla.parentNode.previousElementSibling.firstChild.classList.add("is-indeterminate");

    //     //   //  let classicon = document.getElementsByClassName("half")[0].parentNode.previousElementSibling.firstChild.classList.add("is-indeterminate");

    //     //   //  let parent =.parentNode
    //     //   // console.log("ref", status);
    //     // })
    //     .catch(error => {
    //       this.$loading.close();
    //     });
    // }
  }
};
</script>
