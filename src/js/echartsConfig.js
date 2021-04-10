import * as echarts from "echarts";

export default {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: {show: false},
    axisTick: {show: false},
    axisLabel: {
      textStyle: {color: '#ffffff'},
    },
    // data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
    // data: [2820, 3932, 5000, 4401, 3934, 2890, 3330, 2320, 4220, 4900, 4455],
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
}