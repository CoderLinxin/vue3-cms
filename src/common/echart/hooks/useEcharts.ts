import * as echarts from 'echarts'
import { EChartsOption } from "echarts"
import chinaMapData from '../data/china.json'

echarts.registerMap('china', chinaMapData) // 注册中国地图（初始化中国的地理坐标系统）

export default function useEcharts(el: HTMLElement) {
  // 创建 echart 实例
  const echartInstance = echarts.init(el)

  // 浏览器界面发生放缩时进行图表的响应式
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOption: (options: EChartsOption) => echartInstance.setOption(options),
    setResize: () => echartInstance.resize(),
  }
}