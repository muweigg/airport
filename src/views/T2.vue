<template>
  <transition name="fade">
    <div class="T2" v-show="admission">
      <transition name="rotate">
        <img src="../assets/images/T2/T2.png" alt=""
             v-show="rotateAdmission && active === 0"
             @load="rotateAdmission = true">
      </transition>

      <div :class="['data-list', {open: openList}]">
        <h3>值机岛2A</h3>
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
          <div class="check-in-island t2a" :key="4" v-show="active === 4"></div>
          <div class="check-in-island t2b" :key="5" v-show="active === 5"></div>
          <div class="check-in-island t2c" :key="6" v-show="active === 6"></div>
          <div class="check-in-island t2d" :key="7" v-show="active === 7"></div>
          <div class="check-in-island t2e" :key="8" v-show="active === 8"></div>
          <div class="check-in-island t2f" :key="9" v-show="active === 9"></div>
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
  name: "T2",
  data() {
    return {
      menuList: [
        {name: '指廊A', active: 1},
        {name: '指廊B', active: 2},
        {name: '指廊C', active: 3},
        {name: '值机岛2A', active: 4},
        {name: '值机岛2B', active: 5},
        {name: '值机岛2C', active: 6},
        {name: '值机岛2D', active: 7},
        {name: '值机岛2E', active: 8},
        {name: '值机岛2F', active: 9},
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

<style scoped lang="scss" src="./T2.scss"></style>