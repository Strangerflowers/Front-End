<template>
  <div class="animated fadeIn">

    <b-card>
      <b-form class="inline-form-col-6"  inline v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>

        <b-form-group  label-align="right"    label-cols-sm="5" label-class="require-input" id="inputGroupAssetType"    label-for="assetType">
          <div slot="label"><span class="required-icon">*</span>资产种类：</div>
<!--          <b-form-select id="assetType" v-model="form.assetType" :plain="true" :options="assetTypes">   -->
<!--          </b-form-select>-->
          <b-form-select id="assetType" v-model="form.assetType" :state="chkState('assetType')" :disabled="true" :plain="true" :options="[{value:'project',text:'项目'},{value:'land',text:'地块'},
          {value:'building',text:'建筑物'},{value:'floor',text:'楼层'},{value:'unit',text:'单元/点位'}]">
          </b-form-select>
          <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group  label-align="right"  label-cols-sm="5"  label-class="require-input" id="inputGroupAssetCode"   label-for="assetCode">
          <div slot="label"><span class="required-icon">*</span>资产编码：</div>
          <b-form-input  id="assetCode"  type="text"  v-model.lazy.trim="form.assetCode" :state="chkState('assetCode')"  :disabled="this.form.assetType=='unit'"  />
          <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group  label-align="right"  label-cols-sm="5" label-class="require-input"  id="inputGroupAssetSimpleName"    label-for="assetSimpleName">
          <div slot="label"><span class="required-icon">*</span>资产名称：</div>
          <b-form-input  id="assetSimpleName"  type="text"  v-model.lazy.trim="form.assetSimpleName"  :state="chkState('assetSimpleName')"    />
          <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group  label-align="right"  label-cols-sm="5"  id="inputGroupAssetOldCode"  label="曾用编码："  label-for="assetOldCode">
          <b-form-input  id="assetOldCode"  type="text"  v-model.lazy.trim="form.assetOldCode"     />
        </b-form-group>

        <b-form-group  label-align="right" label-cols-sm="5"  label-class="require-input"  id="inputGroupEffectiveTime"  label-for="effectiveTime">
          <div slot="label"><span class="required-icon">*</span>生效日期：</div>
          <v-date-picker mode='single'  v-model='form.effectiveTime'   >
            <b-input-group slot-scope='props'>
              <b-form-input  type='text'  :value='props.inputValue'  :state="chkState('effectiveTime')"  @change.native='props.updateValue($event.target.value)'></b-form-input>
              <b-input-group-append>
                <b-input-group-text><i class="fa fa-calendar"></i></b-input-group-text>
              </b-input-group-append>
              <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
            </b-input-group>
          </v-date-picker>
        </b-form-group>

        <b-form-group  label-align="right" label-cols-sm="5"  label-class="require-input"  id="inputGroup5"   label-for="invalidTime">
          <div slot="label"><span class="required-icon">*</span>失效日期：</div>
          <v-date-picker mode='single'  v-model='form.invalidTime'   >
            <b-input-group slot-scope='props'>
              <b-form-input  type='text'  :value='props.inputValue'  :state="chkState('invalidTime')"  @change.native='props.updateValue($event.target.value)'></b-form-input>
              <b-input-group-append>
                <b-input-group-text><i class="fa fa-calendar"></i></b-input-group-text>
              </b-input-group-append>
              <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
            </b-input-group>
          </v-date-picker>
        </b-form-group>

        <b-form-group  label-align="right"    label-cols-sm="5" label-class="require-input"  id="orderNoGroup"    label-for="orderNo">
          <div slot="label"><span class="required-icon">*</span>排序号：</div>
          <b-form-input  id="orderNo"  type="text"  v-model.lazy.trim="form.orderNo"     />
          <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
        </b-form-group>

        <!--        项目表单-->
        <template v-if="form.assetType=='project'">
          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="projectTypeGroup"    label-for="projectType">
            <div slot="label"><span class="required-icon">*</span>项目类型：</div>
            <b-form-select id="projectType" v-model="projectForm.projectType" :state="chkState('projectType')" :plain="true" :options="projectTypeSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="manageTeamGroup"    label-for="manageTeam">
            <div slot="label"><span class="required-icon">*</span>管理团队：</div>
            <b-form-select id="manageTeam" v-model="projectForm.manageTeam" :state="chkState('manageTeam')" :plain="true" :options="manageTeamSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="managementCompanyGroup"    label-for="managementCompany">
            <div slot="label"><span class="required-icon">*</span>经营公司：</div>
            <b-form-select id="managementCompany" v-model="projectForm.managementCompany" :state="chkState('managementCompany')" :plain="true" :options="managementCompanySelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="propertyCompanyGroup"    label-for="propertyCompany">
            <div slot="label"><span class="required-icon">*</span>物业公司：</div>
            <b-form-select id="propertyCompany" v-model="projectForm.propertyCompany" :state="chkState('propertyCompany')" :plain="true" :options="propertyCompanySelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="regionGroup"    label-for="region">
            <div slot="label"><span class="required-icon">*</span>所在地区：</div>
            <b-input-group class="input-group">
              <b-form-input  id="region"  type="text"  v-model.lazy.trim="form.regionName" :state="chkState('regionName')"    readonly autofocus />
              <b-input-group-append>
                <b-button variant="primary" @click="addRegionTree"><i class="fa fa-search-plus"></i></b-button>
              </b-input-group-append>
              <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <b-form-group  label-align="right"     label-cols-sm="5" label="项目地址：" label-class="require-input"  id="projectAddressGroup"    label-for="projectAddress">
            <b-form-input  id="projectAddress"  type="text"  v-model.lazy.trim="projectForm.projectAddress"     />
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label-class="require-input"  id="assetCoveredAreaGroup"    label-for="assetCoveredArea">
            <div slot="label"><span class="required-icon">*</span>建筑面积㎡：</div>
            <b-form-input  id="assetCoveredArea"  type="text"  v-model.lazy.trim="form.assetCoveredArea"  :state="chkState('assetCoveredArea')"    />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label-class="require-input"  id="assetUsableAreaGroup"    label-for="assetUsableArea">
            <div slot="label"><span class="required-icon">*</span>使用面积㎡：</div>
            <b-form-input  id="assetUsableArea"  type="text"  v-model.lazy.trim="form.assetUsableArea" :state="chkState('assetUsableArea')"    />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label-class="require-input"  id="rentalAreaGroup"    label-for="rentalArea">
            <div slot="label"><span class="required-icon">*</span>计租面积㎡：</div>
            <b-form-input  id="rentalArea"  type="text"  v-model.lazy.trim="projectForm.rentalArea" :state="chkState('rentalArea')"     />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   label-cols-sm="5"  label-class="require-input"  id="plannedOpeningDateGroup"  label-for="plannedOpeningDate">
            <div slot="label"><span class="required-icon">*</span>开业日期：</div>
            <v-date-picker mode='single'  v-model='projectForm.plannedOpeningDate'   >
              <b-input-group slot-scope='props'>
                <b-form-input  type='text'  :value='props.inputValue'  :state="chkState('plannedOpeningDate')"  @change.native='props.updateValue($event.target.value)'></b-form-input>
                <b-input-group-append>
                  <b-input-group-text><i class="fa fa-calendar"></i></b-input-group-text>
                </b-input-group-append>
                <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
              </b-input-group>
            </v-date-picker>
          </b-form-group>

          <b-form-group  label-align="right"   label-cols-sm="5" label="竣工日期："  label-class="require-input"  id="completionDateGroup"   label-for="completionDate">
            <v-date-picker mode='single'  v-model='projectForm.completionDate'   >
              <b-input-group slot-scope='props'>
                <b-form-input  type='text'  :value='props.inputValue'    @change.native='props.updateValue($event.target.value)'></b-form-input>
                <b-input-group-append>
                  <b-input-group-text><i class="fa fa-calendar"></i></b-input-group-text>
                </b-input-group-append>
              </b-input-group>
            </v-date-picker>
          </b-form-group>

          <b-form-group  label-align="right"      label-cols-sm="5" label="币别：" label-class="require-input" id="currencyGroup"    label-for="currency">
            <b-form-select id="currency" v-model="projectForm.currency" :plain="true" :options="currencySelect">
            </b-form-select>
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="金额：" label-class="require-input"  id="moneysGroup"    label-for="moneys">
            <b-form-input  id="moneys"  type="text"  v-model.lazy.trim="projectForm.moneys"     />
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="配套面积㎡：" label-class="require-input"  id="matchingAreaGroup"    label-for="matchingArea">
            <b-form-input  id="matchingArea"  type="text"  v-model.lazy.trim="projectForm.matchingArea"     />
          </b-form-group>

          <b-form-group  label-align="right"      label-cols-sm="5" label="是否计租：" label-class="require-input" id="ifCalculationGroup"    label-for="ifCalculation">
            <b-form-select id="ifCalculation" v-model="projectForm.ifCalculation" :plain="true" :options="[{value:0,text:'否'},{value:1,text:'是'}]">

            </b-form-select>
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="期间规则：" label-class="require-input"  id="rulesInPeriodGroup"    label-for="rulesInPeriod">
            <b-form-select id="rulesInPeriod" v-model="projectForm.rulesInPeriod" :plain="true" :options="rulesInPeriodSelect">
            </b-form-select>
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="定价基准："  label-class="require-input"  id="priceBenchmarkGroup"    label-for="priceBenchmark">
            <b-form-select id="priceBenchmark" v-model="projectForm.priceBenchmark" :plain="true" :options="priceBenchmarkSelect">
            </b-form-select>
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="不整月计算公式："  label-class="require-input"  id="nfmothCalculationFormulaGroup"    label-for="nfmothCalculationFormula">
            <b-form-select id="nfmothCalculationFormula" v-model="projectForm.nfmothCalculationFormula" :plain="true" :options="nfmothCalculationFormulaSelect">
            </b-form-select>
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="小数位精度：" label-class="require-input"  id="decimalPrecisionGroup"    label-for="decimalPrecision">
            <b-form-input  id="decimalPrecision"  type="text"  v-model.lazy.trim="projectForm.decimalPrecision"     />
          </b-form-group>
        </template>
        <!--        项目表单-->

        <!--        单元表单-->
        <template v-if="form.assetType=='unit'">
          <b-form-group  label-align="right"        label-cols-sm="5" label-class="require-input" id="propertySerialGroup"    label-for="propertySerial">
            <div slot="label"><span class="required-icon">*</span>编码方式：</div>
            <b-form-select id="propertySerial" v-model="unitForm.propertySerial" :state="chkState('propertySerial')" :plain="true" :options="propertySerialSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"      label-cols-sm="5" label="点位编码：" label-class="require-input"  id="pointNoGroup"    label-for="pointNo">
            <b-form-input  id="pointNo"  type="text"  v-model.lazy.trim="unitForm.pointNo"     />
          </b-form-group>

          <b-form-group  label-align="right"        label-cols-sm="5" label-class="require-input" id="unitTypeGroup"    label-for="unitType">
            <div slot="label"><span class="required-icon">*</span>单元类型：</div>
            <el-cascader
              :show-all-levels="false"
              :state="chkState('unitType')"
              v-model="unitFormUnitType"
              :options="unitTypeTree"
              :props="{ expandTrigger: 'hover' }"
              ref="unitType"
              @change="assetTypeChange"></el-cascader>
  <!--          <b-form-select id="unitType" v-model="unitForm.unitType" :plain="true" :options="unitTypeTree">-->
  <!--          </b-form-select>-->
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"        label-cols-sm="5" label-class="require-input" id="propertyUseGroup"    label-for="propertyUse">
            <div slot="label"><span class="required-icon">*</span>资产用途：</div>
            <b-form-select id="propertyUse" v-model="unitForm.propertyUse" :state="chkState('propertyUse')" :plain="true" :options="propertyUseSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"        label-cols-sm="5" label-class="require-input" id="manageTeamUnitGroup"    label-for="manageTeam">
            <div slot="label"><span class="required-icon">*</span>管理团队：</div>
            <b-form-select id="manageTeam" v-model="unitForm.manageTeam" :state="chkState('manageTeam')" :plain="true" :options="manageTeamSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"        label-cols-sm="5" label-class="require-input" id="propertyNatureGroup"    label-for="propertyNature">
            <div slot="label"><span class="required-icon">*</span>资产性质：</div>
            <b-form-select id="propertyNature" v-model="unitForm.propertyNature" :state="chkState('propertyNature')" :plain="true" :options="propertyNatureSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"        label-cols-sm="5" label-class="require-input" id="calculateTypeGroup"    label-for="calculateType">
            <div slot="label"><span class="required-icon">*</span>计价方式：</div>
            <b-form-select id="calculateType" v-model="unitForm.calculateType" :state="chkState('calculateType')" @change="calculateTypeChange"  :plain="true" :options="calculateTypeSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"        label-cols-sm="5" label-class="require-input" id="managementCompanyGroup"    label-for="managementCompany">
            <div slot="label"><span class="required-icon">*</span>经营公司：</div>
            <b-form-select id="managementCompany" v-model="unitForm.managementCompany" :state="chkState('managementCompany')" :plain="true" :options="managementCompanySelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"        label-cols-sm="5"  label="计税方法" label-class="require-input" id="taxTypeGroup"    label-for="taxType">
            <b-form-select id="taxType" v-model="unitForm.taxType" :plain="true" :options="taxTypeSelect">
            </b-form-select>
          </b-form-group>

          <b-form-group  label-align="right"  v-if="this.isPropertyCompanyShow"      label-cols-sm="5" label-class="require-input" id="propertyCompanyGroup"    label-for="propertyCompany">
            <div slot="label"><span class="required-icon">*</span>物业公司：</div>
            <b-form-select id="propertyCompany" v-model="unitForm.propertyCompany" :state="chkState('propertyCompany')" :plain="true" :options="propertyCompanySelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"  v-if="this.isAssetCoveredAreaShow"      label-cols-sm="5" label-class="require-input"  id="assetCoveredAreaGroup"    label-for="assetCoveredArea">
            <div slot="label"><span class="required-icon">*</span>建筑面积㎡：</div>
            <b-form-input  id="assetCoveredArea"  type="text"  v-model.lazy.trim="form.assetCoveredArea"  :state="chkState('assetCoveredArea')"   />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"  v-if="this.isAssetUsableAreaShow"      label-cols-sm="5" label-class="require-input"  id="assetUsableAreaGroup"    label-for="assetUsableArea">
            <div slot="label"><span class="required-icon">*</span>使用面积㎡：</div>
            <b-form-input  id="assetUsableArea"  type="text"  v-model.lazy.trim="form.assetUsableArea"  :state="chkState('assetUsableArea')"   />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   v-if="this.isCalculateRentAreaShow"     label-cols-sm="5" label-class="require-input"  id="calculateRentAreaGroup"    label-for="calculateRentArea">
            <div slot="label"><span class="required-icon">*</span>计租面积㎡：</div>
            <b-form-input  id="calculateRentArea"  type="text"  v-model.lazy.trim="unitForm.calculateRentArea"  :state="chkState('calculateRentArea')"   />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   v-if="this.isRightPropertyShow"      label-cols-sm="5" label-class="require-input" id="rightPropertyGroup"    label-for="rightProperty">
            <div slot="label"><span class="required-icon">*</span>产权属性：</div>
            <b-form-select id="rightProperty" v-model="unitForm.rightProperty"  :state="chkState('rightProperty')" :plain="true" :options="rightPropertySelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"  v-if="this.isPropertyRightAreaShow"      label-cols-sm="5"  label="产权面积㎡" label-class="require-input"  id="propertyRightAreaGroup"    label-for="propertyRightArea">
            <b-form-input  id="propertyRightArea"  type="text"  v-model.lazy.trim="unitForm.propertyRightArea"     />
          </b-form-group>

          <b-form-group  label-align="right"  v-if="this.isPropertyAreaShow"     label-cols-sm="5"  label="去产权面积㎡" label-class="require-input"  id="propertyAreaGroup"    label-for="propertyArea">
            <b-form-input  id="propertyArea"  type="text"  v-model.lazy.trim="unitForm.propertyArea"     />
          </b-form-group>

          <b-form-group  label-align="right"   v-if="this.isIndustryRegisterShow"     label-cols-sm="5" label-class="require-input" id="industryRegisterGroup"    label-for="industryRegister">
            <div slot="label"><span class="required-icon">*</span>是否已工商备案：</div>
            <b-form-select id="industryRegister" v-model="unitForm.industryRegister" :state="chkState('industryRegister')" :plain="true" :options="[{value:0,text:'否'},{value:'1',text:'是'}]">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   v-if="this.isRightInfoShow"    label-cols-sm="5"  label="产权信息：" label-class="require-input"  id="rightInfoGroup"    label-for="rightInfo">
            <b-form-input  id="rightInfo"  type="text"  v-model.lazy.trim="unitForm.rightInfo"     />
          </b-form-group>

          <b-form-group  label-align="right"   v-if="this.isIsSupPowerShow"     label-cols-sm="5" label-class="require-input" id="isSupPowerGroup"    label-for="isSupPower">
            <div slot="label"><span class="required-icon">*</span>是否供电：</div>
            <b-form-select id="isSupPower" v-model="unitForm.isSupPower" :state="chkState('isSupPower')" :plain="true"  :options="[{value:0,text:'否'},{value:'1',text:'是'}]">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   v-if="this.isAverageUseElShow"    label-cols-sm="5" label="平均用电量：" label-class="require-input"  id="averageUseElGroup"    label-for="averageUseEl">
            <b-form-input  id="averageUseEl"  type="text"  v-model.lazy.trim="unitForm.averageUseEl"  :disabled="unitForm.isSupPower==0?true:false"   />
          </b-form-group>

          <b-form-group  label-align="right"       label-cols-sm="5" label="资产状态：" label-class="require-input"  id="assetStatusGroup"    label-for="assetStatus">
            <div slot="label"><span class="required-icon">*</span>资产状态：</div>
            <b-form-select id="assetStatus" v-model="unitForm.propertyStatus" :state="chkState('propertyStatus')"  :plain="true"  :options="assetStatusSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"       label-cols-sm="5" label="租用状态：" label-class="require-input"  id="assetPostalGroup"    label-for="assetPostal">
            <div slot="label"><span class="required-icon">*</span>租用状态：</div>
            <b-form-select id="assetPostal" v-model="unitForm.assetPostal" :state="chkState('assetPostal')"  :plain="true"  :options="assetPostalSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
        </template>
        <!--        单元表单-->

        <!--        建筑物表单-->
        <template v-if="form.assetType=='building'">
          <b-form-group  label-align="right"    label-cols-sm="5" label-class="require-input" id="projectTypeBuildingGroup"    label-for="projectType">
            <div slot="label"><span class="required-icon">*</span>项目类型：</div>
            <b-form-select id="projectType"  v-model="buildingForm.projectType" :state="chkState('projectType')"  :plain="true" :options="projectTypeSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="manageTeamBuildingGroup"    label-for="manageTeam">
            <div slot="label"><span class="required-icon">*</span>管理团队：</div>
            <b-form-select id="manageTeam" v-model="buildingForm.manageTeam" :state="chkState('manageTeam')" :plain="true" :options="manageTeamSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="managementCompanyBuildingGroup"    label-for="managementCompany">
            <div slot="label"><span class="required-icon">*</span>经营公司：</div>
            <b-form-select id="managementCompany" v-model="buildingForm.managementCompany" :state="chkState('managementCompany')" :plain="true" :options="managementCompanySelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"     label-cols-sm="5" label-class="require-input" id="propertyCompanyBuildingGroup"    label-for="propertyCompany">
            <div slot="label"><span class="required-icon">*</span>物业公司：</div>
            <b-form-select id="propertyCompany" v-model="buildingForm.propertyCompany" :state="chkState('propertyCompany')" :plain="true" :options="propertyCompanySelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"     label-cols-sm="5" label-class="require-input" id="buildingTypeBuildingGroup"    label-for="buildingType">
            <div slot="label"><span class="required-icon">*</span>建筑物类型：</div>
            <b-form-select id="buildingType" v-model="buildingForm.buildingType" :state="chkState('buildingType')" :plain="true" :options="buildingTypeSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"    label-cols-sm="5" label-class="require-input"  id="buildingAddressBuildingGroup"    label-for="buildingAddress">
            <div slot="label"><span class="required-icon">*</span>建筑物地址：</div>
            <b-form-input  id="buildingAddress"  type="text"  v-model.lazy.trim="buildingForm.buildingAddress" :state="chkState('buildingAddress')"    />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
        </template>
        <!--        建筑物表单-->

        <b-form-group v-show="this.modalType == 'edit'"  label-align="right"  label-cols-sm="5" label-class="require-input" id="assetParentGroup"    label-for="assetParent">
          <div slot="label"><span class="required-icon">*</span>上级资产：</div>
          <b-input-group class="input-group">
            <b-form-input  id="assetParent"  type="text"  v-model.lazy.trim="form.assetParentName" :state="chkState('assetParentName')"   readonly autofocus />
            <b-input-group-append v-show="false">
              <b-button variant="primary" @click="addAssetTree" ><i class="fa fa-search-plus"></i></b-button>
            </b-input-group-append>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-input-group>
        </b-form-group>

        <b-form-group class="form-group-lg" label-align="right"  label-cols-sm="5" id="remarkGroup"  label="备注："  label-for="remark">
          <b-form-textarea  id="remark"  type="text"  v-model.lazy.trim="form.remark"     />
        </b-form-group>

        <div slot="footer" class="form-footer">
          <b-button class="ml-1" type="submit" variant="primary" >保存</b-button>
          <b-button class="ml-1" type="reset" variant="primary" >关闭</b-button>
        </div>

      </b-form>

      <b-modal :id="addAssetModal.id" :title="addAssetModal.title" size="lg" @hide="resetAddAssetModal"  hide-footer hide-header-close >

        <b-row>
          <b-col lg="12"  >
            <z-el-tree @currentNode='getAssetTreeNode' ></z-el-tree>

            <div class="btn-box-right">
              <b-button class="ml-1" type="submit" variant="primary" @click="setAssetFun">确定</b-button>
              <b-button class="ml-1" type="reset" variant="primary" @click="resetAssetFun">关闭</b-button>
            </div>
          </b-col>
        </b-row>
      </b-modal>

      <b-modal :id="addRegionModal.id" :title="addRegionModal.title" size="lg" @hide="resetAddRegionModal"  hide-footer hide-header-close >

        <b-row>
          <b-col lg="12"  >
            <region-tree @currentNode='getRegionTreeNode' ></region-tree>
            <div class="btn-box-right">
              <b-button class="ml-1" type="submit" variant="primary" @click="setRegionFun">确定</b-button>
              <b-button class="ml-1" type="reset" variant="primary" @click="resetRegionFun">关闭</b-button>
            </div>
          </b-col>
        </b-row>
      </b-modal>

    </b-card>

  </div>
