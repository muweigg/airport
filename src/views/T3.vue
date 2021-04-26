<template>
  <transition name="fade">
    <div class="T3" v-show="admission">
      <transition name="rotate">
        <img src="../assets/images/T3/T3.png" alt="" v-show="rotateAdmission"
             @load="rotateAdmission = true">
      </transition>

      <a href="javascript:" class="float-menu" tabindex="0"></a>

      <button class="go-back" @click="goBack">&#10005;</button>

      <div :class="['data-list', {open: active !== 0}]">
        <h3>值机岛3A</h3>
        <div class="list-wrap">
          <ul>
            <li v-for="i in 20">
              <div>值机人数: <span class="c1">44</span></div>
              <div>行李件数: <span class="c2">44</span></div>
              <div>行李重量: <span class="c3">242KG</span></div>
            </li>
          </ul>
        </div>
      </div>

      <div class="menu-list">
        <a href="javascript:" tabindex="0" :class="{active: active === 1}"
           @click="switchActive(1)">指廊A</a>
        <a href="javascript:" tabindex="0" :class="{active: active === 2}"
           @click="switchActive(2)">指廊B</a>
        <a href="javascript:" tabindex="0" :class="{active: active === 3}"
           @click="switchActive(3)">指廊C</a>
        <a href="javascript:" tabindex="0" :class="{active: active === 4}"
           @click="switchActive(4)">指廊D</a>
        <a href="javascript:" tabindex="0" :class="{active: active === 5}"
           @click="switchActive(5)">值机岛3A</a>
        <a href="javascript:" tabindex="0" :class="{active: active === 6}"
           @click="switchActive(6)">值机岛3B</a>
        <a href="javascript:" tabindex="0" :class="{active: active === 7}"
           @click="switchActive(7)">值机岛3C</a>
        <a href="javascript:" tabindex="0" :class="{active: active === 8}"
           @click="switchActive(8)">值机岛3D</a>
        <a href="javascript:" tabindex="0" :class="{active: active === 9}"
           @click="switchActive(9)">值机岛3E</a>
        <a href="javascript:" tabindex="0" :class="{active: active === 10}"
           @click="switchActive(10)">值机岛3F</a>
        <a href="javascript:" tabindex="0" :class="{active: active === 11}"
           @click="switchActive(11)">值机岛3G</a>
        <a href="javascript:" tabindex="0" :class="{active: active === 12}"
           @click="switchActive(12)">值机岛3H</a>
        <a href="javascript:" tabindex="0" :class="{active: active === 13}"
           @click="switchActive(13)">值机岛3J</a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "T3",
  data() {
    return {
      admission: false,
      rotateAdmission: false,
      active: 0
    }
  },
  mounted() {
    this.admission = true;
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    switchActive (active) {
      if (this.active === active) {
        return this.active = 0;
      }
      this.active = active;
    }
  }
}
</script>

<style scoped lang="scss" src="./T3.scss"></style>