<template>
    <div>
        <el-dialog
                title="新增角色"
                :visible.sync="show"
        >
            <el-form ref="form" :model="formData" label-width="80px" size="mini">
                <el-row :gutter="20">
                    <el-col :xs="24">
                        <el-form-item label="名称">
                            <el-input v-model="formData.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24">
                        <el-form-item label="描述">
                            <el-input v-model="formData.describe"></el-input>
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
import { createRole } from '@api/role'
export default {
  name: 'RoleAdd',
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
      createRole(this.formData).then(res => {
        this.$emit('input', false)
        this.$emit('submit', res.result)
      })
    }
  }
}
</script>
