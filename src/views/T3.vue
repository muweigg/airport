<template>
  <transition name="fade">
    <div class="T3" v-show="admission">
      <transition name="rotate">
        <img src="../assets/images/T3/T3.png" alt=""
             v-show="rotateAdmission && !selected"
             @load="rotateAdmission = true">
      </transition>

      <div :class="['data-list', {open: openList}]">
        <h3>{{ selected && selected.name }}</h3>
        <div class="list-wrap" v-disabled-rebound>
          <transition-group name="fade">
            <table v-show="corridorList.length > 0" :key="'corridorList'">
              <tbody>
              <tr v-for="item in corridorList">
                <td>登机口: <span class="c1">{{ item.gate_code || '无' }}</span></td>
                <td>航班号: <span class="c1">{{ item.flight_no || '无' }}</span></td>
                <td>人数: <span class="c2">{{ item.checkedin_num || '无' }}</span></td>
                <td>下一班: <span class="c3">{{ item.next_flight_no || '无' }}</span></td>
              </tr>
              </tbody>
            </table>
            <table v-show="counterList.length > 0" :key="'counterList'">
              <tbody>
              <tr v-for="item in counterList">
                <td>柜台: <span class="c1">{{ item.counter || 0 }}</span></td>
                <td>人数: <span class="c1">{{ item.checkin_passengernum || 0 }}</span></td>
                <td>件数: <span class="c2">{{ item.bag_count || 0 }}</span></td>
                <td>重量: <span class="c3">{{ item.bag_weight || 0 }}KG</span></td>
              </tr>
              </tbody>
            </table>
            <div v-show="!loading && corridorList.length === 0 && counterList.length === 0" :key="'nothing'">
              未查询到 <span class="c3">{{ selected && selected.name }}</span> 的数据
            </div>
          </transition-group>
        </div>
      </div>

      <div class="wrap" :class="{scale: openList}">
        <transition-group name="slide"
                          v-on:after-enter="switchOver">
          <div class="check-in-island" v-for="item in items.slice(0, 4)" :key="item.name"
               v-show="selected && item.loaded && item.key[selected.key] && item.type === selected.type">
            <img :src="item.src" alt="" @load="item.loaded = true">
          </div>
          <div class="check-in-island" :key="5"
               v-show="selected && items[4].loaded && items[4].key[selected.key] && items[4].type === selected.type">
            <img :src="items[4].src" alt="" @load="items[4].loaded = true">
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
import AC3E from '@/assets/images/T3/ac3E.png';
import AC3F from '@/assets/images/T3/ac3F.png';
import AC3G from '@/assets/images/T3/ac3G.png';
import AC3H from '@/assets/images/T3/ac3H.png';
import T3x from '@/assets/images/T3/3x.png';

import axios from '@/js/axios';
import API_URL from "@/js/API_URL";
import {format} from "date-fns";
import {delay, defer as _defer} from 'lodash';
import {defer, combineLatest} from 'rxjs';

const keyRange = {'A': 1, 'B': 1, 'C': 1, 'D': 1, 'E': 1, 'F': 1, 'G': 1, 'H': 1, 'J': 1}

export default {
  name: "T3",
  data() {
    return {
      items: [
        {name: '指廊E', src: AC3E, loaded: false, key: {E: 1}, type: 0},
        {name: '指廊F', src: AC3F, loaded: false, key: {F: 1}, type: 0},
        {name: '指廊G', src: AC3G, loaded: false, key: {G: 1}, type: 0},
        {name: '指廊H', src: AC3H, loaded: false, key: {H: 1}, type: 0},
        {name: '值机岛3x', src: T3x, loaded: false, key: keyRange, type: 1},
      ],
      menuList: [
        {name: '指廊E', type: 0, key: 'E'},
        {name: '指廊F', type: 0, key: 'F'},
        {name: '指廊G', type: 0, key: 'G'},
        {name: '指廊H', type: 0, key: 'H'},
        {name: '值机岛3A', type: 1, key: 'A'},
        {name: '值机岛3B', type: 1, key: 'B'},
        {name: '值机岛3C', type: 1, key: 'C'},
        {name: '值机岛3D', type: 1, key: 'D'},
        {name: '值机岛3E', type: 1, key: 'E'},
        {name: '值机岛3F', type: 1, key: 'F'},
        {name: '值机岛3G', type: 1, key: 'G'},
        {name: '值机岛3H', type: 1, key: 'H'},
        {name: '值机岛3J', type: 1, key: 'J'},
      ],
      admission: false,
      rotateAdmission: false,
      selected: null,
      openList: false,
      subscribeable: null,
      subscriptions: null,
      corridorList: [],
      counterList: [],
      loading: false
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
        this.loading = false;
        this.openList = false;
        return this.selected = null;
      }

      this.loading = true;

      this.$nextTick(() => _defer(() => {
        this.corridorList = [];
        this.counterList = [];
        this.selected = menu;
        this.initAllRequest();
        this.subscribeAllRequest();
      }));
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
              counter: o.area_info.substr(2),
              bag_count: o.bag_count,
              bag_weight: o.bag_weight,
            }
        }

        const keys = Object.keys(comprehensiveData).sort();

        // this.counterList = [];
        for (let o of keys) {
          this.counterList.push(comprehensiveData[o]);
        }
      }
    },
    responseHandlerCorridor([data1, data2]) {
      if (parseInt(data1.retCode) === 0 && parseInt(data2.retCode) === 0) {
        const comprehensiveData = {};
        const result1 = data1.retJSON.result;
        const result2 = data2.retJSON.result;
        for (let o of result1) {
          comprehensiveData[o.gate_code] = {
            gate_code: o.gate_code,
            flight_no: o.flight_no,
            checkedin_num: o.checkedin_num
          }
        }

        for (let o of result2) {
          if (comprehensiveData[o.gate_code]) {
            comprehensiveData[o.gate_code]['next_flight_no'] = o.next_flight_no;
          } else {
            comprehensiveData[o.gate_code] = {
              gate_code: o.gate_code,
              next_flight_no: o.next_flight_no
            }
          }
        }

        const keys = Object.keys(comprehensiveData).sort();

        // this.corridorList = [];
        for (let o of keys) {
          this.corridorList.push(comprehensiveData[o]);
        }
      }
    },
    requestCounter(url) {
      return defer(() => {
        const params = {
          exec_date: format(new Date(), 'yyyyMMdd'),
          level_flag: 2,
          terminal_code: 'T3'
        }
        return axios.get(url, {params})
            .finally(() => _defer(() => this.loading = false));
      });
    },
    requestCorridor(url) {
      return defer(() => {
        const params = {
          exec_date: format(new Date(), 'yyyyMMdd'),
          corridor_code: this.selected.key,
          terminal_code: 'T3'
        }
        return axios.get(url, {params})
            .finally(() => _defer(() => this.loading = false));
      });
    }
  }
}
</script>

<style scoped lang="scss" src="./T3.scss"></style>