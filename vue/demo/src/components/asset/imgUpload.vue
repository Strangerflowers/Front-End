<template>
  <div class="vue-uploader">
    <div class="file-list">
      <section v-for="(file, index) of files" class="file-item draggable-item" :key="index">
        <img src="@/assets/images/shanchu1.png" alt class="icon" @click="imgClearfn(index)" />
        <img :src="file.src" alt ondragstart="return false;" class="pic" />
      </section>
      <section v-if="status == 'ready'" class="file-item">
        <img src="@/assets/images/tianjiazhaopianx.png" class="pic" @click="add" />
      </section>
    </div>

    <section v-if="files.length != 0" class="upload-func">
      <div class="progress-bar">
        <section v-if="uploading" :width="(percent * 100) + '%'">{{(percent * 100) + '%'}}</section>
      </div>
      <div class="operation-box">
        <button v-if="status == 'ready'" @click="getKey">上传</button>
        <button v-if="status == 'finished'" @click="finished">完成</button>
      </div>
    </section>
    <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple" />
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      status: "ready",
      files: [],
      point: {},
      uploading: false,
      percent: 0,
      delete: false,
      token:null,
      keyList:[],
    };
  },
  methods: {
    getKey(){
      this.keyList = []
      this.files.forEach((ele,idx)=>{
        // setTimeout(()=>{
          this.beforeSubmit(ele)
        // },1000)
      })
      //  console.log('keyList--==',this.keyList)
    },
    beforeSubmit(ele) {
     axios.post("/kernel-comm/api/qiniu/getToken", {
          params: {
            token: $cookies.get("token")
          }
        })
        .then(response => {
          this.token = response.data.upToken;
          if(this.token){
            this.submit(ele)
          }
        })
        .catch(() => {
        });
    },
    add() {
      this.$refs.file.click();
    },
    submit(ele) {
      if (this.files.length === 0) {
        console.warn("no file!");
        return;
      }
      let formData = new FormData();
      formData.append('file', ele.file);
      formData.append("token", this.token);
      axios.post('https://up-z2.qbox.me/',formData)
      .then(res=>{
        this.keyList.push(res.data.key)
      })
      .catch(error=>{
        console.log('error',error)
      })

      // const xhr = new XMLHttpRequest();
      // xhr.upload.addEventListener("progress", this.uploadProgress, false);
      // xhr.open("POST", this.src, true);
      // this.uploading = true;
      // xhr.send(formData);
      // xhr.onload = () => {
      //   this.uploading = false;
      //   if (xhr.status === 200 || xhr.status === 304) {
      //     this.status = "finished";
      //     console.log("upload success!");
      //   } else {
      //     console.log(`error：error code ${xhr.status}`);
      //   }
      // };
    },
    finished() {
      this.files = [];
      this.status = "ready";
    },
    remove(index) {
      this.files.splice(index, 1);
    },
    fileChanged() {
      const list = this.$refs.file.files;
      for (let i = 0; i < list.length; i++) {
        if (!this.isContain(list[i])) {
          const item = {
            name: list[i].name,
            size: list[i].size,
            file: list[i]
          };
          this.html5Reader(list[i], item);
          this.files.push(item);
        }
      }
      this.$refs.file.value = "";
    },
    //删除图片
    imgClearfn(i) {
      this.delete = true;
      if (this.delete) {
        console.log(this.files[1]);
        let arr = this.files.filter(function(item, index) {
          return index != i;
        });
        console.log(arr);
        return (this.files = arr);
        this.delete = false;
      }
    },
    // 将图片文件转成BASE64格式
    html5Reader(file, item) {
      const reader = new FileReader();
      reader.onload = e => {
        this.$set(item, "src", e.target.result);
      };
      reader.readAsDataURL(file);
    },
    isContain(file) {
      return this.files.find(
        item => item.name === file.name && item.size === file.size
      );
    },
    uploadProgress(evt) {
      const component = this;
      if (evt.lengthComputable) {
        const percentComplete = Math.round((evt.loaded * 100) / evt.total);
        component.percent = percentComplete / 100;
      } else {
        console.warn("upload progress unable to compute");
      }
    }
  }
};
</script>
<style scoped>
/* .vue-uploader {
    border: 1px solid #e5e5e5;
  } */

/* .vue-uploader .file-list {
    padding: 20px 0px;
  } */

.vue-uploader .file-list:after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}

.vue-uploader .file-list .file-item {
  float: left;
  position: relative;
  width: 4.1667rem;
  text-align: center;
}

/* .vue-uploader .file-list .file-item img {
    width: 3.3333rem;
    height: 3.3333rem;
    border: 1px solid #ececec;
  } */

.vue-uploader .file-list .file-item .file-remove {
  position: absolute;
  right: 0.5rem;
  display: none;
  top: 0.1667rem;
  width: 0.5833rem;
  height: 0.5833rem;
  color: white;
  cursor: pointer;
  line-height: 0.5rem;
  border-radius: 100%;
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.5);
}

.vue-uploader .file-list .file-item:hover .file-remove {
  display: inline;
}

.vue-uploader .file-list .file-item .file-name {
  margin: 0;
  height: 1.6667rem;
  word-break: break-all;
  font-size: 0.5833rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.vue-uploader .add {
  width: 3.3333rem;
  height: 3.3333rem;
  margin-left: 0.4167rem;
  float: left;
  text-align: center;
  line-height: 3.3333rem;
  border: 0.0417rem dashed #ececec;
  font-size: 1.25rem;
  cursor: pointer;
}

.vue-uploader .upload-func {
  display: flex;
  padding: 0.4167rem;
  margin: 0rem;
  background: #f8f8f8;
  border-top: 0.0417rem solid #ececec;
}

.vue-uploader .upload-func .progress-bar {
  flex-grow: 1;
}

.vue-uploader .upload-func .progress-bar section {
  margin-top: 0.2083rem;
  background: #00b4aa;
  border-radius: 0.125rem;
  text-align: center;
  color: #fff;
  font-size: 0.5rem;
  transition: all 0.5s ease;
}

.vue-uploader .upload-func .operation-box {
  flex-grow: 0;
  padding-left: 0.4167rem;
}

.vue-uploader .upload-func .operation-box button {
  padding: 0.1667rem 0.5rem;
  color: #fff;
  background: #007acc;
  border: none;
  border-radius: 0.0833rem;
  cursor: pointer;
}

.vue-uploader > input[type="file"] {
  display: none;
}

.pic {
  width: 3.3333rem;
  height: 3.3333rem;
  margin-left: 0.8333rem;
  margin-top: 0.375rem;
  position: relative;
}
.icon {
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: 0rem;
  right: -0.5rem;
  z-index: 1;
}
</style>
