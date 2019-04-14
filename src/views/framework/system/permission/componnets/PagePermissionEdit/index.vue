<template>
    <div>
        <el-dialog
                title="修改权限信息"
                :visible.sync="show"
                @open="open"
        >
            <el-form ref="form" :model="formData" label-width="180px" size="mini">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="权限标识">
                            <el-input v-model="formData.id"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="权限名称">
                            <el-input v-model="formData.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input v-model="formData.describe"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="支持的数据权限控制方式">
                            <el-select v-model="formData.supportDataAccessTypes" multiple placeholder="请选择" style="width:100%">
                                <el-option
                                        v-for="item in supportDataAccessTypesOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-button type="primary" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
                <el-table
                        size="small"
                        :data="formData.actions"
                        style="width: 100%">
                    <el-table-column
                            prop="action"
                            label="操作类型"
                            width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.action" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="describe"
                            label="描述"
                            width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.describe" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="defaultCheck"
                            label="默认选中">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.defaultCheck" size="mini">
                                <el-option
                                        v-for="item in defaultCheckOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="submit"> 提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getPermission, updatePermission } from '@api/permission'
export default {
  name: 'PermissionAdd',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    show: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      }
    }
  },
  data () {
    return {
      formData: {
        actions: []
      },
      supportDataAccessTypesOptions: [{
        value: 'DENY_FIELDS',
        label: '禁止访问字段'
      }, {
        value: 'ONLY_SELF',
        label: '仅限本人'
      }, {
        value: 'POSITION_SCOPE',
        label: '仅限本人及下属'
      }, {
        value: 'DEPARTMENT_SCOPE',
        label: '所在部门'
      }, {
        value: 'ORG_SCOPE',
        label: '所在机构'
      }, {
        value: 'CUSTOM_SCOPE_ORG_SCOPE_',
        label: '自定义设置-机构'
      }, {
        value: 'CUSTOM_SCOPE_DEPARTMENT_SCOPE_',
        label: '自定义设置-部门'
      }, {
        value: 'CUSTOM_SCOPE_POSITION_SCOPE_',
        label: '自定义设置-岗位'
      }],
      defaultCheckOptions: [{
        value: true,
        label: '是'
      }, {
        value: false,
        label: '否'
      }]
    }
  },
  methods: {
    submit () {
      updatePermission(this.formData)
        .then(res => {
          alert('成功咯')
        })
    },
    /**
     * 打开弹出层的方法，可在此做数据初始化动作
     */
    open () {
      getPermission(this.id)
        .then(res => {
          const result = res.result
          this.formData = result
        })
    },
    del (row) {
      alert('delete')
    },
    add () {
      this.tableData.push({})
    }
  }
}
</script>
