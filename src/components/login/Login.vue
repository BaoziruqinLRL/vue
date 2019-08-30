<template>
  <div>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../../assets/logo.jpeg">
    </div>
    <div class="login_form">
      <input type="text"  class="qxs-ic_user qxs-icon"  placeholder="用户名" v-model="userName">
      <input type="text"  class="qxs-ic_password qxs-icon"  placeholder="密码" v-model="password">
      <el-button class="login_btn" @click.native="login" type="primary" round :loading="isBtnLoading">登录</el-button>
      <div style="margin-top: 10px">
        <span style="float: right;color: #A9A9AB;font-size: 12px">忘记密码？</span>
      </div>
    </div>
  </div>
</template>



<script>
  //  import { userLogin } from '../../api/api';

  export default {
    data() {
      return {
        userName: '',
        password: '',
        isBtnLoading: false
      }
    },
    created () {
      if(JSON.parse( localStorage.getItem('user')) && JSON.parse( localStorage.getItem('user')).userName){
        this.userName = JSON.parse( localStorage.getItem('user')).userName;
        this.password = JSON.parse( localStorage.getItem('user')).password;
      }
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      }
    },
    methods: {
      login() {
        if (!this.userName) {
          this.$message.error('请输入用户名');
          return;
        }
        if (!this.password) {
          this.$message.error('请输入密码');
          return;
        }
        this.$router.push({
          path: '/home'
        });
      }
    }
  }
</script>
<style>

</style>
