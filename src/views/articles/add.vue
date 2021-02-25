<template>
  <div class="add-article">
    <el-card>
      <template v-slot:header>
        <my-breadcrumb>发布文章</my-breadcrumb>
      </template>

      <!-- 内容部分 -->
      <el-form ref="myform" :model="form" label-width="40px" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- 富文本编辑器 -->
          <quillEditor
            @blur="quillFn"
            @change="quillFn"
            v-model="form.content"
            :options="editorOption"
          ></quillEditor>
        </el-form-item>
        <el-form-item label="封面">
          <!-- 写死的, 没有绑定值, 后面会实现 -->
          <el-radio-group v-model="form.cover.type" @change="changeCoverType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>

          <!-- 封面组件的盒子 -->
          <div class="cover-box" v-if="form.cover.type > 0" :key="form.cover.type">
            <my-cover v-for="(item, index) in form.cover.type" :key="index" v-model="form.cover.images[index]"></my-cover>
          </div>
        </el-form-item>
        <el-form-item label="频道">
          <my-channels v-model="form.channel_id" :channels="channels"></my-channels>
        </el-form-item>
        <el-form-item>
          <el-button @click="clickAddArticle(false)" type="primary"
            >发表</el-button
          >
          <el-button @click="clickAddArticle(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

import MyBreadcrumb from '@/components/my-breadcrumb.vue'
import MyChannels from '@/components/my-channels.vue'
import { reqAddArticles } from '../../api/articles'
import MyCover from '@/components/my-cover'
export default {
  name: 'AddArticle',
  components: {
    MyBreadcrumb,
    quillEditor,
    MyChannels,
    MyCover
  },
  data () {
    return {
      form: {
        title: '',
        content: '',
        channel_id: '',
        cover: {
          type: 0,
          images: []
        }
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: ['blur', 'change'] },
          { min: 5, message: '标题必须是5-30位', trigger: ['blur', 'change'] }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: ['blur', 'change'] }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道', trigger: ['blur', 'change'] }
        ]
      },
      channels: [],
      editorOption: {
        placeholder: '请输入文字',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }

      }
    }
  },

  methods: {
    clickAddArticle (draft) {
      this.$refs.myform.validate(async (valid) => {
        if (!valid) return
        try {
          await reqAddArticles(draft, this.form)
          this.$message.success('发布成功')
          this.$router.push('/articles')
        } catch (e) {
          this.$message.error('发布失败')
        }
      })
    },

    quillFn () {
      this.$refs.myform.validateField('content')
    },

    changeCoverType () {
      this.form.cover.images = []
    }
  }
}
</script>

<style lang="less" scoped>
.add-article {
  /deep/ .ql-editor {
    min-height: 300px;
  }
}

.add-article /deep/ .ql-toolbar {
  padding: 0 8px;
}

.el-form-item /deep/ .el-form-item__label::before {
  display: none;
}

.cover-box {
  display: flex;
  .my-cover {
    margin-right: 20px;
  }
}
</style>
