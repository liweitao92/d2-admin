<template>
  <d2-container :filename="filename">
    <permission-page-header
            slot="header"
            @submit="handleSubmit"
            ref="header"/>
    <permission-page-main
            ref="main"
            :table-data="table"
            :loading="loading"
            @add="add"
            @edit="edit"
            @del="del"
    />
    <permission-page-footer
            slot="footer"
            :page-index="page.pageIndex"
            :page-size="page.pageSize"
            :page-total="page.pageTotal"
            @change="handlePaginationChange"/>
    <permission-add v-model="addDialog" @submit="handleAddSubmit"></permission-add>
    <permission-edit v-model="editDialog" :id="id" @submit="handleAddSubmit"></permission-edit>
  </d2-container>
</template>

<script>
import { getPermissionPager, deletePermission } from '@api/permission'
export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  name: 'user',
  components: {
    'PermissionPageHeader': () => import('./componnets/PageHeader'),
    'PermissionPageMain': () => import('./componnets/PageMain'),
    'PermissionPageFooter': () => import('./componnets/PageFooter'),
    'PermissionAdd': () => import('./componnets/PagePermissionAdd'),
    'PermissionEdit': () => import('./componnets/PagePermissionEdit')
  },
  data () {
    return {
      filename: __filename,
      table: [],
      loading: false,
      page: {
        pageIndex: 1,
        pageSize: 10,
        pageTotal: 0
      },
      addDialog: false,
      editDialog: false,
      // 搜索参数
      search: [],
      id: ''
    }
  },
  mounted: function () {
    this.list()
  },
  methods: {
    handlePaginationChange (val) {
      this.page = val
      // nextTick 只是为了优化示例中 notify 的显示
      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    },
    /**
     * 搜索功能
     * @param form
     */
    handleSubmit (form) {
      this.search = form
      this.list()
    },
    /**
     * 新增
     */
    add () {
      this.addDialog = true
    },
    /**
     * 修改
     */
    edit (row) {
      this.id = row.id
      this.editDialog = true
    },
    /**
     * 删除
     */
    del (row) {
      deletePermission(row.id)
        .then(res => {
          alert('删除')
        })
    },
    /**
     * 创建用户成功后的回掉
     */
    handleAddSubmit () {
      this.list()
    },
    /**
     * 查询用户列表
     */
    list () {
      this.loading = true
      getPermissionPager({
        ...this.search,
        pageIndex: this.page.pageIndex - 1,
        pageSize: this.page.pageSize
      })
        .then(res => {
          const result = res.result
          this.loading = false
          this.table = result.data
          this.page.pageTotal = result.total
        })
        .catch(err => {
          this.loading = false
          this.$notify({
            title: '数据请求异常'
          })
          console.log('err', err)
        })
    }
  }
}
</script>
