<template>
  <d2-container :filename="filename">
    <user-page-header
            slot="header"
            @submit="handleSubmit"
            ref="header"/>
    <user-page-main
            ref="main"
            :table-data="table"
            :loading="loading"
            @add="add"
    />
    <user-page-footer
            slot="footer"
            :page-index="page.pageIndex"
            :page-size="page.pageSize"
            :page-total="page.pageTotal"
            @change="handlePaginationChange"/>
    <user-add v-model="showDialog" @submit="handleAddSubmit"></user-add>
  </d2-container>
</template>

<script>
import { getUserPager } from '@api/user'
export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  name: 'user',
  components: {
    'UserPageHeader': () => import('./componnets/PageHeader'),
    'UserPageMain': () => import('./componnets/PageMain'),
    'UserPageFooter': () => import('./componnets/PageFooter'),
    'UserAdd': () => import('./componnets/PageUserAdd')
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
      showDialog: false,
      // 搜索参数
      search: []
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
     * 新增用户弹出层
     */
    add () {
      this.showDialog = true
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
      getUserPager({
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
            title: '模拟表格数据请求异常'
          })
          console.log('err', err)
        })
    }
  }
}
</script>
