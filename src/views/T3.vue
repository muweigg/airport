<template>
  <transition name="fade">
    <div class="T3" v-show="admission">
      <transition name="rotate">
        <img src="../assets/images/T3/T3.png" alt=""
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
                <td>人数: <span class="c1">{{ item.checkin_passengernum || '-' }}</span></td>
                <td>件数: <span class="c2">{{ item.bag_count || '-' }}</span></td>
                <td>重量: <span class="c3">{{ item.bag_weight ? `${item.bag_weight} KG` : '-' }}</span></td>
              </tr>
              </tbody>
            </table>
          </transition-group>
          <div v-show="!loading && corridorList.length === 0 && counterList.length === 0" :key="'nothing'">
            未查询到 <span class="c3">{{ selected && selected.name }}</span> 的数据
          </div>
        </div>
        <transition-group name="fade">
          <div class="total-wrap" v-show="corridorList.length > 0" key="corridorListCount">
            <div>
              待登机总人数：<span class="c2">{{ statistics.checkedIn || '-' }}</span>
            </div>
          </div>
          <div class="total-wrap" v-show="counterList.length > 0" key="counterListCount">
            <div>值机总人数：<span class="c1">{{ statistics.passenger || '-' }}</span></div>
            <div>总件数：<span class="c2">{{ statistics.count || '-' }}</span></div>
            <div>总重量：<span class="c3">{{ statistics.weight ? `${statistics.weight} KG` : '-' }}</span></div>
          </div>
          <div class="bag-total-wrap" v-show="statistics.bagChecked > 0 || statistics.bagCheckRate > 0" key="counterBagCount">
            <div>行李开包数：<span class="c2">{{ statistics.bagChecked || '-' }}</span></div>
            <div>行李开包率：<span class="c3">{{ statistics.bagCheckRate ? `${statistics.bagCheckRate}%` : '-' }}</span></div>
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
import AC3E from '@/assets/images/T3/ac3E.png';
import AC3F from '@/assets/images/T3/ac3F.png';
import AC3G from '@/assets/images/T3/ac3G.png';
import AC3H from '@/assets/images/T3/ac3H.png';
import T3A from '@/assets/images/T3/3A.png';
import T3B from '@/assets/images/T3/3B.png';
import T3C from '@/assets/images/T3/3C.png';
import T3D from '@/assets/images/T3/3D.png';
import T3E from '@/assets/images/T3/3E.png';
import T3F from '@/assets/images/T3/3F.png';
import T3G from '@/assets/images/T3/3G.png';
import T3H from '@/assets/images/T3/3H.png';
import T3J from '@/assets/images/T3/3J.png';

import axios from '@/js/axios';
import API_URL from '@/js/API_URL';
import {format} from 'date-fns';
import {Decimal} from 'decimal.js';
import {delay, defer as _defer, find} from 'lodash';
import {defer, combineLatest} from 'rxjs';

let cancelTokenSource = axios.CancelToken.source();

export default {
  name: "T3",
  data() {
    return {
      menuList: [
        {name: '指廊 E', type: 0, key: 'E', loaded: false, src: AC3E},
        {name: '指廊 F', type: 0, key: 'F', loaded: false, src: AC3F},
        {name: '指廊 G', type: 0, key: 'G', loaded: false, src: AC3G},
        {name: '指廊 H', type: 0, key: 'H', loaded: false, src: AC3H},
        {name: '值机岛 3A', type: 1, key: 'A', loaded: false, src: T3A},
        {name: '值机岛 3B', type: 1, key: 'B', loaded: false, src: T3B},
        {name: '值机岛 3C', type: 1, key: 'C', loaded: false, src: T3C},
        {name: '值机岛 3D', type: 1, key: 'D', loaded: false, src: T3D},
        {name: '值机岛 3E', type: 1, key: 'E', loaded: false, src: T3E},
        {name: '值机岛 3F', type: 1, key: 'F', loaded: false, src: T3F},
        {name: '值机岛 3G', type: 1, key: 'G', loaded: false, src: T3G},
        {name: '值机岛 3H', type: 1, key: 'H', loaded: false, src: T3H},
        {name: '值机岛 3J', type: 1, key: 'J', loaded: false, src: T3J},
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
        checkedIn: 0,
        passenger: 0,
        count: 0,
        weight: 0,
        bagChecked: 0,
        bagCheckRate: 0
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
          checkedIn: 0,
          passenger: 0,
          count: 0,
          weight: 0,
          bagChecked: 0,
          bagCheckRate: 0
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
        ),
        combineLatest(
            this.requestCounter(API_URL.PASSENGER_NUM_BY_LOCATION_DRILL_DOWN),
            this.requestCounter(API_URL.PSR_BAG_INFO_DRILL_DOWN),
            this.requestCounter(API_URL.PSR_BAG_CHECKED_INFO_DRILL_DOWN, {level_flag: 1}),
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
    responseHandlerCounter([data1, data2, data3]) {
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
          // if (o.area_info && o.area_info.indexOf(this.selected.key) >= 0)
          if (comprehensiveData[o.area_info]) {
            Object.assign(comprehensiveData[o.area_info], {
              bag_count: o.bag_count,
              bag_weight: o.bag_weight,
            });
            // this.statistics.count = Math.floor(this.statistics.count + (parseInt(o.bag_count) || 0));
            // this.statistics.weight = Math.floor(this.statistics.weight + (parseInt(o.bag_weight) || 0));
            this.statistics.count = new Decimal(parseInt(o.bag_count || 0)).add(this.statistics.count);
            this.statistics.weight = new Decimal(parseInt(o.bag_weight || 0)).add(this.statistics.weight);
          }
        }

        if (parseInt(data3.retCode) === 0) {
          const result3 = data3.retJSON.result;
          const counter = find(result3, ['area_info', `3${this.selected.key}`])
          if (counter) {
            this.statistics.bagChecked = counter.bag_checknum;
            this.statistics.bagCheckRate = new Decimal(counter.bag_checkrate).mul(100);
          }
        }

        const keys = Object.keys(comprehensiveData).sort();

        for (let o of keys) {
          this.counterList.push(comprehensiveData[o]);
        }
      }

      this.loading = 0;
    },
    responseHandlerCorridor([data1, data2]) {
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

          // this.statistics.checkedIn = Math.floor(this.statistics.checkedIn + (parseInt(o.checkedin_num) || 0));
          this.statistics.checkedIn = new Decimal(parseInt(o.checkedin_num || 0)).add(this.statistics.checkedIn);
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
      }

      this.loading = 0;
    },
    requestCounter(url, rewriteParams = {}) {
      return defer(() => {
        const defaultParams = {
          exec_date: format(new Date(), 'yyyyMMdd'),
          level_flag: 2,
          terminal_code: 'T3'
        }
        const params = Object.assign({}, defaultParams, rewriteParams);
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
          terminal_code: 'T3'
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

<style scoped lang="scss" src="./T3.scss"></style>