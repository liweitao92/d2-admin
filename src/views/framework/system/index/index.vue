<template>
  <d2-container :filename="filename" type="ghost">
    <d2-module-index-banner slot="header" v-bind="banner"/>
    <d2-module-index-menu :menu="menu"/>
  </d2-container>
</template>

<script>
import menu from '@/menu/modules/system'
export default {
  name: 'System',
  data () {
    return {
      filename: __filename,
      menu,
      banner: {
        title: '系统管理',
        subTitle: '系统核心功能'
      }
    }
  }
}
</script>

<style scoped>

</style>
