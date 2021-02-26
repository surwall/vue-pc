<template>
  <div class="fans">
    <el-card>
      <template v-slot:header>
        <my-breadcrumb>粉丝管理</my-breadcrumb>
      </template>

      <!-- tabs组件 -->
      <el-tabs @tab-click="handleTabClick" v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <!-- 列表 -->
          <div class="fans_list">
            <div class="fans_item" v-for="item in list" :key="item.id">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{ item.name }}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>

          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="per_page"
            :current-page="page"
            @current-change="changePage"
            :total="total"
          >
          </el-pagination>
        </el-tab-pane>

        <!-- 第二个tab -->
        <el-tab-pane label="粉丝画像" name="img">
          <div ref="main" style="width: 600px; height: 400px"></div>
        </el-tab-pane>
      </el-tabs>

    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/my-breadcrumb.vue'
import { reqGetFans, reqGetFansStatistics } from '@/api/fans'
import echarts from 'echarts'
export default {
  name: 'Fans',
  data () {
    return {
      activeName: 'img',
      page: 1,
      per_page: 20,
      total: 0,
      list: [],
      // 测试默认头像
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  created () {
    this.getFans()
  },
  mounted () {
    const myChart = echarts.init(this.$refs.main)
    myChart.showLoading()

    setTimeout(() => {
      const result = [
        { type: '小于18岁', num: 45 },
        { type: '小于23岁', num: 70 },
        { type: '小于30岁', num: 50 },
        { type: '小于40岁', num: 40 },
        { type: '小于50岁', num: 60 },
        { type: '大于50岁', num: 30 }
      ]
      // 指定图表的配置项和数据
      const option = {
        title: {
          text: '粉丝人数柱状图'
        },
        tooltip: {},
        legend: {
          data: ['人数']
        },
        xAxis: {
          data: result.map(item => item.type)
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: result.map(item => item.num)
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.hideLoading()
      myChart.setOption(option)
    })
  },
  methods: {
    changePage (index) {
      console.log(index)
    },

    async getFans () {
      try {
        const res = await reqGetFans(this.page, this.per_page)
        this.list = res.data.data.results
        this.total = res.data.data.total_count
      } catch (error) {
        console.log(error)
      }
    },

    async handleTabClick (tab) {

    }
  },
  components: {
    MyBreadcrumb
  }
}
</script>

<style lang="less" scoped>
.fans_list {
  .fans_item {
    width: 120px;
    height: 170px;
    border: 1px dashed #ddd;
    text-align: center;
    padding-top: 10px;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 30px;
    p {
      margin: 10px 0;
    }
  }
}
</style>
