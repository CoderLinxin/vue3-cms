<!--  封装 echarts 的组件  -->
<template>
  <div id="lx-echart"
       ref="domRef"
       :style="{width,height}">
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from "vue"
import { EChartsOption } from "echarts"
import useEcharts from "common/echart/hooks/useEcharts"

const props = withDefaults(defineProps<{
  options: EChartsOption,
  width?: string,
  height?: string
}>(), {
  width: '100%',
  height: '360px',
})

const domRef = ref<HTMLElement>()

onMounted(() => {
  const {setOption} = useEcharts(domRef.value!)
  watchEffect(()=>{
    setOption(props.options) // 当 props.option 发生更改时重新调用 setOption
  })
})
</script>

<style lang="scss" scoped>
#lx-echart {
}
</style>