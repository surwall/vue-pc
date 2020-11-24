<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <el-form ref="myform" :model="form" :rules="rules">
        <el-form-item label="手机账号" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>

        <el-form-item prop="agree">
          <el-checkbox v-model="form.agree"
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>

        <el-form-item>
          <el-button class="login-btn" type="primary" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reqUserLogin } from '../../api/user.js'

export default {
  name: 'Login',
  data () {
    const checkAgree = (rule, value, callback) => {
      if (value === false) {
        callback(new Error('请先同意协议'))
      } else {
        callback()
      }
    }

    return {
      form: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          // { min: 3, max: 11, message: '手机号3-11位', trigger: ['blur', 'change'] }
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: ['blur', 'change'] },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: ['blur', 'change'] }
        ],
        agree: [
          { validator: checkAgree, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.myform.validate((valid) => {
        if (!valid) return
        reqUserLogin(this.form.mobile, this.form.code)
          .then(res => {
            this.$message({
              message: '成功',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            // 登录跳转
            this.$router.push('/')
          }).catch(e => {
            this.$message.error('手机号或者验证码错误')
          })
      })
    }
  }
}
</script>

<style lang="less">
// 铺满整屏
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url("~@/assets/logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
