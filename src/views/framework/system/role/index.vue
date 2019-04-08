<template>
  <d2-container :filename="filename">
    <role-page-header
            slot="header"
            @submit="handleSubmit"
            ref="header"/>
    <role-page-main
            ref="main"
            :table-data="table"
            :loading="loading"
            @add="add"
            @edit="edit"
            @del="del"
    />
    <role-page-footer
            slot="footer"
            :page-index="page.pageIndex"
            :page-size="page.pageSize"
            :page-total="page.pageTotal"
            @change="handlePaginationChange"/>
    <role-add v-model="addDialog" @submit="handleAddSubmit"></role-add>
    <role-edit v-model="editDialog" :data="data" @submit="handleAddSubmit"></role-edit>
  </d2-container>
</template>

<script>
import { getRolePager, deleteRole } from '@api/role'
export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  name: 'role',
  components: {
    'RolePageHeader': () => import('./componnets/PageHeader'),
    'RolePageMain': () => import('./componnets/PageMain'),
    'RolePageFooter': () => import('./componnets/PageFooter'),
    'RoleAdd': () => import('./componnets/PageRoleAdd'),
    'RoleEdit': () => import('./componnets/PageRoleEdit')
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
      data: {}
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
     * 新增角色弹出层
     */
    add () {
      this.addDialog = true
    },
    /**
     * 修改角色弹出层
     */
    edit (row) {
      this.data = row
      this.editDialog = true
    },
    /**
     * 删除角色
     */
    del (row) {
      deleteRole(row.id)
        .then(res => {
          alert('删除成功')
        })
    },
    /**
     * 创建用户成功后的回掉
     */
    handleAddSubmit () {
      this.list()
    },
    /**
     * 查询角色列表
     */
    list () {
      this.loading = true
      getRolePager({
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
