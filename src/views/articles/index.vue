<template>
  <!-- 上部表单 -->
  <div class="articles">
    <el-card class="box-card">
      <template v-slot:header>
        <my-breadcrumb>内容管理</my-breadcrumb>
      </template>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <my-channels v-model="form.channel_id"></my-channels>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 下部表单 （表格） -->
    <el-table :data="articles" style="width: 100%" v-loading="loading">
      <el-table-column label="封面">
        <template v-slot:default="obj">
          <el-image
            style="width: 150px; height: 100px"
            :src="obj.row.cover.images[0]"
            fit="cover"
          >
            <div slot="error">
              <img
                src="@/assets/error.gif"
                style="width: 150px; height: 100px"
              />
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column label="状态">
        <template v-slot:default="obj">
          <el-tag v-if="obj.row.status === 0">草稿</el-tag>
          <el-tag v-if="obj.row.status === 1" type="warning">待审核</el-tag>
          <el-tag v-if="obj.row.status === 2" type="success">审核通过</el-tag>
          <el-tag v-if="obj.row.status === 3" type="warning">审核失败</el-tag>
          <el-tag v-if="obj.row.status === 4" type="danger">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
      <el-table-column label="操作">
        <template v-slot:default="obj">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="edit(obj.row.id)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="del(obj.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="10"
      :total="total_count"
      background
      :current-page="currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { reqDelArticles, reqGetArticles } from '../../api/articles'
import myBreadcrumb from '../../components/my-breadcrumb.vue'
import myChannels from '@/components/my-channels.vue'
export default {
  components: { myBreadcrumb, myChannels },
  created () {
    this.loadArticles()
  },
  name: 'Articles',
  data () {
    return {
      form: {
        date: [],
        status: null,
        channel_id: null
      },
      articles: [],
      // 总条数
      total_count: 0,
      currentPage: 1,
      channels: [],
      // loading效果
      loading: false,
      query: {
        begin_pubdate: null, // 开始日期
        end_pubdate: null, // 结束日期
        status: null, // 状态
        channel_id: null // 频道的 id
      }
    }
  },
  methods: {
    loadArticles () {
      this.loading = true

      const [beginPubdate, endPubdate] = this.form.date || []
      reqGetArticles({
        page: this.currentPage,
        ...this.query
      }).then(res => {
        this.articles = res.data.data.results
        this.total_count = res.data.data.total_count

        this.loading = false
      })
    },
    del (id) {
      const articleId = id.toString()
      this.$confirm('你确认要删除么?', '温馨提示', {
        type: 'warning'
      }).then(() => {
        console.log(articleId)
        reqDelArticles(articleId).then(res => {
          console.log(res)
          // 删除成功
          this.$message.success('删除成功')
          // 重新加载当前页数据
          this.loadArticles()
        }).catch((err) => {
          this.$message.error('数据暂时无法删除哦')
          return err
        })
      }).catch(() => {
        console.log('取消删除')
      })
    },
    edit (id) {
      const articleId = id.toString()
      // 编程式导航
      this.$router.push(`/edit-article/${articleId}`)
    },

    handleCurrentChange (index) {
      this.currentPage = index
      this.loadArticles()
    },

    search () {
      this.currentPage = 1
      const [beginPubdate, endPubdate] = this.form.date || []
      this.query = {
        begin_pubdate: beginPubdate, // 开始日期
        end_pubdate: endPubdate, // 结束日期
        status: this.form.status, // 状态
        channel_id: this.form.channel_id || null // 频道的 id
      }
      this.loadArticles()
    }
  }
}
</script>

<style lang="less" scoped>
.articles {
  .el-card {
    margin-bottom: 20px;
  }

  .el-pagination {
    margin-top: 20px;
  }
}
</style>
