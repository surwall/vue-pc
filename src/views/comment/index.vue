<template>
  <div class="comment">
    <el-card>
      <template v-slot:header>
        <my-breadcrumb>评论管理</my-breadcrumb>

        <!-- 表格列表 -->
        <el-table :data="comments">
          <el-table-column label="文章标题" prop="title"></el-table-column>
          <el-table-column
            label="总评论数"
            prop="total_comment_count"
          ></el-table-column>
          <el-table-column
            label="粉丝评论数"
            prop="fans_comment_count"
          ></el-table-column>
          <el-table-column label="评论状态">
            <template v-slot:default="obj">
              {{ obj.row.comment_status ? "关闭" : "开启" }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot:default="obj">
              <el-button
                @click="toggleComment(obj.row)"
                v-if="obj.row.comment_status"
                type="success"
                >打开评论</el-button
              >
              <el-button @click="toggleComment(obj.row)" v-else type="danger"
                >关闭评论</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页结构 -->
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          background
          :page-size="per_page"
          :current-page="page"
          :total="total_count"
        >
        </el-pagination>
      </template>
    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/my-breadcrumb'
import { reqGetComments, modCommentStatus } from '@/api/comment'
export default {
  name: 'Comment',
  components: {
    MyBreadcrumb
  },
  data () {
    return {
      page: 1,
      per_page: 10,
      total_count: 0,
      comments: []
    }
  },
  created () {
    this.loadComments()
  },
  methods: {
    async loadComments () {
      try {
        const res = await reqGetComments(this.page, this.per_page)
        this.comments = res.data.data.results
        this.total_count = res.data.data.total_count
      } catch (error) {
        console.log(error)
      }
    },

    handleCurrentChange (index) {
      this.page = index
      this.loadComments()
    },

    async toggleComment (row) {
      try {
        console.log(row)
        await modCommentStatus(row.id.toString(), !row.comment_status)
        this.$message.success('操作成功')
        this.loadComments()
      } catch (error) {
        this.$message.error('操作失败')
        console.log(error)
      }
    }
  }
}
</script>

<style>
</style>
