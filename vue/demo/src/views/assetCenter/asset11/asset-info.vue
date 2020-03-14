<template>
  <div class="animated fadeIn">

    <b-card>
      <b-form class="inline-form-col-6"  inline  v-on:reset.prevent="onReset" novalidate>

        <b-form-group  label-align="right"    label-cols-sm="5" label="资产种类111：" label-class="require-input" id="inputGroupAssetType"    label-for="assetType">
            <b-form-input  id="assetTypeName"  type="text"  v-model="form.assetTypeName" plaintext    />
        </b-form-group>

        <b-form-group  label-align="right"  label-cols-sm="5" label="资产编码："  label-class="require-input" id="inputGroupAssetCode"   label-for="assetCode">
          <b-form-input  id="assetCode"  type="text"  v-model="form.assetCode" plaintext    />
        </b-form-group>

        <b-form-group  label-align="right"  label-cols-sm="5" label="资产名称：" label-class="require-input"  id="inputGroupAssetSimpleName"    label-for="assetSimpleName">
          <b-form-input  id="assetOldCode"  type="text"  v-model="form.assetSimpleName" plaintext    />
        </b-form-group>

        <b-form-group  label-align="right"  label-cols-sm="5"  id="inputGroupAssetOldCode"  label="曾用编码："  label-for="assetOldCode">
          <b-form-input  id="assetOldCode"  type="text"  v-model="form.assetOldCode" plaintext    />
        </b-form-group>

        <b-form-group  label-align="right" label-cols-sm="5"  label-class="require-input" label="生效日期："  id="inputGroupEffectiveTime"  label-for="effectiveTime">
          <b-form-input  id="effectiveTime"  type="text"  v-model="form.effectiveTime" plaintext    />
        </b-form-group>

        <b-form-group  label-align="right" label-cols-sm="5"  label-class="require-input" label="失效日期："  id="inputGroup5"   label-for="invalidTime">
          <b-form-input  id="invalidTime"  type="text"  v-model="form.invalidTime" plaintext    />
        </b-form-group>

        <!-- 项目-->
        <template v-if="isProject">
          <b-form-group  label-align="right"    label-cols-sm="5" label="项目类型：" label-class="require-input" id="projectTypeGroup"    label-for="projectType">
            <b-form-input  id="customerName"  type="text"  v-model="projectForm.projectTypeName" plaintext    />
          </b-form-group>
          <b-form-group  label-align="right"    label-cols-sm="5" label="管理团队：" label-class="require-input" id="manageTeamGroup"    label-for="manageTeam">
            <b-form-input  id="manageTeam"  type="text"  v-model="projectForm.manageTeamName" plaintext    />
          </b-form-group>
          <b-form-group  label-align="right"    label-cols-sm="5" label="经营公司：" label-class="require-input" id="managementCompanyGroup"    label-for="managementCompany">
            <b-form-input  id="managementCompany"  type="text"  v-model="projectForm.managementCompanyName" plaintext    />
          </b-form-group>
          <b-form-group  label-align="right"    label-cols-sm="5" label="物业公司：" label-class="require-input" id="propertyCompanyGroup"    label-for="propertyCompany">
            <b-form-input  id="propertyCompany"  type="text"  v-model="projectForm.propertyCompanyName" plaintext    />
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="所在地区：" label-class="require-input" id="regionGroup"    label-for="region">
            <b-form-input  id="region"  type="text"  v-model="projectForm.region" plaintext    />
          </b-form-group>

          <b-form-group  label-align="right"  label-cols-sm="5" label="项目地址：" label-class="require-input"  id="projectAddressGroup"    label-for="projectAddress">
            <b-form-input  id="projectAddress"  type="text"  v-model="projectForm.projectAddress" plaintext    />
          </b-form-group>

          <b-form-group  label-align="right"  label-cols-sm="5" label="建筑面积㎡：" label-class="require-input"  id="assetCoveredAreaGroup"    label-for="assetCoveredArea">
            <b-form-input  id="assetCoveredArea"  type="text"  v-model="form.assetCoveredArea" plaintext    />
          </b-form-group>

          <b-form-group  label-align="right"  label-cols-sm="5" label="使用面积㎡：" label-class="require-input"  id="assetUsableAreaGroup"    label-for="assetUsableArea">
            <b-form-input  id="assetUsableArea"  type="text"  v-model="form.assetUsableArea" plaintext    />
          </b-form-group>

          <b-form-group  label-align="right"   label-cols-sm="5" label="计租面积㎡：" label-class="require-input"  id="rentalAreaGroup"    label-for="rentalArea">
            <b-form-input  id="rentalArea"  type="text"  v-model="projectForm.rentalArea" plaintext    />
          </b-form-group>

          <b-form-group  label-align="right"  label-cols-sm="5" label="开业日期：" label-class="require-input"  id="plannedOpeningDateGroup"  label-for="plannedOpeningDate">
            <b-form-input  id="plannedOpeningDate"  type="text"  v-model="projectForm.plannedOpeningDate" plaintext    />
          </b-form-group>

          <b-form-group  label-align="right"  label-cols-sm="5" label="竣工日期："  label-class="require-input"  id="completionDateGroup"   label-for="completionDate">
            <b-form-input  id="completionDate"  type="text"  v-model="projectForm.completionDate" plaintext    />
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="币别：" label-class="require-input" id="currencyGroup"    label-for="currency">
            <b-form-input  id="currency"  type="text"  v-model="projectForm.currencyName" plaintext    />
          </b-form-group>

          <b-form-group  label-align="right"   label-cols-sm="5" label="金额：" label-class="require-input"  id="moneysGroup"    label-for="moneys">
            <b-form-input  id="moneys"  type="text"  v-model="projectForm.moneys"   plaintext  />
          </b-form-group>

          <b-form-group  label-align="right"  label-cols-sm="5" label="配套面积㎡：" label-class="require-input"  id="matchingAreaGroup"    label-for="matchingArea">
            <b-form-input  id="matchingArea"  type="text"  v-model="projectForm.matchingArea" plaintext    />
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="是否计租：" label-class="require-input" id="ifCalculationGroup"    label-for="ifCalculation">
            <b-form-input  id="ifCalculation"  type="text"  v-model="projectForm.ifCalculation" plaintext    />
          </b-form-group>

          <b-form-group  label-align="right"   label-cols-sm="5" label="期间规则：" label-class="require-input"  id="rulesInPeriodGroup"    label-for="rulesInPeriod">
            <b-form-input  id="rulesInPeriod"  type="text"  v-model="projectForm.rulesInPeriodName" plaintext    />
          </b-form-group>

          <b-form-group  label-align="right"   label-cols-sm="5" label="定价基准："  label-class="require-input"  id="priceBenchmarkGroup"    label-for="priceBenchmark">
            <b-form-input  id="priceBenchmark"  type="text"  v-model="projectForm.priceBenchmarkName" plaintext    />
          </b-form-group>

          <b-form-group  label-align="right"   label-cols-sm="5" label="不整月计算公式："  label-class="require-input"  id="nfmothCalculationFormulaGroup"    label-for="nfmothCalculationFormula">
            <b-form-input  id="nfmothCalculationFormula"  type="text"  v-model="projectForm.nfmothCalculationFormulaName" plaintext    />
          </b-form-group>

          <b-form-group  label-align="right"   label-cols-sm="5" label="小数位精度：" label-class="require-input"  id="decimalPrecisionGroup"    label-for="decimalPrecision">
            <b-form-input  id="decimalPrecision"  type="text"  v-model="projectForm.decimalPrecision"  plaintext   />
          </b-form-group>
        </template>
        <!--项目-->

        <!--        单元-->
        <template v-if="isUnit">
          <b-form-group  label-align="right"    label-cols-sm="5" label-class="require-input" label="编码方式：" id="propertySerialGroup"    label-for="propertySerial">
            <b-form-input  id="propertySerial"  type="text"  v-model="unitForm.propertySerialName"  plaintext   />
          </b-form-group>

          <b-form-group  label-align="right"  label-cols-sm="5" label="点位编码：" label-class="require-input"  id="pointNoGroup"    label-for="pointNo">
            <b-form-input  id="assetSimpleName"  type="text"  v-model="unitForm.pointNo"    plaintext />
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="单元类型：" label-class="require-input" id="unitTypeGroup"    label-for="unitType">
            <b-form-input  id="unitType"  type="text"  v-model="unitForm.unitTypeName"    plaintext />
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="资产用途：" label-class="require-input" id="propertyUseGroup"    label-for="propertyUse">
            <b-form-input  id="propertyUse"  type="text"  v-model="unitForm.propertyUseName"    plaintext />
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="管理团队：" label-class="require-input" id="managementTeamGroup"    label-for="managementTeam">
            <b-form-input  id="managementTeam"  type="text"  v-model="unitForm.manageTeamName"    plaintext />
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="资产性质：" label-class="require-input" id="propertyNatureGroup"    label-for="propertyNature">
            <b-form-input  id="propertyNature"  type="text"  v-model="unitForm.propertyNatureName"    plaintext />
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="计价方式：" label-class="require-input" id="calculateTypeGroup"    label-for="calculateType">
            <b-form-input  id="calculateType"  type="text"  v-model="unitForm.calculateTypeName"    plaintext />
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="经营公司：" label-class="require-input" id="manageCompanyGroup"    label-for="manageCompany">
            <b-form-input  id="manageCompany"  type="text"  v-model="unitForm.managementCompanyName"    plaintext />
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="计税方法：" label-class="require-input" id="taxTypeGroup"    label-for="taxType">
            <b-form-input  id="taxType"  type="text"  v-model="unitForm.taxTypeName"    plaintext />
          </b-form-group>

          <b-form-group  label-align="right"  v-if="this.isPropertyCompanyShow"   label-cols-sm="5" label="物业公司：" label-class="require-input" id="propertyCompanyGroup"    label-for="propertyCompany">
            <b-form-input  id="propertyCompany"  type="text"  v-model="unitForm.propertyCompanyName"    plaintext />
          </b-form-group>

          <b-form-group  label-align="right"  v-if="this.isAssetCoveredAreaShow"   label-cols-sm="5" label="建筑面积㎡：" label-class="require-input" id="assetCoveredAreaGroup"    label-for="assetCoveredArea">
            <b-form-input  id="assetCoveredArea"  type="text"  v-model="form.assetCoveredArea"    plaintext />
          </b-form-group>

          <b-form-group  label-align="right" v-if="this.isAssetUsableAreaShow"   label-cols-sm="5" label="使用面积㎡：" label-class="require-input" id="assetUsableAreaGroup"    label-for="assetUsableArea">
            <b-form-input  id="assetUsableArea"  type="text"  v-model="form.assetUsableArea"    plaintext />
          </b-form-group>

          <b-form-group  label-align="right"  v-if="this.isCalculateRentAreaShow"   label-cols-sm="5" label="计租面积㎡：" label-class="require-input" id="calculateRentAreaGroup"    label-for="calculateRentArea">
            <b-form-input  id="calculateRentArea"  type="text"  v-model="unitForm.calculateRentArea"    plaintext />
          </b-form-group>

          <b-form-group  label-align="right" v-if="this.isRightPropertyShow"  label-cols-sm="5" label="产权属性：" label-class="require-input" id="rightPropertyGroup"    label-for="rightProperty">
            <b-form-input  id="rightProperty"  type="text"  v-model="unitForm.rightPropertyName"    plaintext />
          </b-form-group>

          <b-form-group  label-align="right" v-if="this.isPropertyRightAreaShow"   label-cols-sm="5"  label="产权面积㎡" label-class="require-input"  id="propertyRightAreaGroup"    label-for="propertyRightArea">
            <b-form-input  id="propertyRightArea"  type="text"  v-model="unitForm.propertyRightArea" plaintext    />
          </b-form-group>

          <b-form-group  label-align="right" v-if="this.isPropertyAreaShow"   label-cols-sm="5"  label="去产权面积㎡" label-class="require-input"  id="propertyAreaGroup"    label-for="propertyArea">
            <b-form-input  id="propertyArea"  type="text"  v-model="unitForm.propertyArea" plaintext    />
          </b-form-group>

          <b-form-group  label-align="right"  v-if="this.isIndustryRegisterShow"   label-cols-sm="5" label="是否已工商备案" label-class="require-input" id="industryRegisterGroup"    label-for="industryRegister">
            <b-form-input  id="industryRegister"  type="text"  v-model="unitForm.industryRegister" plaintext    />
          </b-form-group>

          <b-form-group  label-align="right"  v-if="this.isRightInfoShow"  label-cols-sm="5"  label="产权信息：" label-class="require-input"  id="rightInfoGroup"    label-for="rightInfo">
            <b-form-input  id="rightInfo"  type="text"  v-model="unitForm.rightInfo"  plaintext   />
          </b-form-group>

          <b-form-group  label-align="right"  v-if="this.isIsSupPowerShow"   label-cols-sm="5" label="是否供电：" label-class="require-input" id="isSupPowerGroup"    label-for="isSupPower">
            <b-form-input  id="isSupPower"  type="text"  v-model="unitForm.isSupPower"  plaintext   />
          </b-form-group>

          <b-form-group  label-align="right"    v-if="this.isAverageUseElShow"   label-cols-sm="5" label="平均用电量：" label-class="require-input"  id="averageUseElGroup"    label-for="averageUseEl">
            <b-form-input  id="averageUseEl"  type="text"  v-model="unitForm.averageUseEl"   plaintext  />
          </b-form-group>

          <b-form-group  label-align="right"       label-cols-sm="5" label="资产状态：" label-class="require-input"  id="assetStatusGroup"    label-for="assetStatus">
            <b-form-input  id="averageUseEl"  type="text"  v-model="unitForm.propertyStatusName"   plaintext  />
          </b-form-group>

          <b-form-group  label-align="right"       label-cols-sm="5" label="租用状态：" label-class="require-input"  id="assetPostalGroup"    label-for="assetPostal">
            <b-form-input  id="averageUseEl"  type="text"  v-model="unitForm.assetPostalName"   plaintext  />
          </b-form-group>
        </template>
        <!--        单元-->
        <!--        建筑物-->
        <template v-if="isBuilding" >
          <b-form-group  label-align="right"    label-cols-sm="5" label="项目类型：" label-class="require-input" id="projectTypeGroup"    label-for="projectType">
            <b-form-input  id="projectType"  type="text"  v-model="buildingForm.projectTypeName"  plaintext   />
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="管理团队：" label-class="require-input" id="manageTeamGroup"    label-for="manageTeam">
            <b-form-input  id="manageTeam"  type="text"  v-model="buildingForm.manageTeam"  plaintext   />
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="经营公司：" label-class="require-input" id="managementCompanyGroup"    label-for="managementCompany">
            <b-form-input  id="managementCompany"  type="text"  v-model="buildingForm.managementCompany"  plaintext   />
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="物业公司：" label-class="require-input" id="propertyCompanyGroup"    label-for="propertyCompany">
            <b-form-input  id="propertyCompany"  type="text"  v-model="buildingForm.propertyCompanyName"  plaintext   />
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="建筑物类型：" label-class="require-input" id="buildingTypeGroup"    label-for="buildingType">
            <b-form-input  id="buildingType"  type="text"  v-model="buildingForm.buildingTypeName"  plaintext   />
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="建筑物地址：" label-class="require-input" id="buildingAddressGroup"    label-for="buildingAddress">
            <b-form-input  id="buildingAddress"  type="text"  v-model="buildingForm.buildingAddress"  plaintext   />
          </b-form-group>
        </template>
        <!--        建筑物-->

        <b-form-group  label-align="right"  label-cols-sm="5" label-class="require-input"  label="上级资产：" id="inputGroup8"    label-for="assetParent">
          <b-form-input  id="customerName"  type="text"  v-model="form.assetParentName" plaintext    />
        </b-form-group>

        <b-form-group  label-align="right"  label-cols-sm="5" id="inputGroup9"  label="备注："  label-for="remark">
          <b-form-input  id="remark"  type="text"  v-model="form.remark"  plaintext   />
        </b-form-group>

        <b-tabs v-show="isUnit" style="width:100%">
          <b-tab title="单元合同" active>
             <!--table表格组件-->
