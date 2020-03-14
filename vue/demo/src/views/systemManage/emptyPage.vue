<template>
  <div></div>
</template>

<script>
// import usersData from './UsersData'
export default {
  name: "User",
  data: () => {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$router.replace(from.path);
    });
  },
  methods: {
    // goBack() {
    //   this.$router.go(-1)
    //   // this.$router.replace({path: '/users'})
    // }
  }
};
</script>
