<template>
    <div class="header_container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{showContext}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-dropdown @command="handleCommand" menu-align='start'>
        <img src="../../assets/navigation/headImg.jpeg" class="avator">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">切换成员</el-dropdown-item>
          <el-dropdown-item command="navigation">首页</el-dropdown-item>
          <el-dropdown-item command="signout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>

<script>

    export default {
    	data(){
    		return {
          showContext: ""
    		}
    	},
      computed: {
    	  routeName(){
    	    return this.$route.name;
        }
      },
      mounted(){
        this.initShowContext();
      },
      methods: {
        async handleCommand(command) {
          if (command === 'home') {
            this.$router.push('/home');
          } else if (command === 'navigation'){
            this.$router.push('/member-navigation');
          } else if(command === 'signout'){
            // 清除缓存
            localStorage.removeItem("username");
            localStorage.removeItem("userId");
            this.$router.push('/');
          }
        },
        initShowContext(){
          this.showContext = this.$route.meta.pageName;
        }
      },
      watch: {
    	  routeName(value){
    	    this.initShowContext();
        }
      }
    }
</script>

<style lang="less">
	@import '../../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
    position: fixed;
    left: 16.6667%;
    width: 83.333%;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
    text-align: center;
  }
</style>
