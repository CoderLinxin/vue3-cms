<!--  角色管理主内容  -->
<template>
  <div id="role-content">
    <!--  顶部搜索组件  -->
    <PageSearch :search-config="topSearchConfig"/>

    <!--  中间角色列表组件  -->
    <PageContent :content-config="contentConfig"
                 :page-name="'role'"
                 :add-text="'新增角色'"
                 @create-page-data="handleNewData('新建角色')"
                 @edit-page-data="handleEditData($event,'编辑角色')"/>

    <!--  页面弹窗组件  -->
    <PageModal :modal-config="modalConfig"
               :page-name="'role'"
               ref="pageModalRef"
               :other-info="otherInfo">
      <template #default>
        <!--    在弹窗组件中展示用户菜单列表的树形控件    -->
        <div class="menu-list">
          <el-tree :data="menuList" show-checkbox
                   node-key="id" :props="{children:'children',label:'name'}"
                   @check="handleCheckChange"/>
        </div>
      </template>
    </PageModal>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from 'components/page-search'
import PageContent from 'components/page-content'
import PageModal from 'components/page-modal'
import { topSearchConfig, contentConfig, modalConfig } from '../config'
import { usePageModal } from "@/hooks/use-page-modal"
import { computed, ref } from "vue"
import { useStore } from "@/store"

const [pageModalRef, handleNewData, handleEditData] = usePageModal()

const otherInfo = ref({}) // PageModal 中网络请求的其他参数
const store = useStore()
const menuList = computed(() => store.state.menuList)
// 弹窗中选择菜单列表
const handleCheckChange = (data1, {checkedKeys, halfCheckedKeys}) => {
  // 收集选中的菜单 ID （包括全选中与半选中的菜单）
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = {menuList} // 设置网络请求的其他参数
}
</script>

<style lang="scss" scoped>
#role-content {
  .menu-list {
    margin-left: 30px;
  }
}
</style>