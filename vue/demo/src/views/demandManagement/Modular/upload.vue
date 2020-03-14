<template>
  <div class="photo-list-upload">
    <el-upload
      :class="{uploadhidden:hiddenLimit}"
      action="https://up-z2.qbox.me/"
      list-type="picture-card"
      :limit="limits"
      :data="params"
      :file-list="photoList"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :on-progress="handleChange"
      :disabled="disabled"
      multiple
    >
      <i class="el-icon-plus"></i>
      <!-- <div slot="tip" class="el-upload__tip">{{ tip }}</div> -->
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
export default {
  props: {
    modalType: String,
    disabled: Boolean,
    photoList: {
      type: Array,
      default: () => []
    },
    limits: {
      type: Number,
      default: 9
    },
    type: String,
    showLimit: Boolean,
    Num: Number
  },
  data() {
    return {
      savaNum: null,
      isShow: false,
      hiddenLimit: false,
      // limit:4,
      list: [],
      dialogImageUrl: "",
      dialogVisible: false,
      listChange: [],
      params: {
        token: ""
      }
    };
  },
  watch: {
    photoList: (newVal, oldVal) => {
      // console.log('==========');
      // console.log(newVal.length);
      // console.log(oldVal.length);
      // console.log(newVal);
      // console.log('==========')
      // console.log('newVal',newVal)
      // console.log('limits',this.limits)
      //  this.$nextTick(()=>{
      // if(newVal.length>=this.limits){
      //   this.hiddenLimit = true;
      // }
      // })
    },
    showLimit: val => {
      // console.log('val',val)
    }
  },
  created() {
    if (this.Num) {
      this.savaNum = this.Num;
    }
  },
  mounted() {},
  updated() {
    //切换个人跟企业认证时，做判断
    // console.log('Num=',this.Num,"savaNum=",this.savaNum,"limits=",this.limits)
    if (this.Num && this.savaNum != this.Num) {
      this.savaNum = this.Num;
      this.isShow = false;
    }
    // 编辑回显时如果长度等于限制长度，隐藏上传按钮
    if (this.isShow) {
    } else {
      if (this.type == "en" || this.type == "pe") {
        if (this.photoList.length >= this.limits) {
          this.hiddenLimit = true;
        } else {
          this.hiddenLimit = false;
        }
      } else {
        if (this.photoList.length >= this.limits) {
          this.hiddenLimit = true;
        }
      }
    }
  },
  methods: {
    handleExceed(files, fileList) {
      // console.log('图片限制',fileList)
      this.$message.warning(`最多只可上传${this.limits}张图片`);
    },
    handleChange(file, item) {
      // console.log('山茶混',file,item)
      let arr = [];
      arr = this.list.filter(val => {
        console.log("item.key==val.key", val, item.key);
        return item.key == val.key;
      });
      if (arr.length > 0) {
        return false;
      }
      console.log("山茶混arr", arr);
      // this.listChange = fileList.map(function(item){
      //   // this.list.push(item.response.key)
      //   item.key = item ? item.key: "";
      //   // item.type=this.type
      //   return  item
      // });
    },
    handleRemove(file, fileList) {
      this.isShow = true;
      // if(this.photoList.length>0){
      //   let idx = this.photoList.findIndex(val=>{
      //     return val.name == file.key;
      //   })
      //   if (idx >= 0) {
      //     this.photoList.splice(idx, 1);
      //   }
      // }
      this.list = fileList.map(function(item) {
        // this.list.push(item.response.key)
        item.key = item.key ? item.key : "";
        // item.type=this.type
        return item;
      });
      let tempRemove = this.list.findIndex(item => {
        return item.key == file.key;
      });
      if (tempRemove >= 0) {
        this.list.splice(tempRemove, 1);
      }
      if (fileList.length < this.limits) {
        this.hiddenLimit = false;
      }
      // console.log('this.list',this.list)
      this.$emit("handlePhotoListRemove", this.list);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeUpload(file, fileList) {
      console.log("上传之前", file);
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/gif" ||
        file.type === "image/webp" ||
        file.type === "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error(
          "上传图片仅支持jpg、jpeg、png、gif、webp、bmp格式!"
        );
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 1MB!");
        return false;
      }
      const _this = this;
      return new Promise((resolve, reject) => {
        console.log("更新图片");
        axios
          .post("/kernel-comm/api/qiniu/getToken", {
            params: {
              token: $cookies.get("token")
            }
          })
          .then(response => {
            _this.params.token = response.data.upToken;
            resolve(true);
          })
          .catch(() => {
            reject(new Error("false"));
          });
      });
    },
    handleSuccess(res, file, fileList) {
      this.isShow = true;
      // const uid = file.uid;
      // const key = res.key;
      // const name = file.name;
      // const url = file.url;
      // const status = file.status;
      //若支持拖拽，超出上传图片数量，则隐藏删除、查看图标
      if (fileList.length >= this.limits) {
        console.log("隐藏更新");
        this.hiddenLimit = true;
      }
      let tempRemove = this.list.findIndex(item => {
        return item.key == file.key;
      });
      this.list = fileList.map(function(item) {
        // this.list.push(item.response.key)
        item.key = item.response ? item.response.key : item.key ? item.key : "";
        // item.type=this.type
        return item;
      });
      console.log("list", this.list);
      // this.first = false;
      this.$emit("handlePictrue", this.list);
    }
  }
};
</script>
<style >
/* .uploadhidden .el-upload--picture-card {
    display: none;
  } */
</style>
<style lang='scss'>
.v-modal {
  display: none;
}
.el-dialog__wrapper {
  .el-dialog {
    margin-top: 1vh !important;
    margin-bottom: 1vh;
    .el-dialog__header {
      border-bottom: 0px solid #eee;
    }
    .el-dialog__body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
      height: 90vh;
      overflow: hidden;
      img {
        border-style: none;
        height: 90vh;
      }
    }
  }
}

.photo-list-upload {
  .el-upload--picture-card {
    width: 80px;
    height: 80px;
    line-height: 90px;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    background: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 80px;
    height: 80px;
  }
  .el-upload--picture-card .el-upload-dragger {
    width: 80px;
    height: 80px;
  }
  .el-upload-list__item.is-success .el-upload-list__item-status-label {
    display: none;
  }
  .el-upload__tip {
    line-height: 17px;
    font-size: 12px;
    color: #999999;
    width: 124px;
  }
  .logo-tip {
    position: absolute;
    top: 0;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    padding: 0 3px;
    background: #409eff;
    color: #fff;
  }
  .el-icon-close-tip {
    display: none;
  }
}
.uploadhidden {
  .el-upload--picture-card {
    display: none;
  }
  // .el-icon-close-tip{
  //   display:none;
  // }
  // .el-upload__tip{
  //   display: none;
  // }
  // .el-upload-list--picture-card{
  //   .el-upload-list__item{
  //     margin: 0px;
  //   }
  //   .el-upload-list__item-actions{
  //     opacity: 0;
  //     display: none;
  //   }
  // }
}
</style>

