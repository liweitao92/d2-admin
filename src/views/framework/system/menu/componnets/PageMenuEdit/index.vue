<template>
    <div>
        <el-dialog
                title="修改菜单"
                :visible.sync="show"
        >
            <el-form ref="form" :model="data" label-width="80px" size="mini">
                <el-row :gutter="20">
                    <el-col :xs="24">
                        <el-form-item label="名称">
                            <el-input v-model="data.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24">
                        <el-form-item label="描述">
                            <el-input v-model="data.describe"></el-input>
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
import { updateRole } from '@api/role'
export default {
  name: 'MenuEdit',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {}
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
  methods: {
    submit () {
      updateRole(this.data).then(res => {
        this.$emit('input', false)
        this.$emit('submit', res.result)
      })
    }
  }
}
</script>
