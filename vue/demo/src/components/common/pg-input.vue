<template>
  <div>
    <div  id="loginAccGroup" role="group" class="form-row form-group">
      <label
        id="loginAccGroup__BV_label_"
        for="loginAcc"
        class="col-sm-5 col-form-label text-right require-input"
      >
        <div >
          <span  class="required-icon">*</span>登录账号：
        </div>
      </label>
      <div class="col">
        <input  id="loginAcc" type="text" class="form-control is-valid" />
        <div  class="invalid-tooltip">
          <div  class="arrow"></div>
          <span >必填项</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "input",
  component: {},
  props: {

  },
  data() {
    return {};
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>

</style>

