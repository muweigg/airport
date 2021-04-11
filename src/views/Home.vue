<template>
  <div class="home">
    <div class="top">航站楼运行总览-旅客</div>
    <div class="logo">LOGO</div>
    <div class="date-time">
      <div>{{ date }}</div>
      <div>{{ time }}</div>
    </div>

    <header>
      <div class="flaunt">
        <strong>旅客总量</strong>
        <div class="num"><strong>{{ accumulative.total[0] }}</strong></div>
        <div class="num"><strong>{{ accumulative.total[1] }}</strong></div>
        <div class="num"><strong>{{ accumulative.total[2] }}</strong></div>
        <div class="num"><strong>{{ accumulative.total[3] }}</strong></div>
        <div class="wrap">
          <strong>万人</strong>
          <span>截至日：{{ date }}</span>
        </div>
      </div>

      <div class="count">
        <div>
          <img src="@/assets/images/icons/outbound.png" alt="">
          累计出港 {{ accumulative.outbound }} 万人
        </div>
        <div>
          <img src="@/assets/images/icons/inbound.png" alt="">
          累计进港 {{ accumulative.inbound }} 万人
        </div>
      </div>
    </header>

    <div class="scene">
      <div class="switch-scene">
        <strong :class="{active: scene == 0}" @click="selectedTo(0)">总览</strong>
        <strong :class="{active: scene == 1}" @click="selectedTo(1)">T2</strong>
        <strong :class="{active: scene == 2}" @click="selectedTo(2)">T3</strong>
      </div>

      <div class="swiper-container" ref="swiperContainer">
        <div class="swiper-wrapper">
          <div class="swiper-slide overview">
            <header>
              <strong>重庆江北国际机场</strong>
              CHONGQING Airport Group Co.,Itd
            </header>
            <img src="@/assets/images/overview.png" alt="">
          </div>
          <div class="swiper-slide T2">
            <img src="@/assets/images/T2.png" alt="">
          </div>
          <div class="swiper-slide T3">
            <img src="@/assets/images/T3.png" alt="">
          </div>
        </div>
      </div>

      <div class="swiper-container controller" ref="swiperContainer2">
        <div class="swiper-wrapper">
          <div class="swiper-slide"></div>
          <div class="swiper-slide"></div>
          <div class="swiper-slide"></div>
        </div>
      </div>

    </div>

    <div class="hat tail"></div>

    <div class="block reservation tail">
      <h3>订座</h3>

      <ul>
        <li>
          <div>
            <img src="@/assets/images/icons/outbound-2.png" alt="">
            预计明日离港人数
          </div>
          <div>{{ estimate.outbound }}</div>
        </li>
        <li>
          <div>
            <img src="@/assets/images/icons/inbound-2.png" alt="">
            预计明日进港人数
          </div>
          <div>{{ estimate.inbound }}</div>
        </li>
      </ul>
    </div>

    <div class="block check-in tail">
      <h3>
        值机
        <div><strong>自助率：{{ checkIn.cussRate }}%</strong></div>
      </h3>

      <ul>
        <li>
          <div>今日累计</div>
          <div>{{ checkIn.today }}</div>
        </li>
        <li>
          <div>网值</div>
          <div>
            <div class="progress-rate" :style="`width: ${checkIn.netCheckIn / checkIn.total * 100}%`"></div>
          </div>
          <div>{{ checkIn.netCheckIn }}</div>
        </li>
        <li>
          <div>CUSS</div>
          <div>
            <div class="progress-rate" :style="`width: ${checkIn.cuss / checkIn.total * 100}%`"></div>
          </div>
          <div>{{ checkIn.cuss }}</div>
        </li>
        <li>
          <div>城市候机楼</div>
          <div>
            <div class="progress-rate" :style="`width: ${checkIn.terminal / checkIn.total * 100}%`"></div>
          </div>
          <div>{{ checkIn.terminal }}</div>
        </li>
        <li>
          <div>柜台</div>
          <div>
            <div class="progress-rate" :style="`width: ${(checkIn.counter + checkIn.highEndCounter) / checkIn.total * 100}%`"></div>
            <span>高端: {{ checkIn.highEndCounter }}</span>
          </div>
          <div>{{ checkIn.counter }}</div>
        </li>
        <li class="special">
          <div>特殊人群</div>
          <div>
            <div class="progress-rate"
                 :style="`width: ${checkIn.special / 60000 * 100}%`"></div>
          </div>
          <div>{{ checkIn.special }}</div>
        </li>
        <li class="normal">
          <div>常规</div>
          <div>
            <div class="progress-rate"
                 :style="`width: ${checkIn.conventional / 60000 * 100}%`"></div>
          </div>
          <div>{{ checkIn.conventional }}</div>
        </li>
      </ul>
    </div>

    <div class="block security-check">
      <h3>
        安检
        <div>
          <strong>过检人数：<span>{{ check.checked }}</span></strong>
          <strong>排队人数：<span>0</span></strong>
        </div>
      </h3>

      <div class="statistics" ref="securityCheck"></div>
    </div>

    <div class="hat tail m2"></div>

    <div class="block boarding tail">
      <h3>登机</h3>

      <div class="statistics">
        <div>
          <strong>{{ board.willBoard }}</strong>
          <div class="wrap-limit">
            <img src="@/assets/images/check-in/1.png" alt=""
                 :style="`height: ${board.willBoard / board.total * 2.4}rem;`">
          </div>
          <div>待登机</div>
        </div>
        <div>
          <strong>{{ board.boarded }}</strong>
          <div class="wrap-limit">
            <img src="@/assets/images/check-in/2.png" alt=""
                 :style="`height: ${board.boarded / board.total * 2.4}rem;`">
          </div>
          <div>已登机</div>
        </div>
        <div>
          <strong>{{ board.waitFly }}</strong>
          <div class="wrap-limit">
            <img src="@/assets/images/check-in/3.png" alt=""
                 :style="`height: ${board.waitFly / board.total * 2.4}rem;`">
          </div>
          <div>待飞</div>
        </div>
      </div>
    </div>

    <div class="block baggage tail">
      <h3>行李</h3>

      <div>
        <div>开包</div>
        <div class="wrap">
          <div>
            <div><span>开包数</span></div>
            <div class="rate"><span></span></div>
            <div>{{ baggage.checkNum }}(件)</div>
          </div>
          <div>
            <div><span>开包率</span></div>
            <div class="rate"><span></span></div>
            <div>{{ baggage.checkRate }}%</div>
          </div>
        </div>
      </div>

      <div>
        <div>行李</div>
        <div class="wrap">
          <div>
            <div><span>件数</span></div>
            <div class="rate"><span></span></div>
            <div>{{ baggage.count }}(件)</div>
          </div>
          <div>
            <div><span>重量</span></div>
            <div class="rate"><span></span></div>
            <div>{{ baggage.weight }}(千克)</div>
          </div>
        </div>
      </div>
    </div>

    <div class="block inbound tail">
      <h3>进港</h3>

      <div class="content">

        <progress-circle :percentage="35" :color="['#04aafe', '#033b61']">
          <div class="circle c1">
            待进港人数
            <strong>{{ arrive.willArrive }}</strong>
          </div>
        </progress-circle>

        <progress-circle :percentage="35" :color="['#ffb743', '#352d25']">
          <div class="circle c2">
            已进港人数
            <strong>{{ arrive.arrived }}</strong>
          </div>
        </progress-circle>

      </div>

    </div>

    <footer>
      *本次只关注国内形势数据（不包括私航和国际航班）
    </footer>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {format, addDays} from "date-fns";
