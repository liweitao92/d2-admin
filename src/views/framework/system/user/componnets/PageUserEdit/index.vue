<template>
    <div>
        <el-dialog
            title="修改用户"
            :visible.sync="show"
            @open="open"
        >
            <el-form ref="form" :model="formData" label-width="80px" size="mini" v-loading="loading">
                <el-row :gutter="20">
                    <el-col :xs="24">
                        <el-form-item label="姓名">
                            <el-input v-model="formData.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24">
                        <el-form-item label="用户名">
                            <el-input v-model="formData.username"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24">
                        <el-form-item label="密码">
                            <el-input v-model="formData.password"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24">
                        <el-form-item label="角色">
                            <el-transfer
                                    :titles="['选择角色','已选角色']"
                                    filterable
                                    filter-placeholder="请输入角色"
                                    v-model="formData.roles"
                                    :data="roles">
                            </el-transfer>
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
import { updateUser, getUser } from '@api/user'
import { getRoleList } from '@api/role'
export default {
  name: 'UserEdit',
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
      roles: [],
      formData: {},
      loading: false
    }
  },
  methods: {
    /**
     * 提交表单
     */
    submit () {
      updateUser(this.data).then(res => {
        this.$emit('input', false)
        this.$emit('submit', res.result)
      })
    },
    /**
     * 打开弹出层的方法，可在此做数据初始化动作
     */
    open () {
      // 初始化
      this.roles = []
      this.loading = true

      /**
       * 获取角色列表
       */
      getRoleList()
        .then(res => {
          const result = res.result
          result.forEach((data, index) => {
            this.roles.push({
              key: data.id,
              label: data.describe
            })
          })
        })

      /**
       * 根据 ID 获取用户信息
       */
      getUser(this.id)
        .then(res => {
          this.formData = res.result
          this.loading = false
        })
    }
  }
}
</script>
