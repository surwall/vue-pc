<template>
  <!-- 上部表单 -->
  <div class="articles">
    <el-card class="box-card">
      <template v-slot:header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </template>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="开始日期"
              v-model="form.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              placeholder="结束日期"
              v-model="form.date2"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 下部表单 （表格） -->
    <el-table :data="articles" style="width: 100%">
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
          <el-tag v-if="obj.row.status===0">草稿</el-tag>
          <el-tag v-if="obj.row.status===1" type="warning">待审核</el-tag>
          <el-tag v-if="obj.row.status===2" type="success">审核通过</el-tag>
          <el-tag v-if="obj.row.status===3" type="warning">审核失败</el-tag>
          <el-tag v-if="obj.row.status===4" type="danger">已删除</el-tag>
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
  </div>
</template>

<script>
import { reqGetArticles } from '@/api/articles.js'
export default {
  created () {
    this.loadArticles()
  },
  name: 'Articles',
  data () {
    return {
      form: {
        resource: '',
        region: '',
        date1: '',
        date2: ''
      },
      articles: []
    }
  },
  methods: {
    loadArticles () {
      reqGetArticles().then(res => {
        this.articles = res.data.data.results
      })
    },
    del (id) {
      // TODO
      reqGetArticles()
      console.log(`the deleted id is ${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
  .articles {
    .el-card {
      margin-bottom: 20px;
    }
  }
</style>
