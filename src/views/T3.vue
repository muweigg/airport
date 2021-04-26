<template>
  <transition name="fade">
    <div class="T3" v-show="admission">
      <transition name="rotate">
        <img src="../assets/images/T3/T3.png" alt=""
             v-show="rotateAdmission && active === 0"
             @load="rotateAdmission = true">
      </transition>

      <div :class="['data-list', {open: openList}]">
        <h3>值机岛3A</h3>
        <div class="list-wrap">
          <table>
            <tbody>
            <tr v-for="i in 20">
              <td>值机人数: <span class="c1">{{ 98 + i }}</span></td>
              <td>行李件数: <span class="c2">44</span></td>
              <td>行李重量: <span class="c3">242KG</span></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="wrap" :class="{scale: openList}">
        <transition-group name="slide"
                          v-on:after-enter="switchOver">
          <div class="check-in-island ac3E" :key="1" v-show="active === 1"></div>
          <div class="check-in-island ac3F" :key="2" v-show="active === 2"></div>
          <div class="check-in-island ac3G" :key="3" v-show="active === 3"></div>
          <div class="check-in-island ac3H" :key="4" v-show="active === 4"></div>
          <div class="check-in-island t3a" :key="5" v-show="active === 5"></div>
          <div class="check-in-island t3b" :key="6" v-show="active === 6"></div>
          <div class="check-in-island t3c" :key="7" v-show="active === 7"></div>
          <div class="check-in-island t3d" :key="8" v-show="active === 8"></div>
          <div class="check-in-island t3e" :key="9" v-show="active === 9"></div>
          <div class="check-in-island t3f" :key="10" v-show="active === 10"></div>
          <div class="check-in-island t3g" :key="11" v-show="active === 11"></div>
          <div class="check-in-island t3h" :key="12" v-show="active === 12"></div>
          <div class="check-in-island t3j" :key="13" v-show="active === 13"></div>
        </transition-group>
      </div>

      <a href="javascript:" class="float-menu" tabindex="0"></a>

      <button class="go-back" @click="goBack">&#10005;</button>

      <div class="menu-list">
        <a href="javascript:" tabindex="0" v-for="menu in menuList"
           :class="{active: active === menu.active}"
           @click="switchActive(menu.active)">{{ menu.name }}</a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "T3",
  data() {
    return {
      menuList: [
        {name: '指廊E', active: 1},
        {name: '指廊F', active: 2},
        {name: '指廊G', active: 3},
        {name: '指廊H', active: 4},
        {name: '值机岛3A', active: 5},
        {name: '值机岛3B', active: 6},
        {name: '值机岛3C', active: 7},
        {name: '值机岛3D', active: 8},
        {name: '值机岛3E', active: 9},
        {name: '值机岛3F', active: 10},
        {name: '值机岛3G', active: 11},
        {name: '值机岛3H', active: 12},
        {name: '值机岛3J', active: 13},
      ],
      admission: false,
      rotateAdmission: false,
      active: 0,
      openList: false
    }
  },
  mounted() {
    this.admission = true;
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    switchActive(active) {
      if (this.active === active) {
        this.openList = false;
        return this.active = 0;
      }
      this.active = active;
    },
    switchOver() {
      setTimeout(() => this.openList = true, 300);
      console.log(this.active);
    }
  }
}
</script>

<style scoped lang="scss" src="./T3.scss"></style>