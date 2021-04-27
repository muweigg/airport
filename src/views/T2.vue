<template>
  <transition name="fade">
    <div class="T2" v-show="admission">
      <transition name="rotate">
        <img src="../assets/images/T2/T2.png" alt=""
             v-show="rotateAdmission && !selected"
             @load="rotateAdmission = true">
      </transition>

      <div :class="['data-list', {open: openList}]">
        <h3>{{ selected && selected.name }}</h3>
        <div class="list-wrap" v-disabled-rebound>
          <table>
            <tbody>
            <tr v-for="item in list">
              <td>值机人数: <span class="c1">{{ item.checkin_passengernum }}</span></td>
              <td>行李件数: <span class="c2">{{ item.bag_count }}</span></td>
              <td>行李重量: <span class="c3">{{ item.bag_weight }}KG</span></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="wrap" :class="{scale: openList}">
        <transition-group name="slide"
                          v-on:after-enter="switchOver">
          <div class="check-in-island" v-for="item in menuList" :key="item.name"
               v-show="item.loaded && selected === item">
            <img :src="item.src" alt="" @load="item.loaded = true">
          </div>
        </transition-group>
      </div>

      <a href="javascript:" class="float-menu" tabindex="0"></a>

      <button class="go-back" @click="goBack">&#10005;</button>

      <div class="menu-list" v-disabled-rebound>
        <a href="javascript:" tabindex="0" v-for="menu in menuList"
           :class="{active: selected === menu}"
           @click="switchSelected(menu)">{{ menu.name }}</a>
      </div>
    </div>
  </transition>
</template>

<script>
import A from '@/assets/images/T2/A.png';
import B from '@/assets/images/T2/B.png';
import C from '@/assets/images/T2/C.png';
import T2A from '@/assets/images/T2/2A.png';
import T2B from '@/assets/images/T2/2B.png';
import T2C from '@/assets/images/T2/2C.png';
import T2D from '@/assets/images/T2/2D.png';
import T2E from '@/assets/images/T2/2E.png';
import T2F from '@/assets/images/T2/2F.png';

import axios from '@/js/axios';
import API_URL from "@/js/API_URL";
import {format} from "date-fns";
import {delay} from 'lodash';
import {defer, combineLatest} from 'rxjs';

export default {
  name: "T2",
  data() {
    return {
      menuList: [
        {name: '指廊A', type: 0, key: 'A', loaded: false, src: A},
        {name: '指廊B', type: 0, key: 'B', loaded: false, src: B},
        {name: '指廊C', type: 0, key: 'C', loaded: false, src: C},
        {name: '值机岛2A', type: 1, key: 'A', loaded: false, src: T2A},
        {name: '值机岛2B', type: 1, key: 'B', loaded: false, src: T2B},
        {name: '值机岛2C', type: 1, key: 'C', loaded: false, src: T2C},
        {name: '值机岛2D', type: 1, key: 'D', loaded: false, src: T2D},
        {name: '值机岛2E', type: 1, key: 'E', loaded: false, src: T2E},
        {name: '值机岛2F', type: 1, key: 'F', loaded: false, src: T2F},
      ],
      admission: false,
      rotateAdmission: false,
      selected: null,
      openList: false,
      subscribeable: null,
      subscriptions: null,
      list: []
    }
  },
  beforeDestroy() {
    this.unsubscribeAllRequest();
  },
  mounted() {
    this.admission = true;
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    switchSelected(menu) {
      this.unsubscribeAllRequest();

      if (this.selected === menu) {
        this.openList = false;
        return this.selected = null;
      }

      this.list = [];
      this.selected = menu;
      this.initAllRequest();
      this.subscribeAllRequest();
    },
    switchOver() {
      delay(() => this.openList = true, 300);
    },
    initAllRequest() {
      const requests = [
        combineLatest(
            this.requestCorridor(API_URL.GATE_FLIGHT_INFO),
            this.requestCorridor(API_URL.NEXT_FLIGHT_BY_CORRIDOR),
        ),
        combineLatest(
            this.requestCounter(API_URL.PASSENGER_NUM_BY_LOCATION_DRILL_DOWN),
            this.requestCounter(API_URL.PSR_BAG_INFO_DRILL_DOWN),
        )
      ];
      this.subscribeable = requests[this.selected.type];
    },
    subscribeAllRequest() {
      const responseHandler = [
        this.responseHandlerCorridor,
        this.responseHandlerCounter
      ];
      this.subscriptions = this.subscribeable.subscribe(responseHandler[this.selected.type]);
    },
    unsubscribeAllRequest() {
      if (this.subscriptions) this.subscriptions.unsubscribe();
    },
    responseHandlerCounter([data1, data2]) {
      if (parseInt(data1.retCode) === 0 && parseInt(data2.retCode) === 0) {
        const comprehensiveData = {};
        const result1 = data1.retJSON.result;
        const result2 = data2.retJSON.result;
        for (let o of result1) {
          if (o.area_info && o.area_info.indexOf(this.selected.key) >= 0)
            comprehensiveData[o.area_info] = {
              checkin_passengernum: o.checkin_passengernum
            }
        }

        for (let o of result2) {
          if (o.area_info && o.area_info.indexOf(this.selected.key) >= 0)
            comprehensiveData[o.area_info] = {
              bag_count: o.bag_count,
              bag_weight: o.bag_weight,
            }
        }

        const keys = Object.keys(comprehensiveData).sort();

        this.list = [];
        for (let o of keys) {
          this.list.push(comprehensiveData[o]);
        }
      }
    },
    responseHandlerCorridor([data1, data2]) {
      console.log(data1, data2);

      if (parseInt(data1.retCode) === 0 && parseInt(data2.retCode) === 0) {
        // const comprehensiveData = {};
        // const result1 = data1.retJSON.result;
        // const result2 = data2.retJSON.result;
        // for (let o of result1) {
        //   if (o.area_info && o.area_info.indexOf(this.selected.key) >= 0)
        //     comprehensiveData[o.area_info] = {
        //       checkin_passengernum: o.checkin_passengernum
        //     }
        // }
        //
        // for (let o of result2) {
        //   if (o.area_info && o.area_info.indexOf(this.selected.key) >= 0)
        //     comprehensiveData[o.area_info] = {
        //       bag_count: o.bag_count,
        //       bag_weight: o.bag_weight,
        //     }
        // }
        //
        // const keys = Object.keys(comprehensiveData).sort();
        //
        // this.list = [];
        // for (let o of keys) {
        //   this.list.push(comprehensiveData[o]);
        // }
      }
    },
    requestCounter(url) {
      return defer(() => {
        const params = {
          exec_date: format(new Date(), 'yyyyMMdd'),
          level_flag: 2,
          terminal_code: 'T2'
        }
        return axios.get(url, {params});
      });
    },
    requestCorridor(url) {
      return defer(() => {
        const params = {
          exec_date: format(new Date(), 'yyyyMMdd'),
          corridor_code: this.selected.key,
          terminal_code: 'T2'
        }
        return axios.get(url, {params});
      });
    }
  }
}
</script>

<style scoped lang="scss" src="./T2.scss"></style>