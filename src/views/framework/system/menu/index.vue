<template>
  <d2-container :filename="filename">
    <menu-page-header
            slot="header"
            @submit="handleSubmit"
            ref="header"/>
    <menu-page-main
            ref="main"
            :table-data="table"
            :loading="loading"
            @add="add"
            @edit="edit"
            @del="del"
    />
    <menu-add v-model="addDialog" @submit="handleAddSubmit"></menu-add>
    <menu-edit v-model="editDialog" :data="data" @submit="handleAddSubmit"></menu-edit>
  </d2-container>
</template>

<script>
import { getMenuTree } from '@api/menu'
export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  name: 'role',
  components: {
    'MenuPageHeader': () => import('./componnets/PageHeader'),
    'MenuPageMain': () => import('./componnets/PageMain'),
    'MenuAdd': () => import('./componnets/PageMenuAdd'),
    'MenuEdit': () => import('./componnets/PageMenuEdit')
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
     * 新增菜单弹出层
     */
    add () {
      this.addDialog = true
    },
    /**
     * 修改菜单弹出层
     */
    edit (row) {
      this.data = row
      this.editDialog = true
    },
    /**
     * 删除菜单
     */
    del (row) {
      alert(1)
    },
    /**
     * 创建菜单成功后的回掉
     */
    handleAddSubmit () {
      this.list()
    },
    /**
     * 查询菜单列表
     */
    list () {
      this.loading = true
      getMenuTree({
        ...this.search
      })
        .then(res => {
          this.loading = false
          this.table = res.result
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
