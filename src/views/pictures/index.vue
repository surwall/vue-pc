<template>
  <div class="pictures">
    <el-card class="box-card">
      <template v-slot:header>
        <my-breadcrumb>素材管理</my-breadcrumb>
      </template>

      <el-radio-group size="medium" v-model="collect" @change="changeCollect">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>

      <el-button
        style="float: right"
        size="medium"
        type="success"
        @click="dialogVisible = true"
        >上传图片素材</el-button
      >

      <!--  :gutter="10" 间隔 -->
      <el-row :gutter="10">
        <el-col
          v-for="item in images"
          :key="item.id"
          class="img_item avatar-uploader"
          :xs="12"
          :sm="8"
          :md="6"
          :lg="4"
          :xl="4"
        >
          <el-image :src="item.url" fit="cover" class="img-source"></el-image>
          <div class="option">
            <span :class="{star: item.is_collected}" @click="changeImageCollect(item)" class="el-icon-star-off"></span>
            <span class="el-icon-delete" @click="deleteImage(item.id)"></span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 对话框组件 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body="true"
    >
      <el-upload
        class="avatar-uploader"
        :action="$http.defaults.baseURL  + '/mp/v1_0/user/images'"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :headers="headers"
        name="image"
      >
        <el-image @load="handleLoad" v-if="imageUrl" :src="imageUrl" class="avatar"></el-image>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>

    <!-- 分页组件 -->
    <el-pagination
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      background
      :page-size="per_page"
      :current-page="currentPage"
      :total="total_count"
    >
    </el-pagination>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/my-breadcrumb.vue'
import { reqDelImage, reqGetImages, reqSwitchCollect } from '../../api/pictures'
import { getUser } from '../../utils/storage'
export default {
  name: 'Pictures',
  components: {
    MyBreadcrumb
  },
  created () {
    this.loadImages()
  },
  data () {
    return {
      images: [],
      per_page: 12,
      currentPage: 1,
      total_count: 0,
      // 是否收藏
      collect: false,
      // 图片上传框
      dialogVisible: false,
      imageUrl: '',
      headers: {
        Authorization: 'Bearer ' + getUser().token
      }
    }
  },
  methods: {
    handleCurrentChange (index) {
      this.currentPage = index
      this.loadImages()
    },
    async loadImages () {
      try {
        const res = await reqGetImages({
          per_page: this.per_page,
          page: this.currentPage,

          collect: this.collect // 是否收藏
        })
        this.images = res.data.data.results
        this.total_count = res.data.data.total_count
      } catch (err) {
        console.log(err)
      }
    },
    // 切换收藏和全部
    changeCollect () {
      this.currentPage = 1
      this.loadImages()
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      this.loadImages()
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 关闭文件上传对话框
    handleLoad () {
      setTimeout(() => {
        this.dialogVisible = false
        this.imageUrl = null
      }, 2000)
    },
    // 切换图片收藏状态
    async changeImageCollect (item) {
      try {
        await reqSwitchCollect(item.id, !item.is_collected)
        this.$message.success('操作成功')
        this.loadImages()
      } catch {
        this.$message.error('操作失败')
      }
    },
    // 删除图片
    async deleteImage (id) {
      try {
        await reqDelImage(id)
        this.$message.success('操作成功')
        if (this.images.length === 1 && this.currentPage > 1) {
          this.currentPage--
        }
        this.loadImages()
      } catch (e) {
        this.$message.error('操作失败')
        console.log(e)
      }
    }

  }
}
</script>

<style lang="less" scoped>
.el-radio-group {
  margin-bottom: 15px;
}
.img_item {
  position: relative;
  box-sizing: border-box;
}
.option {
  position: absolute;
  left: 5px;
  right: 5px;
  bottom: 5px;
  height: 30px;
  line-height: 30px;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
  color: #fff;
  span {
    margin: 0 30px;
    cursor: pointer;
  }
}
.avatar-uploader {
  text-align: center;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-pagination {
  margin-top: 20px;
}

.img-source {
  height: 180px;
  width: 100%;
}

// 收藏图片样式
.star {
  color: yellow;
}
</style>
