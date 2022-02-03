<!--  测试响应式对象内部包裹一个响应式对象的问题  -->
<template>
  <div id="test-ref-in-ref">
    <input type="text" v-model="childState.counter">
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch } from 'vue'

const {modelValue} = defineProps({
  modelValue: Object,
})

const emit = defineEmits()

// 之所以不直接使用 parentState 是因为这样可以避免直接修改 parentObj
const childState = ref({...modelValue})
watch(childState, (newState) => {
  emit('update:modelValue', newState)
}, {deep: true})
</script>

<style lang="scss" scoped>
#test-ref-in-ref {
}
</style>