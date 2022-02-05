<!--  用户管理页面主体部分  -->
<template>
  <div id="user-content">
    <!--  顶部表单搜索部分  -->
    <PageSearch :search-config="topSearchConfig"
                @reset-btn-click="handleResetBtnClick"
                @search-btn-click="handleBtnClick"/>

    <!--  中间用户列表部分  -->
    <PageContent :content-config="contentConfig"
                 :page-name="'users'"
                 ref="pageContentRef"
                 @create-page-data="handleNewData('新建用户',newCallback)"
                 @edit-page-data="handleEditData($event,'编辑用户',editCallback)">
      <!--   使用作用域插槽动态决定 enable 列的布局    -->
      <template #enable="{row,key}">
        <el-button :type="$filters.formatStyleButton(row[key])">
          {{ $filters.formatUseButton(row[key]) }}
        </el-button>
      </template>
    </PageContent>

    <!--  页面弹窗组件  -->
    <PageModal :modal-config="modalConfigComputed"
               ref="pageModalRef"
               :page-name="'users'"/>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import PageSearch from 'components/page-search'
import PageContent from 'components/page-content'
import PageModal from 'components/page-modal'
import { topSearchConfig, contentConfig, modalConfig } from "../config"
import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"
import { useStore } from "@/store"
import type { IDepartment } from "@/service/types"
import type { IRole } from "@/service/main/system/types"

// 1.使用操作 PageSearch 组件的相关 hook
const [pageContentRef, handleResetBtnClick, handleBtnClick] = usePageSearch()

// 2.使用操作 PageModal 组件的相关 hook
const [pageModalRef, handleNewData, handleEditData] = usePageModal()
const passwordItem = modalConfig.formItems.find(item => item.field === 'password')
const newCallback = () => passwordItem.isHidden = false // 新增数据时显示密码框
const editCallback = () => passwordItem.isHidden = true // 编辑数据时隐藏密码框

// 3.配置中动态添加部门/角色数据
const store = useStore()
const modalConfigComputed = computed(() => {
  const formItems = modalConfig.formItems

  // 动态添加部门数据
  const departments: IDepartment[] = store!.state.departments
  const departmentItems = formItems.find(item => item.field === 'departmentId')
  departmentItems.options = departments.map(department => ({title: department.name, value: department.id}))

  // 动态添加角色数据
  const roleList: IRole[] = store!.state.roleList
  const roleItems = formItems.find(item => item.field === 'roleId')
  roleItems.options = roleList.map(role => ({title: role.name, value: role.id}))

  return modalConfig
})
</script>

<style lang="scss" scoped>
#user-content {

}
</style>