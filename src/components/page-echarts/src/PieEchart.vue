<!--  封装饼图的组件  -->
<template>
  <div id="pie-echart">
    <LXEchart :options="options"/>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue"
import type { IDataType } from "components/page-echarts"
import LXEchart from '@/common/echart'

const props = defineProps<{
  pieData: IDataType[] // 饼图数据来源
}>()

// 饼图配置
const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'horizontal',
      left: 'left',
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
})
</script>

<style lang="scss" scoped>
#pie-echart {
}
</style>