<!--  地图组件封装  -->
<template>
  <div id="map-echart">
    <LXEchart :options="options"/>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { IDataType } from "components/page-echarts"
import { convertData } from "components/page-echarts/utils/convert-data"
import LXEchart from 'common/echart'

const props = defineProps<{
  mapData: IDataType[]
}>()

// 地图配置信息
const options = computed(() => {
  return {
    backgroundColor: '#fff',
    title: {
      text: '全国销量统计',
      left: 'center',
      textStyle: {
        color: '#fff',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return params.name + ' : ' + params.value[2]
      },
    },
    visualMap: {
      min: 0,
      max: 60000,
      left: 20,
      bottom: 20,
      calculable: true,
      text: ['高', '低'],
      inRange: {
        color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)'],
      },
      textStyle: {
        color: '#fff',
      },
    },
    // 指定地理坐标编码
    geo: {
      map: 'china', // 设置为 echart 中注册的 china 地图
      roam: 'scale',
      emphasis: {
        areaColor: '#f4cccc',
        borderColor: 'rgb(9, 54, 95)',
        itemStyle: {
          areaColor: '#f4cccc',
        },
      },
    },
    series: [
      {
        name: '销量',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(props.mapData),
        symbolSize: 12,
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
          },
        },
      },
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false,
        },
      },
    ],
  }
})
</script>

<style lang="scss" scoped>
#map-echart {
}
</style>