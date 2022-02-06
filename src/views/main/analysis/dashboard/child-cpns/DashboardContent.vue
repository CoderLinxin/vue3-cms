<!--  商品统计页面主体部分  -->
<template>
  <div id="dashboard-content">
    <!--  顶部三个图表  -->
    <el-row :gutter="10">
      <el-col :span="7">
        <LXCard :title="'分类商品数量(饼图)'">
          <PieEchart :pie-data="categoryGoodsCount"/>
        </LXCard>
      </el-col>
      <el-col :span="10">
        <LXCard :title="'不同城市数量'">
          <MapEchart :map-data="addressGoodsSale"/>
        </LXCard>
      </el-col>
      <el-col :span="7">
        <LXCard :title="'分类商品数量(玫瑰图)'">
          <RoseEchart :rose-data="categoryGoodsCount"/>
        </LXCard>
      </el-col>
    </el-row>

    <!--  底部2个图表  -->
    <el-row class="bottom-graph">
      <el-col :span="12">
        <LXCard :title="'分类商品销量'">
          <LineEchart v-bind="categoryGoodsFavor"/>
        </LXCard>
      </el-col>
      <el-col :span="12">
        <LXCard :title="'分类商品收藏'">
          <BarEchart v-bind="categoryGoodsSale"/>
        </LXCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import type { IGoodsCount, IGoodsCountry, IGoodsFavor } from "service/main/analysis/types"
import LXCard from 'common/card'
import { useStore } from "@/store"
import {
  PieEchart,
  BarEchart,
  LineEchart,
  RoseEchart,
  MapEchart,
} from 'components/page-echarts'

const store = useStore()
// 初始时请求数据
store.dispatch('dashboard/getDashboardDataAction')

// 请求不同分类的商品个数
const categoryGoodsCount = computed(() => {
  return (store.state.dashboard.categoryGoodsCount as IGoodsCount[]).map(item => {
    return {name: item.name, value: item.goodsCount}
  })
})

// 不同分类的商品销量
const categoryGoodsSale = computed(() => {
  const xLabels = []
  const values = []

  for (const item of store.state.dashboard.categoryGoodsSale as IGoodsCount[]) {
    xLabels.push(item.name)
    values.push(item.goodsCount)
  }

  return {xLabels, values}
})

// 不同分类的商品收藏
const categoryGoodsFavor = computed(() => {
  const xLabels = []
  const values = []

  for (const item of store.state.dashboard.categoryGoodsFavor as IGoodsFavor[]) {
    xLabels.push(item.name)
    values.push(item.goodsFavor)
  }

  return {xLabels, values}
})

// 不同城市的商品销量
const addressGoodsSale = computed(() => {
  const mapData = []
  
  for (const item of store.state.dashboard.addressGoodsSale as IGoodsCountry[]) {
    mapData.push({name: item.address, value: item.count})
  }

  return mapData
})
</script>

<style lang="scss" scoped>
#dashboard-content {
  .bottom-graph {
    margin-top: 20px;
  }
}
</style>