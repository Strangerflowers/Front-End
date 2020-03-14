<template>
  <div>
    <div class="animated fadeIn col-lg-10-paddingleft0">
      <b-card>
        <b-form class="inline-form-col-6"  inline   novalidate>
          <b-form-group  label-align="right"  label-cols-sm="3" label-class="require-input" id="provinceGroup"    label-for="province">
            <div slot="label"><span class="required-icon">*</span>省</div>
            <b-form-select id="province" @input="getCity" v-model="addressForm.province" :state="chkState('province','addressForm')"   :plain="true" >
              <option
                  v-for="opt in provinceSelect"
                  :value="opt.id"
                  :key="opt.id"
                >
                {{opt.districtName}}
              </option>
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"      label-cols-sm="3" label-class="require-input" id="cityGroup"    label-for="city">
            <div slot="label"><span class="required-icon">*</span>市</div>
            <b-form-select id="city" @input="getCounty"  v-model="addressForm.city"  :state="chkState('city','addressForm')"  :plain="true" >
              <option
                  v-for="opt in citySelect"
                  :value="opt.id"
                  :key="opt.id"
                >
                {{opt.districtName}}
              </option>
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"  label-cols-sm="3" label-class="require-input" id="countyGroup"  label-for="county">
            <div slot="label"><span class="required-icon"></span>区</div>
            <b-form-select id="county" v-model="addressForm.county"  :plain="true" >
               <option
                  v-for="opt in countySelect"
                  :value="opt.id"
                  :key="opt.id"
                >
                {{opt.districtName}}
              </option>
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <div slot="footer" class="form-footer">
            <b-button class="ml-1"  variant="primary" @click="setRegionFun">保存</b-button>
            <b-button class="ml-1"  variant="primary" @click="resetRegionFun">关闭</b-button>
          </div>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
  import * as AssetAPI from '@/api/assetCenter/asset.js'
  import { validationMixin } from "vuelidate"
  import { required} from "vuelidate/lib/validators"
  export default {
    name: "Address",
    props: {

    },
    data() {
      return {
        addressForm:{
          province:'',
          city:'',
          county:''
        },
        // 下拉列表
        provinceSelect:[],
        citySelect:[],
        countySelect:[],
      }
    },
    mixins: [validationMixin],
     validations() {
      return {
        addressForm: {
          province: {
            required
          },
          city:{
            required
          }

        },

      }
    },
     computed: {
      formStr() { return JSON.stringify(this.form, null, 4) },
      isValid() {
        // if(this.subFormName){

          // return !this.$v.form.$anyError && !this.$v[this.subFormName].$anyError
        // }else{
          return !this.$v.addressForm.$anyError
        // }
      },
      isDirty() { return this.$v.form.$anyDirty }
    },
    created(){
      this.getProvinces()
    },
    mounted() {
    },
    methods: {
      // 获取分级
      getProvinces(){
        AssetAPI.getProvinces().then(res=>{
          this.provinceSelect = res.data.result
        })
      },
      getCity(typeId){
        this.addressForm.county = ''
        this.countySelect = []
        AssetAPI.getCity(typeId).then(res=>{
          this.citySelect = res.data.result
        })
      },
      getCounty(typeId){
        AssetAPI.getCity(typeId).then(res=>{
          this.countySelect = res.data.result
        })
      },
      // 保存信息
      setRegionFun(bvModalEvt){
         bvModalEvt.preventDefault();
        let condition = {}
        let districCode = '';
        let arr = [];
        let provinceArr = []
        let countyArr = []
        arr = this.citySelect.filter(ele=>{
          return ele.id==this.addressForm.city
        })

        provinceArr = this.provinceSelect.filter(ele=>{
          return ele.id==this.addressForm.province
        })
        countyArr = this.countySelect.filter(ele=>{
          return ele.id==this.addressForm.county
        })
        // districCode =arr[0].districtCode.slice(0,4)

        condition.arr = arr;
        condition.provinceArr = provinceArr
        condition.countyArr = countyArr
        console.log('provinceSelect--==',condition)

        if (this.validate() ) {
         this.$emit('setRegionFun',condition)
        }

      },
      resetRegionFun(){
        this.$emit('resetRegionFun')
      },
      //返回遍历数据，用于下拉框获取数据
      getAddUpdateSelectDataFun(object){
        if (object==undefined || object==null){
          return [];
        }
        let showData=object.map( item => {
          let itemObj ={
            value:item.id,
            text:item.districtName
          }
          return itemObj
        });
        return showData;
      },
        // 非空校验
      chkState(val,formName) {
        let field = this.$v[formName][val]
        return !field.$dirty || !field.$invalid
      },
      findFirstError(component = this) {
        if (component.state === false) {

          if (component.$refs.input) {
            component.$refs.input.focus()
            return true
          }
          if (component.$refs.check) {
            component.$refs.check.focus()
            return true
          }
        }
        let focused = false
        component.$children.some((child) => {
          focused = this.findFirstError(child)
          return focused
        })
        return focused
      },
      validate() {
        this.$v.$touch()
        this.$nextTick(() => {
          return this.findFirstError()
        })
        return this.isValid
      },
    }
  }