</template>



<script>
  import axios from 'axios'
  import { validationMixin } from "vuelidate"
  import { required } from "vuelidate/lib/validators"
  import cTable from "@/components/asset/z-table.vue";
  // import zElTree from '@/components/el-tree.vue'
  import zElTree from "@/components/asset/tree.vue";
  import regionTree from '@/components/asset/region-tree.vue'
  import {formatDate}from "@/shared/utils";

  /*日历插件引用文件--start*/
  import { setupCalendar, DatePicker } from 'v-calendar'
  import 'v-calendar/lib/v-calendar.min.css'
  // import AssetAPI from "../../../../api/baseMessageManage/asset";
  setupCalendar({})


  export default {
    name: "asset-add-update",
    components: {
      cTable,
      // cDatePicker,
      'v-date-picker': DatePicker, //日历组件，属性available-dates设置选择范围
      zElTree,
      regionTree
    },
    props:{
      modalId:{
        type: String,
        default: ''
      },
      modalType:{
        type: String,
        default: 'add'
      },
      targetObj:{
        type: [String, Object],
        default: () => []
      }
    },

    data() {
      return {
        addAssetModal: {
          id: 'addAsset-modal',
          title: '',
          content: ''
        },
        addRegionModal: {
          id: 'addRegion-modal',
          title: '',
          content: ''
        },
        form: {
          id:"",
          assetType: "",
          assetCode: "",
          assetSimpleName: "",
          assetOldCode: '',
          effectiveTime: null,
          invalidTime: null,
          assetParent: '',
          assetParentName: '',
          assetCoveredArea: "",
          assetUsableArea: "",
          remark: '',
          orderNo:"",
          unitBigType:"",
          assetProject: null,
          assetLand: null,
          assetBuilding: null,
          assetFloor: null,
          assetUnit: null
        },
        projectForm: {
          assetId: "",
          projectType: "",
          manageTeam: "",
          managementCompany: "",
          propertyCompany: "",
          region: "",
          regionName:"",
          projectAddress: "",
          rentalArea: "",
          plannedOpeningDate: null,
          completionDate: null,
          invalidTime: "",
          currency: "",
          moneys: "",
          matchingArea: "",
          ifCalculation: "",
          rulesInPeriod: "",
          priceBenchmark: "",
          nfmothCalculationFormula: "",
          decimalPrecision: ""
        },
        landForm: {
          assetId: ""
        },
        buildingForm: {
          assetId: "",
          projectType: "",
          manageTeam: "",
          managementCompany: "",
          propertyCompany: "",
          buildingType: "",
          buildingAddress: ""
        },
        floorForm: {
          assetId: ""
        },
        unitForm: {
          assetId: "",
          propertySerial: "",
          pointNo: "",
          unitBigType:"",
          unitType: "",
          propertyUse: "",
          manageTeam: "",
          propertyNature: "",
          calculateType: 4299,
          managementCompany: "",
          taxType: "",
          propertyCompany: "",
          calculateRentArea: "",
          rightProperty: "",
          propertyRightArea: "",
          propertyArea: "",
          industryRegister:"",
          rightInfo: "",
          isSupPower: "",
          averageUseEl: "",
          propertyStatus:"",
          assetPostal:""
        },
        feedBack: 'secondary',
        submitted: false,
        effectiveTime: null,
        invalidTime: null,
        plannedOpeningDate: null,
        completionDate: null,
        assetTypes: [],
        //项目下拉框
        projectTypeSelect: [],
        manageTeamSelect: [],
        managementCompanySelect: [],
        propertyCompanySelect: [],
        regionTree: [],
        currencySelect: [],
        rulesInPeriodSelect: [],
        priceBenchmarkSelect: [],
        nfmothCalculationFormulaSelect: [],
        //建筑物下拉框
        buildingTypeSelect: [],
        //单元下拉框
        propertySerialSelect: [],
        unitTypeTree: [],
        propertyUseSelect:[],
        propertyNatureSelect:[],
        calculateTypeSelect:[],
        taxTypeSelect:[],
        rightPropertySelect:[],
        assetStatusSelect:[],
        assetPostalSelect:[],
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
        isAverageUseElShow:false,
        unitFormUnitType:[],
      }

    },
    mixins: [validationMixin],
    validations() {
      // console.log(this.form.assetType)
      return {
        form: {
          assetType: {
            required
          },
          assetCode: {
            required
          },
          assetSimpleName: {
            required
          },
          effectiveTime: {
            required
          },
          invalidTime: {
            required
          },
          projectType: {
            required
          },
          manageTeam: {
            required
          },
          managementCompany: {
            required
          },
          propertyCompany: {
            required
          },
          regionName: {
            required
          },
          assetCoveredArea: {
            required
          },
          assetUsableArea: {
            required
          },
          rentalArea: {
            required
          },
          plannedOpeningDate: {
            required
          },
          propertySerial: {
            required
          },
          unitType: {
            required
          },
          propertyUse: {
            required
          },
          propertyNature: {
            required
          },
          calculateType: {
            required
          },
          calculateRentArea: {
            required
          },
          rightProperty: {
            required
          },
          industryRegister: {
            required
          },
          isSupPower: {
            required
          },
          propertyStatus: {
            required
          },
          assetPostal: {
            required
          },
          buildingType: {
            required
          },
          buildingAddress: {
            required
          },
          assetParentName: {
            required
          }
        }
      }
    },
    computed: {
      formStr() { return JSON.stringify(this.form, null, 4) },
      isValid() { return !this.$v.form.$anyError },
      isDirty() { return this.$v.form.$anyDirty }
    },
    watch:{
      effectiveTime() {
        this.form.effectiveTime = this.effectiveTime;
      },
      invalidTime() {
        this.form.invalidTime = this.invalidTime;
      },
      unitFormUnitType(){
        this.form.unitBigType=this.unitFormUnitType[0];
        // this.unitForm.unitType =''
        let res = this.$refs.unitType.getCheckedNodes(true);
        let sels = res.map((item)=>{
          return item.value
        })
        this.unitForm.unitType = sels[0];
      }
    },
    created(){
      if(this.modalType == 'edit'){
        this.getAssetInfo();
      }else {
        this.form.assetParent=this.targetObj.treeId
        this.getAssetTypeAdd();
      }
      //初始化下拉框数据
      this.getAddUpdateSelectData();
    },
    methods: {
      //新增时设置资产种类的默认值
      getAssetTypeAdd(){
        switch (this.targetObj.treeType) {
          case "hq":
            this.form.assetType="project";
            break;
          case "project":
            this.form.assetType="land";
            break;
          case "land":
            this.form.assetType="building";
            break;
          case "building":
            this.form.assetType="floor";
            break;
          case "floor":
            this.form.assetType="unit";
            break;
          default:
            this.form.assetType="unit";
        }
      },
      //获取资产树
      addAssetTree(){
        this.addAssetModal.title = `项目信息`
        this.$root.$emit('bv::show::modal', this.addAssetModal.id)
      },
      getAssetTreeNode(nodeData){
        this.form.assetParent=nodeData.id
        this.form.assetParentName = nodeData.assetSimpleName;
      },
      //清除资产树弹框
      resetAddAssetModal() {
        this.addAssetModal.title = ''
        this.addAssetModal.content = ''
      },
      //上级机构资产树弹出框确定和关闭功能
      setAssetFun(){
        this.$root.$emit('bv::hide::modal', this.addAssetModal.id)
      },
      resetAssetFun(){
        this.$root.$emit('bv::hide::modal', this.addAssetModal.id)
      },
      //获取地区树
      addRegionTree(){
        this.addRegionModal.title = `中国行政区域信息`
        this.$root.$emit('bv::show::modal', this.addRegionModal.id)
      },
      getRegionTreeNode(nodeData){
        // this.form.region=nodeData.districtCode;
        this.form.regionName=nodeData.districtName;
      },
      //清除地区树弹框
      resetAddRegionModal() {
        this.addRegionModal.title = ''
        this.addRegionModal.content = ''

      },
      //所在地区弹出框确定和关闭功能
      setRegionFun(){
        // this.form.assetParent = this.selClientRows.customerName
        this.$root.$emit('bv::hide::modal', this.addRegionModal.id)
      },
      resetRegionFun(){
        this.$root.$emit('bv::hide::modal', this.addRegionModal.id)
      },
      calculateTypeChange(){
        this.assetTypeChange();
      },
      //单元类型值改变时
      assetTypeChange(){
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
        // this.unitForm.unitBigType=this.unitFormUnitType[0];
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
      //获取资产信息
      getAssetInfo(){
        // AssetAPI.getAssetInfoById(this.targetObj)
        axios.get('/os_kernel_assetctr/app/asset/getAssetInfoById',{
          params:this.targetObj
        })
        .then(res=>{
          if (res.data.code === 0) {
            this.form=res.data.result;
            this.form.effectiveTime=new Date(this.form.effectiveTime)
            this.form.invalidTime=new Date(this.form.invalidTime)
            if(this.form.assetType!=undefined && this.form.assetType=="project"){
              this.projectForm=res.data.result.assetProject;
              this.projectForm.plannedOpeningDate=new Date(this.projectForm.plannedOpeningDate)
              this.projectForm.completionDate=new Date(this.projectForm.completionDate)
            }else if(this.form.assetType!=undefined && this.form.assetType=="unit"){
              this.unitForm=res.data.result.assetUnit;
              this.assetTypeChange( this.form.unitBigType);
            }else if(this.form.assetType!=undefined && this.form.assetType=="building"){
              this.buildingForm=res.data.result.assetBuilding;
            }
          } else {
            this.$emit('actionTips',"获取资产信息失败");
          }
        })
      },
      //获取新增修改页面下拉框数据
      getAddUpdateSelectData(){
        // AssetAPI.getAddOrUpdateDropDataAssetList()
        axios.post('/os_kernel_assetctr/app/asset/addOrUpdateDropDataAssetList')
        .then(res=>{
          if(res.data.code==0 && res.data.result!=null){
            //获取下拉框数据
            this.getProjectSelectData(res.data);
            this.getUnitSelectData(res.data);
            //获取建筑物类型
            const buildingTypeObject=res.data.result.buildingTypeSelect;
            this.buildingTypeSelect=this.getAddUpdateSelectDataFun(buildingTypeObject);
            this.unitTypeTree=res.data.result.assetUnitTree;
          }
        })
      },
      //获取项目表单下拉框数据
      getProjectSelectData(obj){
        const assetStatusObject=obj.result.projectTypeSelect;
        const manageTeamObject=obj.result.manageTeamSelect;
        const managementCompanyObject=obj.result.managementCompanySelect;
        const propertyCompanyObject=obj.result.propertyCompanySelect;
        const currencyObject=obj.result.currencySelect;
        const rulesInPeriodObject=obj.result.rulesInPeriodSelect;
        const priceBenchmarkObject=obj.result.priceBenchmarkSelect;
        const nfmothCalculationFormulaObject=obj.result.nfmothCalculationFormulaSelect;
        //获取项目类型、管理团队、经营公司、物业公司、币别、定价基准、期间规则、不计算整月公式
        this.projectTypeSelect=this.getAddUpdateSelectDataFun(assetStatusObject);
        this.manageTeamSelect=this.getAddUpdateSelectDataFun(manageTeamObject);
        this.managementCompanySelect=this.getAddUpdateSelectDataFun(managementCompanyObject);
        this.propertyCompanySelect=this.getAddUpdateSelectDataFun(propertyCompanyObject);
        this.currencySelect=this.getAddUpdateSelectDataFun(currencyObject);
        this.rulesInPeriodSelect=this.getAddUpdateSelectDataFun(rulesInPeriodObject);
        this.priceBenchmarkSelect=this.getAddUpdateSelectDataFun(priceBenchmarkObject);
        this.nfmothCalculationFormulaSelect=this.getAddUpdateSelectDataFun(nfmothCalculationFormulaObject);
      },
      //获取单元下拉数据
      getUnitSelectData(obj){
        const propertySerialObject=obj.result.propertySerialSelect;
        const propertyUseObject=obj.result.propertyUseSelect;
        const propertyNatureObject=obj.result.propertyNatureSelect;
        const calculateTypeObject=obj.result.calculateTypeSelect;
        const taxTypeObject=obj.result.taxTypeSelect;
        const rightPropertyObject=obj.result.rightPropertySelect;
        const assetStatusObject=obj.result.assetStatusSelect;
        const assetPostalObject=obj.result.assetPostalSelect;

        //获取编码方式、资产用途、资产性质、计价方式、计税方法、产权属性、租用状态、资产状态
        this.propertySerialSelect=this.getAddUpdateSelectDataFun(propertySerialObject);
        this.propertyUseSelect=this.getAddUpdateSelectDataFun(propertyUseObject);
        this.propertyNatureSelect=this.getAddUpdateSelectDataFun(propertyNatureObject);
        this.calculateTypeSelect=this.getAddUpdateSelectDataFun(calculateTypeObject);
        this.taxTypeSelect=this.getAddUpdateSelectDataFun(taxTypeObject);
        this.rightPropertySelect=this.getAddUpdateSelectDataFun(rightPropertyObject);
        this.assetStatusSelect=this.getAddUpdateSelectDataFun(assetStatusObject);
        this.assetPostalSelect=this.getAddUpdateSelectDataFunByCode(assetPostalObject);
      },
      //返回遍历数据，用于下拉框获取数据
      getAddUpdateSelectDataFun(object){
        if (object==undefined || object==null){
          return [];
        }
        let showData=object.map( item => {
          let itemObj ={
            value:item.id,
            text:item.itemName
          }
          return itemObj
        });
        return showData;
      },
      //返回遍历数据，用于下拉框获取数据
      getAddUpdateSelectDataFunByCode(object){
        if (object==undefined || object==null){
          return [];
        }
        let showData=object.map( item => {
          let itemObj ={
            value:item.itemCode,
            text:item.itemName
          }
          return itemObj
        });
        return showData;
      },
      //保存或者更新资产信息
      onSubmit() {
        console.log(this.validate());
        this.projectForm.region='test'
        // if (this.validate()) {
          this.form.effectiveTime = formatDate(new Date(this.form.effectiveTime), 'yyyy-MM-dd hh:mm:ss')
          this.form.invalidTime = formatDate(new Date(this.form.invalidTime), 'yyyy-MM-dd hh:mm:ss')
          if(this.projectForm.plannedOpeningDate!=''){
            this.projectForm.plannedOpeningDate = formatDate(new Date(this.projectForm.plannedOpeningDate), 'yyyy-MM-dd hh:mm:ss')
          }
          if(this.projectForm.completionDate!=''){
            this.projectForm.completionDate= formatDate(new Date(this.projectForm.completionDate), 'yyyy-MM-dd hh:mm:ss')
          }
          //根据资产类型保存对应的表单数据
          if(this.form.assetType!=undefined && this.form.assetType=="project"){
            this.form.assetProject=this.projectForm;
          }else if(this.form.assetType!=undefined && this.form.assetType=="land"){
            this.form.assetLand=this.landForm;
          }else if(this.form.assetType!=undefined && this.form.assetType=="building"){
            this.form.assetBuilding=this.buildingForm;
          }else if(this.form.assetType!=undefined && this.form.assetType=="floor"){
            this.form.assetFloor=this.floorForm;
          }else if(this.form.assetType!=undefined && this.form.assetType=="unit"){
            this.form.assetUnit=this.unitForm;
          }
          this.$nextTick(() => {
            let tips ='';
            let that = this;
            if(this.modalType == 'add'){
              // AssetAPI.saveAssetInfo(this.form)
              axios.post('/os_kernel_assetctr/app/asset/saveAssetInfo',this.form)
              .then(res => {
                if (res.data.code === 0) {
                  tips ="新增成功！"
                  that.$emit('refreshTable','add')
                } else {
                  tips ="新增失败！"
                }
                this.$emit('actionTips',tips);
                this.$root.$emit('bv::hide::modal', this.modalId)
              });
            }else if(this.modalType == 'edit'){

              // AssetAPI.updateAssetInfo(this.form)
              axios.post('/os_kernel_assetctr/app/asset/updateAssetInfo',this.form)
              .then(res => {
                if (res.data.code === 0) {
                  tips ="更新成功！"
                  that.$emit('refreshTable','edit')
                } else {
                  tips ="更新失败！"
                }
                console.log(res)
                this.$emit('actionTips',tips);
                this.$root.$emit('bv::hide::modal', this.modalId)
              });
            }
            this.submitted = true
            this.feedBack = 'info'

          })
        // }
      },
      onReset() {
        this.$root.$emit('bv::hide::modal', this.modalId)
      },
      chkState(val) {
        // const field = this.$v.form[val]
        // console.log(val);
        // console.log(!field.$dirty || !field.$invalid);
        // return !field.$dirty || !field.$invalid
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
        this.$nextTick(() => this.findFirstError())
        return this.isValid
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
