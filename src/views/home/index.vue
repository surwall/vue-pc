<template>
  <div class="home">
    <h1>主页</h1>
    <my-channels v-model="channel_id"></my-channels>
  </div>
</template>

<script>
import MyChannels from '@/components/my-channels.vue'
export default {
  name: 'Home',
  components: {
    MyChannels
  },
  data () {
    return {
      channel_id: ''
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
