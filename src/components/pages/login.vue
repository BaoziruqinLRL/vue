<template>
  <div>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../../assets/logo.jpeg" alt="">
    </div>
    <div class="login_form">
      <el-form :model="loginForm" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名" class="qxs-ic_user qxs-ic" ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="loginForm.password" class="qxs-ic_password qxs-ic"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="login_btn">登陆</el-button>
        </el-form-item>
        <div style="margin-top: 5px">
          <span style="float: right;color: #A9A9AB;font-size: 12px">忘记密码？</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {login} from '@/api/getData'

  export default {
    data(){
      return {
        loginForm: {
          username: '',
          password: '',
        },
        showLogin: false,
      }
    },
    mounted(){
      this.showLogin = true;
      this.autoLogin();
    },
    methods: {
      async submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const userData = {loginName: this.loginForm.username, loginPwd: this.loginForm.password};
            const res = await login(userData);
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '登录成功'
              });
              localStorage.setItem("username",userData.loginName);
              localStorage.setItem("userId",res.data.id);
              this.$router.push('home')
            }else{
              this.$message({
                type: 'error',
                message: res.result
              });
            }
          } else {
            this.$notify.error({
              title: '错误',
              message: '请输入正确的用户名密码',
              offset: 100
            });
            return false;
          }
        });
      },
      async autoLogin(){
        if (localStorage.getItem("username")) {
          this.$message({
            type: 'success',
            message: '检测到您之前登录过，将自动登录'
          });
          this.$router.push('home')
        }
      }
    }
  }
</script>

<style scoped>
  .qxs-ic_user {
    background-size: 10%;
    background-image: url("../../assets/login/ic_user.jpeg");
    background-repeat: no-repeat;
    background-position-y: center;
  }
  .qxs-ic_password {
    background-size: 10%;
    background-image: url("../../assets/login/ic_password.jpeg");
    background-repeat: no-repeat;
    background-position-y: center;
  }
  .qxs-ic{
    height: 40px;
    width: 90%;
    padding-left: 10%;
    border: none;
    border-bottom: solid 1px lavender;
  }
  .qxs-ic >>> .el-input__inner{
    border: none;
  }
  .login_btn {
    width: 100%;
    font-size: 16px;
    background: url("../../assets/login/ic_login.jpeg") no-repeat;
    background-position-y: 40%;
    filter: brightness(1.4);
    border-style: none;
  }
  .login_form {
    padding-left: 5%;
    padding-right: 5%;
    margin-top: 5%;
    margin-left: 35%;
    margin-right: 35%;
  }
  .outer_label {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 300px;
    background: -webkit-linear-gradient(left, #FFFFFF, #FFFFFF); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FFFFFF, #FFFFFF); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FFFFFF, #FFFFFF); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FFFFFF , #FFFFFF); /* 标准的语法 */
    text-align: center;
    filter: brightness(1.4);
  }
  .inner_label {
    position: absolute;
    left:0;
    right: 0;
    bottom: 0;
    top:0;
    margin: auto;
    height: 50px;
  }
  .login_logo {
    height: 100%;
  }
</style>
