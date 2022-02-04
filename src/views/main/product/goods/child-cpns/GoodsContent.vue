<!-- 商品页面主内容 -->
<template>
  <div id="goods-content">
    <PageContent :content-config="contentConfig"
                 :page-name="'goods'"
                 :add-text="'新增商品'">
      <!--   使用作用域插槽动态决定 enable 列的布局    -->
      <template #status="{row,key}">
        <el-button :type="$filters.formatStyleButton(row[key])">
          {{ $filters.formatUseButton(row[key], '上架中', '已下架') }}
        </el-button>
      </template>

      <template #price="{row,key}">
        {{ '￥' + row[key] }}
      </template>

      <template #image="{row,key}">
        <el-image style="width: 60px; height: 60px;"
                  :src="row[key]"
                  :hide-on-click-modal="true"/>
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts" setup>
import PageContent from 'components/page-content'
import { contentConfig } from '../config'
</script>

<style lang="scss" scoped>
#goods-content {
}
</style>