<template>
  <div>
    <el-form
      :inline="true"
      size="mini">
      <el-form-item :label="`已选数据下载 [ ${currentTableData.length} ]`">
        <el-button-group>
          <el-button
            type="primary"
            size="mini"
            :disabled="currentTableData.length === 0"
            @click="handleDownloadXlsx(currentTableData)">
            xlsx
          </el-button>
          <el-button
            type="primary"
            size="mini"
            :disabled="currentTableData.length === 0"
            @click="handleDownloadCsv(currentTableData)">
            csv
          </el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item :label="`已选数据下载 [ ${multipleSelection.length} ]`">
        <el-button-group>
          <el-button
            type="primary"
            size="mini"
            :disabled="multipleSelection.length === 0"
            @click="handleDownloadXlsx(multipleSelection)">
            xlsx
          </el-button>
          <el-button
            type="primary"
            size="mini"
            :disabled="multipleSelection.length === 0"
            @click="handleDownloadCsv(multipleSelection)">
            csv
          </el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="mini" icon="el-icon-plus" @click="add">新增</el-button>
    <el-table
      :data="currentTableData"
      v-loading="loading"
      row-key="id"
      size="mini"
      stripe
      style="width: 100%;"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column label="ID" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>

      <el-table-column label="图标" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.icon}}
        </template>
      </el-table-column>

      <el-table-column label="权限 ID" align="center">
        <template slot-scope="scope">
          {{scope.row.permissionId}}
        </template>
      </el-table-column>

      <el-table-column label="菜单名称" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>

      <el-table-column label="URL" align="center">
        <template slot-scope="scope">
          {{scope.row.url}}
        </template>
      </el-table-column>

      <el-table-column label="排序序号" align="center">
        <template slot-scope="scope">
          {{scope.row.sortIndex}}
        </template>
      </el-table-column>

      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          {{scope.row.describe}}
        </template>
      </el-table-column>

      <el-table-column
              fixed="right"
              label="操作"
              width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      default: () => []
    },
    loading: {
      default: false
    }
  },
  data () {
    return {
      currentTableData: [],
      multipleSelection: [],
      downloadColumns: [
        { label: '用户名', prop: 'username' },
        { label: '姓名', prop: 'name' },
        { label: '状态', prop: 'status' },
        { label: '管理员', prop: 'admin' }
      ]
    }
  },
  watch: {
    tableData: {
      handler (val) {
        this.currentTableData = val
      },
      immediate: true
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    downloadDataTranslate (data) {
      return data.map(row => ({
        ...row,
        type: row.type ? '禁用' : '正常',
        used: row.used ? '已使用' : '未使用'
      }))
    },
    handleDownloadXlsx (data) {
      this.$export.excel({
        title: 'D2Admin 表格示例',
        columns: this.downloadColumns,
        data: this.downloadDataTranslate(data)
      })
        .then(() => {
          this.$message('导出表格成功')
        })
    },
    handleDownloadCsv (data) {
      this.$export.csv({
        title: 'D2Admin 表格示例',
        columns: this.downloadColumns,
        data: this.downloadDataTranslate(data)
      })
        .then(() => {
          this.$message('导出CSV成功')
        })
    },
    /**
     * 新增角色
     */
    add () {
      this.$emit('add')
    },
    /**
     * 修改角色
     * @param row 修改的行信息
     */
    edit (row) {
      this.$emit('edit', row)
    },
    /**
     * 删除角色
     * @param row
     */
    del (row) {
      this.$emit('del', row)
    }
  }
}
</script>
