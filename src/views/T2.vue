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
          <div class="check-in-island" v-for="item in menuList" :key="item.name"
               v-show="item.loaded && active === item.active">
            <img :src="item.src" alt="" @load="item.loaded = true">
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
import T2A from '@/assets/images/T2/2A.png';
import T2B from '@/assets/images/T2/2B.png';
import T2C from '@/assets/images/T2/2C.png';
import T2D from '@/assets/images/T2/2D.png';
import T2E from '@/assets/images/T2/2E.png';
import T2F from '@/assets/images/T2/2F.png';

import {delay} from 'lodash';

export default {
  name: "T2",
  data() {
    return {
      menuList: [
        {name: '指廊A', active: 1, loaded: false, src: ''},
        {name: '指廊B', active: 2, loaded: false, src: ''},
        {name: '指廊C', active: 3, loaded: false, src: ''},
        {name: '值机岛2A', active: 4, loaded: false, src: T2A},
        {name: '值机岛2B', active: 5, loaded: false, src: T2B},
        {name: '值机岛2C', active: 6, loaded: false, src: T2C},
        {name: '值机岛2D', active: 7, loaded: false, src: T2D},
        {name: '值机岛2E', active: 8, loaded: false, src: T2E},
        {name: '值机岛2F', active: 9, loaded: false, src: T2F},
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

<style scoped lang="scss" src="./T2.scss"></style>