<template>
    <div>
        <el-dialog
                title="新增菜单"
                :visible.sync="show"
        >
            <el-form ref="form" :model="formData" label-width="80px" size="mini">
                <el-row :gutter="20">
                    <el-col :xs="24">
                        <el-form-item label="图标">
                            <el-input v-model="formData.icon"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24">
                        <el-form-item label="权限 ID">
                            <el-input v-model="formData.permissionId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24">
                        <el-form-item label="菜单名称">
                            <el-input v-model="formData.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24">
                        <el-form-item label="URL">
                            <el-input v-model="formData.url"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24">
                        <el-form-item label="排序序号">
                            <el-input v-model="formData.sortIndex"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24">
                        <el-form-item label="描述">
                            <el-input v-model="formData.describe"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24">
                        <el-form-item label="上级菜单">
                            <el-input v-model="formData.parentId"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="show = false">取 消</el-button>
            <el-button type="primary" @click="submit"> 提交</el-button>
        </div>
        </el-dialog>
    </div>
</template>
<script>
import { createMenu } from '@api/menu'
export default {
  name: 'MenuAdd',
  props: {
    value: {
      type: Boolean,
      default: false
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

      }
    }
  },
  methods: {
    submit () {
      createMenu(this.formData).then(res => {
        this.$emit('input', false)
        this.$emit('submit', res.result)
      })
    }
  }
}
</script>
