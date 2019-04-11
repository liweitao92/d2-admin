<template>
    <div>
        <el-dialog
            title="赋权"
            :visible.sync="show"
            @open="open"
        >
            <el-form ref="form" :model="formData" label-width="80px" size="mini">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="菜单管理" name="first">
                        <el-tree ref="tree" :data="data" :props="defaultProps" show-checkbox></el-tree>
                    </el-tab-pane>
                    <el-tab-pane label="权限管理" name="second">配置管理</el-tab-pane>
                </el-tabs>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="submit"> 提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getMenuTree } from '@api/menu'
import { createAuthSetting, getAuthSetting } from '@api/authorization.setting'
export default {
  name: 'AutzGrand',
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
      formData: {},
      activeName: 'first',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    submit () {
      const treeList = this.$refs.tree.getCheckedNodes()
      let treeData = []
      treeList.forEach((tree) => {
        console.log(tree)
        treeData.push({
          menuId: tree.id
        })
      })
      console.log(treeList)
      const data = {
        type: 'role',
        settingFor: this.id,
        menus: treeData,
        details: []
      }
      createAuthSetting(data)
        .then(res => {
          alert(1)
        })
    },
    open () {
      /**
       * 获取所有的菜单树
       */
      getMenuTree()
        .then(res => {
          this.data = res.result
        })
      /**
       * 获取当前用户的配置
       */
      getAuthSetting({ type: 'role', id: this.id })
        .then(res => {
          console.log(res)
          alert(1)
        })
    }
  }
}
</script>
