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
                 @edit-page-data="handleEditData($event,'编辑角色',newDataCb)"/>

    <!--  页面弹窗组件  -->
    <PageModal :modal-config="modalConfig"
               :page-name="'role'"
               ref="pageModalRef"
               :other-info="otherInfo">
      <template #default>
        <!--    在弹窗组件中展示用户菜单列表的树形控件    -->
        <div class="menu-list">
          <el-tree ref="elTreeRef"
                   :data="menuList" show-checkbox
                   node-key="id" :props="{children:'children',label:'name'}"
                   @check="handleCheckChange"/>
        </div>
      </template>
    </PageModal>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, nextTick } from "vue"
import PageSearch from 'components/page-search'
import PageContent from 'components/page-content'
import PageModal from 'components/page-modal'
import { ElTree } from "element-plus/lib/components"
import { topSearchConfig, contentConfig, modalConfig } from '../config'
import { usePageModal } from "@/hooks/use-page-modal"
import { useStore } from "@/store"
import { getMenuLeafKeys } from "@/utils/map-menu"

const [pageModalRef, handleNewData, handleEditData] = usePageModal()

// 选择编辑数据时 ElTree 的数据回显
const elTreeRef = ref<InstanceType<typeof ElTree>>(null)
const newDataCb = (data) => {
  // 弹窗回频繁创建销毁，因此需要使用 nextTick 保证 elTreeRef 可以绑定到创建出来的弹窗
  nextTick(() => {
    // 获取编辑的角色数据中菜单列表的叶子结点
    const leafKeys = getMenuLeafKeys(data.menuList)
    elTreeRef.value.setCheckedKeys(leafKeys, false) // 使用获取到的叶子结点数据设置 ELTree
  })
}

const otherInfo = ref({}) // PageModal 中网络请求的其他参数
const store = useStore()
const menuList = computed(() => store.state.menuList)
// 弹窗中选择菜单列表（编辑用户权限）
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