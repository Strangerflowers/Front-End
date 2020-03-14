<template>
  <el-form :model="pointupdate" :inline="true" ref="pointupdate" label-width="130px">
    <el-row>
      <el-form-item
        label="点位名称:"
        prop="pointName"
        :rules="[{required: true, message: '点位名称不能为空', trigger: 'blur'},{max: 50, message: '长度不能超过50个有效字符', trigger: 'blur' }]"
        :inline-message="true"
        style="margin:5px 0"
      >
        <el-input v-model="pointupdate.pointName" placeholder="例如: 春广场门口LED大屏" style="width:260px;"></el-input>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="点位序号:"
        prop="pointCodeNum"
        :inline-message="true"
        :rules="pointCodeNumRule"
        style="margin:3px 0"
      >
        <el-input v-model="pointupdate.pointCodeNum" placeholder="请填写点位序号" style="width:260px;"></el-input>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        prop="resourceCft"
        label="资源分级："
        :rules="{required: true, message: '请选择资源分级', trigger: 'blur'}"
        :inline-message="true"
        style="margin:5px 0"
      >
        <el-select
          placeholder="请选择资源分级"
          clearable
          filterable
          v-model="pointupdate.resourceCft"
          style="width:250px;marginRight:10px"
        >
          <el-option
            v-for="resourceCft in resourceCftList"
            :key="resourceCft"
            :label="resourceCft"
            :value="resourceCft"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        prop="resourceName"
        label="资源类型："
        :rules="{required: true, message: '请选择资源类型', trigger: 'blur'}"
        :inline-message="true"
        style="margin:3px 0"
      >
        <el-select
          placeholder="请选择资源类型"
          clearable
          v-model="pointupdate.resourceName"
          style="width:250px;marginRight:10px"
          @change="changeMediaType"
        >
          <el-option
            v-for="resourceType in resourcTypeList"
            :key="resourceType.id"
            :label="resourceType.typeName"
            :value="resourceType.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item prop="resourceApplicationObject" label="资源应用对象：" style="margin:3px 0">
        <el-checkbox-group v-model="pointupdate.resourceApplicationObject">
          <el-checkbox
            v-for="resourceAppObj in resourceApplicationObjectList"
            :label="resourceAppObj.id"
            :key="resourceAppObj.id"
          >{{resourceAppObj.value}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="地理位置："
        prop="projectId"
        :rules="{required: true, message: '请选择所属项目', trigger: 'blur'}"
        style="margin:3px 0"
      >
        <el-select v-model="pointupdate.projectId" placeholder="请选择所属项目" :disabled="true">
          <el-option
            v-for="project in projects"
            :key="project.id"
            :label="project.projectName"
            :value="project.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if=" massifs !==undefined && massifs.length > 0 "
        prop="massif"
        :rules="{required: true, message: '请选择地块', trigger: 'blur'}"
        style="margin:3px 0"
      >
        <el-select v-model="pointupdate.massif" placeholder="请选择地块" :disabled="true">
          <el-option
            v-for="massif in massifs"
            :key="massif.id"
            :label="massif.nodeName"
            :value="massif.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if=" buildings !==undefined && buildings.length > 0 "
        :disabled="true"
        prop="building"
        :rules="{required: true, message: '请选择建筑物', trigger: 'blur'}"
        style="margin:3px 0"
      >
        <el-select v-model="pointupdate.building" placeholder="请选择建筑物" :disabled="true">
          <el-option
            v-for="build in buildings"
            :key="build.id"
            :label="build.nodeName"
            :value="build.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if=" floors !==undefined && floors.length > 0 "
        prop="floor"
        :rules="{required: true, message: '请选择楼层', trigger: 'blur'}"
        style="margin:3px 0"
      >
        <el-select v-model="pointupdate.floor" placeholder="请选择楼层" :disabled="true">
          <el-option
            v-for="floor in floors"
            :key="floor.num"
            :label="floor.code"
            :value="floor.num"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="点位位置："
        prop="pointPosition"
        :rules="{required: true, message: '请选择点位位置', trigger: 'blur'}"
        :inline-message="true"
        style="margin:3px 0"
      >
        <el-radio
          v-model="pointupdate.pointPosition"
          v-for="position in positions"
          :key="position.id"
          :label="position.id"
        >{{position.value}}</el-radio>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="具体位置："
        prop="detailLocation"
        :rules="detailLocationRule"
        :inline-message="true"
        style="margin:3px 0"
      >
        <el-input
          v-model="pointupdate.detailLocation"
          placeholder="请填写具体位置"
          style="width:250px;marginRight:10px"
        ></el-input>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="具体位置缩写："
        prop="inputvalsx"
        :rules="[{required: true, message: '具体位置缩写不能为空', trigger: 'blur'},{max: 50, message: '长度不能超过50个有效字符', trigger: 'blur' },{pattern: /^[a-zA-Z\d\u4e00-\u9fa5]{0,50}$/, message: '请输入中文,英文字母或数字', trigger: 'blur' }]"
        :inline-message="true"
        style="margin:3px 0"
      >
        <el-input
          v-model="pointupdate.inputvalsx"
          placeholder="请填写具体位置缩写"
          style="width:250px;marginRight:10px"
        ></el-input>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="点位尺寸："
        prop="pointsize"
        :rules="[{max: 50, message: '长度不能超过50个有效字符', trigger: 'blur' }]"
        style="margin:3px 0"
      >
        <el-input
          v-model="pointupdate.pointsize"
          placeholder="请填写点位尺寸"
          style="width:250px;marginRight:10px"
        ></el-input>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="出血尺寸："
        prop="bleedsize"
        :rules="[{max: 50, message: '长度不能超过50个有效字符', trigger: 'blur' }]"
        style="margin:3px 0"
      >
        <el-input
          v-model="pointupdate.bleedsize"
          placeholder="请填写出血尺寸"
          style="width:250px;marginRight:10px"
        ></el-input>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="点位形状："
        prop="pointshape"
        :rules="[{max: 50, message: '长度不能超过50个有效字符', trigger: 'blur' }]"
        style="margin:3px 0"
      >
        <el-input
          v-model="pointupdate.pointshape"
          placeholder="请填写点位形状"
          style="width:250px;marginRight:10px"
        ></el-input>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="最小投放周期："
        prop="mintime"
        :rules="[{required: true, message: '最小投放周期不能为空', trigger: 'blur'},{pattern: /^[1-9]\d{0,2}$/, message: '范围为1~999的整数', trigger: 'blur' }]"
        :inline-message="true"
        style="margin:3px 0"
      >
        <el-input-number
          v-model="pointupdate.mintime"
          controls-position="right"
          :min="1"
          :max="999"
          placeholder="请填写最小投放周期"
          style="width:250px;marginRight:10px"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        style="width:120px;margin:3px 0"
        label
        prop="mintimeunit"
        :rules="[{required: true, message: '请选择最小投放周期单位', trigger: 'blur'}]"
      >
        <el-select v-model="pointupdate.mintimeunit" disabled placeholder="请选择单位">
          <el-option v-for="unit in units" :key="unit.id" :label="unit.value" :value="unit.id"></el-option>
        </el-select>
      </el-form-item>
    </el-row>
    <el-form-item label="可售卖单位数/天：" prop="input" style="margin:3px 0">
      <el-input-number
        v-model="pointupdate.input"
        :max="96"
        :min="1"
        placeholder="请填写可售卖单位数"
        style="width:250px;margin:5px 10px 5px 0"
        :disabled="showSellUnit"
      ></el-input-number>
    </el-form-item>
    <el-row>
      <el-form-item label="刊例价：" prop="pubPrice" :rules="pubPriceRule" style="margin:3px 0">
        <el-input
          v-model="pointupdate.pubPrice"
          placeholder="请填写刊例价"
          style="width:250px;marginRight:10px"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width:120px;magin:5px 0"
        label
        prop="kanspricenuit"
      >
        <el-select v-model="pointupdate.kanspricenuit" disabled placeholder="请选择单位">
          <el-option v-for="unit in units" :key="unit.id" :label="unit.value" :value="unit.id"></el-option>
        </el-select>
      </el-form-item>
    </el-row>
    <el-row style="position:relative;width:100%;magin:5px 0">
      <el-col :span="2" style="marginTop:8px;width:80px;marginLeft:50px">现场图片：</el-col>
      <!-- <photo-list-upload
        ref="photoListUpload"
        :photoList="pointupdate.photoList"
        @handlePhotoListUpload="handlePhotoListUpload"
        @handlePhotoListRemove="handlePhotoListRemove"
      ></photo-list-upload>-->
      <el-col :span="2">
        <photo-list-upload
          ref="photoListUploadone"
          :drag="false"
          :type="'1'"
          :limit="1"
          :photoList="pointupdate.photoList"
          @handlePhotoListUpload="handlePhotoListUploadOne"
          @handlePhotoListRemove="handlePhotoListRemoveOne"
          style="marginTop:10px;width:80px;height:80px;overflow:hidden;"
        ></photo-list-upload>
        <div class="tc">环境图</div>
      </el-col>
      <el-col :span="2" :gutter="12">
        <photo-list-upload
          ref="photoListUploadtwo"
          :drag="false"
          :limit="1"
          :type="'2'"
          :photoList="pointupdate.photoList"
          @handlePhotoListUpload="handlePhotoListUploadTwo"
          @handlePhotoListRemove="handlePhotoListRemoveTwo"
          style="marginTop:10px;width:80px;height:80px;overflow:hidden;"
        ></photo-list-upload>
        <div class="tc">近景图</div>
      </el-col>
      <el-col :span="2">
        <photo-list-upload
          ref="photoListUploadthree"
          :drag="false"
          :limit="1"
          :type="'3'"
          :photoList="pointupdate.photoList"
          @handlePhotoListUpload="handlePhotoListUploadThree"
          @handlePhotoListRemove="handlePhotoListRemoveThree"
          style="marginTop:10px;width:80px;height:80px;overflow:hidden;"
        ></photo-list-upload>
        <div class="tc">落位图</div>
      </el-col>
      <el-col :span="2">
        <photo-list-upload
          ref="photoListUploadfour"
          :drag="false"
          :limit="1"
          :type="'4'"
          :photoList="pointupdate.photoList"
          @handlePhotoListUpload="handlePhotoListUploadFour"
          @handlePhotoListRemove="handlePhotoListRemoveFour"
          style="marginTop:10px;width:80px;height:80px;overflow:hidden;"
        ></photo-list-upload>
        <div class="tc">地理图</div>
      </el-col>
      <el-col :span="2">
        <photo-list-upload
          ref="photoListUploadfive"
          :drag="false"
          :limit="1"
          :type="'5'"
          :photoList="pointupdate.photoList"
          @handlePhotoListUpload="handlePhotoListUploadFive"
          @handlePhotoListRemove="handlePhotoListRemoveFive"
          style="marginTop:10px;width:80px;height:80px;overflow:hidden;"
        ></photo-list-upload>
        <div class="tc">夜间图</div>
      </el-col>
      <el-col :span="2">
        <photo-list-upload
          ref="photoListUploadsix"
          :drag="false"
          :limit="1"
          :type="'6'"
          :photoList="pointupdate.photoList"
          @handlePhotoListUpload="handlePhotoListUploadSix"
          @handlePhotoListRemove="handlePhotoListRemoveSix"
          style="marginTop:10px;width:80px;height:80px;overflow:hidden;"
        ></photo-list-upload>
        <div class="tc">历史图</div>
      </el-col>
      <el-col :span="2">
        <photo-list-upload
          ref="photoListUploadseven"
          :drag="false"
          :limit="1"
          :type="'7'"
          :photoList="pointupdate.photoList"
          @handlePhotoListUpload="handlePhotoListUploadSeven"
          @handlePhotoListRemove="handlePhotoListRemoveSeven"
          style="marginTop:10px;width:80px;height:80px;overflow:hidden;"
        ></photo-list-upload>
        <div class="tc">自定义图片1</div>
      </el-col>
      <el-col :span="2">
        <photo-list-upload
          ref="photoListUploadeight"
          :drag="false"
          :limit="1"
          :type="'8'"
          :photoList="pointupdate.photoList"
          @handlePhotoListUpload="handlePhotoListUploadEight"
          @handlePhotoListRemove="handlePhotoListRemoveEight"
          style="marginTop:10px;width:80px;height:80px;overflow:hidden;"
        ></photo-list-upload>
        <div class="tc">自定义图片2</div>
      </el-col>
    </el-row>
    <el-row style="margin:3px 0">
      <el-form-item :inline-message="true" label="点位描述:" prop="txt" :rules="long">
        <el-input
          type="textarea"
          cols="20"
          :autosize="{ minRows: 4}"
          placeholder="请用简短的文字对项目进行描述和说明"
          v-model="pointupdate.txt"
          style="width:250px;marginRight:10px"
        ></el-input>
      </el-form-item>
    </el-row>
    <el-row class>
      <el-form-item style="margin:1px 0">
        <el-button
          type="primary"
          @click="pointupdatecomplete()"
          style="marginLeft:130px"
          :disabled="showSaveButton"
        >保存</el-button>
        <el-button @click="pointupdatecancel()" :disabled="showCancelButton">取消</el-button>
      </el-form-item>
    </el-row>
  </el-form>
</template>
<script>
import * as AdsAPI from "@/api/apiasset.js";
import PhotoListUpload from "@/components/asset/uploads";
import nobg from "@/assets/img/nullphoto.jpg";
import { ClearBr, ClearBlank } from "@/utils";
export default {
  components: {
    PhotoListUpload
  },
  data() {
    return {
      nobg: nobg,
      updatepointifo: "",
      // photoListOne:[],
      // photoListTwo:[],
      // photoListThree:[],
      // photoListFour:[],
      // photoListFive:[],
      // photoListSix:[],
      // photoListSeven:[],
      // photoListEight:[],
      pointupdate: {
        id: 0,
        pointName: "", //点位名称
        pointCodeNum: "", //点位序号
        resourceCft: "", //资源分级
        resourceName: "", //资源类型
        resourceApplicationObject: [], //资源应用对象
        pointPosition: "", //点位位置
        detailLocation: "", //具体位置
        inputvalsx: "", //具体位置英文缩写
        pointsize: "", //点位尺寸
        bleedsize: "", //出血尺寸
        pointshape: "", //点位形状
        mintime: "", // //最小投放周期
        mintimeunit: "", //最小投放周期单位
        input: 0, //可售卖单位天数
        pubPrice: "", //刊例价
        projectId: "", //所属项目
        massif: "", //所属地块
        building: "", //所属建筑物
        floor: "", //所属楼层
        kanspricenuit: "", //刊例价单位
        txt: "", //文本域
        photoList: []
      },
      //资源分级数组
      resourceCftList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      //资源类型数组
      resourcTypeList: [],
      resourceApplicationObjectList: [],
      projects: [],
      massifs: [],
      buildings: [],
      floors: [],
      units: [],
      positions: [],
      showSellUnit: false,
      errorMsg: "",
      showSaveButton: false,
      showCancelButton: false,
      long: { validator: this.checklength, trigger: "blur" },
      detailLocationRule: [
        { required: true, message: "具体位置不能为空", trigger: "blur" },
        { max: 50, message: "长度不能超过50个有效字符", trigger: "blur" },
        { validator: this.checkdetailLocation, trigger: "blur" }
      ],
      pubPriceRule: [
        {
          pattern: /^[0-9]\d{0,5}(?:\.\d{1,2})?$/,
          message: "范围为0~999999的整数,保留2位小数",
          trigger: "blur"
        }
      ],
      pointCodeNumRule: [{ validator: this.checkNum, trigger: "blur" }]
    };
  },
  activated() {
    this.clearForm();
    this.getResourcTypeList(); //初始化资源类型下拉框
    this.getResourceApplicationObjectList(); //初始化资源应用对象
    this.getUnits();
    this.getPositions();
    this.updataifo(); //初始化
    this.$refs["pointupdate"].clearValidate();
  },
  mounted() {
    this.getResourcTypeList(); //初始化资源类型下拉框
    this.getResourceApplicationObjectList(); //初始化资源应用对象
    this.getUnits();
    this.getPositions();
  },
  methods: {
    //环境图
    handlePhotoListUploadOne(val) {
      let _this=this
      if (_this.pointupdate.photoList && _this.pointupdate.photoList.length > 0) {
       var result= _this.pointupdate.photoList.some(function(item) {
          if (item.type === val[0].type) {
            return true
          }else {
            return false
          }
        });
        if(result===true){
          item.key = val[0].key;
        }else if(result===false){
          var temp = {
              key: val[0].key,
              type: val[0].type
            };
            (_this.pointupdate.photoList).push(temp);
        }
      }else {
        this.pointupdate.photoList = [];
        var temp = {
          key: val[0].key,
          type: val[0].type
        };
        this.pointupdate.photoList.push(temp);
      }
    },
    handlePhotoListRemoveOne(val) {
      for (var i = 0; i < this.pointupdate.photoList.length; i++) {
        if (this.pointupdate.photoList[i].type === val) {
          this.pointupdate.photoList[i].key = null;
        }
      }
    },
    //近景图
    handlePhotoListUploadTwo(val) {
      let _this=this
      if (_this.pointupdate.photoList && _this.pointupdate.photoList.length > 0) {
       var result= _this.pointupdate.photoList.some(function(item) {
          if (item.type === val[0].type) {
            return true
          }else {
            return false
          }
        });
        if(result===true){
          item.key = val[0].key;
        }else if(result===false){
          var temp = {
              key: val[0].key,
              type: val[0].type
            };
            (_this.pointupdate.photoList).push(temp);
        }
      }else {
        this.pointupdate.photoList = [];
        var temp = {
          key: val[0].key,
          type: val[0].type
        };
        this.pointupdate.photoList.push(temp);
      }
    },
    handlePhotoListRemoveTwo(val, type) {
      for (var i = 0; i < this.pointupdate.photoList.length; i++) {
        if (this.pointupdate.photoList[i].type === val) {
          this.pointupdate.photoList[i].key = null;
        }
      }
    },
    //落位图
    handlePhotoListUploadThree(val) {
      let _this=this
      if (_this.pointupdate.photoList && _this.pointupdate.photoList.length > 0) {
       var result= _this.pointupdate.photoList.some(function(item) {
          if (item.type === val[0].type) {
            return true
          }else {
            return false
          }
        });
        if(result===true){
          item.key = val[0].key;
        }else if(result===false){
          var temp = {
              key: val[0].key,
              type: val[0].type
            };
            (_this.pointupdate.photoList).push(temp);
        }
      }else {
        this.pointupdate.photoList = [];
        var temp = {
          key: val[0].key,
          type: val[0].type
        };
        this.pointupdate.photoList.push(temp);
      }
    },
    handlePhotoListRemoveThree(val) {
      for (var i = 0; i < this.pointupdate.photoList.length; i++) {
        if (this.pointupdate.photoList[i].type === val) {
          this.pointupdate.photoList[i].key = null;
        }
      }
    },
    //地理图
    handlePhotoListUploadFour(val) {
      let _this=this
      if (_this.pointupdate.photoList && _this.pointupdate.photoList.length > 0) {
       var result= _this.pointupdate.photoList.some(function(item) {
          if (item.type === val[0].type) {
            return true
          }else {
            return false
          }
        });
        if(result===true){
          item.key = val[0].key;
        }else if(result===false){
          var temp = {
              key: val[0].key,
              type: val[0].type
            };
            (_this.pointupdate.photoList).push(temp);
        }
      }else {
        this.pointupdate.photoList = [];
        var temp = {
          key: val[0].key,
          type: val[0].type
        };
        this.pointupdate.photoList.push(temp);
      }
    },
    handlePhotoListRemoveFour(val) {
      for (var i = 0; i < this.pointupdate.photoList.length; i++) {
        if (this.pointupdate.photoList[i].type === val) {
          this.pointupdate.photoList[i].key = null;
        }
      }
    },
    //夜间图
    handlePhotoListUploadFive(val) {
      let _this=this
      if (_this.pointupdate.photoList && _this.pointupdate.photoList.length > 0) {
       var result= _this.pointupdate.photoList.some(function(item) {
          if (item.type === val[0].type) {
            return true
          }else {
            return false
          }
        });
        if(result===true){
          item.key = val[0].key;
        }else if(result===false){
          var temp = {
              key: val[0].key,
              type: val[0].type
            };
            (_this.pointupdate.photoList).push(temp);
        }
      }else {
        this.pointupdate.photoList = [];
        var temp = {
          key: val[0].key,
          type: val[0].type
        };
        this.pointupdate.photoList.push(temp);
      }
    },
    handlePhotoListRemoveFive(val) {
      for (var i = 0; i < this.pointupdate.photoList.length; i++) {
        if (this.pointupdate.photoList[i].type === val) {
          this.pointupdate.photoList[i].key = null;
        }
      }
    },
    //历史图
    handlePhotoListUploadSix(val) {
      let _this=this
      if (_this.pointupdate.photoList && _this.pointupdate.photoList.length > 0) {
       var result= _this.pointupdate.photoList.some(function(item) {
          if (item.type === val[0].type) {
            return true
          }else {
            return false
          }
        });
        if(result===true){
          item.key = val[0].key;
        }else if(result===false){
          var temp = {
              key: val[0].key,
              type: val[0].type
            };
            (_this.pointupdate.photoList).push(temp);
        }
      }else {
        this.pointupdate.photoList = [];
        var temp = {
          key: val[0].key,
          type: val[0].type
        };
        this.pointupdate.photoList.push(temp);
      }
    },
    handlePhotoListRemoveSix(val) {
      for (var i = 0; i < this.pointupdate.photoList.length; i++) {
        if (this.pointupdate.photoList[i].type === val) {
          this.pointupdate.photoList[i].key = null;
        }
      }
    },
    //自定义1图片
    handlePhotoListUploadSeven(val) {
      let _this=this
      if (_this.pointupdate.photoList && _this.pointupdate.photoList.length > 0) {
       var result= _this.pointupdate.photoList.some(function(item) {
          if (item.type === val[0].type) {
            return true
          }else {
            return false
          }
        });
        if(result===true){
          item.key = val[0].key;
        }else if(result===false){
          var temp = {
              key: val[0].key,
              type: val[0].type
            };
            (_this.pointupdate.photoList).push(temp);
        }
      }else {
        this.pointupdate.photoList = [];
        var temp = {
          key: val[0].key,
          type: val[0].type
        };
        this.pointupdate.photoList.push(temp);
      }
    },
    handlePhotoListRemoveSeven(val) {
      for (var i = 0; i < this.pointupdate.photoList.length; i++) {
        if (this.pointupdate.photoList[i].type === val) {
          this.pointupdate.photoList[i].key = null;
        }
      }
    },
    //自定义2图片
    handlePhotoListUploadEight(val) {
      let _this=this
      if (_this.pointupdate.photoList && _this.pointupdate.photoList.length > 0) {
       var result= _this.pointupdate.photoList.some(function(item) {
          if (item.type === val[0].type) {
            return true
          }else {
            return false
          }
        });
        if(result===true){
          item.key = val[0].key;
        }else if(result===false){
          var temp = {
              key: val[0].key,
              type: val[0].type
            };
            (_this.pointupdate.photoList).push(temp);
        }
      }else {
        this.pointupdate.photoList = [];
        var temp = {
          key: val[0].key,
          type: val[0].type
        };
        this.pointupdate.photoList.push(temp);
      }
    },
    handlePhotoListRemoveEight(val) {
      for (var i = 0; i < this.pointupdate.photoList.length; i++) {
        if (this.pointupdate.photoList[i].type === val) {
          this.pointupdate.photoList[i].key = null;
        }
      }
    },
    clearForm() {
      this.pointupdate.pointCodeNum = "";
      this.pointupdate.id = null;
      this.pointupdate.resourceCft = "";
      this.pointupdate.resourceName = "";
      this.pointupdate.resourceApplicationObject = [];
      this.pointupdate.pointPosition = "";
      this.pointupdate.detailLocation = "";
      this.pointupdate.inputvalsx = "";
      this.pointupdate.pointsize = "";
      this.pointupdate.bleedsize = "";
      this.pointupdate.pointshape = "";
      this.pointupdate.mintime = "";
      this.pointupdate.mintimeunit = "";
      this.pointupdate.input = null;
      this.pointupdate.pubPrice = "";
      this.pointupdate.projectId = "";
      this.pointupdate.massif = "";
      this.pointupdate.building = "";
      this.pointupdate.floor = "";
      this.pointupdate.kanspricenuit = "";
      this.pointupdate.txt = "";
      this.pointupdate.photoList = [];
      this.projects = [];
      this.massifs = [];
      this.buildings = [];
      this.floors = [];
    },
    checkPubPriceUnit(rule, value, callback) {
      if (this.pointupdate.pubPrice) {
        if (!value) {
          callback(new Error("请填写刊例价单位"));
        } else {
          callback();
        }
      }
      callback();
    },
    checkPubPrice(rule, value, callback) {
      if (this.pointupdate.pubPriceUnit) {
        if (!value) {
          callback(new Error("请填写刊例价"));
        } else {
          callback();
        }
      }
      callback();
    },
    changeMediaType(id) {
      if (id) {
        this.showSellUnit = false;
        let temp = this.resourcTypeList.find(item => {
          return item.id == id;
        });
        if (temp.mediaCft == 27) {
          this.showSellUnit = true;
          this.pointupdate.input = 1;
        }
      }
    },
    checkNum(rule, value, callback) {
      if (ClearBlank(value)) {
        if (!/^\d{3}$/.test(value)) {
          callback(new Error("请填写三位数字(001~999)"));
        } else {
          if (value == "000") {
            callback(new Error("请填写三位数字(001~999)"));
          }
          callback();
        }
      } else {
        callback();
      }
    },
    //备注校验
    checklength(rule, value, callback) {
      if (value && ClearBr(value).length > 50) {
        callback(new Error("备注长度不能超过50个"));
      } else {
        callback();
      }
    },
    checkdetailLocation(rule, value, callback) {
      if (ClearBlank(value) == "") {
        callback(new Error("具体位置不能为空"));
      } else {
        callback();
      }
    },
    //获取项目数组
    getProjects(projectId) {
      this.dataListLoading = true;
      pointList.getProjectss(projectId).then(({ data }) => {
        if (data != null && data.code === 0) {
          this.projects.push(data.project);
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    //获得地块数组
    getMassif(massifId) {
      this.dataListLoading = true;
      pointList.getMassifss(massifId).then(({ data }) => {
        if (data != null && data.code === 0) {
          this.massifs.push(data.projectinfo);
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    //获得建筑物数组
    getBuild(buildingId) {
      this.dataListLoading = true;
      pointList.getBuild(buildingId).then(({ data }) => {
        if (data != null && data.code === 0) {
          this.buildings.push(data.projectinfo);
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    //获得楼层数组
    getFloor(floorNum) {
      this.dataListLoading = true;
      if (floorNum < 0) {
        var code = ("B" + floorNum).replace("-", "");
        var floor = { num: floorNum, code: code };
        this.floors.push(floor);
      } else if (floorNum >= 0) {
        var code = floorNum + "F";
        var floor = { num: floorNum, code: code };
        this.floors.push(floor);
      }
    },
    //获得资源类型数组
    getResourcTypeList() {
      this.dataListLoading = true;
      let pointId = this.$route.query.id;
      //查询所有的资源类型
      const params = {
        pointId: pointId
      };
      pointList.getThisPointResourceIds(params).then(({ data }) => {
        if (data != null) {
          this.resourcTypeList = data;
        }
      });
    },
    //获取资源应用对象
    getResourceApplicationObjectList() {
      this.dataListLoading = true;
      pointList.getResourceAppIds().then(({ data }) => {
        if (data != null) {
          this.resourceApplicationObjectList = data;
        }
      });
    },
    //获取时间单位数组
    getUnits() {
      this.dataListLoading = true;
      pointList.getUnits().then(({ data }) => {
        if (data != null) {
          this.units = data;
        }
      });
    },
    //获取点位位置
    getPositions() {
      this.dataListLoading = true;
      pointList.getPointPositions().then(({ data }) => {
        if (data != null) {
          this.positions = data;
        }
      });
    },
    //点击删除图片
    handlePhotoListRemove(val) {
      this.pointupdate.photoList = val;
    },
    //上传图片动作
    handlePhotoListUpload(val) {
      this.pointupdate.photoList = val;
    },
    //点击保存
    pointupdatecomplete() {
      this.dataListLoading = true;
      this.showSaveButton = true;
      this.showCancelButton = true;
      var resourceAppIdList = [];
      var arr=[]
      if (this.pointupdate.photoList && this.pointupdate.photoList.length > 0) {
        for (var i = 0; i < this.pointupdate.photoList.length; i++) {
          var tep={
            type:this.pointupdate.photoList[i].type,
            key:this.pointupdate.photoList[i].key
          }
          arr.push(tep);
        }
      }
      for (
        let i = 0;
        i < this.pointupdate.resourceApplicationObject.length;
        i++
      ) {
        var obj = { id: this.pointupdate.resourceApplicationObject[i] };
        resourceAppIdList.push(obj);
      }
      this.$refs["pointupdate"].validate(valid => {
        const data = {
          id: this.pointupdate.id,
          pointName: this.pointupdate.pointName,
          pointCodeNum: this.pointupdate.pointCodeNum,
          resourceCft: this.pointupdate.resourceCft,
          resourceId: this.pointupdate.resourceName,
          resourceAppIdList: resourceAppIdList,
          pointPosition: this.pointupdate.pointPosition,
          detailLocation: this.pointupdate.detailLocation,
          detailLocationAbb: this.pointupdate.inputvalsx,
          pointSize: this.pointupdate.pointsize,
          bleedSize: this.pointupdate.bleedsize,
          pointShape: this.pointupdate.pointshape,
          minLaunchCycle: this.pointupdate.mintime,
          minLaunchCycleUnit: this.pointupdate.mintimeunit,
          sellUnit: this.pointupdate.input,
          pubPrice: this.pointupdate.pubPrice,
          pubPriceUnit: this.pointupdate.kanspricenuit,
          projectId: this.pointupdate.projectId,
          massif: this.pointupdate.massif,
          building: this.pointupdate.building,
          floor: this.pointupdate.floor,
          description: this.pointupdate.txt,
          pictureList: arr
        };
        if (valid) {
          pointList.pointupdatecomplete(data).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "保存成功",
                type: "success",
                // duration: 1500,
                onClose: () => {
                  this.$router.push("/generatorpointposition");
                  this.showSaveButton = false;
                  this.showCancelButton = false;
                }
              });
            } else {
              this.$message.error(data.msg);
              this.showSaveButton = false;
              this.showCancelButton = false;
            }
          });
        } else {
          this.showSaveButton = false;
          this.showCancelButton = false;
        }
      });
    },
    //点击取消 跳转到点位列表页
    pointupdatecancel() {
      this.$router.push("generatorpointposition");
    },
    //手动输入数值
    handleChange(value) {},
    //点位编辑 初始化
    updataifo() {
      //点位ID
      this.updatepointifo = this.$route.query.id;
      this.dataListLoading = true;
      const id = this.updatepointifo;
      pointList.updataifo(id).then(({ data }) => {
        if (data && data.pointPosition != null) {
          this.pointupdate.id = data.pointPosition.id;
          this.pointupdate.resourceCft = data.pointPosition.resourceCft;
          this.pointupdate.resourceName = data.pointPosition.resourceId;
          if (data.pointPosition.resourceAppIdList.length >= 0) {
            for (
              let i = 0;
              i < data.pointPosition.resourceAppIdList.length;
              i++
            ) {
              this.pointupdate.resourceApplicationObject.push(
                data.pointPosition.resourceAppIdList[i].id
              );
            }
          }
          this.pointupdate.pointName = data.pointPosition.pointName;
          this.pointupdate.pointCodeNum = data.pointPosition.pointCodeNum;
          this.pointupdate.pointPosition = data.pointPosition.pointPosition;
          this.pointupdate.detailLocation = data.pointPosition.detailLocation;
          this.pointupdate.inputvalsx = data.pointPosition.detailLocationAbb;
          this.pointupdate.pointsize = data.pointPosition.pointSize;
          this.pointupdate.bleedsize = data.pointPosition.bleedSize;
          this.pointupdate.pointshape = data.pointPosition.pointShape;
          this.pointupdate.mintime = data.pointPosition.minLaunchCycle;
          this.pointupdate.mintimeunit = data.pointPosition.minLaunchCycleUnit;
          this.pointupdate.input = data.pointPosition.sellUnit;
          this.pointupdate.pubPrice = data.pointPosition.pubPrice;
          this.pointupdate.kanspricenuit = data.pointPosition.pubPriceUnit;
          this.pointupdate.projectId = data.pointPosition.projectId;
          this.getProjects(this.pointupdate.projectId);
          this.pointupdate.massif = data.pointPosition.massif;
          this.getMassif(this.pointupdate.massif);
          this.pointupdate.building = data.pointPosition.building;
          this.getBuild(this.pointupdate.building);
          this.pointupdate.floor = data.pointPosition.floor;
          this.getFloor(this.pointupdate.floor);
          this.pointupdate.txt = data.pointPosition.description;
          this.pointupdate.photoList = data.pointPosition.pictureList;
          console.log(this.pointupdate.photoList);
          // this.photoListOne.push(data.pointPosition.pictureList[0])
          // this.photoListTwo.push(data.pointPosition.pictureList[1])
          // this.photoListThree.push(data.pointPosition.pictureList[2])
          // this.photoListFour.push(data.pointPosition.pictureList[3])
          // this.photoListFive.push(data.pointPosition.pictureList[4])
          // this.photoListSix.push(data.pointPosition.pictureList[5])
          // this.photoListSeven.push(data.pointPosition.pictureList[6])
          // this.photoListEight.push(data.pointPosition.pictureList[7])
          // console.log(this.pointupdate.photoList)
          //环境图
          if (!this.$refs.photoListUploadone.first) {
            if (data.pointPosition.pictureList == null) {
              this.$refs.photoListUploadone.list = [];
            } else {
              this.$refs.photoListUploadone.list = data.pointPosition.pictureList.filter(
                item => {
                  if (item.type == "1") {
                    let temp = {
                      type: "1",
                      url: item.url ? item.url : nobg,
                      key: item.key,
                      status: "success"
                    };
                    return temp;
                  }
                }
              );
            }
          }
          //近景图
          if (!this.$refs.photoListUploadtwo.first) {
            if (data.pointPosition.pictureList == null) {
              this.$refs.photoListUploadtwo.list = [];
            } else {
              this.$refs.photoListUploadtwo.list = data.pointPosition.pictureList.filter(
                item => {
                  if (item.type == "2") {
                    let temp = {
                      type: "2",
                      url: item.url ? item.url : nobg,
                      key: item.key,
                      status: "success"
                    };
                    return temp;
                  }
                }
              );
              console.log(this.$refs.photoListUploadtwo.list);
            }
          }
          //落位图
          if (!this.$refs.photoListUploadthree.first) {
            if (data.pointPosition.pictureList == null) {
              this.$refs.photoListUploadthree.list = [];
            } else {
              this.$refs.photoListUploadthree.list = data.pointPosition.pictureList.filter(
                item => {
                  if (item.type == "3") {
                    let temp = {
                      type: "3",
                      url: item.url ? item.url : nobg,
                      key: item.key,
                      status: "success"
                    };
                    return temp;
                  }
                }
              );
            }
          }
          //地理图
          if (!this.$refs.photoListUploadfour.first) {
            if (data.pointPosition.pictureList == null) {
              this.$refs.photoListUploadfour.list = [];
            } else {
              this.$refs.photoListUploadfour.list = data.pointPosition.pictureList.filter(
                item => {
                  if (item.type == "4") {
                    let temp = {
                      type: "4",
                      url: item.url ? item.url : nobg,
                      key: item.key,
                      status: "success"
                    };
                    return temp;
                  }
                }
              );
            }
          }
          //夜间图
          if (!this.$refs.photoListUploadfive.first) {
            if (data.pointPosition.pictureList == null) {
              this.$refs.photoListUploadfive.list = [];
            } else {
              this.$refs.photoListUploadfive.list = data.pointPosition.pictureList.filter(
                item => {
                  if (item.type == "5") {
                    let temp = {
                      type: "5",
                      url: item.url ? item.url : nobg,
                      key: item.key,
                      status: "success"
                    };
                    return temp;
                  }
                }
              );
            }
          }
          //历史图
          if (!this.$refs.photoListUploadsix.first) {
            if (data.pointPosition.pictureList == null) {
              this.$refs.photoListUploadsix.list = [];
            } else {
              this.$refs.photoListUploadsix.list = data.pointPosition.pictureList.filter(
                item => {
                  if (item.type == "6") {
                    let temp = {
                      type: "6",
                      url: item.url ? item.url : nobg,
                      key: item.key,
                      status: "success"
                    };
                    return temp;
                  }
                }
              );
            }
          }
          //自定义1图片
          if (!this.$refs.photoListUploadseven.first) {
            if (data.pointPosition.pictureList == null) {
              this.$refs.photoListUploadseven.list = [];
            } else {
              this.$refs.photoListUploadseven.list = data.pointPosition.pictureList.filter(
                item => {
                  if (item.type == "7") {
                    let temp = {
                      type: "7",
                      url: item.url ? item.url : nobg,
                      key: item.key,
                      status: "success"
                    };
                    return temp;
                  }
                }
              );
            }
          }
          //自定义2图片
          if (!this.$refs.photoListUploadeight.first) {
            if (data.pointPosition.pictureList == null) {
              this.$refs.photoListUploadeight.list = [];
            } else {
              this.$refs.photoListUploadeight.list = data.pointPosition.pictureList.filter(
                item => {
                  if (item.type == "8") {
                    let temp = {
                      type: "8",
                      url: item.url ? item.url : nobg,
                      key: item.key,
                      status: "success"
                    };
                    return temp;
                  }
                }
              );
            }
          }

          this.$forceUpdate();
          if (data.pointPosition.mediaCft == 27) {
            this.showSellUnit = true;
          } else if (data.pointPosition.mediaCft == 28) {
            this.showSellUnit = false;
          }
        }

        this.dataListLoading = false;
      });
    }
  }
};
</script>
<style scoped>
.tc {
  width: 80px;
  text-align: center;
  line-height: 30px;
}
</style>