import {timer, interval, defer} from "rxjs";
import {concatMap} from 'rxjs/operators';
import {TweenLite, Expo} from 'gsap';
import ProgressCircle from '@/components/progress-circle.vue';
import Swiper from 'swiper';
import axios from '@/js/axios';
import API_URL from "@/js/API_URL";
import config from '@/js/echartsConfig';
import {sortBy} from 'lodash';

export default {
  name: 'Home',
  components: {ProgressCircle},
  data() {
    return {
      date: format(new Date(), 'yyyy-MM-dd'),
      time: format(new Date(), 'HH:mm:ss'),
      scene: 0,
      swiper: null,
      controller: null,
      charts: null,
      subscribeable: [],
      subscriptions: [],
      // 累计 总/进/出 港人数（万）
      accumulative: {
        total: [0, 0, 0, 0],
        inbound: 0,
        outbound: 0
      },
      // 预计 进/出 港人数
      estimate: {
        inbound: 0,
        outbound: 0
      },
      // 值机
      checkIn: {
        cussRate: 0,
        today: 0,
        netCheckIn: 0,
        cuss: 0,
        terminal: 0,
        counter: 0,
        highEndCounter: 0,
        total: 0,
        special: 0,
        conventional: 0,
      },
      // 安检
      check: {
        checked: 0,
      },
      // 登机
      board: {
        willBoard: 0,
        boarded: 0,
        waitFly: 0,
        total: 0,
      },
      // 行李
      baggage: {
        checkNum: 0,
        checkRate: 0,
        count: 0,
        weight: 0,
      },
      // 进港
      arrive: {
        arrived: 0,
        willArrive: 0,
      }
    }
  },
  mounted() {
    interval(1000).subscribe(
        () => {
          this.date = format(new Date(), 'yyyy-MM-dd');
          this.time = format(new Date(), 'HH:mm:ss');
        });

    this.initSwiper();
    this.initEcharts();
    this.initAllRequestTimer();
    this.subscribeAllRequestTimer();
  },
  methods: {
    initSwiper() {
      this.controller = new Swiper(this.$refs.swiperContainer2, {
        direction: 'vertical',
        initialSlide: 2,
      });
      this.swiper = new Swiper(this.$refs.swiperContainer);
      this.controller.on('activeIndexChange',
          swiperInstance => {
            const toIdx = 2 - swiperInstance.activeIndex;
            this.swiper.slideTo(toIdx);
            this.scene = toIdx;
          });
      this.swiper.on('activeIndexChange',
          swiperInstance => {
            const toIdx = 2 - swiperInstance.activeIndex;
            this.controller.slideTo(toIdx);
            this.scene = swiperInstance.activeIndex;
          });
    },
    initEcharts() {
      this.charts = echarts.init(this.$refs.securityCheck);
      window.addEventListener('resize', () => this.charts.resize());
    },
    selectedTo(idx) {
      this.scene = idx;
      this.controller.slideTo(2 - idx);
      this.swiper.slideTo(idx);
    },
    initAllRequestTimer() {
      this.subscribeable = [
        // 顶部统计
        this.requestTimer(API_URL.PASSENGER_NUM_IN_YEAR),
        // 订座
        this.requestTimer(API_URL.BOOKED_NUM, format(addDays(Date.now(), 1), 'yyyyMMdd')),
        // 值机
        // 自助率 & 今日累计
        this.requestTimer(API_URL.CUSS_RATE),
        // 旅客值机方式统计 - 按值机方式
        this.requestTimer(API_URL.PASSENGER_NUM_BY_CHECK_IN_TYPE),
        // 旅客值机人数统计 - 按人群类别
        this.requestTimer(API_URL.PASSENGER_NUM_BY_CROWD_TYPE),
        // 安检
        this.checkRequestTimer(API_URL.PSR_CHECKED_INFO),
        // 登机
        this.requestTimer(API_URL.PSR_BOARD_INFO),
        // 行李 - 开包
        this.requestTimer(API_URL.PSR_BAG_CHECKED_INFO),
        // 行李 - 件数重量
        this.requestTimer(API_URL.PSR_BAG_INFO),
        // 进港数据统计
        this.requestTimer(API_URL.FLIGHT_ARRIVAL_INFO),
      ];
    },
    subscribeAllRequestTimer() {
      for (let i = 0; i < this.subscribeable.length; i++) {
        this.subscriptions.push(this.subscribeable[i].subscribe(this[`responseHandler${i + 1}`]));
      }
    },
    unsubscribeAllRequestTimer() {
      for (let o of this.subscriptions) {
        o.unsubscribe();
      }
      this.subscriptions = [];
    },
    // 机场累计接待旅客人数
    responseHandler1(data) {
      if (parseInt(data.retCode) === 0) {
        const result = data.retJSON.result[0];

        const tmp = {
          total: parseInt(this.accumulative.total.join(''))
        };

        TweenLite.to(tmp, 2, {
          total: parseInt(result.total_passengernum) / 10000,
          snap: 'total',
          ease: Expo.easeOut,
          onUpdate: () => {
            this.accumulative.total = String(tmp.total).padStart(4, '0').split('');
          }
        });

        TweenLite.to(this.accumulative, 2, {
          outbound: parseInt(result.departure_passengernum) / 10000,
          snap: 'outbound',
          ease: Expo.easeOut
        });

        TweenLite.to(this.accumulative, 2, {
          inbound: parseInt(result.arrive_passengernum) / 10000,
          snap: 'inbound',
          ease: Expo.easeOut
        });
      }
    },
    // 订座 - 预计明日 进/离 港人数
    responseHandler2(data) {
      const properties = ['inbound', 'outbound'];
      if (parseInt(data.retCode) === 0) {
        const result = data.retJSON.result;
        for (let o of result) {
          const propertiy = properties[parseInt(o.ad_flag)];
          TweenLite.to(this.estimate, 2, {
            [propertiy]: parseInt(o.passenger_num),
            snap: propertiy,
            ease: Expo.easeOut
          });
        }
      }
    },
    // 值机 - 自助率 & 今日累计
    responseHandler3(data) {
      if (parseInt(data.retCode) === 0) {
        const result = data.retJSON.result[0];
        this.checkIn.cussRate = result.cussrate || 0;
        this.checkIn.today = result.all_checkinnum || 0;
      }
    },
    // 值机 - 旅客值机方式统计 - 按值机方式
    responseHandler4(data) {
      const properties = {
        1: 'counter',
        2: 'cuss',
        3: 'netCheckIn',
        4: 'terminal',
        5: 'highEndCounter',
      };
      this.checkIn.total = 0;
      if (parseInt(data.retCode) === 0) {
        const result = data.retJSON.result;
        for (let i = 0; i < result.length; i++) {
          const propertiy = properties[result[i].checkin_type];
          this.checkIn[propertiy] = parseInt(result[i].passenger_num);
          this.checkIn.total += this.checkIn[propertiy];
        }
      }
    },
    // 值机 - 旅客值机人数统计 - 按人群类别
    responseHandler5(data) {
      const properties = {
        1: 'special',
        2: 'conventional'
      };
      if (parseInt(data.retCode) === 0) {
        const result = data.retJSON.result;
        for (let i = 0; i < result.length; i++) {
          const propertiy = properties[result[i].crowd_type];
          this.checkIn[propertiy] = parseInt(result[i].passenger_num);
        }
      }
    },
    // 安检
    responseHandler6(data) {
      if (parseInt(data.retCode) === 0) {
        this.check.checked = 0;
        let checked = 0;
        const result = data.retJSON.result;
        const sort = sortBy(result, [o => parseInt(o.time_quantum)]);
        const xData = sort.map(o => parseInt(o.time_quantum));
        const sData = sort.map(o => {
          const num = parseInt(o.psrchecked_num);
          checked += num;
          return num;
        });
        config.xAxis.data = xData;
        config.series[0].data = sData;
        this.charts.setOption(config);

        TweenLite.to(this.check, 2, {
          checked: checked,
          snap: 'checked',
          ease: Expo.easeOut
        });
      }
    },
    // 登机 - 旅客值机人数统计
    responseHandler7(data) {
      if (parseInt(data.retCode) === 0) {
        const result = data.retJSON.result[0];

        this.board.total = parseInt(result.willboard_num) + parseInt(result.boarded_num) + parseInt(result.waitfly_num);

        TweenLite.to(this.board, 2, {
          willBoard: parseInt(result.willboard_num),
          snap: 'willBoard',
          ease: Expo.easeOut
        });

        TweenLite.to(this.board, 2, {
          boarded: parseInt(result.boarded_num),
          snap: 'boarded',
          ease: Expo.easeOut
        });

        TweenLite.to(this.board, 2, {
          waitFly: parseInt(result.waitfly_num),
          snap: 'waitFly',
          ease: Expo.easeOut
        });
      }
    },
    // 行李 - 开包
    responseHandler8(data) {
      if (parseInt(data.retCode) === 0) {
        const result = data.retJSON.result[0];

        TweenLite.to(this.baggage, 2, {
          checkNum: parseInt(result.bag_checknum),
          snap: 'checkNum',
          ease: Expo.easeOut
        });

        TweenLite.to(this.baggage, 2, {
          checkRate: parseFloat(result.bag_checkrate),
          ease: Expo.easeOut
        });
      }
    },
    // 行李 - 件数重量
    responseHandler9(data) {
      if (parseInt(data.retCode) === 0) {
        const result = data.retJSON.result[0];

        TweenLite.to(this.baggage, 2, {
          count: parseInt(result.bag_count),
          snap: 'count',
          ease: Expo.easeOut
        });

        TweenLite.to(this.baggage, 2, {
          weight: parseFloat(result.bag_weight),
          snap: 'weight',
          ease: Expo.easeOut
        });
      }
    },
    // 进港
    responseHandler10(data) {
      if (parseInt(data.retCode) === 0) {
        const result = data.retJSON.result[0];

        TweenLite.to(this.arrive, 2, {
          arrived: parseInt(result.arrived_num),
          snap: 'arrived',
          ease: Expo.easeOut
        });

        TweenLite.to(this.arrive, 2, {
          willArrive: parseFloat(result.willarrive_num),
          snap: 'willArrive',
          ease: Expo.easeOut
        });
      }
    },
    // 请求定时器
    requestTimer(url, execDate) {
      return timer(0, 30000).pipe(
          concatMap(() => defer(() => {
            const params = {
              exec_date: execDate || format(new Date(), 'yyyyMMdd'),
              terminal_code: this.getTerminalCode()
            }
            return axios.get(url, {params});
          }))
      );
    },
    // 安检 - 请求定时器
    checkRequestTimer(url) {
      return timer(0, 30000).pipe(
          concatMap(() => defer(() => {
            const params = {
              begin_time: format(new Date(), 'yyyyMMdd 00:00:00'),
              end_time: format(new Date(), 'yyyyMMdd 23:59:59'),
              flag: 2,
              terminal_code: this.getTerminalCode()
            }
            return axios.get(url, {params});
          }))
      );
    },
    getTerminalCode() {
      const terminalCodeDict = ['', 'T2', 'T3'];
      return terminalCodeDict[this.scene];
    },
  },
  watch: {
    scene() {
      this.unsubscribeAllRequestTimer();
      this.subscribeAllRequestTimer();
    }
  }
}
</script>

<style scoped lang="scss" src="./Home.scss"></style>
