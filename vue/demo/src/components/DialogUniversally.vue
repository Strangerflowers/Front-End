<template>
    <div>
      <b-modal
        :title="utitle"
        v-model="visible"
        @ok="submit"
        cancel-title="关闭"
        ok-title="确定"
      >
       <slot></slot>
      </b-modal>
    </div>
</template>

<script>
    export default {
        name: "DialogUniversally",
        props:{
            visible:{
                type: Boolean,
                default: false
            },
            utitle:{
                type:String,
                default: ''
            }
        },
        methods:{
            submit(){
                this.$emit(submitU,)
            }
        }
    }
</script>

<style scoped>

</style>
