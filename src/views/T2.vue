<template>
  <transition name="fade">
    <div class="T2" v-show="admission">
      <transition name="rotate">
        <img src="../assets/images/T2/T2.png" alt=""
             v-show="rotateAdmission && !selected"
             @load="rotateAdmission = true">
      </transition>

      <div :class="['data-list', {open: openList}]">
        <h3>
          {{ selected && selected.name }}
          <transition name="fade">
            <svg v-if="!!loading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                 viewBox="0 0 24 30" xml:space="preserve">
              <rect x="0" y="10" width="4" height="10" fill="#fff" opacity="0.2">
                <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s"
                         repeatCount="indefinite"></animate>
                <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s"
                         repeatCount="indefinite"></animate>
                <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s"
                         repeatCount="indefinite"></animate>
              </rect>
              <rect x="8" y="10" width="4" height="10" fill="#fff" opacity="0.2">
                <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s"
                         repeatCount="indefinite"></animate>
                <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s"
                         repeatCount="indefinite"></animate>
                <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s"
                         repeatCount="indefinite"></animate>
              </rect>
              <rect x="16" y="10" width="4" height="10" fill="#fff" opacity="0.2">
                <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s"
                         repeatCount="indefinite"></animate>
                <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s"
                         repeatCount="indefinite"></animate>
                <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s"
                         repeatCount="indefinite"></animate>
              </rect>
            </svg>
          </transition>
        </h3>
        <div class="list-wrap" v-disabled-rebound>
          <transition-group name="fade">
            <table v-show="corridorList.length > 0" key="corridorList">
              <tbody>
              <tr v-for="item in corridorList">
                <td>登机口: <span class="c1">{{ item.gate_code || '-' }}</span></td>
                <td>航班号: <span class="c1">{{ item.flight_no || '-' }}</span></td>
                <td>人数: <span class="c2">{{ item.checkedin_num || '-' }}</span></td>
                <td>下一班: <span class="c3">{{ item.next_flight_no || '-' }}</span></td>
              </tr>
              </tbody>
            </table>
            <table v-show="counterList.length > 0" key="counterList">
              <tbody>
              <tr v-for="item in counterList">
                <td>柜台: <span class="c1">{{ item.counter || '-' }}</span></td>
                <td>人数: <span class="c1">{{ item.checkin_passengernum || '' }}</span></td>
                <td>件数: <span class="c2">{{ parseInt(item.bag_count) || '-' }}</span></td>
                <td>重量: <span class="c3">{{ item.bag_weight ? `${item.bag_weight} KG` : '-' }}</span></td>
              </tr>
              </tbody>
            </table>
            <div v-show="!loading && corridorList.length === 0 && counterList.length === 0" :key="'nothing'">
              未查询到 <span class="c3">{{ selected && selected.name }}</span> 的数据
            </div>
          </transition-group>
        </div>
        <transition-group name="fade-in">
          <div class="total-wrap" v-show="corridorList.length > 0" key="corridorListCount">
            <div>已登机总人数：<span class="c1">{{ statistics.boarded || '-' }}</span></div>
            <div>待登机总人数：<span class="c2">{{ statistics.willBoard || '-' }}</span></div>
          </div>
          <div class="total-wrap" v-show="counterList.length > 0" key="counterListCount">
            <div>值机总人数：<span class="c1">{{ statistics.passenger || '-' }}</span></div>
            <div>总件数：<span class="c2">{{ statistics.count || '-' }}</span></div>
            <div>总重量：<span class="c3">{{ statistics.weight ? `${statistics.weight} KG` : '-' }}</span></div>
          </div>
        </transition-group>
        <a href="javascript:" class="close" @click="openList = false">&#10005;</a>
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
import API_URL from '@/js/API_URL';
import {format} from 'date-fns';
import {Decimal} from 'decimal.js';
import {delay, defer as _defer} from 'lodash';
import {defer, combineLatest} from 'rxjs';

let cancelTokenSource = axios.CancelToken.source();

