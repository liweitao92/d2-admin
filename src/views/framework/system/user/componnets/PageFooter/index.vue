<template>
  <el-pagination
    :current-page="pageIndex"
    :page-size="pageSize"
    :total="pageTotal"
    :page-sizes="[10, 20, 30, 40]"
    layout="total, sizes, prev, pager, next, jumper"
    style="margin: -10px;"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script>
export default {
  props: {
    pageIndex: {
      default: 0
    },
    pageSize: {
      default: 0
    },
    pageTotal: {
      default: 0
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('change', {
        current: this.current,
        size: val,
        total: this.total
      })
    },
    handleCurrentChange (val) {
      this.$emit('change', {
        pageIndex: val,
        pageSize: this.pageSize,
        pageTotal: this.pageTotal
      })
    }
  }
}
</script>
