<template>
  <div class="usermodel"  :width="width +'rem' ">
    <div class="user-header">
      <div class="header-left">{{title}}</div>
      <div class="header-right">
        <template v-for="(item,idx) in btns">
          <div class="btns" :key="idx">
              <button :type="item.type" @click.native="handleClick(item)"   :class="item.type=='default'? 'color': ''" :key="idx"
               class="btn btn-outline-primary btn-block func-item func-btn btn-sm active1"> {{item.title}} </button>
          </div>
        </template>
      </div>
    </div>
    <div class="user-search">
      <slot name="search"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'usermodel',
  component: {},
  props: {
		show: {
			type: Boolean,
			default: false
		},
		data_tree:{
			type:Boolean,
			default: false
		},
		title: String,
		width: {
			type: String,
			default: ""
    },
    btns: {
			type: Array,
			default: function () {
				return []
			}
		},

	},
  data() {
    return {}
  },
  methods: {
    handleClick: function (item) {
			this.$emit(item.action)
		},
  }
}
</script>
<style lang="scss" scoped>
  .usermodel{

    background:#fff;
    border-radius:2px;
    .user-header{
      height:3rem;
      line-height:3rem;
      border-bottom:1px solid #eee;
      font-size:0.8rem;
      .header-left{
        float:left;
        padding-left:1.75rem;
        font-size:0.8rem;
        color:#0091FF ;
        font-weight:bold;
      }
      .header-right{
        float:right;
        padding-right:1.75rem;
        .btn{
          border-radius:2px;
          height:1.75rem;
          // border:1px solid #0091FF;
          // background:#0091FF;
          font-size: 0.7rem;
          margin-left:10px;
          font-family: PingFangSC-Medium;
        }
        .color{
          color: #595959;
        }
      }
    }
    .user-search{
      overflow-x: scroll;
      // 隐藏纵向滚动条
      overflow-y: hidden;
      // 内容不换行
      // white-space: nowrap;
    }
  }
.btns{
  padding:0 5px;
}
</style>

