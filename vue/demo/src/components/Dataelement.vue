<template>
  <div>
    <div class="datalist-content">
        <span class="data-check-title">
          {{title}}
          <!-- 所拥有的数据权限元素: -->
          </span>
        <div class="data-check-item">
          <el-tree
            :data="dataperminssion"
            :default-checked-keys="hasdataper"
            show-checkbox
            node-key="id"
            @check="checkDataPermission"
            :props="props"
          ></el-tree>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'Dataelement',

  component: {},
  props: {
    dataperminssion: {
      type: Array,
      default: function() {
        return [];
      }
    },
    hasdataper:{
      type:Array,
      default:function(){
        return []
      }
    },
    props: {
      type: Object,
      default: function() {
        return {};
      }
    },
    title: String,
		},


  data() {
    return {}
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>

</style>