export default {
  name: "T2",
  data() {
    return {
      menuList: [
        {name: '指廊 A', type: 0, key: 'A', loaded: false, src: A},
        {name: '指廊 B', type: 0, key: 'B', loaded: false, src: B},
        {name: '指廊 C', type: 0, key: 'C', loaded: false, src: C},
        {name: '值机岛 2A', type: 1, key: 'A', loaded: false, src: T2A},
        {name: '值机岛 2B', type: 1, key: 'B', loaded: false, src: T2B},
        {name: '值机岛 2C', type: 1, key: 'C', loaded: false, src: T2C},
        {name: '值机岛 2D', type: 1, key: 'D', loaded: false, src: T2D},
        {name: '值机岛 2E', type: 1, key: 'E', loaded: false, src: T2E},
        {name: '值机岛 2F', type: 1, key: 'F', loaded: false, src: T2F},
      ],
      admission: false,
      rotateAdmission: false,
      selected: null,
      openList: false,
      subscribeable: null,
      subscriptions: null,
      corridorList: [],
      counterList: [],
      loading: 0,
      statistics: {
        willBoard: 0,
        boarded: 0,
        passenger: 0,
        count: 0,
        weight: 0,
      }
    }
  },
  beforeDestroy() {
    this.unsubscribeAllRequest();
    cancelTokenSource.cancel('');
  },
  mounted() {
    this.admission = true;
  },
  methods: {
    goBack() {
      if (window.history.length <= 2) {
        return this.$router.replace({name: 'Home'});
      }
      this.$router.back();
    },
    switchSelected(menu) {
      this.unsubscribeAllRequest();

      cancelTokenSource.cancel('');
      cancelTokenSource = axios.CancelToken.source();

      if (this.selected === menu) {
        this.loading = 0;
        this.openList = false;
        return this.selected = null;
      }

      this.$nextTick(() => _defer(() => {
        this.loading = 1;
        this.corridorList = [];
        this.counterList = [];
        this.selected = menu;
        this.statistics = {
          willBoard: 0,
          boarded: 0,
          passenger: 0,
          count: 0,
          weight: 0,
        }
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
            this.requestCorridor(API_URL.PSR_BOARD_INFO),
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
      if (!data1 || !data2) return;

      if (parseInt(data1.retCode) === 0 && parseInt(data2.retCode) === 0) {
        const comprehensiveData = {};
        const result1 = data1.retJSON.result;
        const result2 = data2.retJSON.result;
        for (let o of result1) {
          if (o.area_info && o.area_info.indexOf(this.selected.key) >= 0) {
            const index = o.area_info.indexOf(this.selected.key) + 1;
            comprehensiveData[o.area_info] = {
              counter: o.area_info.substr(index),
              checkin_passengernum: o.checkin_passengernum
            }
            // this.statistics.passenger = Math.floor(this.statistics.passenger + (parseInt(o.checkin_passengernum) || 0));
            this.statistics.passenger = new Decimal(parseInt(o.checkin_passengernum || 0)).add(this.statistics.passenger);
          }
        }

        for (let o of result2) {
          if (o.area_info && o.area_info.indexOf(this.selected.key) >= 0) {
            // if (comprehensiveData[o.area_info]) {
            //   Object.assign(comprehensiveData[o.area_info], {
            //     bag_count: o.bag_count,
            //     bag_weight: o.bag_weight,
            //   });
            const index = o.area_info.indexOf(this.selected.key) + 1;
            comprehensiveData[o.area_info] = Object.assign({}, comprehensiveData[o.area_info], {
              counter: o.area_info.substr(index),
              bag_count: o.bag_count,
              bag_weight: o.bag_weight,
            });
            this.statistics.count = new Decimal(parseInt(o.bag_count || 0)).add(this.statistics.count);
            this.statistics.weight = new Decimal(parseInt(o.bag_weight || 0)).add(this.statistics.weight);
          }
        }

        const keys = Object.keys(comprehensiveData).sort();

        for (let o of keys) {
          this.counterList.push(comprehensiveData[o]);
        }
      }

      this.loading = 0;
    },
    responseHandlerCorridor([data1, data2, data3]) {
      if (!data1 || !data2) return;

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

          // this.statistics.checkedIn = new Decimal(parseInt(o.checkedin_num || 0)).add(this.statistics.checkedIn);
        }

        for (let o of result2) {
          comprehensiveData[o.gate_code] = Object.assign({}, comprehensiveData[o.gate_code], {
            gate_code: o.gate_code,
            next_flight_no: o.next_flight_no
          });
        }

        const keys = Object.keys(comprehensiveData).sort();

        for (let o of keys) {
          this.corridorList.push(comprehensiveData[o]);
        }

        if (parseInt(data3.retCode) === 0) {
          const result3 = data3.retJSON.result[0];
          this.statistics.willBoard = result3.willboard_num;
          this.statistics.boarded = result3.boarded_num;
        }
      }

      this.loading = 0;
    },
    requestCounter(url) {
      return defer(() => {
        const params = {
          exec_date: format(new Date(), 'yyyyMMdd'),
          level_flag: 2,
          terminal_code: 'T2'
        }
        return axios.get(url, {params, cancelToken: cancelTokenSource.token})
            .catch((thrown) => {
              this.loading = 0
              axios.isCancel(thrown) && console.log('Request canceled', thrown.message)
            });
      });
    },
    requestCorridor(url) {
      return defer(() => {
        const params = {
          exec_date: format(new Date(), 'yyyyMMdd'),
          corridor_code: this.selected.key,
          terminal_code: 'T2'
        }
        return axios.get(url, {params, cancelToken: cancelTokenSource.token})
            .catch((thrown) => {
              this.loading = 0
              axios.isCancel(thrown) && console.log('Request canceled', thrown.message)
            });
      });
    }
  }
}
</script>

<style scoped lang="scss" src="./T2.scss"></style>