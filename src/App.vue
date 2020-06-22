<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <!-- 3.使用组件 -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  // 1.导入组件
  import MainTabBar from './components/content/mainTabbar/MainTabBar'

  export default {
    name: 'App',
    components:{
      // 2.注册组件
      MainTabBar
    }
  }
</script>

<style>
  @import "./assets/css/base.css"
</style>
