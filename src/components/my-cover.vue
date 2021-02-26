<template>
  <div class="my-cover">
    <!-- 图片按钮 -->
    <div class="btn_img" @click="openDialog">
      <img :src="value || coverImgUrl" />
    </div>
    <!-- 对话框 -->
    <el-dialog
      title="选择封面"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="720px"
    >
      <!-- tab组件 -->
      <el-tabs v-model="activeName" type="card">
        <!-- 素材库标签 -->
        <el-tab-pane label="素材库" name="image">
          <div class="top-box">
            <el-radio-group
              size="medium"
              v-model="collect"
              @change="changeCollect"
            >
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>

          <el-row :gutter="10" class="img_list">
            <el-col
              v-for="image in images"
              :key="image.id"
              :class="{ selected: image.url === selectedImageUrl }"
              class="img_item"
              :xs="12"
              :sm="8"
              :md="6"
              :lg="4"
              :xl="4"
            >
              <el-image
                @click.native="imageClick(image)"
                style="height: 100px; width: 100%"
                :src="image.url"
                fit="cover"
              ></el-image>
            </el-col>
          </el-row>

          <el-pagination
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            background
            :page-size="per_page"
            :current-page="currentPage"
            :total="total_count"
          >
          </el-pagination>
        </el-tab-pane>
        <!-- 上传图片标签 -->
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL + '/mp/v1_0/user/images'"
            :show-file-list="false"
            :headers="headers"
            name="image"
            :on-success="handleSuccess"
          >
            <el-image v-if="imageUrl" :src="imageUrl" class="avatar"></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { reqGetImages } from '@/api/pictures'
import { getUser } from '@/utils/storage'
import defaultImg from '@/assets/default.png'
export default {
  name: 'MyCover',
  props: ['value'],
  data () {
    return {
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 当前tabs组件激活的选项卡的name属性的值
      activeName: 'image',
      images: [],
      collect: false,
      per_page: 6,
      currentPage: 1,
      total_count: 0,
      selectedImageUrl: null,
      imageUrl: '',
      headers: {
        Authorization: `Bearer ${getUser().token}`
      },
      coverImgUrl: defaultImg
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
      this.loadImages()
    },

    async loadImages () {
      try {
        const res = await reqGetImages({
          collect: this.collect,
          per_page: this.per_page,
          page: this.currentPage
        })
        this.images = res.data.data.results
        this.total_count = res.data.data.total_count
      } catch (error) {
        console.log(error)
      }
    },

    changeCollect () {
      this.currentPage = 1
      this.loadImages()
    },

    handleCurrentChange (index) {
      this.currentPage = index
      this.loadImages()
    },

    imageClick (image) {
      this.selectedImageUrl = image.url
    },

    handleSuccess (res, file) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
    },

    handleConfirm () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) {
          this.$message.error('请选中一张图片')
          return
        }
        this.coverImgUrl = this.selectedImageUrl
      } else if (this.activeName === 'upload') {
        if (!this.imageUrl) {
          this.$message.error('请先上传一张图片')
          return
        }
        this.coverImgUrl = this.imageUrl
      }
      this.$emit('input', this.coverImgUrl)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang='less'>
// 图片按钮
.btn_img {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}

// 素材列表
.img_list {
  margin-top: 15px;
  .img_item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}

.selected::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat center /
    50px 50px;
}

// 上传部件
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
</style>
