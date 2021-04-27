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
        <div class="list-wrap" v-disabled-rebound>
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
          <div class="check-in-island" v-for="item in items.slice(0, 4)" :key="item.name"
               v-show="item.loaded && active === item.active">
            <img :src="item.src" alt="" @load="item.loaded = true">
          </div>
          <div class="check-in-island" :key="5"
               v-show="items[4].loaded && active >= items[4].activeRange[0] && active <= items[4].activeRange[1]">
            <img :src="items[4].src" alt="" @load="items[4].loaded = true">
          </div>
        </transition-group>
      </div>

      <a href="javascript:" class="float-menu" tabindex="0"></a>

      <button class="go-back" @click="goBack">&#10005;</button>

      <div class="menu-list" v-disabled-rebound>
        <a href="javascript:" tabindex="0" v-for="menu in menuList"
           :class="{active: active === menu.active}"
           @click="switchActive(menu.active)">{{ menu.name }}</a>
      </div>
    </div>
  </transition>
</template>

<script>
import AC3E from '@/assets/images/T3/ac3E.png';
import AC3F from '@/assets/images/T3/ac3F.png';
import AC3G from '@/assets/images/T3/ac3G.png';
import AC3H from '@/assets/images/T3/ac3H.png';
import T3x from '@/assets/images/T3/3x.png';

import {delay} from 'lodash';

export default {
  name: "T3",
  data() {
    return {
      items: [
        {name: '指廊E', src: AC3E, loaded: false, active: 1},
        {name: '指廊F', src: AC3F, loaded: false, active: 2},
        {name: '指廊G', src: AC3G, loaded: false, active: 3},
        {name: '指廊H', src: AC3H, loaded: false, active: 4},
        {name: '值机岛3x', src: T3x, loaded: false, activeRange: [5, 13]},
      ],
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
      delay(() => this.openList = true, 300);
    }
  }
}
</script>

<style scoped lang="scss" src="./T3.scss"></style>