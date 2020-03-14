<!-- 单张照片上传组件 -->
<template>
  <div class="photo-list-upload">
    <el-upload
      :class="{'uploadhidden':hiddenLimit}"
      :data="data"
      :action="uploadAction"
      :drag="drag"
      list-type="picture-card"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="list"
      :limit="limit"
      :on-exceed="handleExceed"
    >
      <i class="el-icon-plus"></i>
      <div slot="tip" class="el-upload__tip">{{ tip }}</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl">
    </el-dialog>
  </div>
</template>

<script>
// import { getImageUrlByQiniuKey } from "@/common/qiniu";
import { QINIU_UPLOAD_HTTPS_URL } from "@/common/constants";
import nobg from "@/assets/img/nullphoto.jpg";
import axios from "axios";
import Vue from 'vue'
export default {
  props: {
    photoList: Array,
    tip: String,
    drag:{
      type:Boolean,
      default:false,
    },
    limit:{
      type:Number,
      default:9,
    },
    type:{
      type:String,
      default:'',
    }
  },
  data() {
    return {
      hiddenLimit:false,
      nobg: nobg,
      usertoken: "",
      dialogImageUrl: "",
      dialogVisible: false,
      uploadAction: QINIU_UPLOAD_HTTPS_URL,
      data: {
        token: ""
      },
      first: true,
      key: "",
      list: [],
      index: null
    };
  },
  mounted() {
    this.usertoken = $cookies.get('token')
  },
  watch: {
    photoList(newValue, oldValue) {
      if (newValue && newValue.length > 0 && this.first) {
        for (let index = 0; index < newValue.length; index++) {
          this.list.push({
            type:this.type,
            url: newValue[index].url ? newValue[index].url : nobg,
            key: newValue[index].key,
            status: "success"
          });
          this.first = false;
        }
      } else {
        this.first = false;
      }
    }
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(`最多只可上传${limit}张图片`);
    },
    handleRemove(file, fileList) {
      let tempRemove = this.list.findIndex(item => {
        return item.uid == file.uid;
      });
      if (tempRemove >= 0) {
        this.list.splice(tempRemove, 1);
      }
      this.first = false;
      this.$emit("handlePhotoListRemove",this.type);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(res, file, fileList) {
      const uid = file.uid;
      const key = res.key;
      const name = file.name;
      const url = file.url;
      const status = file.status;
      //若支持拖拽，超出上传图片数量，则隐藏删除、查看图标
      if(fileList.length>=this.$props.limit && this.$props.drag){
        this.hiddenLimit=true;
      }
      this.list = fileList.map(item => {
        item.key = item.response ? item.response.key : item.key ? item.key : "";
        item.type=this.type
        return item;
      });

      this.first = false;
      this.$emit("handlePhotoListUpload", this.list);
    },
    beforeUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/gif" ||
        file.type === "image/webp" ||
        file.type === "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error(
          "上传图片仅支持jpg、jpeg、png、gif、webp、bmp格式!"
        );
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 10MB!");
        return false;
      }
      const _this = this;
      return new Promise((resolve, reject) => {
        console.log('更新图片')
        axios
          // .post(
          //   window.SITE_CONFIG["gettoken"] +
          //     "common-center/qiniu/getToken?token=" +
          //     this.usertoken
          // )
          .post('/kernel-comm/api/qiniu/getToken',{
            params:{
              token:this.usertoken
            }
          })
          .then(response => {
            // console.log('获取上传图片token',response)
            _this.data.token = response.data.upToken;
            resolve(true);
          })
          .catch(() => {
            reject(new Error("false"));
          });
      });
    }
  }
};
</script>
<style lang='scss'>
// .photo-list-upload {
//   .el-upload--picture-card {
//     width: 80px;
//     height: 80px;
//     line-height: 90px;
//   }
//   .el-upload-list--picture-card .el-upload-list__item {
//     background: #fff;
//     border: 1px dashed #d9d9d9;
//     border-radius: 6px;
//     cursor: pointer;
//     position: relative;
//     overflow: hidden;
//     width: 80px;
//     height: 80px;
//   }
//   .el-upload--picture-card .el-upload-dragger{
//     width: 80px;
//     height: 80px;
//   }
//   .el-upload-list__item.is-success .el-upload-list__item-status-label {
//     display: none;
//   }
//   .el-upload__tip {
//     line-height: 17px;
//     font-size: 12px;
//     color: #999999;
//     width: 124px;
//   }
//   .logo-tip {
//     position: absolute;
//     top: 0;
//     font-size: 12px;
//     height: 20px;
//     line-height: 20px;
//     padding: 0 3px;
//     background: #409eff;
//     color: #fff;
//   }
// }
// .uploadhidden{
//   .el-upload--picture-card{
//     display: none;
//   }
//   .el-upload__tip{
//     display: none;
//   }
//   .el-upload-list--picture-card{
//     .el-upload-list__item{
//       margin: 0px;
//     }
//     .el-upload-list__item-actions{
//       opacity: 0;
//       display: none;
//     }
//   }
// }
</style>
