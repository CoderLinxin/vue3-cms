<template>
  <div id="基本使用">
    <!--  承载 echarts 实例的 dom 元素必须显式地指定元素  -->
    <div class="container"
         ref="dom"
         style="height: 500px;width: 600px;"/>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref } from "vue"

const dom = ref<HTMLElement>(null)

onMounted(() => {
  // 1.初始化 echarts 实例（指定一个 dom 元素作为容器）
  // (dom, theme?, opts?)：
  // dom；需要挂载到的 dom 元素
  // theme：图表的主题：light | dark
  // opts：图表的一些选项配置
  const echartsInstance = echarts.init(dom.value, 'dark', {
    renderer: 'svg', // 表示使用 svg 进行渲染（默认使用 canvas）
  })
  
  // 编写配置文件
  const option = {
    // 设置图表标题
    title: {
      text: 'ECharts 入门示例',
      subtext: '我是副标题',
    },
    // 设置提示框组件（鼠标悬浮到图表上时显示的提示信息）
    tooltip: {
      trigger: 'axis', // axis：坐标轴触发提示（可用于柱状图等具有坐标轴的图表类型）
      axisPointer: {
        type: 'cross', // 坐标轴指示器配置项
      },
    },
    // 显式指定该属性时可以指明多个图标标题顺序
    legend: {
      data: ['销量'],
    },
    // 设置 x 轴相关
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      gridIndex: 0, // 当存在多个图表时，指定该 x 轴对齐那个图表刻度
    },
    // 设置 y 轴相关（可以是一个数组（可以设置多个 y 轴，x 轴同理））
    yAxis: [
      {
        type: 'value', // y 轴类型
        name: '销量', // 对应 series 中某一图表的 name
        position: 'right', // y 轴位置
        axisLine: {
          show: true, // 设置显示 y 轴（这根线）
        },
        axisLabel: { // 设置 y 轴的刻度表示
          formatter: '{value} 件',
        },
      },
    ],
    // 每个 series 代表一个图表
    series: [
      {
        name: '销量', // 图表的名称（会自动被提取到 legend 属性中）
        type: 'bar', // 图表的类型，bar 表示为柱状图
        data: [5, 20, 36, 10, 10, 20], // 图表的数据
      },
    ],
  }
  
  // 3.设置配置，并且开始绘制
  echartsInstance.setOption(option)
})

</script>

<style lang="scss" scoped>
#基本使用 {
}
</style>