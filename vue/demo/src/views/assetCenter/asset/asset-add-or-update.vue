
<template>
  <div class="animated fadeIn col-lg-10-paddingleft0">
    <b-card>
      <b-form class="inline-form-col-6"  inline v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
        <b-form-group  label-align="right"  label-cols-sm="5" label-class="require-input" id="inputGroupAssetType"    label-for="assetType">
          <div slot="label"><span class="required-icon">*</span>资产种类：</div>
          <b-form-select id="assetType" v-model="form.assetType" :state="chkState('assetType','form')" :disabled="true" :plain="true" :options="[{value:'project',text:'项目', disabled: true },{value:'land',text:'地块', disabled: true },{value:'building',text:'建筑物', disabled: true },{value:'floor',text:'楼层', disabled: true },{value:'unit',text:'单元/点位'},{value:'unit_advert',text:'单元/点位'},{value:'unit_shop',text:'单元/点位'},{value:'unit_building',text:'单元/点位'},{value:'unit_booth',text:'单元/点位'},{value:'unit_parking',text:'单元/点位'},{value:'unit_virtual',text:'单元/点位'}]">
          </b-form-select>
          <!-- ,{value:'unit_advert',text:'广告点位'},{value:'unit_shop',text:'商铺'},{value:'unit_building',text:'写字楼'},{value:'unit_booth',text:'展位'},{value:'unit_parking',text:'停车场'},{value:'unit_virtual',text:'虚拟空间'} -->
          <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
        </b-form-group>

        <!-- <b-form-group  label-align="right" v-if="this.modalType == 'edit'" label-cols-sm="5"  label-class="require-input" id="inputGroupAssetCode"  label-for="assetCode">
          <div slot="label"><span class="required-icon">*</span>{{this.form.assetType.indexOf('unit') !=-1?'资产编码':'资产简码'}}：</div>
          <b-form-input  id="assetCode"  type="text"  v-model.lazy.trim="form.assetCode"  :disabled="true" :placeholder="form.assetCode ?form.assetCode:'系统自动生成'"  />
          <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
        </b-form-group> -->

        <!-- 新增时的资产编码 -->
        <b-form-group  label-align="right" v-if="this.modalType == 'add' && this.form.assetType.indexOf('floor') ==-1"   label-cols-sm="5"  label-class="require-input" id="inputGroupAssetCode"   label-for="assetCode">
          <div slot="label"><span class="required-icon">*</span>{{this.form.assetType.indexOf('unit') !=-1?'资产编码':'资产简码'}}：</div>
          <b-form-input  id="assetCode"  type="text"  v-model.lazy.trim="form.assetCode" :state="chkState('assetCode','form') "  :disabled="this.form.assetType.indexOf('unit') !=-1?true:false" :placeholder="this.form.assetType.indexOf('unit') !=-1 ?'系统自动生成':''" />
          <b-form-invalid-feedback tooltip ><div class="arrow"></div>
            <span v-if="!$v.form.assetCode.required">必填项</span>
            <span v-if="!$v.form.assetCode.charReg">只能输入字母</span>
            <span v-if="!$v.form.assetCode.charOrNum">只能输入字母数字</span>
            <span v-if="!$v.form.assetCode.maxLengthCode">{{this.assetSimpleCodeTip}}</span>
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- 资产中心新增资产简码 -->
        <b-form-group  label-align="right" v-if="(this.modalType == 'add' && this.form.assetType=='floor')" label-cols-sm="5"  label-class="require-input" id="projectTypeGroup"    label-for="assetCode">
            <div slot="label"><span class="required-icon">*</span>资产简码：</div>
            <b-form-select id="assetCode"  v-model="form.assetCode"  :plain="true" :options="projectAssetCodeSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.form.assetCode.required">必填项</span>
            </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group  label-align="right"  label-cols-sm="5" label-class="require-input"  id="inputGroupAssetSimpleName"    label-for="assetSimpleName">
          <div slot="label"><span class="required-icon">*</span>资产名称：</div>
          <b-form-input  id="assetSimpleName"  type="text"  v-model.lazy.trim="form.assetSimpleName"  :state="chkState('assetSimpleName','form')"  />
          <b-form-invalid-feedback tooltip ><div class="arrow"></div>
            <span v-if="!$v.form.assetSimpleName.required">必填项</span>
            <span v-if="!$v.form.assetSimpleName.maxLength">资产名称长度不能超过50</span>
              <!-- <span v-if="!$v.form.assetSimpleName.required">必填项</span>
              <span v-if="!$v.form.assetSimpleName.chineseOrcharOrnumOrSpecial">支持汉字、字母 、数字、特殊字符等</span>
              <span v-if="!$v.form.assetSimpleName.maxLength">请输入少于100个汉字、字母 、数字、特殊字符等</span> -->
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- 资产中心-- 新增层高输入 -->
        <b-form-group v-if="form.assetType=='floor'"  label-align="right"  label-cols-sm="5"  label-class="require-input" id="inputGroupAssetCode"   label-for="storeyHeight">
          <div slot="label"><span class="required-icon">*</span>层高：</div>
          <b-form-input  id="storeyHeight"  type="text"  v-model.lazy.trim="form.floorHeight" :state="chkState('floorHeight','form')"   />
          <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.form.floorHeight.required">必填项</span>
              <span v-if="!$v.form.floorHeight.maxLength">请输入少于100个汉字、字母 、数字、特殊字符等</span>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group  label-align="right"  label-cols-sm="5"  id="inputGroupAssetOldCode"  label="曾用编码："  label-for="assetOldCode">
          <b-form-input  id="assetOldCode"  type="text"  v-model.lazy.trim="form.assetOldCode"  :state="chkState('assetOldCode','form')"   />
          <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.form.assetOldCode.maxLength">曾用编码长度不能超过50</span>
              <!-- <span v-if="!$v.form.assetOldCode.chineseOrcharOrnumOrSpecial">支持汉字、字母 、数字、特殊字符等</span>
              <span v-if="!$v.form.assetOldCode.maxLength">请输入少于100个汉字、字母 、数字、特殊字符等</span> -->
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group  label-align="right" label-cols-sm="5"  label-class="require-input"  id="inputGroupEffectiveTime"  label-for="effectiveTime">
          <div slot="label"><span class="required-icon">*</span>生效日期：</div>
          <v-date-picker mode='single'  v-model='form.effectiveTime'   >
            <b-input-group slot-scope='props'>
              <b-form-input  type='text'  :value='props.inputValue'  :state="chkState('effectiveTime','form')"  @change.native='props.updateValue($event.target.value)'></b-form-input>
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
              <b-form-input  type='text'  :value='props.inputValue'  :state="chkState('invalidTime','form')"  @change.native='props.updateValue($event.target.value)'></b-form-input>
              <b-input-group-append>
                <b-input-group-text><i class="fa fa-calendar"></i></b-input-group-text>
              </b-input-group-append>
              <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
            </b-input-group>
          </v-date-picker>
        </b-form-group>

        <b-form-group  label-align="right"  v-if="false" label-cols-sm="5" label-class="require-input"  id="orderNoGroup"  label="排序号："    label-for="orderNo">
          <b-form-input  id="orderNo"  type="text"  v-model.lazy.trim="form.orderNo"     />
          <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
        </b-form-group>

        <!--        项目表单-->
        <template v-if="form.assetType=='project'">
          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="projectTypeGroup"    label-for="projectType">
            <div slot="label"><span class="required-icon">*</span>项目类型：</div>
            <b-form-select id="projectType" v-model="projectForm.projectType" :state="chkState('projectType','projectForm')" :plain="true" :options="projectTypeSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="manageTeamGroup"    label-for="manageTeam">
            <div slot="label"><span class="required-icon">*</span>管理团队：</div>
            <b-form-select id="manageTeam" v-model="projectForm.manageTeam" :state="chkState('manageTeam','projectForm')" :plain="true" :options="manageTeamSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="managementCompanyGroup"    label-for="managementCompany">
            <div slot="label"><span class="required-icon">*</span>经营公司：</div>
            <b-form-select id="managementCompany" v-model="projectForm.managementCompany" :state="chkState('managementCompany','projectForm')" :plain="true" :options="managementCompanySelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="propertyCompanyGroup"    label-for="propertyCompany">
            <div slot="label"><span class="required-icon">*</span>物业公司：</div>
            <b-form-select id="propertyCompany" v-model="projectForm.propertyCompany" :state="chkState('propertyCompany','projectForm')" :plain="true" :options="propertyCompanySelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right" label-cols-sm="5" label="项目地址：" label-class="require-input"  id="projectAddressGroup"    label-for="projectAddress">
            <b-form-input  id="projectAddress" type="text" v-model.lazy.trim="projectForm.projectAddress" :state="chkState('projectAddress','projectForm')"   />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.projectForm.projectAddress.maxLength">长度不能超过200</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right" label-cols-sm="5" label-class="require-input" id="regionGroup" label-for="region">
            <div slot="label"><span class="required-icon">*</span>所在地区：</div>
            <b-input-group class="input-group">
              <b-form-input  id="region"  type="text"  v-model.lazy.trim="projectForm.regionName" :state="chkState('regionName','projectForm')"    readonly autofocus />
              <b-input-group-append>
                <b-button variant="primary" @click="addRegionTree"><i class="fa fa-search-plus"></i></b-button>
              </b-input-group-append>
              <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <b-form-group  label-align="right" label-cols-sm="5" label-class="require-input"  id="assetCoveredAreaGroup"    label-for="assetCoveredArea">
            <div slot="label"><span class="required-icon">*</span>建筑面积㎡：</div>
            <b-form-input  id="assetCoveredArea"  type="text"  v-model.lazy.trim="form.assetCoveredArea"  :state="chkState('assetCoveredArea','form')"    />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.form.assetCoveredArea.required">必填项</span>
              <span v-if="!$v.form.assetCoveredArea.precision">只能为数字且小数位不能超过两位</span>
              <span v-if="!$v.form.assetCoveredArea.maxLength">长度不能超过20</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"  label-cols-sm="5" label-class="require-input"  id="assetUsableAreaGroup"    label-for="assetUsableArea">
            <div slot="label"><span class="required-icon">*</span>使用面积㎡：</div>
            <b-form-input  id="assetUsableArea"  type="text"  v-model.lazy.trim="form.assetUsableArea" :state="chkState('assetUsableArea','form')" />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.form.assetUsableArea.required">必填项</span>
              <span v-if="!$v.form.assetUsableArea.precision">只能为数字且小数位不能超过两位</span>
              <span v-if="!$v.form.assetUsableArea.maxLength">长度不能超过20</span>
              <span v-if="!$v.form.assetUsableArea.maxValue">需小于建筑面积</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label-class="require-input"  id="rentalAreaGroup"    label-for="rentalArea">
            <div slot="label"><span class="required-icon">*</span>计租面积㎡：</div>
            <b-form-input  id="rentalArea"  type="text"  v-model.lazy.trim="projectForm.rentalArea" :state="chkState('rentalArea','projectForm')"     />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.projectForm.rentalArea.required">必填项</span>
              <span v-if="!$v.projectForm.rentalArea.precision">只能为数字且小数位不能超过两位</span>
              <span v-if="!$v.projectForm.rentalArea.maxLength">长度不能超过20</span>
              <span v-if="!$v.projectForm.rentalArea.maxValue">需小于建筑面积</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   label-cols-sm="5"  label-class="require-input"  id="plannedOpeningDateGroup"  label-for="plannedOpeningDate">
            <div slot="label"><span class="required-icon">*</span>开业日期：</div>
            <v-date-picker mode='single'  v-model='projectForm.plannedOpeningDate'   >
              <b-input-group slot-scope='props'>
                <b-form-input  type='text'  :value='props.inputValue'  :state="chkState('plannedOpeningDate','projectForm')"  @change.native='props.updateValue($event.target.value)'></b-form-input>
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

          <b-form-group  label-align="right" label-cols-sm="5" label="金额：" label-class="require-input"  id="moneysGroup"    label-for="moneys">
            <b-form-input  id="moneys"  type="text"  v-model.lazy.trim="projectForm.moneys" :state="chkState('moneys','projectForm')"/>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.projectForm.moneys.precision">只能为数字且小数位不能超过两位</span>
              <span v-if="!$v.projectForm.moneys.maxLength">长度不能超过20</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label="配套面积㎡：" label-class="require-input"  id="matchingAreaGroup"    label-for="matchingArea">
            <b-form-input  id="matchingArea"  type="text"  v-model.lazy.trim="projectForm.matchingArea" :state="chkState('matchingArea','projectForm')" />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.projectForm.matchingArea.precision">只能为数字且小数位不能超过两位</span>
              <span v-if="!$v.projectForm.matchingArea.maxLength">长度不能超过20</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"      label-cols-sm="5" label="是否计租：" label-class="require-input" id="ifCalculationGroup"    label-for="ifCalculation">
            <b-form-select id="ifCalculation" v-model="projectForm.ifCalculation" :plain="true" :options="[{value:'0',text:'否'},{value:'1',text:'是'}]">

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
            <b-form-input  id="decimalPrecision"  type="text"  v-model.lazy.trim="projectForm.decimalPrecision" :state="chkState('decimalPrecision','projectForm')" />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.projectForm.decimalPrecision.integer">只能为正整数且长度不能超过2</span>
            </b-form-invalid-feedback>
          </b-form-group>
        </template>
        <!--        项目表单-->

        <!--        单元表单-->
        <template v-if="this.form.assetType.indexOf('unit') !=-1">
          <!-- <b-form-group  label-align="right"  v-if="isShowPublicField"   label-cols-sm="5" label-class="require-input" id="propertySerialGroup"    label-for="propertySerial">
            <div slot="label"><span class="required-icon">*</span>编码方式：</div>
            <b-form-select id="propertySerial" v-model="unitForm.propertySerial" :state="chkState('propertySerial','unitForm')" :plain="true" :options="propertySerialSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group> -->

          <!-- <b-form-group  label-align="right" v-if="isShowPublicField"   label-cols-sm="5" label="点位编码：" label-class="require-input"  id="pointNoGroup" label-for="pointNo">
            <b-form-input  id="pointNo"  type="text"  v-model.lazy.trim="unitForm.pointNo" />
          </b-form-group> -->

          <b-form-group   label-align="right" label-cols-sm="5" label-class="require-input" id="unitTypeGroup" label-for="unitType">
            <div slot="label"><span class="required-icon">*</span>资产类型：</div>
            <b-tooltip customClass="data-invalid-tooltip" target="unitType" placement='topright' triggers='manual' variant="danger" :show="isUnitTypeError">必填项</b-tooltip>
            <span id='unitType' class="data-invalid-postion" ></span>
            <el-cascader
              :show-all-levels="false"
              v-model="unitFormUnitType"
              :options="unitTypeTree"
              :props="{ expandTrigger: 'hover' }"
              ref="unitType11"
              @change="assetTypeChange"></el-cascader>
               <!-- @change="assetTypeChange" -->
            <b-form-invalid-feedback tooltip :style="isUnitTypeError?'display:block':'display:none'" ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group v-if="shopBuildControl"  label-align="right"  label-cols-sm="5" label-class="require-input" id="propertyUseGroup" label-for="propertyUse">
            <div slot="label"><span class="required-icon">*</span>资产用途：</div>
            <b-form-select id="propertyUse" v-model="unitForm.propertyUse" :state="chkState('propertyUse','unitForm')" :plain="true" :options="propertyUseSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right" v-if="isShowPublicField" label-cols-sm="5" label-class="require-input" id="manageTeamUnitGroup"    label-for="manageTeam">
            <div slot="label"><span class="required-icon">*</span>管理团队：</div>
            <b-form-select id="manageTeam" v-model="unitForm.manageTeam" :state="chkState('manageTeam','unitForm')" :plain="true" :options="manageTeamSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group v-if="shopBuildControl"  label-align="right"  label-cols-sm="5" label-class="require-input" id="propertyNatureGroup"    label-for="propertyNature">
            <div slot="label"><span class="required-icon">*</span>资产性质：</div>
            <b-form-select id="propertyNature" v-model="unitForm.propertyNature" :state="chkState('propertyNature','unitForm')" :plain="true" :options="propertyNatureSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group v-if="shopBuildControl"   label-align="right" label-cols-sm="5" label-class="require-input" id="calculateTypeGroup"    label-for="calculateType">
            <div slot="label"><span class="required-icon">*</span>计价方式：</div>
            <b-form-select id="calculateType" v-model="unitForm.calculateType" :state="chkState('calculateType','unitForm')" @change="calculateTypeChange"  :plain="true" :options="calculateTypeSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right" v-if="isShowPublicField" label-cols-sm="5" label-class="require-input" id="managementCompanyGroup"  label-for="managementCompany">
            <div slot="label"><span class="required-icon">*</span>经营公司：</div>
            <b-form-select id="managementCompany" v-model="unitForm.managementCompany" :state="chkState('managementCompany','unitForm')" :plain="true" :options="managementCompanySelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   v-if="isShowPublicField"      label-cols-sm="5"  label="计税方法" label-class="require-input" id="taxTypeGroup"    label-for="taxType">
            <b-form-select id="taxType" v-model="unitForm.taxType" :plain="true" :options="taxTypeSelect">
            </b-form-select>
          </b-form-group>

          <b-form-group  label-align="right"  v-if="this.isPropertyCompanyShow"      label-cols-sm="5" label-class="require-input" id="propertyCompanyGroup"    label-for="propertyCompany">
            <div slot="label"><span class="required-icon">*</span>物业公司：</div>
            <b-form-select id="propertyCompany" v-model="unitForm.propertyCompany" :state="chkState('propertyCompany','unitForm')" :plain="true" :options="propertyCompanySelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"  v-if="this.isAssetCoveredAreaShow"      label-cols-sm="5" label-class="require-input"  id="assetCoveredAreaGroup"    label-for="assetCoveredArea">
            <div slot="label"><span class="required-icon">*</span>建筑面积㎡：</div>
            <b-form-input  id="assetCoveredArea"  type="text"  v-model.lazy.trim="form.assetCoveredArea"  :state="chkState('assetCoveredArea','form')"   />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.form.assetCoveredArea.required">必填项</span>
              <span v-if="!$v.form.assetCoveredArea.precision">只能为数字且小数位不能超过两位</span>
              <span v-if="!$v.form.assetCoveredArea.maxLength">长度不能超过20</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"  v-if="this.isAssetUsableAreaShow"      label-cols-sm="5" label-class="require-input"  id="assetUsableAreaGroup"    label-for="assetUsableArea">
            <div slot="label"><span class="required-icon">*</span>使用面积㎡：</div>
            <b-form-input  id="assetUsableArea"  type="text"  v-model.lazy.trim="form.assetUsableArea"  :state="chkState('assetUsableArea','form')"   />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.form.assetUsableArea.required">必填项</span>
              <span v-if="!$v.form.assetUsableArea.precision">只能为数字且小数位不能超过两位</span>
              <span v-if="!$v.form.assetUsableArea.maxLength">长度不能超过20</span>
              <span v-if="!$v.form.assetUsableArea.maxValue">需小于建筑面积</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   v-if="this.isCalculateRentAreaShow"     label-cols-sm="5" label-class="require-input"  id="calculateRentAreaGroup"    label-for="calculateRentArea">
            <div slot="label"><span class="required-icon">*</span>计租面积㎡：</div>
            <b-form-input  id="calculateRentArea"  type="text"  v-model.lazy.trim="unitForm.calculateRentArea"  :state="chkState('calculateRentArea','unitForm')"   />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.unitForm.calculateRentArea.required">必填项</span>
              <span v-if="!$v.unitForm.calculateRentArea.precision">只能为数字且小数位不能超过两位</span>
              <span v-if="!$v.unitForm.calculateRentArea.maxLength">长度不能超过20</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   v-if="this.isRightPropertyShow"      label-cols-sm="5" label-class="require-input" id="rightPropertyGroup"    label-for="rightProperty">
            <div slot="label"><span class="required-icon">*</span>产权属性：</div>
            <b-form-select id="rightProperty" v-model="unitForm.rightProperty"  :state="chkState('rightProperty','unitForm')" :plain="true" :options="rightPropertySelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"  v-if="this.isPropertyRightAreaShow"      label-cols-sm="5"  label="产权面积㎡" label-class="require-input"  id="propertyRightAreaGroup"    label-for="propertyRightArea">
            <b-form-input  id="propertyRightArea"  type="text"  v-model.lazy.trim="unitForm.propertyRightArea" :state="chkState('propertyRightArea','unitForm')"     />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.unitForm.propertyRightArea.precision">只能为数字且小数位不能超过两位</span>
              <span v-if="!$v.unitForm.propertyRightArea.maxLength">长度不能超过20</span>
              <span v-if="!$v.unitForm.propertyRightArea.maxValue">需小于建筑面积</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"  v-if="this.isPropertyAreaShow"     label-cols-sm="5"  label="去产权面积㎡" label-class="require-input"  id="propertyAreaGroup"    label-for="propertyArea">
            <b-form-input  id="propertyArea"  type="text"  v-model.lazy.trim="unitForm.propertyArea"  :state="chkState('propertyArea','unitForm')"   />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.unitForm.propertyArea.precision">只能为数字且小数位不能超过两位</span>
              <span v-if="!$v.unitForm.propertyArea.maxLength">长度不能超过20</span>
              <span v-if="!$v.unitForm.propertyArea.maxValue">需小于建筑面积</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   v-if="this.isIndustryRegisterShow"     label-cols-sm="5" label-class="require-input" id="industryRegisterGroup"    label-for="industryRegister">
            <div slot="label"><span class="required-icon">*</span>是否已工商备案：</div>
            <b-form-select id="industryRegister" v-model="unitForm.industryRegister" :state="chkState('industryRegister','unitForm')" :plain="true" :options="[{value:'0',text:'否'},{value:'1',text:'是'}]">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   v-if="this.isRightInfoShow"    label-cols-sm="5"  label="产权信息：" label-class="require-input"  id="rightInfoGroup"    label-for="rightInfo">
            <b-form-input  id="rightInfo"  type="text"  v-model.lazy.trim="unitForm.rightInfo" :state="chkState('rightInfo','unitForm')"     />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.unitForm.rightInfo.maxLength">长度不能超过50</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   v-if="this.isIsSupPowerShow"     label-cols-sm="5" label-class="require-input" id="isSupPowerGroup" label-for="isSupPower">
            <div slot="label"><span class="required-icon">*</span>是否供电：</div>
            <b-form-select id="isSupPower" v-model="unitForm.isSupPower" :state="chkState('isSupPower','unitForm')" :plain="true"  :options="[{value:'0',text:'否'},{value:'1',text:'是'}]">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   v-if="this.isAverageUseElShow"    label-cols-sm="5" label="平均用电量：" label-class="require-input"  id="averageUseElGroup"    label-for="averageUseEl">
            <b-form-input  id="averageUseEl"  type="text"  v-model.lazy.trim="unitForm.averageUseEl" :state="chkState('averageUseEl','unitForm')"   :disabled="unitForm.isSupPower==0?true:false"   />
             <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.unitForm.averageUseEl.precision">只能为数字且小数位不能超过两位</span>
              <span v-if="!$v.unitForm.averageUseEl.maxLength">长度不能超过20</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- <<单元类型（选中固定单位时展示） -->
          <template v-if="isFixedUnit">
            <!-- <b-form-group  label-align="right"   label-cols-sm="5" label-class="require-input"  id="storeyHeightGroup"    label-for="storeyHeight">
              <div slot="label"><span class="required-icon">*</span>铺位层高：</div>
              <b-form-input  id="storeyHeight"  type="text"  v-model.lazy.trim="unitForm.storeyHeight"  :state="chkState('storeyHeight','unitForm')"   />
              <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
            </b-form-group> -->

            <b-form-group  label-align="right"   label-cols-sm="5" label-class="require-input"  id="facadeWidthGroup"    label-for="facadeWidth">
              <div slot="label"><span class="required-icon">*</span>门面宽度：</div>
              <b-form-input  id="facadeWidth"  type="text"  v-model.lazy.trim="unitForm.facadeWidth"  :state="chkState('facadeWidth','unitForm')"   />
              <b-form-invalid-feedback tooltip ><div class="arrow"></div>
                <span v-if="!$v.unitForm.facadeWidth.required">必填项</span>
                <span v-if="!$v.unitForm.facadeWidth.precision">只能为数字且小数位不能超过两位</span>
                <span v-if="!$v.unitForm.facadeWidth.maxLength">长度不能超过20</span>
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group  label-align="right"   label-cols-sm="5" label-class="require-input"  id="availableCapacityGroup"    label-for="availableCapacity">
              <div slot="label"><span class="required-icon">*</span>可用电容量：</div>
              <b-form-input  id="availableCapacity"  type="text"  v-model.lazy.trim="unitForm.availableCapacity"  :state="chkState('availableCapacity','unitForm')"   />
              <b-form-invalid-feedback tooltip ><div class="arrow"></div>
                <span v-if="!$v.unitForm.availableCapacity.required">必填项</span>
                <span v-if="!$v.unitForm.availableCapacity.precision">只能为数字且小数位不能超过两位</span>
                <span v-if="!$v.unitForm.availableCapacity.maxLength">长度不能超过20</span>
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group  label-align="right"   label-cols-sm="5" label-class="require-input"  id="floorBearingGroup"    label-for="floorBearing">
              <div slot="label"><span class="required-icon">*</span>楼板承重：</div>
              <b-form-input  id="floorBearing"  type="text"  v-model.lazy.trim="unitForm.floorBearing"  :state="chkState('floorBearing','unitForm')"   />
              <b-form-invalid-feedback tooltip ><div class="arrow"></div>
                <span v-if="!$v.unitForm.floorBearing.required">必填项</span>
                <span v-if="!$v.unitForm.floorBearing.precision">只能为数字且小数位不能超过两位</span>
                <span v-if="!$v.unitForm.floorBearing.maxLength">长度不能超过20</span>
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group  label-align="right"  label-cols-sm="5" label-class="require-input" id="centralAirConditioningGroup"    label-for="centralAirConditioning">
              <div slot="label"><span class="required-icon">*</span>是否中央空调：</div>
              <b-form-select id="centralAirConditioning" v-model="unitForm.centralAirConditioning" :state="chkState('centralAirConditioning','unitForm')" :plain="true" :options="centralAirConditioningSelect">
              </b-form-select>
              <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
            </b-form-group>
          </template>
          <!-- 单元类型（选中固定单位时展示）>> -->

          <!-- <<展位位置 -->
          <template v-if="isBoothShow">
           <b-form-group  label-align="right" label-cols-sm="5" label-class="require-input"  id="boothAreaGroup"  label-for="boothArea">
              <div slot="label"><span class="required-icon">*</span>展位面积㎡：</div>
              <b-form-input  id="boothArea"  type="text"  v-model.lazy.trim="unitBooth.boothArea"  :state="chkState('boothArea','unitBooth')"   />
              <b-form-invalid-feedback tooltip ><div class="arrow"></div>

                <span v-if="!$v.unitBooth.boothArea.required">必填项</span>
                <span v-if="!$v.unitBooth.boothArea.between">只能为1-99999999.9的数字 </span>
                <span v-if="!$v.unitBooth.boothArea.precision">小数位不能超过一位</span>

                <!-- <span v-if="!$v.unitBooth.boothArea.precision ">只能为数字且小数位不能超过一位</span>
                <span v-if="!$v.unitBooth.boothArea.maxLength">长度不能超过10</span> -->
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group  label-align="right" label-cols-sm="5" label-class="require-input"  id="boothAreaSpecsGroup"  label-for="boothAreaSpecs">
              <div slot="label"><span class="required-icon">*</span>展位面积规格</div>
              <b-form-input  id="boothAreaSpecs"  type="text"  v-model.lazy.trim="unitBooth.boothAreaSpecs"  :state="chkState('boothAreaSpecs','unitBooth')"   />
              <b-form-invalid-feedback tooltip ><div class="arrow"></div>
                <span v-if="!$v.unitBooth.boothAreaSpecs.required">必填项</span>
                <span v-if="!$v.unitBooth.boothAreaSpecs.maxLength">长度不能超过50个字符</span>
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group  label-align="right" label-cols-sm="5" label-class="require-input" id="boothPositionGroup"    label-for="boothPosition">
              <div slot="label"><span class="required-icon">*</span>展位位置：</div>
              <b-form-select id="boothPosition" v-model="unitBooth.boothPosition"  :state="chkState('boothPosition','unitBooth')" :plain="true" :options="[{value:60,text:'室内'},{value:61,text:'室外'}]">
              </b-form-select>
              <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group  label-align="right" label-cols-sm="5" label-class="require-input"  id="boothAddressGroup"    label-for="boothAddress">
              <div slot="label"><span class="required-icon">*</span>展位具体位置</div>
              <b-form-input  id="boothAddress"  type="text"  v-model.lazy.trim="unitBooth.boothAddress"  :state="chkState('boothAddress','unitBooth')"   />
              <b-form-invalid-feedback tooltip ><div class="arrow"></div>
                <span v-if="!$v.unitBooth.boothAddress.required">必填项</span>
                <span v-if="!$v.unitBooth.boothAddress.maxLength">长度不能超过50个字符</span>
              </b-form-invalid-feedback>
            </b-form-group>

          </template>
           <!-- 展位位置 >>-->

          <b-form-group  label-align="right"  v-if="isShowPublicField"  label-cols-sm="5" label="资产状态：" label-class="require-input"  id="assetStatusGroup"    label-for="assetStatus">
            <div slot="label"><span class="required-icon">*</span>资产状态：</div>
            <b-form-select id="assetStatus" v-model="unitForm.propertyStatus" :state="chkState('propertyStatus','unitForm')"  :plain="true"  :options="assetStatusSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <!-- <b-form-group  label-align="right" v-if="isShowPublicField"  label-cols-sm="5" label="租用状态：" label-class="require-input"  id="assetPostalGroup"  label-for="assetPostal">
            <div slot="label"><span class="required-icon">*</span>租用状态：</div>
            <b-form-select id="assetPostal" v-model="unitForm.assetPostal" :state="chkState('assetPostal','unitForm')"  :plain="true"  :options="assetPostalSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group> -->
        </template>
        <!--        单元表单-->

        <!--        建筑物表单-->
        <template v-if="form.assetType=='building'">
          <b-form-group  label-align="right" label-cols-sm="5" label-class="require-input" id="projectTypeBuildingGroup"    label-for="projectType">
            <div slot="label"><span class="required-icon">*</span>项目类型：</div>
            <b-form-select id="projectType"  v-model="buildingForm.projectType" :state="chkState('projectType','buildingForm')"  :plain="true" :options="projectTypeSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="manageTeamBuildingGroup"    label-for="manageTeam">
            <div slot="label"><span class="required-icon">*</span>管理团队：</div>
            <b-form-select id="manageTeam" v-model="buildingForm.manageTeam" :state="chkState('manageTeam','buildingForm')" :plain="true" :options="manageTeamSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right" label-cols-sm="5" label-class="require-input" id="managementCompanyBuildingGroup"    label-for="managementCompany">
            <div slot="label"><span class="required-icon">*</span>经营公司：</div>
            <b-form-select id="managementCompany" v-model="buildingForm.managementCompany" :state="chkState('managementCompany','buildingForm')" :plain="true" :options="managementCompanySelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"     label-cols-sm="5" label-class="require-input" id="propertyCompanyBuildingGroup"    label-for="propertyCompany">
            <div slot="label"><span class="required-icon">*</span>物业公司：</div>
            <b-form-select id="propertyCompany" v-model="buildingForm.propertyCompany" :state="chkState('propertyCompany','buildingForm')" :plain="true" :options="propertyCompanySelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"     label-cols-sm="5" label-class="require-input" id="buildingTypeBuildingGroup"    label-for="buildingType">
            <div slot="label"><span class="required-icon">*</span>建筑物类型：</div>
            <b-form-select id="buildingType" v-model="buildingForm.buildingType" :state="chkState('buildingType','buildingForm')" :plain="true" :options="buildingTypeSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group  label-align="right"    label-cols-sm="5" label-class="require-input"  id="buildingAddressBuildingGroup"    label-for="buildingAddress">
            <div slot="label"><span class="required-icon">*</span>建筑物地址：</div>
            <b-form-input  id="buildingAddress"  type="text"  v-model.lazy.trim="buildingForm.buildingAddress" :state="chkState('buildingAddress','buildingForm')" />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.buildingForm.buildingAddress.required">必填项</span>
              <span v-if="!$v.buildingForm.buildingAddress.maxLength">长度不能超过200</span>
            </b-form-invalid-feedback>
          </b-form-group>

            <!-- 资产中心 -开门关门时间 -->
           <b-form-group  label-align="right"   label-cols-sm="5"  label-class="require-input"  id="openDoorGroup"  label-for="openDoor">
            <div slot="label"><span class="required-icon">*</span>开门时间：</div>
             <b-tooltip customClass="data-invalid-tooltip" target="openDoor" placement='topright' triggers='manual' variant="danger">必填项</b-tooltip>
              <span id='openDoor' class="data-invalid-postion" ></span>
            <template >
              <el-time-picker
              @blur="checkRules(buildingForm.openDoor,'open')"
                style="display:inline"
                v-model='buildingForm.openDoor'
                placeholder="任意时间点">
              </el-time-picker>
               <b-form-invalid-feedback tooltip :style="openDoorError?'display:block':'display:none'" ><div class="arrow"></div>必填项</b-form-invalid-feedback>
            </template>
          </b-form-group>

          <b-form-group  label-align="right"   label-cols-sm="5"  label-class="require-input"  id="closeDoorGroup"  label-for="closeDoor">
            <div slot="label"><span class="required-icon">*</span>关门时间：</div>
            <b-tooltip customClass="data-invalid-tooltip" target="openDoor" placement='topright' triggers='manual' variant="danger">必填项</b-tooltip>
            <span id='openDoor' class="data-invalid-postion" ></span>
            <template >
              <el-time-picker
                style="display:inline;"
                v-model='buildingForm.closeDoor'
                @blur="checkRules(buildingForm.closeDoor,'close')"
                placeholder="任意时间点">
              </el-time-picker>
              <b-form-invalid-feedback tooltip :style="closeDoorError?'display:block':'display:none'" ><div class="arrow"></div>必填项</b-form-invalid-feedback>
            </template>
          </b-form-group>
        </template>
        <!--        建筑物表单-->

        <!-- <<单元类型（广告点位） -->
        <template v-if="AdvertisingSpot">
          <b-form-group  label-align="right"  label-cols-sm="5" label-class="require-input" id="pointPosition"    label-for="pointPosition">
            <div slot="label"><span class="required-icon">*</span>点位位置：</div>
            <b-form-select id="pointPosition" v-model="assetUnitAdvert.pointPosition" :state="chkState('pointPosition','assetUnitAdvert')" :plain="true" :options="[{value:'60',text:'户内'},{value:'61',text:'户外'}]" >
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.assetUnitAdvert.pointPosition.required">必填项</span>
              <!-- <span v-if="!$v.assetUnitAdvert.pointPosition.charOrNum">请输入少于200个字母 、数字组合</span> -->
            </b-form-invalid-feedback>
          </b-form-group>

           <b-form-group  label-align="right"   label-cols-sm="5" label-class="require-input"  id="pointshapeGroup"    label-for="pointShape">
            <div slot="label"><span class="required-icon"></span>点位形状：</div>
            <b-form-input  id="pointShape"  type="text"  v-model.lazy.trim="assetUnitAdvert.pointShape" :state="chkState('pointShape','assetUnitAdvert')"  />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span  v-if="!$v.assetUnitAdvert.pointShape.maxLength ">长度不能超过50个有效字符</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   label-cols-sm="5" label-class="require-input"  id="detailLocationGroup"    label-for="detailLocation">
            <div slot="label"><span class="required-icon">*</span>具体位置：</div>
            <b-form-input  id="detailLocation"  type="text"  v-model.lazy.trim="assetUnitAdvert.detailLocation"  :state="chkState('detailLocation','assetUnitAdvert')"  />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.assetUnitAdvert.detailLocation.required">必填项</span>
              <!-- <span v-if="!$v.assetUnitAdvert.detailLocation.charOrNum ">仅支持字母 、数字组合</span>
              <span v-if="!$v.assetUnitAdvert.detailLocation.maxLength ">长度小于200字母 、数字组合的字符</span> -->
            </b-form-invalid-feedback>
          </b-form-group>

           <b-form-group  label-align="right"   label-cols-sm="5" label-class="require-input"  id="detailLocationAbbGroup"    label-for="detailLocationAbb">
            <div slot="label"><span class="required-icon">*</span>具体位置缩写：</div>
            <b-form-input  id="detailLocationAbb"  type="text"  v-model.lazy.trim="assetUnitAdvert.detailLocationAbb"  :state="chkState('detailLocationAbb','assetUnitAdvert')"   />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.assetUnitAdvert.detailLocationAbb.required">必填项</span>
              <span v-if="!$v.assetUnitAdvert.detailLocationAbb.chineseOrcharOrnum ">请输入中文,英文字母或数字</span>
              <span v-if="!$v.assetUnitAdvert.detailLocationAbb.maxLength ">长度不能超过50个有效字符</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"  label-cols-sm="5" label-class="require-input" id="resourceCftGroup"    label-for="resourceClassifresourceCftication">
            <div slot="label"><span class="required-icon">*</span>资源分级：</div>
            <b-form-select id="resourceCft"  v-model="assetUnitAdvert.resourceCft" :state="chkState('resourceCft','assetUnitAdvert')" :plain="true" >
              <option
                  v-for="opt in resourceCftList"
                  :value="opt"
                  :key="opt">
                {{opt}}
              </option>
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <!-- <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="resourceIdGroup"    label-for="resourceId">
            <div slot="label"><span class="required-icon">*</span>资源类型：</div>
            <b-form-select id="resourceId"  v-model="unitForm.resourceId" :state="chkState('resourceId','unitForm')" :plain="true" >
              <option
                  v-for="opt in resourcTypeList"
                  :value="opt"
                  :key="opt"
                >
                {{opt}}
              </option>
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group> -->
          <b-form-group  label-align="right"  label-cols-sm="5" label-class="require-input" id="resourceIdGroup" label-for="uintResourceId">
            <div slot="label"><span class="required-icon">*</span>资源类型：</div>
            <b-tooltip customClass="data-invalid-tooltip" target="resourceId" placement='topright' triggers='manual' variant="danger" :show="isUintResourceIdError">必填项</b-tooltip>
            <span id='uintResourceId' class="data-invalid-postion" ></span>
            <el-cascader
              :show-all-levels="false"
              v-model="uintResourceId"
              :options="resourcTypeList"
              :props="{ expandTrigger: 'hover' }"
              ref="uintResourceId"
              @change="resourceChange"
              ></el-cascader>
            <b-form-invalid-feedback tooltip :style="isUintResourceIdError?'display:block':'display:none'"><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right" style="width:100%" label-class="require-input"  id="resourceAppIdListGroup"    label-for="resourceAppIdList">
            <b-row style="width:100%">
              <b-col sm="2" lg="2">
                <div slot="label" style="width: 133px;text-align: right;" label-cols-sm="2"><span class="required-icon"></span>资源应用对象：</div>
              </b-col >
              <b-col sm="10" lg="10">
                <b-form-checkbox-group
                  class="checkboxClass"
                  v-model="assetUnitAdvert.resourceAppIdList"
                  :options="resourceAppIds"
                  name="flavour-1a"
                ></b-form-checkbox-group>
              </b-col>
            </b-row>
          </b-form-group>

          <b-form-group  label-align="right"   label-cols-sm="5" label-class="require-input" id="pointSizeGroup" label-for="pointSize">
            <div slot="label"><span class="required-icon"></span>点位尺寸：</div>
            <b-form-input  id="pointSize"  type="text"  @change="pointSizeBlur($event)" v-model.lazy.trim="assetUnitAdvert.pointSize"  :state="chkState('pointSize','assetUnitAdvert')"   />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <!-- <span v-if="!$v.assetUnitAdvert.pointSize.required">必填项</span> -->
              <span v-if="!$v.assetUnitAdvert.pointSize.maxLength ">长度不能超过50个有效字符</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   label-cols-sm="5" label-class="require-input"  id="bleedSizeGroup"    label-for="bleedSize">
            <div slot="label"><span class="required-icon"></span>出血尺寸：</div>
            <b-form-input  id="bleedSize"  type="text"  v-model.lazy.trim="assetUnitAdvert.bleedSize"  :state="chkState('bleedSize','assetUnitAdvert')"   />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <!-- <span v-if="!$v.assetUnitAdvert.bleedSize.required">必填项</span> -->
              <!-- <span v-if="!$v.assetUnitAdvert.bleedSize.charOrNum ">仅支持字母 、数字组合</span> -->
              <span v-if="!$v.assetUnitAdvert.bleedSize.maxLength ">长度不能超过50个有效字符</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   label-cols-sm="5" label-class="require-input"  id="minLaunchCycleGroup"    label-for="minLaunchCycle">
            <div slot="label"><span class="required-icon">*</span>最小投放周期：</div>
            <b-form-input  id="minLaunchCycle"  type="number" @change="updateNum($event)" v-model.lazy.trim="assetUnitAdvert.minLaunchCycle"  :state="chkState('minLaunchCycle','assetUnitAdvert')"   />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.assetUnitAdvert.minLaunchCycle.required">必填项</span>
              <span v-if="!$v.assetUnitAdvert.minLaunchCycle.between">请填入1-999范围内的数字</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="minLaunchCycleUnitGroup"    label-for="minLaunchCycleUnit">
            <div slot="label"><span class="required-icon">*</span>最小投放周期单位：</div>
            <b-form-select id="minLaunchCycleUnit" :disabled="assetUnitAdvert.minLaunchCycleUnit ? true:false"  v-model="assetUnitAdvert.minLaunchCycleUnit" :state="chkState('minLaunchCycleUnit','assetUnitAdvert')" :plain="true" :options="companySelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   label-cols-sm="5" label-class="require-input"  id="sellUnitGroup"    label-for="sellUnit">
            <div slot="label"><span class="required-icon">*</span>可售卖单位数/天：</div>
            <b-form-input  id="sellUnit" type="number" @change="updateSellNum" v-model.lazy.trim="assetUnitAdvert.sellUnit"  :disabled="enableSellUnit"  :state="chkState('sellUnit','assetUnitAdvert')"   />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.assetUnitAdvert.sellUnit.required">必填项</span>
              <span v-if="!$v.assetUnitAdvert.sellUnit.between">请填入1-96范围内的数字</span>
              <!-- <span v-if="!$v.form.customerName.isExistCustomerName">客户名称已存在</span> -->
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"   label-cols-sm="5" label-class="require-input"  id="pubPriceGroup" label-for="pubPrice">
            <div slot="label"><span class="required-icon"></span>刊例价：</div>
            <b-form-input  id="pubPrice"  type="text"  v-model.lazy.trim="assetUnitAdvert.pubPrice"  :state="chkState('pubPrice','assetUnitAdvert')"   />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.assetUnitAdvert.pubPrice.between">只能为1-999999的数字 </span>
              <span v-if="!$v.assetUnitAdvert.pubPrice.precision">小数位不能超过两位</span>

            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="pubPriceUnitGroup"    label-for="pubPriceUnit">
            <div slot="label"><span class="required-icon"></span>刊例价单位：</div>
            <b-form-select id="pubPriceUnit" :disabled="assetUnitAdvert.pubPriceUnit ? true:false" v-model="assetUnitAdvert.pubPriceUnit" :state="chkState('pubPriceUnit','assetUnitAdvert')" :plain="true" :options="publicationPriceUnirSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <!-- <b-form-group  label-align="right"   label-cols-sm="5" label-class="require-input"  id="dotPhotoGroup"    label-for="dotPhoto">
            <div slot="label"><span class="required-icon">*</span>点位图片：</div>
            <b-form-input  id="dotPhoto"  type="text"  v-model.lazy.trim="unitForm.dotPhoto"  :state="chkState('dotPhoto','unitForm')"   />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group> -->

           <!-- <b-form-group  label-align="right"   label-cols-sm="5" label-class="require-input"  id="descriptionGroup"    label-for="description">
            <div slot="label"><span class="required-icon">*</span>点位描述：</div>
            <b-form-input  id="description"  type="text"  v-model.lazy.trim="assetUnitAdvert.description"  :state="chkState('description','assetUnitAdvert')"   />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group> -->

          <el-row style="position:relative;width:100%;magin:5px 0">
            <el-col :span="2" style="marginTop:8px;width:80px;marginLeft:50px;margin-right: 12px;">点位图片：</el-col>
            <el-col :span="4">
              <photo-list-upload
                ref="photoListUploadone"
                :drag="false"
                :type="'1'"
                :limit="1"
                :photoList="assetUnitAdvert.pictureList"
                @handlePhotoListUpload="handlePhotoListUploadOne"
                @handlePhotoListRemove="handlePhotoListRemoveOne"
                style="marginTop:10px;width:80px;height:80px;overflow:hidden;"
              ></photo-list-upload>
              <div class="tc">环境图</div>
            </el-col>
            <el-col :span="4" :gutter="12">
              <photo-list-upload
                ref="photoListUploadtwo"
                :drag="false"
                :limit="1"
                :type="'2'"
                :photoList="assetUnitAdvert.pictureList"
                @handlePhotoListUpload="handlePhotoListUploadTwo"
                @handlePhotoListRemove="handlePhotoListRemoveTwo"
                style="marginTop:10px;width:80px;height:80px;overflow:hidden;"
              ></photo-list-upload>
              <div class="tc">近景图</div>
            </el-col>
            <el-col :span="4">
              <photo-list-upload
                ref="photoListUploadthree"
                :drag="false"
                :limit="1"
                :type="'3'"
                :photoList="assetUnitAdvert.pictureList"
                @handlePhotoListUpload="handlePhotoListUploadThree"
                @handlePhotoListRemove="handlePhotoListRemoveThree"
                style="marginTop:10px;width:80px;height:80px;overflow:hidden;"
              ></photo-list-upload>
              <div class="tc">落位图</div>
            </el-col>
            <el-col :span="4">
              <photo-list-upload
                ref="photoListUploadfour"
                :drag="false"
                :limit="1"
                :type="'4'"
                :photoList="assetUnitAdvert.pictureList"
                @handlePhotoListUpload="handlePhotoListUploadFour"
                @handlePhotoListRemove="handlePhotoListRemoveFour"
                style="marginTop:10px;width:80px;height:80px;overflow:hidden;"
              ></photo-list-upload>
              <div class="tc">地理图</div>
            </el-col>
          </el-row>
          <el-row style="position:relative;width:100%;magin:5px 0">
            <el-col :span="2" style="marginTop:8px;width:80px;marginLeft:50px;margin-right: 12px;"></el-col>
            <el-col :span="4">
              <photo-list-upload
                ref="photoListUploadfive"
                :drag="false"
                :limit="1"
                :type="'5'"
                :photoList="assetUnitAdvert.pictureList"
                @handlePhotoListUpload="handlePhotoListUploadFive"
                @handlePhotoListRemove="handlePhotoListRemoveFive"
                style="marginTop:10px;width:80px;height:80px;overflow:hidden;"
              ></photo-list-upload>
              <div class="tc">夜间图</div>
            </el-col>
            <el-col :span="4">
              <photo-list-upload
                ref="photoListUploadsix"
                :drag="false"
                :limit="1"
                :type="'6'"
                :photoList="assetUnitAdvert.pictureList"
                @handlePhotoListUpload="handlePhotoListUploadSix"
                @handlePhotoListRemove="handlePhotoListRemoveSix"
                style="marginTop:10px;width:80px;height:80px;overflow:hidden;"
              ></photo-list-upload>
              <div class="tc">历史图</div>
            </el-col>
            <el-col :span="4">
              <photo-list-upload
                ref="photoListUploadseven"
                :drag="false"
                :limit="1"
                :type="'7'"
                :photoList="assetUnitAdvert.pictureList"
                @handlePhotoListUpload="handlePhotoListUploadSeven"
                @handlePhotoListRemove="handlePhotoListRemoveSeven"
                style="marginTop:10px;width:80px;height:80px;overflow:hidden;"
              ></photo-list-upload>
              <div class="tc">自定义图片1</div>
            </el-col>
            <el-col :span="4">
              <photo-list-upload
                ref="photoListUploadeight"
                :drag="false"
                :limit="1"
                :type="'8'"
                :photoList="assetUnitAdvert.pictureList"
                @handlePhotoListUpload="handlePhotoListUploadEight"
                @handlePhotoListRemove="handlePhotoListRemoveEight"
                style="marginTop:10px;width:80px;height:80px;overflow:hidden;"
              ></photo-list-upload>
              <div class="tc">自定义图片2</div>
            </el-col>
          </el-row>
        </template>
        <!-- 单元类型（广告点位） >>-->

        <b-form-group v-show="this.modalType == 'edit'"  label-align="right"  label-cols-sm="5" label-class="require-input" id="assetParentGroup"    label-for="assetParent">
          <div slot="label"><span class="required-icon">*</span>上级资产：</div>
          <b-input-group class="input-group">
            <b-form-input  id="assetParent"  type="text"  v-model.lazy.trim="form.assetParentName"    readonly autofocus />
            <b-input-group-append v-show="false">
              <b-button variant="primary" @click="addAssetTree" ><i class="fa fa-search-plus"></i></b-button>
            </b-input-group-append>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-input-group>
        </b-form-group>

        <b-form-group class="form-group-lg" label-align="right"  label-cols-sm="5" id="remarkGroup"  label="备注："  label-for="remark">
          <b-form-textarea  id="remark"  type="text"  v-model.lazy.trim="form.remark" :state="chkState('remark','form')"     />
          <b-form-invalid-feedback tooltip ><div class="arrow"></div>
            <span v-if="!$v.form.remark.maxLength">长度不能超过50个字符</span>
          </b-form-invalid-feedback>
        </b-form-group>

        <div slot="footer" class="form-footer">
          <b-button class="ml-1" type="submit" variant="primary" :disabled="submitted" >保存</b-button>
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
            <!-- <region-tree @currentNode='getRegionTreeNode' ></region-tree> -->
            <select-address @setRegionFun="setRegionFun" @resetRegionFun="resetRegionFun"></select-address>
            <!-- <div class="btn-box-right">
              <b-button class="ml-1" type="submit" variant="primary" @click="setRegionFun">确定</b-button>
              <b-button class="ml-1" type="reset" variant="primary" @click="resetRegionFun">关闭</b-button>
            </div> -->
          </b-col>
        </b-row>
      </b-modal>
    </b-card>
  </div>
