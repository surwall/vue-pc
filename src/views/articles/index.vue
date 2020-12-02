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
          <el-select v-model="form.channel_id" placeholder="请选择频道" clearable>
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
import { reqGetArticles, reqGetChannels } from '../../api/articles'
import myBreadcrumb from '../../components/my-breadcrumb.vue'
export default {
  components: { myBreadcrumb },
  created () {
    this.loadArticles()
    this.loadChannels()
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
      loading: false
    }
  },
  methods: {
    loadArticles () {
      this.loading = true

      const [beginPubdate, endPubdate] = this.form.date || []
      reqGetArticles({
        page: this.currentPage,
        begin_pubdate: beginPubdate,
        end_pubdate: endPubdate,
        status: this.form.status,
        channel_id: this.form.channel_id || null
      }).then(res => {
        this.articles = res.data.data.results
        this.total_count = res.data.data.total_count

        this.loading = false
      })
    },
    del (id) {
      // TODO
      reqGetArticles()
      console.log(`the deleted id is ${id}`)
    },
    handleCurrentChange (index) {
      this.currentPage = index
      this.loadArticles()
    },
    search () {
      this.currentPage = 1
      this.loadArticles()
    },
    loadChannels () {
      reqGetChannels().then(res => {
        this.channels = res.data.data.channels
      })
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
