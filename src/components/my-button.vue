<template>
  <button class="my-button" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
  .my-button {
    width: 200px;
    height: 100px;
    border-radius: 30px;
    background-color: pink;
  }
</style>