</template>

<script>
  import axios from 'axios'
  import { validationMixin } from "vuelidate"
  import { required, minLength,maxLength,between,alphaNum,maxValue } from "vuelidate/lib/validators"
  import cTable from "@/components/asset/z-table.vue";
  // import zElTree from '@/components/el-tree.vue'
  import zElTree from "@/components/asset/tree.vue";
  import regionTree from '@/components/asset/region-tree.vue'
  import selectAddress from '@/components/asset/select-address.vue'
  import pointupdate from '@/views/assetCenter/asset/pointupdate.vue'
  import PhotoListUpload from "@/components/asset/uploads";
  import {formatDate}from "@/shared/utils";
  import Regex from "@/shared/validate"

  /*日历插件引用文件--start*/
  import { setupCalendar, DatePicker } from 'v-calendar'
  import 'v-calendar/lib/v-calendar.min.css'
  import * as AssetAPI from '@/api/assetCenter/asset.js'
  import * as AdsAPI from '@/api/apiasset.js'

  setupCalendar({})


  export default {
    name: "asset-add-update",
    components: {
      cTable,
      selectAddress,
      PhotoListUpload,
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
        //声明资产简码下拉数组
        // projectAssetCodeSelect:[ ],
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
          assetUnit: null,
          floorHeight:''//层高
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
          // openDoor: new Date(2016, 9, 10, 18, 40),
          openDoor:null,
          closeDoor:null,
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
          assetPostal:"",

          // 固定单元
          storeyHeight:'', //铺位层高
          facadeWidth:'', //门面宽度
          availableCapacity:'',  //可用电量
          floorBearing:'',   //楼板承重
          centralAirConditioning:'',  //是否中央空调
        },
        uintResourceId:[],
         // 广告单元点位
        assetUnitAdvert:{
          pointShape:'', //点位形状
          detailLocation:'',//具体位置
          detailLocationAbb:'', //点位位置缩写
          resourceCft:'', //资源分级
          resourceId:'',//资源类型
          resourceAppIdList:[],//资源应用对象
          pointSize:'', //点位尺寸,
          bleedSize:'',  //出血尺寸
          minLaunchCycle:'', //最小投放周期
          minLaunchCycleUnit:'', //最小投放周期单位
          sellUnit:'',  //可售卖单位数
          pubPrice:'',  //刊例价
          pubPriceUnit:'', //刊例价单位
          dotPhoto:'', //点位图片
          description:'' ,//点位描述
          pointPosition:'',  //点位位置
          pictureList: [
            {
              photoType: 1,
              photoKey: null
            },
            {
              photoType:2,
              photoKey:null
            },
            {
              photoType:3,
              photoKey:null
            },
            {
              photoType:4,
              photoKey:null
            },
            {
              photoType:5,
              photoKey:null
            },
            {
              photoType:6,
              photoKey:null
            },
            {
              photoType:7,
              photoKey:null
            },
            {
              photoType:8,
              photoKey:null
            }]  // 点位图片
        },
        // 展位点位
        unitBooth:{
          boothPosition:'', //展位位置
          boothArea:"",// 展位面积
          boothAreaSpecs:'',//展位规格
          boothAddress:'', //展位具体位置
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
        centralAirConditioningSelect:[{text:'是',value:'1'},{text:'否',value:'0'}],   //中央空调下拉
        //资源分级数组
        resourceCftList: ["A","B","C","D","E", "F", "G","H","I","J", "K","L","M","N","O","P","Q","R","S","T","U","V","W", "X","Y","Z"
        ],
        // 资源应用对象
        resourceAppIds:[],
        // 资源类型下拉
        resourcTypeList:[],
        // 最小投放周期单位
        companySelect:[{value:35,text:'周'},{value:36,text:'月'}],
        // 刊例价单位下拉
        publicationPriceUnirSelect:[{value:35,text:'周'},{value:36,text:'月'}],
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
        subFormName:'',
        isUnitTypeError:false,
        shopBuildControl:false,
        openDoorError:false, //开门时间空值判断
        closeDoorError:false, //关门时间空值判断
        isUintResourceIdError:false, //资源类型空判断
        AdvertisingSpot:false, //单元类型选择广告点位时展示
        isFixedUnit:false,  //选中固定单元控制显示
        enableSellUnit:false, //最小投放周期控制
        isBoothShow:false, //展位的控制显示
        isShowPublicField:false,  // 显示隐藏单元的公共部分
        assetSimpleCodeTip:'',

      }
    },
    mixins: [validationMixin],
    validations() {
      return {
        form: {
          assetType: {
            required
          },
          assetCode: {
            required(value) {
              if (this.form.assetType.indexOf('unit') !=-1) {
                return true
              } else {
                return value == '' ? false : true
              }
            },
            charReg(value){
              if(this.form.assetType=='floor'){
                return true
              }
              if(value==''){
                return true
              }
              if(this.form.assetType==='project'){
                return Regex.charReg(value)
              }else{
                return true;
              }
            },
            charOrNum(value){
              if(this.form.assetType=='floor'){
                return true
              }
              if(value==''){
                return true
              }
              if(this.form.assetType==='land' || this.form.assetType==='building' || this.form.assetType==='floor'){
                return Regex.charOrNum(value);
              }else {
                return true;
              }
            },
            maxLengthCode(value){
              // 新建楼层时，不进入长度校验
              if(this.form.assetType=='floor'){
                return true
              }

              let val = value+'';
              if(val.trim()==''){
                return true
              }
              if(this.form.assetType==='project' && val.trim().length!=4   ) {

                this.assetSimpleCodeTip="长度需为4位"
                console.log('assetSimpleCodeTip',this.assetSimpleCodeTip)
                return false;
              }else if((this.form.assetType==='land' || this.form.assetType==='building') &&  val.trim().length!=2){
                this.assetSimpleCodeTip="长度需为2位"
                console.log('assetSimpleCodeTip',this.assetSimpleCodeTip)
                return false;
              }else if(this.form.assetType==='floor'  &&  val.trim().length!=3){
                this.assetSimpleCodeTip="长度需为3位"
                console.log('assetSimpleCodeTip',this.assetSimpleCodeTip)
                return false;
              }else {
                return true;
              }
            }
          },
          assetOldCode:{
            maxLength:maxLength(50)
            // chineseOrcharOrnumOrSpecial(value){
            //   return Regex.chineseOrcharOrnumOrSpecial(value)
            // },
          },
          assetCoveredArea:{
            required(value) {
              // console.log(this.form.assetType)
              if(this.form.assetType=="project"){
                return value ? true : false
              }else if(this.form.assetType=="unit"){
                // console.log(this.isAssetCoveredAreaShow)
                if (this.isAssetCoveredAreaShow) {
                  return value ? true : false
                } else {
                  return true
                }
              }else {
                return true
              }
            },
            precision(value){
              return Regex.precision(value,2)
            },
            maxLength:maxLength(20)
          },
          assetUsableArea:{
            required(value) {
              if(this.form.assetType=="project"){
                return value ? true : false
              }else if(this.form.assetType=="unit"){
                if (this.isAssetUsableAreaShow) {
                  return value ? true : false
                } else {
                  return true
                }
              }else {
                return true
              }
            },
            precision(value){
              return Regex.precision(value,2)
            },
            maxLength:maxLength(20),
            maxValue:maxValue(this.form.assetCoveredArea)
            // required(value) {
            //   if(this.form.assetType=="project"){
            //     return value ? true : false
            //   }else if(this.form.assetType=="unit"){
            //     if (this.isAssetUsableAreaShow) {
            //       return value ? true : false
            //     } else {
            //       return true
            //     }
            //   }else {
            //     return true
            //   }
            // }
          },
          assetSimpleName: {
            required,
            maxLength:maxLength(50)
          },
          effectiveTime: {
            required
          },
          invalidTime: {
            required
          },
          floorHeight:{
            required(value){
              if(this.form.assetType=='floor'){
                return value + '' ? true : false
              } else {
                return true
              }
            },
            maxLength:maxLength(100)
          },
          remark:{
            maxLength:maxLength(50)
          }
        },
        projectForm:{
          projectAddress:{
            maxLength:maxLength(200)
          },
          projectType:{
            required
          },
          manageTeam:{
            required
          },
          managementCompany:{
            required
          },
          propertyCompany:{
            required
          },
          regionName:{
            required
          },
          decimalPrecision:{
            integer(value){
              return Regex.integer(value,2)
            }
          },
          matchingArea:{
            precision(value){
              return Regex.precision(value,2)
            },
            maxLength:maxLength(20)
          },
          moneys:{
            precision(value){
              return Regex.precision(value,2)
            },
            maxLength:maxLength(20),
          },
          rentalArea:{
            required,
            precision(value){
              return Regex.precision(value,2)
            },
            maxLength:maxLength(20),
            maxValue:maxValue(this.form.assetCoveredArea)
          },
          plannedOpeningDate:{
            required
          }
        },
        buildingForm:{
          projectType:{
            required
          },
          manageTeam:{
            required
          },
          managementCompany:{
            required
          },
          propertyCompany:{
            required
          },
          buildingType:{
            required
          },
          buildingAddress:{
            required,
            maxLength:maxLength(200)
          }
        },
        unitForm:{
          // propertySerial:{
          //   required(value){
          //     if(this.isShowPublicField){
          //       return value ? true : false
          //     }else{
          //       return true
          //     }
          //   }
          // },
          averageUseEl:{
            // precision(value){
            //   if(this.unitForm.averageUseEl){
            //     return Regex.precision(value,2)
            //   }else{
            //     return true
            //   }
            // },
            // maxLength:maxLength(20)
          },
          rightInfo:{
            maxLength:maxLength(50)
          },
          unitFormUnitType:{
            // required
          },
          propertyUse:{
            required(value) {
              if (this.shopBuildControl) {
                return value+"" ? true : false
              } else {
                return true
              }
            }
          },
          manageTeam:{
            required(value) {
              if (this.isShowPublicField) {
                return value+"" ? true : false
              } else {
                return true
              }
            }
          },
          propertyNature:{
            required(value) {
              if (this.shopBuildControl) {
                return value+"" ? true : false
              } else {
                return true
              }
            }
          },
          calculateType:{
            required(value) {
              if (this.shopBuildControl) {
                return value+"" ? true : false
              } else {
                return true
              }
            }
          },
          managementCompany:{
            required(value) {
              if (this.isShowPublicField) {
                return value+"" ? true : false
              } else {
                return true
              }
            }
          },
          propertyCompany:{
            required(value) {
              if (this.isPropertyCompanyShow) {
                return value + '' ? true : false
              } else {
                return true
              }
            }
          },
          calculateRentArea:{
            required(value) {
              if (this.isCalculateRentAreaShow) {
                return value ? true : false
              } else {
                return true
              }
            },
            precision(value){
              return Regex.precision(value,2)
            },
            maxLength:maxLength(20),
            // required(value) {
            //   if (this.isCalculateRentAreaShow) {
            //     return value  + '' ? true : false
            //   } else {
            //     return true
            //   }
            // }
          },
          propertyArea:{
            precision(value){
              return Regex.precision(value,2)
            },
            maxLength:maxLength(20),
            maxValue:maxValue(this.form.assetCoveredArea)
          },
          propertyRightArea:{
            precision(value){
              return Regex.precision(value,2)
            },
            maxLength:maxLength(20),
            maxValue:maxValue(this.form.assetCoveredArea)
          },
          rightProperty:{
            required(value) {
              if (this.isRightPropertyShow) {
                return value + '' ? true : false
              } else {
                return true
              }
            }
          },
          industryRegister:{
            required(value) {
              if (this.isIndustryRegisterShow) {
                return value+"" ? true : false
              } else {
                return true
              }
            }
          },
          isSupPower:{
            required(value) {
              if (this.isIsSupPowerShow) {
                return value+"" ? true : false
              } else {
                return true
              }
            }
          },
          propertyStatus:{
            required(value){
              if(this.isShowPublicField){
                return value ? true : false
              }else{
                return true
              }
            }
          },
          // assetPostal:{

          // },
          storeyHeight:{
            // required(value){
            //   if(this.isFixedUnit){
            //     return value ? true : false
            //   }else{
            //     return true
            //   }
            // }
          },
          facadeWidth:{
            required(value){
              if(this.isFixedUnit){
                return value + '' ? true : false
              }else{
                return true
              }
            },
            precision(value){
              if(value==''){
                return true
              }
              return Regex.precision(value,2)
            },
            maxLength:maxLength(20)
          },
          availableCapacity:{
            required(value){
              if(this.isFixedUnit){
                return value + '' ? true : false
              }else{
                return true
              }
            },
            precision(value){
              if(value==''){
                return true
              }
              return Regex.precision(value,2)
            },
            maxLength:maxLength(20)
          },
          floorBearing:{
            required(value){
              if(this.isFixedUnit){
                return value + '' ? true : false
              }else{
                return true
              }
            },
            precision(value){
              if(value==''){
                return true
              }
              return Regex.precision(value,2)
            },
            maxLength:maxLength(20)
          },
          centralAirConditioning:{
             required(value){
              if(this.isFixedUnit){
                return value + '' ? true : false
              }else{
                return true
              }
            }
          }
        },
        // 广告私有字段
        assetUnitAdvert:{
          pointShape:{
            maxLength:maxLength(50),
          },
          pointPosition:{
            required(value){
              if(this.AdvertisingSpot){
                return value + '' ? true : false
              }else{
                return true
              }
            },
            // charOrNum(value){
            //   return Regex.charOrNum()
            // }
          },
          detailLocation:{
            required(value){
              if(this.AdvertisingSpot){
                return value + '' ? true : false
              }else{
                return true
              }
            },
            // charOrNum(value){
            //   return Regex.charOrNum(value)
            // },
            maxLength:maxLength(200),
          },
          detailLocationAbb:{
            required(value){
              if(this.AdvertisingSpot){
                return value + '' ? true : false
              }else{
                return true
              }
            },
            chineseOrcharOrnum(value){
              return Regex.chineseOrcharOrnum(value)
            },
            maxLength:maxLength(50),
          },
          resourceCft:{
            required(value){
              if(this.AdvertisingSpot){
                return value + '' ? true : false
              }else{
                return true
              }
            }
          },
          // resourceId:{
          //   required(value){
          //     if(this.AdvertisingSpot){
          //       return value + '' ? true : false
          //     }else{
          //       return true
          //     }
          //   }
          // },
          // resourceAppIdList:{
          //   required(value){
          //     if(this.AdvertisingSpot){
          //       return value + '' ? true : false
          //     }else{
          //       return true
          //     }
          //   }
          // },
          pointSize:{
            // required(value){
            //   if(this.AdvertisingSpot){
            //     return value + '' ? true : false
            //   }else{
            //     return true
            //   }
            // },
            maxLength:maxLength(50),
          },
          bleedSize:{
            // required(value){
            //   if(this.AdvertisingSpot){
            //     return value + '' ? true : false
            //   }else{
            //     return true
            //   }
            // },
            // charOrNum(value){
            //   return Regex.charOrNum(value)
            // },
            maxLength:maxLength(50),
          },
          minLaunchCycle:{
            required(value){
              if(this.AdvertisingSpot){
                return value + '' ? true : false
              }else{
                return true
              }
            },
            between: between(1, 999)
          },
          minLaunchCycleUnit:{
            required(value){
              if(this.AdvertisingSpot){
                return value + '' ? true : false
              }else{
                return true
              }
            }
          },
          sellUnit:{
            required(value){
              if(this.AdvertisingSpot){
                return value + '' ? true : false
              }else{
                return true
              }
            },
            between: between(1, 96)
          },
          pubPrice:{

            // number(value){
            //   return Regex.NumBer(value)
            // },
            precision(value){
              return Regex.precision(value,2)
            },
            between:between(1,999999)
          },
          pubPriceUnit:{
            // required(value){
            //   if(this.AdvertisingSpot){
            //     return value + '' ? true : false
            //   }else{
            //     return true
            //   }
            // }
          },
          // dotPhoto:{
          //   required(value){
          //     if(this.AdvertisingSpot){
          //       return value + '' ? true : false
          //     }else{
          //       return true
          //     }
          //   }
          // },
          // description:{
          //   required(value){
          //     if(this.AdvertisingSpot){
          //       return value + '' ? true : false
          //     }else{
          //       return true
          //     }
          //   }
          // },
        },
        unitBooth:{
          boothPosition:{
            required(value) {
              if (this.isBoothShow) {
                return value ? true : false
              } else {
                return true
              }
            }
          },
          boothArea:{
            required(value) {
              if (this.isBoothShow) {
                return value ? true : false
              } else {
                return true
              }
            },
            precision(value){
              return Regex.precision(value,1)
            },
            between:between(1,99999999.9)
          },
          boothAreaSpecs:{
            required(value) {
              if (this.isBoothShow) {
                return value ? true : false
              } else {
                return true
              }
            },
            maxLength:maxLength(50),
          },
          boothAddress:{
            required(value) {
              if (this.isBoothShow) {
                return value ? true : false
              } else {
                return true
              }
            },
            maxLength:maxLength(50),
          }
        }
      }
    },
    computed: {
      formStr() { return JSON.stringify(this.form, null, 4) },
      isValid() {
        if(this.subFormName){
          console.log('subFormName',this.subFormName)
          console.log('this.$v.form',this.$v.form)
          console.log('this.$v[this.subFormName]',this.$v[this.subFormName])
          return !this.$v.form.$anyError && !this.$v[this.subFormName].$anyError
        }else{
          return !this.$v.form.$anyError
        }
      },
      isDirty() { return this.$v.form.$anyDirty },
      // 资产简码下拉数组(楼层时为下拉框)
      projectAssetCodeSelect(){
        let arr =[]
        for(let i= 1 ;i<=2;i++){
          const bemp={
            id:'B'+i,
            value: 'B0'+i,
            text: 'B0'+i,
          }
          arr.push(bemp)
        }
        for(let i= 1 ;i<=81;i++){
          const temp={
            id:i,
            value: i < 10? '00'+ i :'0' + i,
            text: i < 10? '00' + i :'0' + i
          }
          arr.push(temp)
        }
        return arr
      }
    },
    watch:{
      effectiveTime() {
        this.form.effectiveTime = this.effectiveTime;
      },
      invalidTime() {
        this.form.invalidTime = this.invalidTime;
      },
      // unitFormUnitType(){
      //   this.form.unitBigType=this.unitFormUnitType[0];
      //   this.unitForm.unitType =''

      //   let res = this.$refs.unitType11.getCheckedNodes(true);
      //    console.log('refs',res)
      //   let sels = res.map((item)=>{
      //     return item.value
      //   })
      //   this.unitForm.unitType = sels[0] ? sels[0] : this.unitForm.unitType;
      //   // this.unitForm.unitType  = sels[0]
      // },
      // 'form.assetType'(){
      //   console.log(this.form.assetType)
      //   // this.subFormName = this.form.assetType + 'Form'
      //    // this.subFormName = 'buildingForm'
      // }
    },
    created(){
      // this.buildingForm.openDoor = new Date('2019,09,17,47,19')
      if(this.modalType == 'edit'){
        this.getAssetInfo();
      }else {
        this.form.assetParent=this.targetObj.treeId
        this.getAssetTypeAdd();
      }
      this.form.invalidTime=new Date('2999/01/01')
      this.form.effectiveTime = new Date()
      //初始化下拉框数据
      this.getAddUpdateSelectData();
      // 资源应用对象
      this.getResourceAppIds()
      // 获取资源类型
      this.getResourceIds()
      // this.getProvinces()
    },
    methods: {
      checkRules(value,id){
        if(id=="open"){
          if(value){
            this.openDoorError = false;
          }else{
            this.openDoorError = true;
          }
        }else if(id=="close"){
           if(value){
             this.closeDoorError = false;
          }else{
            this.closeDoorError = true;
          }
        }

      },
      // 采用传参
      pointSizeBlur(value){
        if(value=='' || value == null){
          return true
        }else{
          let rule
          rule = new RegExp( "^[A-Za-z0-9]+$", "gi")
          if(rule.test(value)){
            this.$v.assetUnitAdvert.pointSize.$touch()
          }else{
             this.$v.assetUnitAdvert.pointSize.$touch()
          }
          // return rule.test(value)
        }

        // Regex.charOrNum(value)
      },
      updateNum(value){
        if(value>= 1){
          this.$v.assetUnitAdvert.minLaunchCycle.$touch()
        }else{
          this.assetUnitAdvert.minLaunchCycle  = 1
        }
      },
      updateSellNum(value){
        if(value>= 1){
          this.$v.assetUnitAdvert.sellUnit.$touch()
        }else{
          this.assetUnitAdvert.sellUnit  = 1
        }
      },
      initUnitTypes(tree,selUintTypes,selMode){
        let unitTmp = []
            for(let i in selUintTypes){
              let firstLevel =tree.find(item =>{
              let res = item.children.find(subitem =>{
                  if(selUintTypes[i] == subitem.value){
                    return subitem.value
                  }
              } )
              if(res){return item}
              })

              if(firstLevel){
                if(selMode == 'multi'){
                  unitTmp.push([firstLevel.value,selUintTypes[i] ])
                }else{
                  unitTmp.push(firstLevel.value,selUintTypes[i])
                }
              }
            }
            return unitTmp
          },
      //新增时设置资产种类的默认值
      getAssetTypeAdd(){
        switch (this.targetObj.treeType) {
          case "hq":
            this.form.assetType="project";
            this.subFormName ="projectForm"
            break;
          case "project":
            this.form.assetType="land";
            this.subFormName =""
            break;
          case "land":
            this.form.assetType="building";
            this.subFormName ="buildingForm"
            break;
          case "building":
            this.form.assetType="floor";
            this.subFormName =""
            break;
          case "floor":
            this.form.assetType="unit";
            this.subFormName ="unitForm"
            break;
          // case "unit_advert":
          //   this.form.assetType="unit_advert";
          //   this.subFormName ="assetUnitAdvert"
          //   break;
          default:
            this.form.assetType="unit";
            this.subFormName =""
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
        this.projectForm.regionName=nodeData.districtName;
      },
      //清除地区树弹框
      resetAddRegionModal() {
        this.addRegionModal.title = ''
        this.addRegionModal.content = ''
      },
      //所在地区弹出框确定和关闭功能
      setRegionFun(condition){
        if(condition.provinceArr[0] && !condition.arr[0] && !condition.countyArr[0]){
          this.form.region=condition.provinceArr[0].districtCode
          this.projectForm.regionName = condition.provinceArr[0].districtName
        }else if(condition.arr[0] && !condition.countyArr[0]){
          this.form.region=condition.arr[0].districtCode
          this.projectForm.regionName = condition.provinceArr[0].districtName + condition.arr[0].districtName
        }else{
          this.form.region=condition.countyArr[0].districtCode
          this.projectForm.regionName = condition.provinceArr[0].districtName + condition.arr[0].districtName + condition.countyArr[0].districtName;
        }
        // console.log('this.form.region',this.form.region)
        //  console.log('this.form.regionName',this.projectForm.regionName)
        // this.form.region=condition.arr[0].districtCode

        // this.form.assetParent = this.selClientRows.customerName
        this.$root.$emit('bv::hide::modal', this.addRegionModal.id)
      },
      resetRegionFun(){
        this.$root.$emit('bv::hide::modal', this.addRegionModal.id)
      },
      calculateTypeChange(){
        this.assetTypeChange();
        // this.assetClassChange()
      },
       //单元类型值改变时（资产中心）
      assetClassChange(){
        this.shopBuildControl = false;
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
        this.AdvertisingSpot = false;
        this.isFixedUnit = false;
        this.isBoothShow = false;
        this.isShowPublicField = false;
        // this.unitForm.unitBigType=this.unitFormUnitType[0];
        switch (this.form.assetType) {
          // 商铺
          case 'unit_shop':
            // this.subFormName = 'unit_shop'
            this.isFixedUnit = true;
            //单元类型大类为固定单元，显示物业公司、建筑物面积、使用面积、计租面积、产权属性、产权面积、无产权面积、是否已工商备案、产权信息
            this.isPropertyCompanyShow=true;
            this.isAssetCoveredAreaShow=true;
            this.isAssetUsableAreaShow=true;
            // this.isCalculateRentAreaShow=true;
            this.isRightPropertyShow=true;
            this.isPropertyRightAreaShow=true;
            this.isPropertyAreaShow=true;
            this.isIndustryRegisterShow=true;
            this.isRightInfoShow=true;
            this.shopBuildControl = true;
            this.isShowPublicField = true;
            break;
            // 写字楼
          case 'unit_building':
            this.isFixedUnit = true;
            //单元类型大类为固定单元，显示物业公司、建筑物面积、使用面积、计租面积、产权属性、产权面积、无产权面积、是否已工商备案、产权信息
            this.isPropertyCompanyShow=true;
            this.isAssetCoveredAreaShow=true;
            this.isAssetUsableAreaShow=true;
            // this.isCalculateRentAreaShow=true;
            this.isRightPropertyShow=true;
            this.isPropertyRightAreaShow=true;
            this.isPropertyAreaShow=true;
            this.isIndustryRegisterShow=true;
            this.isRightInfoShow=true;
            this.shopBuildControl = true;
            this.isShowPublicField = true;
            break;
          case 'unit_advert':
            this.subFormName = 'assetUnitAdvert'
            //单元类型大类为招牌点位，计价方式按面积，显示计租面积、是否供电、平均用电量
            this.AdvertisingSpot = true;  //资产中心新增字段
            // this.isPropertyCompanyShow = true;
            // if(this.unitForm.calculateType=="4299"){
              // this.isCalculateRentAreaShow=true;
              // this.isIsSupPowerShow=true;
              // this.isAverageUseElShow=true;
            // }else {
            //   //计价方式不是按面积
            //   this.isIsSupPowerShow=true;
            //   this.isAverageUseElShow=true;
            // }
            break;
            // 展位
          case 'unit_booth':
            this.subFormName = 'unitBooth'
            //单元类型大类为停车位，计价方式按面积
            this.isBoothShow = true
            // if(this.unitForm.calculateType=="4299"){
            //   this.isPropertyCompanyShow=true;
            //   this.isCalculateRentAreaShow=true;
            // }else {
            //   this.isPropertyCompanyShow=true;
            // }
            break;
            // 停车场
          case 'unit_parking':
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
          // 虚拟空间
          case 'unit_virtual':

          default:
            break;
        }
      },

      //单元类型值改变时（原来的逻辑）
      assetTypeChange(){
        if(this.unitFormUnitType[0]!=undefined && this.unitFormUnitType[0]!=''){
          this.form.unitBigType=this.unitFormUnitType[0];
          this.unitForm.unitType = this.unitFormUnitType[1];
        }
        if(this.form.unitBigType){
          this.isUnitTypeError = false
        }else{
          console.log('this.unitFormUnitType',this.unitFormUnitType)

          this.isUnitTypeError = true
        }
        this.shopBuildControl = false;
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
        this.AdvertisingSpot = false;
        this.isFixedUnit = false;
        this.isBoothShow = false;
        this.isShowPublicField = false;
        this.shopBuildControl = false;
        // this.isShowPublicField = false;
        // this.unitForm.unitBigType=this.unitFormUnitType[0];
        switch (this.form.unitBigType) {
          case 440:
            this.isFixedUnit = true;
            // this.form.assetType = 'unit_advert'
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
            this.shopBuildControl =true;
            this.isShowPublicField = true;
            this.isIsSupPowerShow = true;
            this.isAverageUseElShow = true;
            break;
          case 437:
            //单元类型大类为招牌点位，计价方式按面积，显示计租面积、是否供电、平均用电量
            this.form.assetType = 'unit_advert'
            this.subFormName = 'assetUnitAdvert'
            this.AdvertisingSpot = true;  //资产中心新增字段
            // if(this.unitForm.calculateType=="4299"){
            //   this.isCalculateRentAreaShow=true;
            //   this.isIsSupPowerShow=true;
            //   this.isAverageUseElShow=true;
            // }else {
            //   //计价方式不是按面积
            //   this.isIsSupPowerShow=true;
            //   this.isAverageUseElShow=true;
            // }
            break;
          case 438:
            //单元类型大类为停车位，计价方式按面积
            if(this.unitForm.calculateType=="4299"){
              this.isPropertyCompanyShow=true;
              this.isCalculateRentAreaShow=true;
              this.shopBuildControl = true;
              this.isShowPublicField = true;

            }else {
              this.isPropertyCompanyShow=true;
              this.shopBuildControl = true;
              this.isShowPublicField = true;
            }
            break;
          case 476:
            this.form.assetType = 'unit_booth'
            this.subFormName = 'unitBooth'
            //单元类型大类为停车位，计价方式按面积
            this.isBoothShow = true
            break;
          case 439:
            //其他单元类型，计价方式按面积
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
              this.shopBuildControl = true;
              this.isShowPublicField = true ;
            }else {
              this.isPropertyCompanyShow=true;
              this.isIndustryRegisterShow=true;
              this.shopBuildControl = true;
              this.isShowPublicField = true ;
            }
            break;
          default:
            break;
        }
      },
      //获取编辑时资产信息
      getAssetInfo(){
        AssetAPI.getAssetInfoById(this.targetObj)
        .then(res=>{
          if (res.data.code === 0) {
            console.log('编辑返回数据',res.data.result)
            this.form=res.data.result;
            this.form.effectiveTime=new Date(this.form.effectiveTime)
            this.form.invalidTime=new Date(this.form.invalidTime)
            this.subFormName =""
            if(this.form.assetType!=undefined && this.form.assetType=="project"){
              this.projectForm=res.data.result.assetProject;
              this.projectForm.plannedOpeningDate=new Date(this.projectForm.plannedOpeningDate)
              this.projectForm.completionDate=new Date(this.projectForm.completionDate)
              this.subFormName ="projectForm"
            }else if(this.form.assetType!=undefined && this.form.assetType=="floor"){
              this.form.floorHeight = this.form.assetFloor.floorHeight
            }else if(this.form.assetType!=undefined && this.form.assetType=="unit"){

              this.unitForm=res.data.result.assetUnit;
              this.assetTypeChange(this.form.unitBigType);
              // this.assetClassChange(this.form.unitBigType)
              this.subFormName ="unitForm"
            }else if(this.form.assetType!=undefined && this.form.assetType=="building"){
              this.buildingForm=res.data.result.assetBuilding;
              this.buildingForm.openDoor = new Date('17,47,19')
              // this.form.assetBuilding.businessHours
              this.subFormName ="buildingForm"
            }else if(this.form.assetType!=undefined && this.form.assetType=="unit_advert"){
              this.form.remark = this.form.assetUnitAdvert.description
              this.subFormName ="buildingForm"
              let arr =[]
              arr.push(Number(this.form.assetUnitAdvert.mediaType))
              arr.push(this.form.assetUnitAdvert.resourceId)
              this.uintResourceId = arr  //给资源类型赋值
              console.log('uintResourceId',this.uintResourceId)
              this.unitFormUnitType =[437,11]
              this.unitForm.unitType = this.unitFormUnitType[1]
              // this.unitForm.unitType = this.form.assetUnitAdvert.resourceId
              this.assetTypeChange( this.form.unitBigType);
              this.assetUnitAdvert = this.form.assetUnitAdvert
              this.assetUnitAdvert.resourceAppIdList = this.form.assetUnitAdvert.resourceAppIdList.map(ele=>{
                return ele.id
              })
              const data = {}
              data.pointPosition = this.assetUnitAdvert.pictureList

              this.$nextTick(()=>{
                //环境图
                if (this.$refs.photoListUploadone.first) {

                  if (data.pointPosition == null) {
                    this.$refs.photoListUploadone.list = [];
                  } else {

                    let tempList1 = data.pointPosition.filter(
                      item => {
                        if (item.photoType == "1") {
                          return true;
                        }else{
                          return false;
                        }
                      }
                    );
                    this.$refs.photoListUploadone.list = tempList1.map(item=>{
                       let temp = {
                            type:  item.photoType,
                            url: item.photoUrl ? item.photoUrl : nobg,
                            key: item.photoKey,
                            status: "success"
                      };
                      return temp;
                    })
                  }
                }
                //近景图
                if (this.$refs.photoListUploadtwo.first) {
                  if (data.pointPosition == null) {
                    this.$refs.photoListUploadtwo.list = [];
                  } else {
                    let tempList2 = data.pointPosition.filter(
                      item => {
                        if (item.photoType == "2") {
                          return true
                        }else{
                          return false
                        }
                      });
                    this.$refs.photoListUploadtwo.list = tempList2.map(
                      item => {
                        let temp = {
                          type: item.photoType,
                          url: item.photoUrl ? item.photoUrl : nobg,
                          key: item.photoKey,
                          status: "success"
                        };
                        return temp;
                      }
                    );

                  }
                }
                //落位图
                if (this.$refs.photoListUploadthree.first) {
                  if (data.pointPosition == null) {
                    this.$refs.photoListUploadthree.list = [];
                  } else {
                    let tempList3 = data.pointPosition.filter(
                      item => {
                        if (item.photoType == "3") {
                          return true
                        }else{
                          return false
                        }
                      }
                    );
                    this.$refs.photoListUploadthree.list = tempList3.map(
                      item => {
                        let temp = {
                          type: item.photoType,
                          url: item.photoUrl ? item.photoUrl : nobg,
                          key: item.photoKey,
                          status: "success"
                        };
                        return temp;
                      }
                    );
                  }
                }
                //地理图
                if (this.$refs.photoListUploadfour.first) {
                  if (data.pointPosition == null) {
                    this.$refs.photoListUploadfour.list = [];
                  } else {
                    let templist4 = data.pointPosition.filter(
                      item => {
                        if (item.photoType == "4") {
                          return true;
                        }else{
                          return false
                        }
                      }
                    );
                    this.$refs.photoListUploadfour.list = templist4.map(
                      item => {
                        let temp = {
                          type: item.photoType,
                          url: item.photoUrl ? item.photoUrl : nobg,
                          key: item.photoKey,
                          status: "success"
                        };
                        return temp;
                      }
                    );
                  }
                }
                //夜间图
                if (this.$refs.photoListUploadfive.first) {
                  if (data.pointPosition == null) {
                    this.$refs.photoListUploadfive.list = [];
                  } else {
                   let tempList5 = data.pointPosition.filter(
                      item => {
                        if (item.photoType == "5") {
                          return true;
                        }else{
                          return false
                        }
                      }
                    );
                    this.$refs.photoListUploadfive.list = tempList5.map(
                      item => {
                          let temp = {
                            type: item.photoType,
                            url: item.photoUrl ? item.photoUrl : nobg,
                            key: item.photoKey,
                            status: "success"
                          };
                          return temp;
                        }
                    );
                  }
                }
                //历史图
                if (this.$refs.photoListUploadsix.first) {
                  if (data.pointPosition == null) {
                    this.$refs.photoListUploadsix.list = [];
                  } else {
                    let tempList6 = data.pointPosition.filter(
                      item => {
                        if (item.photoType == "6") {
                         return true
                        }else{
                          return false
                        }
                      }
                    );
                    this.$refs.photoListUploadsix.list = tempList6.map(
                      item => {
                          let temp = {
                            type: item.photoType,
                            url: item.photoUrl ? item.photoUrl : nobg,
                            key: item.photoKey,
                            status: "success"
                          };
                          return temp;
                        }
                    );
                  }
                }
                //自定义1图片
                if (this.$refs.photoListUploadseven.first) {
                  if (data.pointPosition == null) {
                    this.$refs.photoListUploadseven.list = [];
                  } else {
                    let templist7 = data.pointPosition.filter(
                      item => {
                        console.log('')
                        if (item.photoType == "7") {
                          return true
                        }else{
                          return false
                        }
                      }
                    );
                    this.$refs.photoListUploadseven.list = templist7.map(
                      item => {
                          let temp = {
                            type: item.photoKey,
                            url: item.photoUrl ? item.photoUrl : nobg,
                            key: item.photoKey,
                            status: "success"
                          };
                          return temp;
                        }
                    );
                  }
                }
                //自定义2图片
                if (this.$refs.photoListUploadeight.first) {
                  if (data.pointPosition == null) {
                    this.$refs.photoListUploadeight.list = [];
                  } else {
                    let templist8 = data.pointPosition.filter(
                      item => {
                        if (item.photoType == "8") {
                         return true
                        }else{
                          return false
                        }
                      }
                    );
                    this.$refs.photoListUploadeight.list = templist8.map(
                      item => {
                          let temp = {
                            type: item.photoType,
                            url: item.photoUrl ? item.photoUrl : nobg,
                            key: item.photoKey,
                            status: "success"
                          };
                          return temp;
                        }
                    );
                  }
                }
              })

              // this.assetClassChange(this.form.unitBigType)
            }
          } else {
            this.$emit('actionTips',"获取资产信息失败");
          }
        })
      },
      //获取新增修改页面下拉框数据
      getAddUpdateSelectData(){
        AssetAPI.getAddOrUpdateDropDataAssetList()
        .then(res=>{
          if(res.data.code==0 && res.data.result!=null){
            //获取下拉框数据
            this.getProjectSelectData(res.data);
            this.getUnitSelectData(res.data);
            // 资产编码下拉
            // if(this.modalType == 'add'){
            //   if(this.form.assetType.indexOf('unit') !=-1){
            //     this.projectAssetCodeSelect = [{text:'系统自动生成',value:'auto'}]
            //     this.form.assetCode = 'auto'
            //   }
            // }

            //获取建筑物类型
            const buildingTypeObject=res.data.result.buildingTypeSelect;
            this.buildingTypeSelect=this.getAddUpdateSelectDataFun(buildingTypeObject);
            console.log('res.data.result.assetUnitTree',res.data.result.assetUnitTree)
            let arr = res.data.result.assetUnitTree.map(item=>{
              if(item.value == 437){
                item.children=[
                  {children: null,
                  label: "广告点位",
                  unitSmallCode: null,
                  value: 11}]
              }
              return item
            })
            // this.unitTypeTree=res.data.result.assetUnitTree;   //单元类型
            this.unitTypeTree=arr;

            if(this.modalType == 'edit'){
              this.unitFormUnitType = this.initUnitTypes(this.unitTypeTree, [this.unitForm.unitType],'single')
            }
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
      onSubmit(bvModalEvt) {
        bvModalEvt.preventDefault();
        if (this.validate() ) {
          if(this.form.assetType=='building'){
            if(!this.buildingForm.openDoor){
              this.openDoorError = true;
            }
            if(!this.buildingForm.closeDoor){
              this.closeDoorError = true;
            }
            if(this.closeDoorError || this.openDoorError){
              return
            }
          }
          if(this.form.assetType.indexOf('unit') !=-1){
            if(this.valiDateRule()){
              return
            }
          }
          if(this.form.assetType=='unit_advert'){
            if(this.valiResourceRule()){
              return
            }
          }
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
            this.form.assetProject.region = this.form.region
          }else if(this.form.assetType!=undefined && this.form.assetType=="land"){
            this.form.assetLand=this.landForm;
          }else if(this.form.assetType!=undefined && this.form.assetType=="building"){
            let startTime = formatDate(new Date(this.buildingForm.openDoor), 'hh:mm:ss')
            let endTime= formatDate(new Date(this.buildingForm.openDoor), 'hh:mm:ss')

            this.form.assetBuilding=this.buildingForm;
            this.form.assetBuilding.businessHours =startTime+'~'+endTime
          }else if(this.form.assetType!=undefined && this.form.assetType=="floor"){
            this.form.assetFloor=this.floorForm;
            this.form.assetFloor.floorHeight = this.form.floorHeight
          }else if(this.form.assetType!=undefined && this.form.assetType=="unit"){
            if(this.unitForm.isSupPower=='0'){
              this.unitForm.averageUseEl=' '
            }
            this.form.assetUnit=this.unitForm;
          }else if(this.form.assetType!=undefined && this.form.assetType=="unit_advert"){
              var resourceAppIdList = [];
              if(this.assetUnitAdvert.resourceAppIdList && this.assetUnitAdvert.resourceAppIdList.length>0){
                for (let i = 0; i < this.assetUnitAdvert.resourceAppIdList.length; i++) {
                  var obj = { id: this.assetUnitAdvert.resourceAppIdList[i] };
                  resourceAppIdList.push(obj);
                }
              }
              this.form.assetUnitAdvert = this.assetUnitAdvert;
              if(this.modalType == 'add'){
                this.form.assetUnitAdvert.assetCode = "4401GTLSDQQSB01AND000002"
              }
              this.form.assetUnitAdvert.resourceAppIdList = resourceAppIdList
              this.form.assetUnitAdvert.resourceId = this.uintResourceId[1]
              this.form.assetUnitAdvert.mediaType = this.uintResourceId[0]
              this.form.assetUnitAdvert.description = this.form.remark
              console.log('resourceAppIdList',this.form)
          }else if(this.form.assetType!=undefined && this.form.assetType=="unit_booth"){
            this.form.assetUnitBooth=this.unitBooth;
          }
          this.$nextTick(() => {
            let tips ='';
            let that = this;
            if(this.modalType == 'add'){
              AssetAPI.saveAssetInfo(this.form)
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

              AssetAPI.updateAssetInfo(this.form)
              //  axios.post('/os_kernel_assetctr/app/asset/updateAssetInfo',this.form)
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
        }
      },
      // 关闭弹框
      onReset() {
        this.$root.$emit('bv::hide::modal', this.modalId)
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
      // element的下拉表单校验
      valiDateRule(){
        console.log('测试this.unitForm.unitType',this.unitForm.unitType)
        if(this.unitForm.unitType){
          this.isUnitTypeError = false
          return false
        }else{
          this.isUnitTypeError = true
          return true
        }
      },
        // element的下拉表单校验
      valiResourceRule(){
        console.log('测试this.unitForm.unitType',this.unitForm.unitType)
        if(this.uintResourceId.length>0){
          this.isUintResourceIdError = false;
          return false
        }else{
          this.isUintResourceIdError = true;
          return true
        }
      },
      // 广告
      // 资源类型值改变
      resourceChange(resour){
        if(this.uintResourceId.length>0){
          this.isUintResourceIdError = false;
        }else{
          this.isUintResourceIdError = true;
        }
        //element的表单校验
        if(this.form.unitBigType){
          this.isUnitTypeError = false
        }else{
          this.isUnitTypeError = true
        }
        if (resour[0]== 0) {
          this.enableSellUnit = true;
          this.assetUnitAdvert.sellUnit = 1;
          this.assetUnitAdvert.pubPriceUnit=36;
          this.assetUnitAdvert.minLaunchCycleUnit=36;
        }else if(resour[0]== 1){
          this.enableSellUnit = false;
          this.assetUnitAdvert.pubPriceUnit=35;
          this.assetUnitAdvert.minLaunchCycleUnit=35;
        }
        // let recoure = this.assetUnitAdvert.resourceId[0]
      },
      //获取资源应用对象
      getResourceAppIds() {
        AdsAPI.getResourceAppIds().then((res) => {
          if (res.data.result != null) {
            this.resourceAppIds = this.getAddUpdateSelectDataFunByCode(res.data.result);
          }
        });
      },
      //获取广告的单元类型
      getResourceIds() {
        //查询未删除的资源类型
        const params = {
          flag: false
        };
        AdsAPI.getResourceIds(params).then((res) => {
          if (res.data.result != null) {
            this.resourcTypeList = res.data.result;
            // console.log('resourcTypeList',this.resourcTypeList,)
          }
        });
      },
      //环境图
      handlePhotoListUploadOne(val) {
        if(this.modalType != 'edit'){
          this.assetUnitAdvert.pictureList[0].photoKey = val[0].key;
          return false
        }
        let _this=this
        if (_this.assetUnitAdvert.pictureList && _this.assetUnitAdvert.pictureList.length > 0) {
        var result= _this.assetUnitAdvert.pictureList.some(function(item) {
            if (item.photoType === val[0].type) {
              return true
            }else {
              return false
            }
          });
          if(result===true){
            _this.assetUnitAdvert.pictureList.forEach(item => {
              if (item.photoType === val[0].type) {
                item.photoKey = val[0].key;
              }
            });
          }else if(result===false){
            var temp = {
                photoKey: val[0].key,
                photoType: val[0].type
              };
              (_this.assetUnitAdvert.pictureList).push(temp);
          }
        }else {
          this.assetUnitAdvert.pictureList = [];
          var temp = {
            photoKey: val[0].key,
            photoType: val[0].type
          };
          this.assetUnitAdvert.pictureList.push(temp);
        }
      },
      handlePhotoListRemoveOne(val) {
        if(this.modalType != 'edit'){
          this.assetUnitAdvert.pictureList[0].photoKey = null;
          return false
        }

        for (var i = 0; i < this.assetUnitAdvert.pictureList.length; i++) {
          if (this.assetUnitAdvert.pictureList[i].photoType === val) {
            this.assetUnitAdvert.pictureList[i].photoKey = null;
          }
        }
      },
      //近景图
      handlePhotoListUploadTwo(val) {
        if(this.modalType != 'edit'){
          this.assetUnitAdvert.pictureList[1].photoKey = val[0].key;
          return false
        }
        let _this=this
        if (_this.assetUnitAdvert.pictureList && _this.assetUnitAdvert.pictureList.length > 0) {
        var result= _this.assetUnitAdvert.pictureList.some(function(item) {

            if (item.photoType === val[0].type) {
              return true
            }else {
              return false
            }
          });
          if(result===true){
            _this.assetUnitAdvert.pictureList.forEach(item => {
              if (item.photoType === val[0].type) {
                item.photoKey = val[0].key;
              }
            });
          }else if(result===false){
            var temp = {
                photoKey: val[0].key,
                photoType: val[0].type
              };
              (_this.assetUnitAdvert.pictureList).push(temp);
          }
        }else {
          this.assetUnitAdvert.pictureList = [];
          var temp = {
            photoKey: val[0].key,
            photoType: val[0].type
          };
          this.assetUnitAdvert.pictureList.push(temp);
        }
      },
      handlePhotoListRemoveTwo(val, type) {
        if(this.modalType != 'edit'){
          this.assetUnitAdvert.pictureList[1].photoKey = null;
          return false
        }
        for (var i = 0; i < this.assetUnitAdvert.pictureList.length; i++) {
          if (this.assetUnitAdvert.pictureList[i].photoType === val) {
            this.assetUnitAdvert.pictureList[i].photoKey = null;
          }
        }
      },
      //落位图
      handlePhotoListUploadThree(val) {
        if(this.modalType != 'edit'){
          this.assetUnitAdvert.pictureList[2].photoKey = val[0].key;
          return false
        }
        let _this=this
        if (_this.assetUnitAdvert.pictureList && _this.assetUnitAdvert.pictureList.length > 0) {
        var result= _this.assetUnitAdvert.pictureList.some(function(item) {
            if (item.photoType === val[0].type) {
              return true
            }else {
              return false
            }
          });
          if(result===true){
             _this.assetUnitAdvert.pictureList.forEach(item => {
              if (item.photoType === val[0].type) {
                item.photoKey = val[0].key;
              }
            });
          }else if(result===false){
            var temp = {
                photoKey: val[0].key,
                photoType: val[0].type
              };
              (_this.assetUnitAdvert.pictureList).push(temp);
          }
        }else {
          this.assetUnitAdvert.pictureList = [];
          var temp = {
            photoKey: val[0].key,
            photoType: val[0].type
          };
          this.assetUnitAdvert.pictureList.push(temp);
        }
      },
      handlePhotoListRemoveThree(val) {
        if(this.modalType != 'edit'){
          this.assetUnitAdvert.pictureList[2].photoKey = null;
          return false
        }
        for (var i = 0; i < this.assetUnitAdvert.pictureList.length; i++) {
          if (this.assetUnitAdvert.pictureList[i].photoType === val) {
            this.assetUnitAdvert.pictureList[i].photoKey = null;
          }
        }
      },
      //地理图
      handlePhotoListUploadFour(val) {
        if(this.modalType != 'edit'){
           this.assetUnitAdvert.pictureList[3].photoKey = val[0].key;
          return false
        }
        let _this=this
        if (_this.assetUnitAdvert.pictureList && _this.assetUnitAdvert.pictureList.length > 0) {
        var result= _this.assetUnitAdvert.pictureList.some(function(item) {
            if (item.photoType === val[0].type) {
              return true
            }else {
              return false
            }
          });
          if(result===true){
            _this.assetUnitAdvert.pictureList.forEach(item => {
              if (item.photoType === val[0].type) {
                item.photoKey = val[0].key;
              }
            });
          }else if(result===false){
            var temp = {
                photoKey: val[0].key,
                photoType: val[0].type
              };
              (_this.assetUnitAdvert.pictureList).push(temp);
          }
        }else {
          this.assetUnitAdvert.pictureList = [];
          var temp = {
            photoKey: val[0].key,
            photoType: val[0].type
          };
          this.assetUnitAdvert.pictureList.push(temp);
        }
      },
      handlePhotoListRemoveFour(val) {
        if(this.modalType != 'edit'){
          this.assetUnitAdvert.pictureList[3].photoKey = null;
          return false
        }
        for (var i = 0; i < this.assetUnitAdvert.pictureList.length; i++) {
          if (this.assetUnitAdvert.pictureList[i].photoType === val) {
            this.assetUnitAdvert.pictureList[i].photoKey = null;
          }
        }
      },
      //夜间图
      handlePhotoListUploadFive(val) {
        if(this.modalType != 'edit'){
          this.assetUnitAdvert.pictureList[4].photoKey = val[0].key;
          return false
        }
        let _this=this
        if (_this.assetUnitAdvert.pictureList && _this.assetUnitAdvert.pictureList.length > 0) {
        var result= _this.assetUnitAdvert.pictureList.some(function(item) {
            if (item.photoType === val[0].type) {
              return true
            }else {
              return false
            }
          });
          if(result===true){
            _this.assetUnitAdvert.pictureList.forEach(item => {
              if (item.photoType === val[0].type) {
                item.photoKey = val[0].key;
              }
            });
          }else if(result===false){
            var temp = {
                photoKey: val[0].key,
                photoType: val[0].type
              };
              (_this.assetUnitAdvert.pictureList).push(temp);
          }
        }else {
          this.assetUnitAdvert.pictureList = [];
          var temp = {
            photoKey: val[0].key,
            photoType: val[0].type
          };
          this.assetUnitAdvert.pictureList.push(temp);
        }
      },
      handlePhotoListRemoveFive(val) {
        if(this.modalType != 'edit'){
          this.assetUnitAdvert.pictureList[4].photoKey = null;
          return false
        }
        for (var i = 0; i < this.assetUnitAdvert.pictureList.length; i++) {
          if (this.assetUnitAdvert.pictureList[i].photoType === val) {
            this.assetUnitAdvert.pictureList[i].photoKey = null;
          }
        }
      },
      //历史图
      handlePhotoListUploadSix(val) {
        if(this.modalType != 'edit'){
          this.assetUnitAdvert.pictureList[5].photoKey = val[0].key;
          return false
        }
        let _this=this
        if (_this.assetUnitAdvert.pictureList && _this.assetUnitAdvert.pictureList.length > 0) {
        var result= _this.assetUnitAdvert.pictureList.some(function(item) {
            if (item.photoType === val[0].type) {
              return true
            }else {
              return false
            }
          });
          if(result===true){
            _this.assetUnitAdvert.pictureList.forEach(item => {
              if (item.photoType === val[0].type) {
                item.photoKey = val[0].key;
              }
            });
          }else if(result===false){
            var temp = {
                photoKey: val[0].key,
                photoType: val[0].type
              };
              (_this.assetUnitAdvert.pictureList).push(temp);
          }
        }else {
          this.assetUnitAdvert.pictureList = [];
          var temp = {
            photoKey: val[0].key,
            photoType: val[0].type
          };
          this.assetUnitAdvert.pictureList.push(temp);
        }
      },
      handlePhotoListRemoveSix(val) {
        if(this.modalType != 'edit'){
          this.assetUnitAdvert.pictureList[5].photoKey = null;
          return false
        }
        for (var i = 0; i < this.assetUnitAdvert.pictureList.length; i++) {
          if (this.assetUnitAdvert.pictureList[i].photoType === val) {
            this.assetUnitAdvert.pictureList[i].photoKey = null;
          }
        }
      },
      //自定义1图片
      handlePhotoListUploadSeven(val) {
        if(this.modalType != 'edit'){
          this.assetUnitAdvert.pictureList[6].photoKey = val[0].key;
          return false
        }
        let _this=this
        if (_this.assetUnitAdvert.pictureList && _this.assetUnitAdvert.pictureList.length > 0) {
        var result= _this.assetUnitAdvert.pictureList.some(function(item) {
            if (item.photoType === val[0].type) {
              return true
            }else {
              return false
            }
          });
          if(result===true){
            _this.assetUnitAdvert.pictureList.forEach(item => {
              if (item.photoType === val[0].type) {
                item.photoKey = val[0].key;
              }
            });
          }else if(result===false){
            var temp = {
                photoKey: val[0].key,
                photoType: val[0].type
              };
              (_this.assetUnitAdvert.pictureList).push(temp);
          }
        }else {
          this.assetUnitAdvert.pictureList = [];
          var temp = {
            photoKey: val[0].key,
            photoType: val[0].type
          };
          this.assetUnitAdvert.pictureList.push(temp);
        }
      },
      handlePhotoListRemoveSeven(val) {
        if(this.modalType != 'edit'){
          this.assetUnitAdvert.pictureList[6].photoKey = null;
          return false
        }
        for (var i = 0; i < this.assetUnitAdvert.pictureList.length; i++) {
          if (this.assetUnitAdvert.pictureList[i].photoType === val) {
            this.assetUnitAdvert.pictureList[i].photoKey = null;
          }
        }
      },
      //自定义2图片
      handlePhotoListUploadEight(val) {
        if(this.modalType != 'edit'){
          this.assetUnitAdvert.pictureList[7].photoKey = val[0].key;
          return false
        }
        let _this=this
        if (_this.assetUnitAdvert.pictureList && _this.assetUnitAdvert.pictureList.length > 0) {
        var result= _this.assetUnitAdvert.pictureList.some(function(item) {
            if (item.photoType === val[0].type) {
              return true
            }else {
              return false
            }
          });
          if(result===true){
            _this.assetUnitAdvert.pictureList.forEach(item => {
              if (item.photoType === val[0].type) {
                item.photoKey = val[0].key;
              }
            });
          }else if(result===false){
            var temp = {
                photoKey: val[0].key,
                photoType: val[0].type
              };
              (_this.assetUnitAdvert.pictureList).push(temp);
          }
        }else {
          this.assetUnitAdvert.pictureList = [];
          var temp = {
            photoKey: val[0].key,
            photoType: val[0].type
          };
          this.assetUnitAdvert.pictureList.push(temp);
        }
      },
      handlePhotoListRemoveEight(val) {
        if(this.modalType != 'edit'){
          this.assetUnitAdvert.pictureList[7].photoKey = null;
          return false
        }
        for (var i = 0; i < this.assetUnitAdvert.pictureList.length; i++) {
          if (this.assetUnitAdvert.pictureList[i].photoType === val) {
            this.assetUnitAdvert.pictureList[i].photoKey = null;
          }
        }
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
  .tc {
    width: 80px;
    text-align: center;
    line-height: 30px;
  }
  .checkboxClass{
    text-align: left;
    padding-left: 22px;
  }

</style>
