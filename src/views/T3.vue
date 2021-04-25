<template>
  <transition name="fade">
    <div class="T3" v-show="admission">
      <transition name="rotate">
        <img src="../assets/images/T3/T3.png" alt="" v-show="admission">
      </transition>

      <a href="javascript:" class="float-menu" tabindex="0"></a>
      <button class="go-back" @click="goBack">&#10005;</button>
      <div class="menu-list">
        <a href="javascript:" tabindex="0">指廊A</a>
        <a href="javascript:" tabindex="0">指廊B</a>
        <a href="javascript:" tabindex="0">指廊C</a>
        <a href="javascript:" tabindex="0">2A</a>
        <a href="javascript:" tabindex="0">2B</a>
        <a href="javascript:" tabindex="0">2C</a>
        <a href="javascript:" tabindex="0">2D</a>
        <a href="javascript:" tabindex="0">2E</a>
        <a href="javascript:" tabindex="0">2F</a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "T3",
  data() {
    return {
      admission: false
    }
  },
  mounted() {
    this.admission = true;
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    test () {
      console.log('test');
      alert('test');
    }
  }
}
</script>

<style scoped lang="scss" src="./T3.scss"></style>