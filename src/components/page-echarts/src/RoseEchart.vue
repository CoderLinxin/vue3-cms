<!--  玫瑰图组件封装  -->
<template>
  <div id="rose-echart">
    <LXEchart :options="options"/>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import LXEchart from '@/common/echart'
import type { IDataType } from "components/page-echarts"

const props = defineProps<{
  roseData: IDataType[] // 玫瑰图数据来源
}>()

// 玫瑰图配置
const options = computed(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false},
        restore: {show: true},
        saveAsImage: {show: true},
      },
    },
    series: [
      {
        name: '类别数据',
        type: 'pie',
        radius: [10, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        data: props.roseData,
      },
    ],
  }
})
</script>

<style lang="scss" scoped>
#rose-echart {
}
</style>