</script>
<style lang="scss" scoped>
  .form-footer{
    display: block;
    width: 100%;
    text-align: center;
  }
  // .form-inline.btn{
  //   margin-right:1rem;
  //   margin-bottom:1rem;
  // }

  .btn.disabled {
    cursor: auto;
  }
  .form-group{
    position:relative;
  }

  .form-control.is-valid {
    background-image:none;
    border-color:#c8ced3;
  }

  .inline-form-col-6 .form-group{
    width:50%;
    margin-right:0;
    margin-bottom:1rem;
  }



  .inline-form-col-6  .form-group-lg{
    width: 100%
  }

  .form-inline .form-group-lg  label{
    width:20%;
  }

  .arrow{
    position: absolute;
    display: block;
    width: 1rem;
    height: 0.5rem;
    margin: 0 0.3rem;
    bottom: calc((0.5rem + 1px) * -1);
    left: 0px;
  }
  .form-control.is-invalid ~ .invalid-tooltip .arrow::before{
    bottom: 0;
    border-width: 0.5rem 0.5rem 0;
    border-top-color: rgba(0, 0, 0, 0.25);
  }
  .form-control.is-invalid ~ .invalid-tooltip .arrow::after{
    bottom: 1px;
    border-width: 0.5rem 0.5rem 0;
    border-top-color: rgba(248, 108, 107, 0.9);
  }

  .arrow::before, .arrow::after {
    position: absolute;
    display: block;
    content: "";
    border-color: transparent;
    border-style: solid;
    bottom: 0;
    border-width: 0.5rem 0.5rem 0;
    border-top-color: rgba(0, 0, 0, 0.25);
  }

  .invalid-tooltip {
    position: absolute;
    top: -100%;
    z-index: 5;
    display: none;
    max-width: 100%;
    padding: 0.25rem 0.5rem;
    margin-top: .1rem;
    font-size: 0.76563rem;
    line-height: 1.5;
    color: #fff;
    background-color: rgba(248, 108, 107, 0.9);
    border-radius: 0.25rem;
  }


  .modal-body .form-control.is-invalid{
    background-image: none;
  }
  .modal-body .top-inform .card-body{
    // border: #ccc 1px solid;
    // background-color: #f0f3f5;
    padding: 0.5rem 1rem;
  }

  .modal-body .form-title{
    width: 100%;
    height: 0.85rem;
    margin-bottom:1.5rem;
    border-bottom:#ccc 1px solid;
    position: relative;
  }

  .modal-body .form-title span{
    line-height: 2rem;
    font-size: 1rem;
    padding-right:10px;
    position:absolute;
    top:-25%;
    background: #fff
  }
  .btn-box{
    margin-bottom: 0.5rem;
  }

  .btn-box-right{
    text-align: right;
  }
  .require-input .required-icon{
    font-size: 24px;
    line-height: 18px;
    vertical-align: middle;
    margin-right: 5px;
    color:#f00;
  }
</style>