<!--          :totalRows='totalRowsUnit' :perPage="perPageUnit"  @getSortType="getSortTypeUnit"  @updatePage="updatePageUnit" @getSelectedRows="getSelectedRowsUnit"-->
                <c-table hover striped bordered :topBtn="true" :busy.sync="isBusyUnit" :table-data="tableDataUnit" :fields="fieldsUnit" >
                </c-table>
                <!--/table表格组件-->             
          </b-tab>
          <b-tab title="历史变更单元" >
               <!--table表格组件-->
<!--           :totalRows='totalRowsUnitHistory' :perPage="perPageUnitHistory"  @getSortType="getSortTypeUnitHistory"  @updatePage="updatePageUnitHistory" @getSelectedRows="getSelectedRowsUnitHistory"-->
                <c-table hover striped bordered :topBtn="true" :busy.sync="isBusyUnitHistory" :table-data="tableDataUnitHistory" :fields="fieldsUnitHistory" >
                </c-table>
                <!--/table表格组件-->       
          </b-tab>          
        </b-tabs>

        <div slot="footer" class="form-footer">
          <b-button class="ml-1" type="reset" variant="primary" >关闭</b-button>
        </div>
      </b-form>

    </b-card>

  </div>
</template>

<script>
  // import AssetAPI from '@/api/baseMessageManage/asset.js'
  import cTable from "@/components/asset/z-table.vue";
  import axios from 'axios'
  const assetTran= new Map([
    ['',''],
    [0,'否'],
    [1,'是']
  ]);

    export default {
        name: "asset-info",
        components: {
          cTable
        },
        data() {
          return {
            isBuilding: false,
            isProject:false,
            isUnit:false,
            form:{
              assetTypeName: "",
              assetCode: "",
              assetSimpleName: "",
              assetOldCode:'',
              effectiveTime: null,
              invalidTime:null,
              assetParentName:'',
              assetCoveredArea:"",
              assetUsableArea:"",
              unitBigType:"",
              remark:''
            },
            projectForm:{
              projectTypeName:"",
              manageTeamName:"",
              managementCompanyName:"",
              propertyCompanyName:"",
              region:"",
              projectAddress:"",
              rentalArea:"",
              plannedOpeningDate:"",
              completionDate:"",
              invalidTime:"",
              currencyName:"",
              moneys:"",
              matchingArea:"",
              ifCalculation:"",
              rulesInPeriodName:"",
              priceBenchmarkName:"",
              nfmothCalculationFormulaName:"",
              decimalPrecision:""
            },
            unitForm:{
              propertySerialName:"",
              pointNo:"",
              unitTypeName:"",
              propertyUseName:"",
              managementTeamName:"",
              propertyNatureName:"",
              calculateTypeName:"",
              manageCompanyName:"",
              taxTypeName:"",
              propertyCompanyName:"",
              calculateRentArea:"",
              rightPropertyName:"",
              propertyRightArea:"",
              propertyArea:"",
              industryRegister:"",
              rightInfo:"",
              isSupPower:"",
              averageUseEl:"",
              propertyStatusName:"",
              assetPostalName:""
            },
            buildingForm:{
              projectTypeName:"",
              manageTeamName:"",
              managementCompanyName:"",
              propertyCompanyName:"",
              buildingTypeName:"",
              buildingAddress:""
            },
            tableDataUnit:[],
            tableDataUnitHistory:[],
            fieldsUnit:[
              {key: 'contractType',label: '合同类型'},
              {key: 'startDate',label: '合同开始日期'},
              {key: 'endDate',label: '合同结束日期'},
              {key: 'contractNo',label: '合同编号'},
              {key: 'paperContractNo',label: '手工合同编号'},
              {key: 'customerName',label: '客户名称'},
              {key: 'buildArea',label: '租赁面积'},
              {key: 'statusName',label: '状态'}
            ],
            fieldsUnitHistory:[
              {key: 'modifyTime',label: '变更时间'},
              {key: 'historyName',label: '历史名称'},
              {key: 'bulidingName',label: '楼层号'},
              {key: 'usableArea',label: '使用面积'},
              {key: 'coveredArea',label: '建筑面积'},
              {key: 'calculateRentArea',label: '计租面积'},
              {key: 'managementTeam',label: '管理团队'},
              {key: 'manageCompany',label: '经营公司'},
              {key: 'propertyCompany',label: '物业公司'}
            ],
            isBusyUnit: false,
            isBusyUnitHistory: false,
            isFixedCellShow:false,
            isSignsPointShow:false,
            isParkingSpaceShow:false,
            isOtherUnitsShow:false,
            isPropertyCompanyShow:false,
            isAssetCoveredAreaShow:false,
            isAssetUsableAreaShow:false,
            isCalculateRentAreaShow:false,
            isRightPropertyShow:false,
            isPropertyRightAreaShow:false,
            isPropertyAreaShow:false,
            isIndustryRegisterShow:false,
            isRightInfoShow:false,
            isIsSupPowerShow:false,
            isAverageUseElShow:false
          }
        },
        props:{
          modalId:{
            type: String,
            default: ''
          },
          targetObj:{
            type: [String, Object],
            default: () => []
          }
        },
        created(){
          this.detailAssetFun();
        },
        methods:{
          //查看详情
          detailAssetFun(){
            // AssetAPI.showAssetInfoById(this.targetObj)
            axios.get('/os_kernel_assetctr/app/asset/showAssetInfoById/'+this.targetObj)
            .then(res=>{
              if (res.data.code === 0) {
                this.form=res.data.result;
                if(this.form.assetType!=undefined && this.form.assetType=="project"){
                  this.isProject=true;
                  this.projectForm=res.data.result.assetProject;
                  this.projectForm.ifCalculation=this.getTranAssert(this.projectForm.ifCalculation);
                }else if(this.form.assetType!=undefined && this.form.assetType=="unit"){
                  this.isUnit=true;
                  this.unitForm=res.data.result.assetUnit;
                  this.unitForm.industryRegister=this.getTranAssert(this.unitForm.industryRegister);
                  this.unitForm.isSupPower=this.getTranAssert(this.unitForm.isSupPower);
                  this.tableDataUnitHistory=res.data.result.assetHistory;
                  this.getUnitContract();
                }else if(this.form.assetType!=undefined && this.form.assetType=="building"){
                  this.isBuilding=true;
                  this.buildingForm=res.result.assetBuilding;
                }
                this.assetTypeChange();
              } else {
                this.$emit('actionTips',"查询失败");
              }
            })
          },
          //单元类型值改变时
          assetTypeChange(data){
            // console.log(data)
            this.isPropertyCompanyShow=false;
            this.isAssetCoveredAreaShow=false;
            this.isAssetUsableAreaShow=false;
            this.isCalculateRentAreaShow=false;
            this.isRightPropertyShow=false;
            this.isPropertyRightAreaShow=false;
            this.isPropertyAreaShow=false;
            this.isIndustryRegisterShow=false;
            this.isRightInfoShow=false;
            this.isIsSupPowerShow=false;
            this.isAverageUseElShow=false;
            switch (this.form.unitBigType) {
              case 440:
                //单元类型大类为固定单元，显示物业公司、建筑物面积、使用面积、计租面积、产权属性、产权面积、无产权面积、是否已工商备案、产权信息
                this.isPropertyCompanyShow=true;
                this.isAssetCoveredAreaShow=true;
                this.isAssetUsableAreaShow=true;
                this.isCalculateRentAreaShow=true;
                this.isRightPropertyShow=true;
                this.isPropertyRightAreaShow=true;
                this.isPropertyAreaShow=true;
                this.isIndustryRegisterShow=true;
                this.isRightInfoShow=true;
                break;
              case 437:
                //单元类型大类为招牌点位，计价方式按面积，显示计租面积、是否供电、平均用电量
                if(this.unitForm.calculateType=="4299"){
                  this.isCalculateRentAreaShow=true;
                  this.isIsSupPowerShow=true;
                  this.isAverageUseElShow=true;
                }else {
                  //计价方式不是按面积
                  this.isIsSupPowerShow=true;
                  this.isAverageUseElShow=true;
                }
                break;
              case 438:
                //单元类型大类为停车位，计价方式按面积
                if(this.unitForm.calculateType=="4299"){
                  this.isPropertyCompanyShow=true;
                  this.isCalculateRentAreaShow=true;
                }else {
                  this.isPropertyCompanyShow=true;
                }
                break;
              case 439:
                //单元类型大类为停车位，计价方式按面积
                if(this.unitForm.calculateType=="4299"){
                  this.isPropertyCompanyShow=true;
                  this.isAssetCoveredAreaShow=true;
                  this.isAssetUsableAreaShow=true;
                  this.isCalculateRentAreaShow=true;
                  this.isRightPropertyShow=true;
                  this.isPropertyRightAreaShow=true;
                  this.isPropertyAreaShow=true;
                  this.isIndustryRegisterShow=true;
                  this.isRightInfoShow=true;
                }else {
                  this.isPropertyCompanyShow=true;
                  this.isIndustryRegisterShow=true;
                }
                break;
              default:
                break;
            }
          },
          //获取翻译的值
          getTranAssert(value){
            let result=value;
            if(value!=undefined){
              result=assetTran.get(value)
            }
            return result
          },
          //获取单元合同
          getUnitContract(){
            this.tableDataUnit=[];
            // AssetAPI.getUnitContract({ids:this.targetObj})
            axios.post('/os_lms_contract/app/contract/contract/getContractListByAssId',{ids:this.targetObj})
            .then(res=>{
              this.tableDataUnit=res.data.result
            })
          },
          onReset() {
            this.form = {}
            this.$root.$emit('bv::hide::modal', this.modalId)
          },
          // //获取当前表格排序字段
          // getSortTypeUnit(data){
          //   // console.log(data);
          // },
          // //获取当前表格排序字段
          // getSortTypeUnitHistory(data){
          //   // console.log(data);
          // },
          // updatePageUnit(data){
          //   //获取点击的页码
          //   this.currentPageUnit = data;
          //   this.getTableDataUnit();
          // },
          // updatePageUnitHistory(data){
          //   //获取点击的页码
          //   this.currentPageUnitHistory = data;
          //   this.getTableDataUnitHistory();
          // },
          // getSelectedRowsUnit(data){
          //   //获取表格选中的行对象
          //   // console.log(data);
          //   // this.form.selRows = data;
          // },
          // getSelectedRowsUnitHistory(data){
          //   //获取表格选中的行对象
          //   // console.log(data);
          //   // this.form.selRows = data;
          // },
          //获取单元合同
          getTableDataUnit(){

          },
          //获取历史合同单元
          getTableDataUnitHistory(){

          }
        }
    }
</script>

<style lang="scss" scoped>
  .form-footer{
    display: block;
    width: 100%;
    text-align: center;
  }
  .form-inline.btn{
    margin-right:1rem;
    margin-bottom:1rem;
  }

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
  .modal-body .top-inform .card{
    border: #ccc 1px solid;
    background-color: #f0f3f5;
  }

  .require-input .required-icon{
    font-size: 24px;
    line-height: 18px;
    vertical-align: middle;
    margin-right: 5px;
    color:#f00;
  }

</style>
