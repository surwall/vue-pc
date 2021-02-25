<template>
  <div class="my-input">
    <input
    @blur="handleBlur"
    @input="handleInput"
    :type="type"
    class="inp"
    :placeholder="placeholder"
    :value="value"
    >
  </div>
</template>

<script>
export default {
  name: 'MyInput',
  props: ['placeholder', 'type', 'value'],
  methods: {
    handleInput (e) {
      console.log(e.target.value)
      this.$emit('input', e.target.value)
    },
    handleBlur (e) {
      this.$emit('blur', e.target.value)
    }
  }
}
</script>

<style lang="less" scoped>
  .inp {
    width: 300px;
    height: 100px;
    border: 2px solid #000;
    margin: 10px 0;
  }
</style>
