<template>
  <div id="line-echart">
    <LXEchart :options="options"/>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import LXEchart from '@/common/echart'

const props = defineProps<{
  xLabels: string[],
  values: any[]
}>()

const options = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {},
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.xLabels,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '分别销量',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: props.values,
      },
    ],
  }
})
</script>

<style lang="scss" scoped>
#line-echart {
}
</style>