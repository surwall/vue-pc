<template>
  <div class="home">
    <h1>这是许超寅的主页</h1>
    <my-channels v-model="channel_id"></my-channels>
    <my-button @click="login">登录</my-button>
    <my-button @click.native="login">注册</my-button>

    <!-- input  -->
    <my-input @blur="handleBlur" v-model="username" type="text" placeholder="请输入用户名"></my-input>
    <my-input @blur="handleBlur" v-model="password" type="password" placeholder="请输入密码"></my-input>

    <!-- cover component -->
    <hr>
    <my-cover v-model="imgUrl"></my-cover>
  </div>

</template>

<script>
import MyCover from '@/components/my-cover'
import MyInput from '@/components/my-input'
import MyButton from '@/components/my-button.vue'
import MyChannels from '@/components/my-channels.vue'
export default {
  name: 'Home',
  components: {
    MyChannels,
    MyButton,
    MyInput,
    MyCover
  },
  data () {
    return {
      channel_id: '',
      username: 'root',
      password: '123456',
      imgUrl: ''
    }
  },
  methods: {
    login () {
      console.log('try to login')
    },
    handleBlur (value) {
      console.log('失去焦点了' + value)
    }
  }
}
</script>

<style>

</style>
