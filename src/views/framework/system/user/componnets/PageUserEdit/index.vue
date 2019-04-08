<template>
    <div>
        <el-dialog
                title="修改用户"
                :visible.sync="show"
        >
            <el-form ref="form" :model="data" label-width="80px" size="mini">
                <el-row :gutter="20">
                    <el-col :xs="24">
                        <el-form-item label="姓名">
                            <el-input v-model="data.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24">
                        <el-form-item label="用户名">
                            <el-input v-model="data.username"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24">
                        <el-form-item label="密码">
                            <el-input v-model="data.password"></el-input>
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
import { updateUser } from '@api/user'
export default {
  name: 'UserEdit',
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
      updateUser(this.data).then(res => {
        this.$emit('input', false)
        this.$emit('submit', res.result)
      })
    }
  }
}
</script>
