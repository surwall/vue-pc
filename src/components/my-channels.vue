<template>
  <el-select @change="handleSelectChange" :value="value" placeholder="请选择" clearable>
      <!-- select的value就是被选中的option的value值 -->
      <!-- label给用户的提示, value才是收集给后台的id -->
    <el-option
      v-for="item in channels"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
import { reqGetChannels } from '@/api/articles'
export default {
  name: 'MyChannels',
  props: ['value'],
  data () {
    return {
      channel_id: '',
      channels: []
    }
  },
  async created () {
    const res = await reqGetChannels()
    this.channels = res.data.data.channels
  },
  methods: {
    handleSelectChange (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style>

</style>
