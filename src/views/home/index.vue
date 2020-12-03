<template>
  <div class="home">
    <h1>主页</h1>
    <my-channels></my-channels>
  </div>
</template>

<script>
import MyChannels from '@/components/my-channels.vue'
export default {
  name: 'Home',
  components: {
    MyChannels
  }
}
</script>

<style>

</style>
