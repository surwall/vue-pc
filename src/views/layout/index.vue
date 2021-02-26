<template>
  <div class="layout-container">
    <el-container>
      <!-- 左侧 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- logo -->
        <div class="logo" :class="{ minLogo: isCollapse }"></div>
        <!-- 菜单区域 -->
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/articles">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/pictures">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/add-article" >
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-setting"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/settings">
            <i class="el-icon-setting"></i>
            <span slot="title">个人管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右边 -->
      <el-container>
        <el-header>
          <div class="left">
            <i
              :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
              @click="collapse"
            ></i>
            <span>传智播客科技教育公司</span>
          </div>

          <el-dropdown>
            <div class="avatar-wrap">
              <img class="avatar" :src="user.photo" alt="" />
              <span>{{ user.name }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { reqGetUserInfo, reqGetUserProfile } from '../../api/user'
import { delUser } from '@/utils/storage.js'
export default {
  name: 'Layout',
  data () {
    return {
      isCollapse: false,
      user: {}
    }
  },
  created () {
  // 添加监听
    this.$eventBus.$on('update_user_name', newName => {
    // 更新到数据项中
      this.user.name = newName
    })
    this.$eventBus.$on('update_user_photo', newPhoto => {
    // 更新到数据项中
      this.user.photo = newPhoto
    })

    reqGetUserInfo().then(res => {
      this.user = res.data.data
    })
  },

  methods: {
    collapse () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      this.$confirm('你确认要退出本系统么?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      // 删除用户本地信息
        delUser()
        this.$router.push('/login')
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  position: fixed;
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
  }
  .el-aside {
    background-color: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url("~@/assets/logo_admin.png") no-repeat center;
      background-size: 140px auto;
    }

    .minLogo {
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 36px auto;
    }

    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #b3c0d1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .left i {
      cursor: pointer;
    }
    .avatar-wrap {
      display: flex;
      align-items: center;
      cursor: pointer;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
  .el-main {
    background-color: #e9eef3;
  }
}
</style>
