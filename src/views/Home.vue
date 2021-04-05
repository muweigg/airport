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
        <div class="num"><strong>0</strong></div>
        <div class="num"><strong>0</strong></div>
        <div class="num"><strong>0</strong></div>
        <div class="num"><strong>0</strong></div>
        <div class="wrap">
          <strong>万人</strong>
          <span>截至日：2021-03-03</span>
        </div>
      </div>

      <div class="count">
        <div>
          <img src="@/assets/images/icons/outbound.png" alt="">
          累计出港 241万人
        </div>
        <div>
          <img src="@/assets/images/icons/inbound.png" alt="">
          累计进港 241万人
        </div>
      </div>
    </header>

    <div class="scene">
      <div class="switch-scene">
        <strong :class="{active: scene == 1}" @click="scene = 1">总览</strong>
        <strong :class="{active: scene == 2}" @click="scene = 2">T2</strong>
        <strong :class="{active: scene == 3}" @click="scene = 3">T3</strong>
      </div>

      <div class="overview">
        <header>
          <strong>重庆江北国际机场</strong>
          CHONGQING Airport Group Co.,Itd
        </header>
        <img src="@/assets/images/overview.png" alt="">
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
          <div>44567</div>
        </li>
        <li>
          <div>
            <img src="@/assets/images/icons/inbound-2.png" alt="">
            预计明日进港人数
          </div>
          <div>44567</div>
        </li>
      </ul>
    </div>

    <div class="block check-in tail">
      <h3>
        值机
        <div><strong>自助率：75.99%</strong></div>
      </h3>
      <ul>
        <li>
          <div>今日累计</div>
          <div>39,448</div>
        </li>
        <li>
          <div>网值</div>
          <div>
            <div class="progress-rate" style="width: 75%"></div>
          </div>
          <div>39,448</div>
        </li>
        <li>
          <div>CUSS</div>
          <div>
            <div class="progress-rate" style="width: 20%"></div>
          </div>
          <div>20995</div>
        </li>
        <li>
          <div>城市候机楼</div>
          <div>
            <div class="progress-rate" style="width: 10%"></div>
          </div>
          <div>18</div>
        </li>
        <li>
          <div>柜台</div>
          <div>
            <div class="progress-rate" style="width: 25%"></div>
          </div>
          <div>9812</div>
        </li>
        <li class="special">
          <div>特殊人群</div>
          <div>
            <div class="progress-rate" style="width: 30%"></div>
          </div>
          <div>9</div>
        </li>
        <li class="normal">
          <div>常规</div>
          <div>
            <div class="progress-rate" style="width: 40%"></div>
          </div>
          <div>9850</div>
        </li>
      </ul>
    </div>

    <div class="block security-check">
      <h3>
        安检
        <div>
          <strong>过检人数：<span>27387</span></strong>
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
          <strong>16396</strong>
          <div class="wrap-limit">
            <img src="@/assets/images/check-in/1.png" alt="">
          </div>
          <div>待登机</div>
        </div>
        <div>
          <strong>16396</strong>
          <div class="wrap-limit">
            <img src="@/assets/images/check-in/2.png" alt="">
          </div>
          <div>已登机</div>
        </div>
        <div>
          <strong>16396</strong>
          <div class="wrap-limit">
            <img src="@/assets/images/check-in/3.png" alt="">
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
            <div>748(件)</div>
          </div>
          <div>
            <div><span>开包率</span></div>
            <div class="rate"><span></span></div>
            <div>3.99%</div>
          </div>
        </div>
      </div>

      <div>
        <div>行李</div>
        <div class="wrap">
          <div>
            <div><span>件数</span></div>
            <div class="rate"><span></span></div>
            <div>19999(件)</div>
          </div>
          <div>
            <div><span>重量</span></div>
            <div class="rate"><span></span></div>
            <div>26999(千克)</div>
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
            <strong>3333</strong>
          </div>
        </progress-circle>

        <progress-circle :percentage="35" :color="['#ffb743', '#352d25']">
          <div class="circle c2">
            已进港人数
            <strong>6666</strong>
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
import {format} from "date-fns";
import {interval} from "rxjs";
import ProgressCircle from '@/components/progress-circle.vue';
import {screen} from "../subscribes";

export default {
  name: 'Home',
  components: {ProgressCircle},
  data() {
    return {
      date: format(new Date(), 'yyyy-MM-dd'),
      time: format(new Date(), 'HH:mm:ss'),
      scene: 1
    }
  },
  mounted() {
    interval(1000).subscribe(
        () => this.time = format(new Date(), 'HH:mm:ss'));

    const option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {show: false},
        axisTick: {show: false},
        axisLabel: {
          textStyle: {color: '#ffffff'},
        },
        data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      },
      yAxis: {
        type: 'value',
        splitLine: {show: false},
        fontSize: 24,
        axisLabel: {
          textStyle: {color: '#ffffff'},
        },
      },
      grid: {
        top: '15%',
        left: '5%',
        right: '5%',
        bottom: 0,
        containLabel: true
      },
      series: [{
        data: [2820, 3932, 5000, 4401, 3934, 2890, 3330, 2320, 4220, 4900, 4455],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#069dec',
          width: 1,
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#04aafe'
          }, {
            offset: 1,
            color: 'transparent'
          }]),
        },
        areaStyle: {}
      }]
    };
    const myChart = echarts.init(this.$refs.securityCheck);
    myChart.setOption(option);

    window.addEventListener('resize', () => myChart.resize());
  }
}
</script>

<style scoped lang="scss" src="./Home.scss"></style>
