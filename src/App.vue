<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import ProgressBar from './components/ProgressBar.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />
  <router-view></router-view>
  <Footer />
</template>

<style scoped>
  body{
    font-family: "Noto sans TC", 
  }
</style>
